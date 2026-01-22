import { RegisterJobSeekerStep2Data } from "./job-seeker";
import { User } from "./user-register";

export interface JobPosting {
  id: number;
  user_id: number;
  title: string;
  salary: number;
  type_of_emp: {
    type: string[];
  };
  category: {
    category: string[];
  };
  skill: {
    skill: string[];
  };
  job_desc: string;
  responsibility: string;
  who_you_are: string;
  nice_to_have: string;
  benefits: string[];
  created_at: string;
}

export interface ApplyToJobRequest {
  user: string;
  job_post: number;
}

interface ApplyUser {
  userDetails: RegisterJobSeekerStep2Data;
  email: string;
}

interface JobPost {
  jobPostDetails: JobPosting;
  employerDetails: User;
}

export interface ApplyToJobResponse {
  id: number;
  user: ApplyUser;
  job_post: JobPost;
  deleted?: boolean;
}

export interface GetAppliedJobResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ResultInterface[];
}

export interface AppliedJobParams {
  page?: number;
  page_size?: number;
}

export interface AppliedJobEntry {
  id: number;
  user: ApplyUser;
  job_post: {
    jopPostDetails: JobPosting;
    employerDetails: User | null;
  };
  deleted: boolean;
  created_at: string;
  updated_at: string;
}
