import Navbar from "@/components/navbar/Navbar";
import Footer from "../../components/Footer";

export default function LegalNotice() {
    return (
        <>
            <Navbar />
            <div>
                <div className="legal-notice-container shadow rounded-5 mt-3 mb-3" style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
                    <h3 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Legal Notice</h3>
                    <section>
                        <strong><h3>Company Information & Legal Notice (Detailed)</h3></strong>
                        <p>
                            This 
                            page summarizes the operator details, nature of the service, and data handling practices of 
                            JOBSAPO in accordance with relevant Japanese laws and common compliance requirements for 
                            job-matching platforms. 
                        </p>
                    </section>

                    <section>
                        <strong>Company Profile</strong>
                        <br />
                        Company Name:Global Network Innovation Co., Ltd. 
                        <br />
                        Service Name :JOBSAPO 
                        <br />
                        Address :Fukaya Building 5-A, 4-22-10 Koto, Sumida-ku, Tokyo 130-0014, Japan
                        <br />
                        Representative :Nobuaki Kawamichi 
                        <br />
                        Business :Human Resources Services / IT Services 
                    </section>



                    <br />
                    <strong>Nature of the Service </strong>
                    <section style={{ marginBottom: "1.5rem" }}>
                        <ol>
                            <li>What JOBSAPO Provides</li>
                            <p>
                                JOBSAPO is a web platform that provides job and candidate information and matching 
                                opportunities between employers and job seekers.
                            </p>
                            <li>Not a Party to Employment Contracts</li>
                            <p>
                                The Company is not a party to employment contracts between employers and job seekers. 
                                Employment conditions and hiring decisions are determined by employers, and users act at their own responsibility. 
                            </p>
                            <li>
                                Placement Fees (Current Status)
                            </li>
                            <p>
                                At present, the Company does not charge or receive any placement fees or success-based 
                                commissions from employers or job seekers through JOBSAPO. 
                                <br />
                                <br />
                                In the future, if JOBSAPO is operated as a licensed paid employment placement service, additional disclosures such as license number, fee table, and complaint handling may be added after obtaining the required license.
                            </p>
                            <li>Limitation of Liability</li>
                            <ul>
                                <li>False, misleading, or illegal job postings are prohibited.</li>
                                <li>Discriminatory expressions that may violate laws and regulations are not allowed. </li>
                                <li>The Company may review, request corrections, or remove listings when necessary.</li>
                            </ul>
                        </ol>
                    
                    </section>


                    <section style={{ marginBottom: "1.5rem" }}>
                        <strong>Compliance & Prohibited Conduct </strong>
                        <br />
                        <br />
                        Users must not engage in the following:
                        <ul>
                            <li>Posting or registering false or inaccurate information </li>
                            <li>Posting content that may violate Japanese laws (employment-related, immigration-related, etc.) </li>
                            <li>Acts against public order and morals, or involvement with antisocial forces</li>
                            <li>Infringing third-party rights (copyright, trademark, privacy, etc.) </li>
                            <li>Unauthorized access, excessive load, scraping, or any disruption to the service</li>
                        </ul>
                        
                    </section>


                    <section style={{ marginBottom: "1.5rem" }}>
                        <strong>Personal Information Handling </strong>
                        <br />
                        <br />
                        <ol>
                            <li>Data We Collect</li>
                            <ul>
                                <li>Name and contact details (phone, email, etc.)</li>
                                <li>Address, education, work history, qualifications, desired job/location</li>
                                <li>Nationality and date of birth; optional immigration-related self-declared information</li>
                                <li>Device data, access logs, IP address, cookies and identifiers</li>
                            </ul>
                            <li>Purposes of Use</li>
                            <ul>
                                <li>Job matching and communications</li>
                                <li>User management, identity verification, fraud prevention </li>
                                <li>Inquiry handling and important notices</li>
                                <li>Service improvement and usage analytics</li>
                            </ul>
                            <li>Sharing with Third Parties</li>
                            <p>
                                We may share necessary user data with employers and related parties for matching purposes. 
                                We do not provide personal data to third parties without consent unless required by law. 
                            </p>
                            <li>Retention</li>
                            <p>
                                We retain personal data only for the period necessary to achieve the purposes of use or as 
                                required by law.
                            </p>
                            <li>Requests by Users</li>
                            <p>
                                Users may request access, correction, deletion, or suspension of use of their personal data in accordance with applicable laws. 
                            </p>
                        </ol>
                        
                    </section>


                    <section style={{ marginBottom: "1.5rem" }}>
                        <strong>Security Measures</strong>
                        <br />
                        <br />
                        We implement reasonable security measures to protect personal data, including:
                        <ul>
                            <li>Access control and least-privilege management</li>
                            <li>Encrypted communications (e.g., HTTPS)</li>
                            <li>Logging, monitoring, and anti-unauthorized access measures</li>
                            <li>Vendor oversight for outsourced processing (including cloud services)</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: "1.5rem" }}>
                        <strong>Cookies</strong>
                        <br />
                        <br />
                        <p>
                            We may use cookies and similar technologies to improve usability and analyze usage. Users 
                            can disable cookies in browser settings, but some functions may not work properly. 
                        </p>
                    </section>

                    <section style={{ marginBottom: "1.5rem" }}>
                        <strong>Disclaimer & Limitation of Liability </strong>
                        <br />
                        <br />
                        <ol>
                            <li>No Warranty </li>
                            <p>
                                We do not guarantee the accuracy, completeness, legality, or timeliness of information 
                                provided on this service.
                            </p>
                            <li>Disputes and Damages</li>
                            <p>
                                We are not liable for any disputes or damages arising from the use of this service, including 
                                hiring cancellations, mismatched conditions, or labor-related issues.
                            </p>
                            <li>
                                Service Suspension 
                            </li>
                            <p>
                                We may suspend or interrupt the service due to maintenance, system failures, disasters, or 
        other unavoidable reasons. 
                            </p>
                        </ol>
                    </section>

                    
                </div>
            </div>
                
            <Footer />
        
        </>
        
    );
}
