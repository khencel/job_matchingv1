import apiClient from "@/lib/axios";

// job postings
export const getJobPostings = async () => {
  return await apiClient.get("/job/list");
};

// Apply to Job
export const postApplyToJob = async (userId: number, jobPostId: number) => {
  return await apiClient.post(`/apply/`, { user: userId, job_post: jobPostId });
};

// get applied jobs with pagination
export const getAppliedJobs = async (page: number, page_size: number) => {
  return await apiClient.get("apply/", {
    params: {
      page: page,
      page_size: page_size,
    },
  });
};

// Get Job by Id
export const getJobById = async (jobId: number) => {
  return await apiClient.get(`/job/details/${jobId}`);
};
