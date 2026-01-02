import { NextResponse } from "next/server";

// 1. Enhanced Interface
export interface SavedJob {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  salaryRange: string;
  savedDate: string;
  description: string;
  logo?: string; // Optional: for company logo placeholder
}

// 2. Richer Mock Data
const mockSavedJobs: Record<string, SavedJob[]> = {
  "1": [
    {
      id: "j1",
      jobTitle: "Senior Software Engineer",
      company: "TechFlow Solutions",
      location: "San Francisco, CA (Remote)",
      salaryRange: "$120k - $150k",
      savedDate: "2023-10-15",
      description:
        "We are looking for an experienced React developer to lead our frontend team...",
    },
    {
      id: "j2",
      jobTitle: "Product Designer",
      company: "Creative Minds Studio",
      location: "New York, NY",
      salaryRange: "$90k - $110k",
      savedDate: "2023-10-20",
      description:
        "Join our award-winning design team creating next-gen mobile experiences...",
    },
    {
      id: "j3",
      jobTitle: "Backend Developer (Python)",
      company: "DataCorp",
      location: "Austin, TX",
      salaryRange: "$115k - $135k",
      savedDate: "2023-11-01",
      description:
        "Seeking a Python expert to optimize our large-scale data processing pipelines...",
    },
    {
      id: "j4",
      jobTitle: "Frontend Developer",
      company: "StartUp Inc.",
      location: "Remote",
      salaryRange: "$80k - $100k",
      savedDate: "2023-11-05",
      description:
        "Perfect role for a developer who loves Vue.js and fast-paced environments...",
    },
    {
      id: "j5",
      jobTitle: "Civil Engineer",
      company: "BuildRight Construction",
      location: "Chicago, IL",
      salaryRange: "$95k - $125k",
      savedDate: "2023-11-10",
      description:
        "Manage large-scale infrastructure projects in the greater Chicago area...",
    },
  ],
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");

    if (!user_id) {
      return NextResponse.json(
        { error: "user_id is required" },
        { status: 400 }
      );
    }

    const savedJobs = mockSavedJobs[user_id];

    if (!savedJobs) {
      return NextResponse.json(
        { message: "No saved jobs found", data: [] },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Saved jobs retrieved successfully", data: savedJobs },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching saved jobs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
