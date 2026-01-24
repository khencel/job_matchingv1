import { RegisterEmployerData } from "@/redux/slices/register/employerSlice";
import { RegisterJobSeekerData } from "@/redux/slices/register/job-seeker/jobseekerSlice";
import { RegisterSuperVisoryData } from "@/redux/slices/register/super-visory/superVisorySlice";

// --> Registration user types
// arguments for registering a user
export interface RegisterUserArgs {
  email: string;
  password: string;
  user_type: "employer" | "job_seeker" | "supervisory";
  details: string;
}

// User type returned from backend
export interface User {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  is_email_verified: boolean;
  role: "job_seeker" | "employer" | "admin" | "super_visory";
  avatar?: string | null; // Optional (From GetUser)
  banner?: string | null; // Optional (From GetUser)

  // 2. HANDLE DYNAMIC DETAILS (The key to your problem)
  // Make them optional (?). Login won't have them, GetUser will.
  userDetails_emp?: RegisterEmployerData | null;
  userDetails_job_seeker?: RegisterJobSeekerData | null;
  userDetails_supervisory?: RegisterSuperVisoryData | null;
}

export interface RegistrationStep1 {
  email: string;
  password: string;
}
