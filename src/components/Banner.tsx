"use client";
import { useTranslations } from "next-intl";
import { JobPosting } from "@/types/applyJob";
import { useEffect, useState } from "react";
import { getJobPostings } from "@/redux/slices/jobs/jobServices";
import { useRouter } from "next/navigation";

export default function Banner() {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const t = useTranslations("banner");
  const router = useRouter();
  useEffect(() => {
    async function fetchJobDetails() {
      const res = await getJobPostings();
      setJobPostings(res.data);
      console.log(res.data);
      
    }
    fetchJobDetails();
  }, []);

  return (
    <section className="top-jobs" id="latest">
    <div className="container">
      <div className="top-jobs-grid">

       
        <div className="catch-card">
          <span className="catch-pill" data-i18n="hero_pill">Browse jobs</span>
          <h1 className="catch-title" data-i18n="hero_title">Connecting foreigners in Japan with hiring companies — JOBSAPO.</h1>
          <p className="catch-desc" data-i18n="hero_desc">
            A matching service that connects employers, job seekers, and workplaces.<br/>
            Find jobs that fit your needs and take the next step.
          </p>

          <div className="catch-actions">
            <button className="primary-cta"
            
              data-i18n="hero_cta_search">
              Search Jobs
            </button>
            <button className="ghost-cta"
               
               data-i18n="hero_cta_register">
              Free Registration
            </button>
          </div>
        </div>

      
        <div className="jobs-panel" aria-label="最新求人一覧">
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
                <div className="jobs-panel-sub" data-i18n="jobs_sub">Latest</div>
                <div data-i18n="jobs_title">New updates from companies</div>
              </div>
            </div>
            <div className="jobs-panel-sub" style={{cursor:"pointer"}} onClick={() => router.push("/find-jobs")} data-i18n="jobs_sub">View All</div>
          </div>

          <div className="job-grid-2x2">
            {jobPostings.slice(0, 4).map((job) => (
              <article className="job-card" key={job.id}>
                <div className="job-img">
                  <img 
                        src={
                          job?.employer?.[0]?.avatar
                            ? `${process.env.NEXT_PUBLIC_API_CONTENT_URL}media/${job.employer[0].avatar}`
                            : `${process.env.NEXT_PUBLIC_API_CONTENT_URL}media/placeholder.jpg`
                        }
                        alt="企業イメージ" 
                  />
                  <span className="job-badge">NEW</span>
                </div>
                <div className="job-body">
                  <div className="job-top">
                    <div className="job-company" data-i18n="job1_company">{job?.employer?.[0]?.userDetails_emp?.company_information?.name}</div>
                    <div className="job-date" data-i18n="job1_date">Updated: 2/2</div>
                  </div>
                  <div className="job-title" data-i18n="job1_title">{job.title}</div>
                  <div className="job-meta">
                    <span className="meta-pill" data-i18n="job1_meta1">📍 Tokyo</span>
                    {job.type_of_emp?.map((type, index) => (
                      <span key={index} className="meta-pill">
                        💼 {type}
                      </span>
                    ))}
    
                    <span className="meta-pill" data-i18n="job1_meta3">💰 {job.salary}</span>
                  </div>
                  <div className="job-cta">
                    <button className="job-btn" onClick={() => router.push(`job-description/${job.id}`)} type="button" data-i18n="btn_detail">View details</button>
                  </div>
                </div>
              </article>
            ))}

            {/* <article className="job-card">
              <div className="job-img">
                <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=70" alt="企業イメージ" />
                <span className="job-badge">NEW</span>
              </div>
              <div className="job-body">
                <div className="job-top">
                  <div className="job-company" data-i18n="job2_company">ABC Food</div>
                  <div className="job-date" data-i18n="job2_date">Updated: 2/1</div>
                </div>
                <div className="job-title" data-i18n="job2_title">Restaurant Kitchen Staff</div>
                <div className="job-meta">
                  <span className="meta-pill" data-i18n="job2_meta1">📍 Osaka</span>
                  <span className="meta-pill" data-i18n="job2_meta2">💼 Shift</span>
                  <span className="meta-pill" data-i18n="job2_meta3">🍜 Food service</span>
                </div>
                <div className="job-cta">
                  <button className="job-btn" type="button" data-i18n="btn_detail">View details</button>
                </div>
              </div>
            </article>

            <article className="job-card">
              <div className="job-img">
                <img src="https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=900&q=70" alt="企業イメージ" />
                <span className="job-badge">NEW</span>
              </div>
              <div className="job-body">
                <div className="job-top">
                  <div className="job-company" data-i18n="job3_company">Manufacturing</div>
                  <div className="job-date" data-i18n="job3_date">Updated: 1/31</div>
                </div>
                <div className="job-title" data-i18n="job3_title">Food Factory Line (No experience OK)</div>
                <div className="job-meta">
                  <span className="meta-pill" data-i18n="job3_meta1">📍 Aichi</span>
                  <span className="meta-pill" data-i18n="job3_meta2">🏭 Manufacturing</span>
                  <span className="meta-pill" data-i18n="job3_meta3">🚌 Shuttle available</span>
                </div>
                <div className="job-cta">
                  <button className="job-btn" type="button"  data-i18n="btn_detail">View details</button>
                </div>
              </div>
            </article>

            <article className="job-card">
              <div className="job-img">
                <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=70" alt="企業イメージ" />
                <span className="job-badge">NEW</span>
              </div>
              <div className="job-body">
                <div className="job-top">
                  <div className="job-company" data-i18n="job4_company">Care Support</div>
                  <div className="job-date" data-i18n="job4_date">Updated: 1/30</div>
                </div>
                <div className="job-title" data-i18n="job4_title">Care Staff (Dorm available)</div>
                <div className="job-meta">
                  <span className="meta-pill" data-i18n="job4_meta1">📍 Fukuoka</span>
                  <span className="meta-pill" data-i18n="job4_meta2">🛏 Dorm available</span>
                  <span className="meta-pill" data-i18n="job4_meta3">🤝 Support included</span>
                </div>
                <div className="job-cta">
                  <button className="job-btn" type="button"  data-i18n="btn_detail">View details</button>
                </div>
              </div>
            </article> */}
          </div>
        </div>

      </div>
    </div>
  </section>
  );
}
