"use client"

import { useRouter } from "next/navigation";

export default function ServiceContent() {
  const router = useRouter();
  return (
    <div className="">
        <section className="approach-wrap" id="direct-approach">
          <div className="approach-inner">
            <div className="container">
                <div className="approach-head">
                  <div className="approach-kicker" data-i18n="approach_kicker">New intake: Direct approach</div>
                  <h3 className="approach-main" data-i18n="approach_title">Approach job seekers and employers directly</h3>
                  <p className="approach-sub" data-i18n="approach_sub">*For companies considering interviewing overseas candidates</p>
                </div>

                <div className="approach-grid">
                  <div className="approach-card">
                    <div className="approach-chip" data-i18n="approach_company_chip">For companies</div>

                    <ul className="approach-list">
                      <li data-i18n="approach_company_li1">Companies considering hiring foreign talent for the first time</li>
                      <li data-i18n="approach_company_li2">Companies urgently looking for candidates</li>
                    </ul>

                    <p className="approach-note" data-i18n="approach_company_note">
                      *If you need fast introductions, we will propose suitable candidates.<br/>
                      *We also support the overall process for first-time hiring.
                    </p>

                    <button className="approach-btn" onClick={() => {router.push("/registration/employer")}} type="button"  data-i18n="approach_company_btn">
                      For companies
                    </button>
                  </div>

                  <div className="approach-card">
                    <div className="approach-chip" data-i18n="approach_jobseeker_chip">For job seekers</div>

                    <ul className="approach-list">
                      <li data-i18n="approach_jobseeker_li1">If you need to change jobs urgently</li>
                      <li data-i18n="approach_jobseeker_li2">If you want career consultation</li>
                    </ul>

                    <p className="approach-note" data-i18n="approach_jobseeker_note">
                      *If urgent, we will search and introduce opportunities on your behalf.<br/>
                      *For consultation as well, start here.
                    </p>

                    <button className="approach-btn" type="button" data-i18n="approach_jobseeker_btn">
                      For job seeker
                    </button>
                  </div>
                </div>
            </div>
            
          </div>
        </section>
    </div>
  );
}

