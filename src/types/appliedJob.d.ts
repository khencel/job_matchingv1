// Applied Jobs API Response Interfaces
import { User } from "@/types/user-register";
import { RegisterEmployerData } from "./employer";

export interface UserDetails {
  gender: string;
  midName: string;
  facebook: string;
  lastName: string;
  birthdate: string;
  contactNo: string;
  firstName: string;
  visaStatus: string;
  nationality: string;
  japaneseLevel: string;
  highestEducation: string;
  currentPlaceResidence: string;
}

export interface UserApplying {
  userDetails: UserDetails;
  email: string;
}

export interface TypeOfEmp {
  type: string[];
}

export interface Category {
  category: string[];
}

export interface Skill {
  skill: string[];
}

export interface JobPostDetails {
  id: number;
  user_id: number;
  title: string;
  salary: number;
  type_of_emp: TypeOfEmp;
  category: Category;
  skill: Skill;
  job_desc: string;
  responsibility: string;
  who_you_are: string;
  nice_to_have: string;
  benefits: string[];
  employer: Array<{
    avatar: string;
    userDetails_emp: RegisterEmployerData;
  }>;
}

export interface JobPost {
  jobPostDetails: JobPostDetails;
  employerDetails: User | null;
}

export interface AppliedJob {
  id: number;
  user: UserApplying;
  job_post: JobPost;
  deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface GetAppliedJobsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: AppliedJob[];
}

export interface GetAppliedJobsParams {
  page: number;
  page_size: number;
}
