import apiClient, { publicApi } from "@/lib/axios";

export const getJobPostings = async () => {
  return await publicApi.get("/job/list");
};

// job postings per id/users
export const getJobPostById = async (id: number) => {
  return await apiClient.get(`/job/list/${id}`);
};

// Apply to Job
export const postApplyToJob = async (
  userId: number,
  jobPostId: number,
  employer_id: number,
) => {
  return await apiClient.post(`/apply/`, {
    user: userId,
    job_post: jobPostId,
    employer: employer_id,
  });
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
