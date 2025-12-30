interface AppliedJobs {
  jobTitle: string;
  appliedDate: string;
  status: string;
}

const mockAppliedJobs: Record<string, AppliedJobs[]> = {
  "1": [
    {
      jobTitle: "Sales Associate",
      appliedDate: "July 24, 2025",
      status: "applied",
    },
    {
      jobTitle: "Sales Associate",
      appliedDate: "July 24, 2025",
      status: "viewed",
    },
    {
      jobTitle: "Sales Associate",
      appliedDate: "July 24, 2025",
      status: "interview",
    },
    {
      jobTitle: "Sales Associate",
      appliedDate: "July 24, 2025",
      status: "accepted",
    },
    {
      jobTitle: "Sales Associate",
      appliedDate: "July 24, 2025",
      status: "rejected",
    },
  ],
  "2": [
    {
      jobTitle: "Sales Associate",
      appliedDate: "July 24, 2025",
      status: "applied",
    },
    {
      jobTitle: "Sales Associate",
      appliedDate: "July 24, 2025",
      status: "viewed",
    },
    {
      jobTitle: "Sales Associate",
      appliedDate: "July 24, 2025",
      status: "interview",
    },
  ],
  "4": [],
};

export async function GET(req: Request) {
  try {
    // Extract user_id from query parameters
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");

    // Validate user_id
    if (!user_id) {
      return Response.json({ error: "user_id is required" }, { status: 400 });
    }

    // Get applied jobs for the user
    const appliedJobs = mockAppliedJobs[user_id];

    if (!appliedJobs) {
      return Response.json(
        { message: "No applied jobs found for this user", data: [] },
        { status: 200 }
      );
    }

    return Response.json(
      { message: "Applied jobs retrieved successfully", data: appliedJobs },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
