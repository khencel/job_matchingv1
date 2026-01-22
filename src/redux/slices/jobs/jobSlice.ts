import { JobPostDetails } from "@/types/appliedJob";

const initialState: JobPostDetails = {
  id: 0,
  user_id: 0,
  title: "",
  salary: 0,
  type_of_emp: { type: [] },
  category: { category: [] },
  skill: { skill: [] },
  job_desc: "",
  responsibility: "",
  who_you_are: "",
  nice_to_have: "",
  benefits: [],
  created_at: "",
};
