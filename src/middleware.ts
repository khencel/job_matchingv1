
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

// 1. Define your Role Types
type UserRole = "employer" | "job_seeker" | "admin";

interface TokenPayload {
  user_id: number;
  user_type: UserRole;
  exp: number; // Expiration time
}

// 2. Define Protected Routes & Required Roles
// Keys are the URL prefixes, Values are the roles allowed to visit them
const routePermissions = {
  "/employer": ["employer"],
  "/job-seeker": ["job_seeker"],
  "/admin": ["admin"],
  "/dashboard": ["employer", "job_seeker"], // Example of shared route
};

export function middleware(request: NextRequest) {
  console.log("Middleware Running");
  const token = request.cookies.get("accessToken")?.value;
  const currentPath = request.nextUrl.pathname;

  // --- CHECK 1: Is this a protected route? ---
  // We check if the current path starts with any key in our routePermissions object
  const protectedPrefix = Object.keys(routePermissions).find((prefix) =>
    currentPath.startsWith(prefix)
  );

  // If it's a public route (like /login, /about), let them pass
  if (!protectedPrefix) {
    return NextResponse.next();
  }

  // --- CHECK 2: Is the user logged in? ---
  if (!token) {
    // No token? Redirect to login with a "returnUrl" so we can send them back later
    return NextResponse.redirect(
      new URL(`/login?returnUrl=${currentPath}`, request.url)
    );
  }

  try {
    // --- CHECK 3: Is the token valid & active? ---
    const decoded = jwtDecode<TokenPayload>(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      // Token expired -> Delete cookie & Redirect to login
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("accessToken");
      return response;
    }

    // --- CHECK 4: RBAC (Does user have the right role?) ---
    const allowedRoles =
      routePermissions[protectedPrefix as keyof typeof routePermissions];
    if (!allowedRoles.includes(decoded.user_type)) {
      // User is logged in, but has the WRONG role (e.g., Seeker trying to access Employer Dashboard)
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    // ✅ SUCCESS: User is allowed
    return NextResponse.next();
  } catch (error) {
    // If decoding fails (malformed token), treat as not logged in
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// --- CONFIGURATION ---
// This tells Next.js specifically which paths to run this middleware on.
// Exclude static files (images, css) and api routes to save performance.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (login page)
     * - register (register page)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|login|register).*)",
  ],
};
