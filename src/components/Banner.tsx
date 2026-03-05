"use client";
import { useTranslations } from "next-intl";
import { JobPosting } from "@/types/applyJob";
import { useEffect, useState } from "react";
import { getJobPostings } from "@/redux/slices/jobs/jobServices";
import { useRouter } from "next/navigation";

export default function Banner() {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const t = useTranslations("banner");
  const tExtended = useTranslations("bannerExtended");
  const router = useRouter();

  console.log(jobPostings);
  
  useEffect(() => {
    async function fetchJobDetails() {
      const res = await getJobPostings();
      setJobPostings(res.data);
    }
    fetchJobDetails();
  }, []);

  return (
    <section className="top-jobs" id="latest">
    <div className="container">
      <div className="top-jobs-grid">

       
        <div className="catch-card">
          <span className="catch-pill">{t("hero.pill")}</span>
          <h1 className="catch-title">{t("hero.title")}</h1>
          <p className="catch-desc">
            {t("hero.description.line1")}
            <br />
            {t("hero.description.line2")}
          </p>

          <div className="catch-actions">
            <button className="primary-cta"
            >
              {t("hero.cta.searchJobs")}
            </button>
            <button className="ghost-cta"
            >
              {t("hero.cta.freeRegistration")}
            </button>
          </div>
        </div>

      
        <div className="jobs-panel" aria-label={tExtended("ariaLabels.latestJobs")}>
          <div className="jobs-panel-head">
            <div className="jobs-panel-title">
              <span className="jobs-panel-ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M9 7V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
                  <path d="M4.5 9.5h15v9.5a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2V9.5z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
                  <path d="M4.5 12.5h15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity=".35"/>
                </svg>
              </span>
              <div className="">
                <div className="jobs-panel-sub">{t("jobsPanel.latest")}</div>
                <div>{t("jobsPanel.title")}</div>
              </div>
            </div>
            <div className="jobs-panel-sub" style={{cursor:"pointer"}} onClick={() => router.push("/find-jobs")}>
              {t("jobsPanel.viewAll")}
            </div>
          </div>

          <div className="job-grid-2x2">
            {jobPostings.slice(0, 4).map((job) => (
              <article className="job-card" key={job.id}>
                <div className="job-img">
                  <img 
                        src={
                          (job?.company_details as any)?.avatar
                            ? `${process.env.NEXT_PUBLIC_API_CONTENT_URL}${(job?.company_details as any)?.avatar}`
                            : `${process.env.NEXT_PUBLIC_API_CONTENT_URL}media/placeholder.jpg`
                        }
                        alt={tExtended("ariaLabels.companyImage")}
                  />
                  <span className="job-badge">{tExtended("badges.new")}</span>
                </div>
                <div className="job-body">
                  <div className="job-top">
                    <div className="job-company">{(job?.company_details as any)?.information.company_information.name}</div>
                    <div className="job-date">
                      {t("job.updated", { date: t("job.updatedFallback") })}
                    </div>
                  </div>
                  <div className="job-title">{job.title}</div>
                  <div className="job-meta">
                    <span className="meta-pill">
                      {t("job.location", { location: t("job.locationFallback") })}
                    </span>
                    {job.type_of_emp?.map((type, index) => (
                      <span key={index} className="meta-pill">
                        💼 {type}
                      </span>
                    ))}
    
                    <span className="meta-pill">💰 {job.salary}</span>
                  </div>
                  <div className="job-cta">
                    <button className="job-btn" onClick={() => router.push(`job-description/${job.id}`)} type="button">
                      {t("job.viewDetails")}
                    </button>
                  </div>
                </div>
              </article>
            ))}

          </div>
        </div>

      </div>
    </div>
  </section>
  );
}
