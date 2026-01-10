import { RegisterJobSeekerStep2Data } from "@/redux/slices/register/job-seeker/jobseekerSlice";
import { NextResponse } from "next/server";

// 1. Mock Data Dictionary
const MOCK_USERS: Record<string, RegisterJobSeekerStep2Data> = {
  "1": {
    firstName: "SampleUser1",
    midName: "",
    lastName: "User1",
    nationality: "Japanese",
    gender: "male",
    currentPlaceResidence: "Philippines",
    birthdate: "11/03/2003",
    visaStatus: "APPLIED",
    highestEducation: "bachelorDegree",
    japaneseLevel: "N2",
    contactNo: "09333333333",
    facebook: "sample/facebook/link",
  },
  "2": {
    firstName: "SampleUser2",
    midName: "",
    lastName: "User2",
    nationality: "Japanese",
    gender: "female",
    currentPlaceResidence: "Philippines",
    birthdate: "11/03/2003",
    visaStatus: "APPLIED",
    highestEducation: "bachelorDegree",
    japaneseLevel: "N2",
    contactNo: "09333333333",
    facebook: "sample/facebook/link",
  },
};

// 2. The Dynamic Route Handler
export async function GET({ params }: { params: { id: string } }) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const userId = params.id;
  const user = MOCK_USERS[userId];

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
