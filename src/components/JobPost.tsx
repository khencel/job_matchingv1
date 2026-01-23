import Link from "next/link";
import JobCard from "./JobCard";
import { useEffect, useState } from "react";
import { getJobPostings } from "@/redux/slices/jobs/jobServices";
import { JobPosting } from "@/types/applyJob";
import { useRouter } from "next/navigation";

export default function JobPost() {
  const router = useRouter();
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);

  useEffect(() => {
    (async () => {
      const { WOW } = await import("wowjs");
      new WOW({ live: false }).init();
    })();
  }, []);

  useEffect(() => {
    async function fetchJobDetails() {
      const res = await getJobPostings();
      setJobPostings(res.data);
    }
    fetchJobDetails();
  }, []);

  return (
    <div className="container py-4">
      <div className="row justify-content-center wow animate__animated animate__fadeInUp">
        <div className="col-md-10">
          <div className="row justify-content-center">
            <div className="row ">
              {jobPostings.slice(0, 4).map((job) => (
                <div className="col-md-3 d-flex" key={job.id}>
                  <JobCard
                    job={job}
                    onClick={() => router.push(`job-description/${job.id}`)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              <button className="btn btn-primary-custom">
                <Link
                  href="/find-jobs"
                  className="text-white text-decoration-none"
                >
                  View More Jobs
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
