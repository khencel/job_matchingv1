"use client";

import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import "../company-profile.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { getPublicProfile } from "@/redux/slices/publicProfileSlice";
import Image from "next/image";
import { fetchJobPostById } from "@/redux/slices/jobs/jobsThunk";
import JobCard from "@/components/JobCard";

const CompanyProfilePage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const jobs = useAppSelector((s) => s.jobPostById.data.results);

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        dispatch(fetchJobPostById(Number(id)));
      } catch (error) {
        console.error("Error fetching job posts by ID:", error);
      }
    };
    fetchJobs();
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      // @ts-expect-error : id is string, but our thunk expects a number
      dispatch(getPublicProfile(id));
    }
  }, [id, dispatch]);

  const { user, loading } = useAppSelector((state) => state.publicProfile);

  if (user?.role === "job_seeker") {
    return router.push(`/job_seeker_profile/${id}`);
  }
  if (user?.role === "supervisory") {
    return router.push(`/supervisory_profile/${id}`);
  }

  const company_information = user?.userDetails_emp.company_information;
  const contact_person = user?.userDetails_emp.contact_person;

  const hasAvatar = Boolean(user?.avatar);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !company_information || !contact_person) {
    return (
      <div className="text-center">No company profile data available.</div>
    );
  }

  return (
    <div className="company-profile-wrapper">
      <Container className="mt-4 mb-5">
        <Card className="company-profile-card">
          <div className={`banner ${user.banner ? "" : "banner-gradient"}`}>
            {user.banner && (
              <Image
                src={user.banner}
                alt="Company Banner"
                fill
                objectFit="cover"
                className="banner-image"
                unoptimized
              />
            )}
          </div>
          <Card.Body className="company-profile-body">
            <div className="avatar-header-container">
              <div className={`avatar ${hasAvatar ? "with-image" : ""}`}>
                {!user.avatar ? (
                  company_information.name.slice(0, 1).toUpperCase()
                ) : (
                  <Image
                    src={user.avatar}
                    alt="Company Avatar"
                    fill
                    objectFit="cover"
                    className="avatar-image"
                    unoptimized
                  />
                )}
              </div>
              <div className="">
                <h1 className="company-name">{company_information.name}</h1>
                <p className="company-region">{company_information.region}</p>
              </div>
            </div>

            <Row className="mt-5">
              <Col lg={8} md={12} className="mb-4 mb-lg-0">
                <div className="mb-4">
                  <p className="section-label">Company Overview</p>
                  <h2 className="section-title">About this company</h2>
                  <p className="section-description" 
                    dangerouslySetInnerHTML={{
                                __html: company_information.profile
                            }}
                  >
                   
                  </p>
                </div>

                <Row className="mb-4">
                  <Col md={6} className="mb-3 mb-md-0">
                    <Card className="info-card">
                      <Card.Body>
                        <p className="info-card-label">Founded</p>
                        <p className="info-card-value">
                          {company_information.founded}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6} className="mb-3 mb-md-0">
                    <Card className="info-card">
                      <Card.Body>
                        <p className="info-card-label">Employees</p>
                        <p className="info-card-value">
                          {company_information.no_of_emp}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col md={6} className="mb-3 mb-md-0">
                    <Card className="info-card">
                      <Card.Body>
                        <p className="info-card-label">Phone</p>
                        <p className="info-card-value">
                          {company_information.phone}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card className="info-card">
                      <Card.Body>
                        <p className="info-card-label">Fee</p>
                        <p className="info-card-value">
                          {company_information.fee}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Card className="detail-card">
                  <Card.Body>
                    <h3 className="subsection-title">Appeal point</h3>
                    <p
                      style={{ fontSize: "14px", color: "#475569", margin: 0 }}
                    >
                      {company_information.appeal_point}
                    </p>
                  </Card.Body>
                </Card>

                <Card className="detail-card">
                  <Card.Body>
                    <h3 className="subsection-title">Company Address</h3>
                    <p
                      style={{ fontSize: "14px", color: "#475569", margin: 0 }}
                    >
                      {company_information.address}
                    </p>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={4}>
                <Card className="detail-card">
                  <Card.Body>
                    <h3 className="detail-card-title">Contact person</h3>
                    <div className="detail-row">
                      <p className="detail-label">Name</p>
                      <p className="detail-value name">{contact_person.name}</p>
                    </div>
                    <div className="detail-row">
                      <p className="detail-label">Department</p>
                      <p className="detail-value">
                        {contact_person.department_name}
                      </p>
                    </div>
                    <div className="detail-row">
                      <p className="detail-label">Email</p>
                      <p className="detail-value">{contact_person.email}</p>
                    </div>
                    <div className="detail-row">
                      <p className="detail-label">Phone</p>
                      <p className="detail-value">{contact_person.phone}</p>
                    </div>
                  </Card.Body>
                </Card>

                <Card className="detail-card">
                  <Card.Body>
                    <h3 className="detail-card-title">Company industry</h3>
                    <div className="industry-container">
                      {company_information.company_industry.map(
                        (industry: string) => (
                          <Badge
                            pill
                            bg="primary-subtle"
                            text="dark"
                            className="py-2 px-3"
                            key={industry}
                          >
                            {industry}
                          </Badge>
                        ),
                      )}
                    </div>
                  </Card.Body>
                </Card>

                <Card className="detail-card">
                  <Card.Body>
                    <h3 className="detail-card-title">Branch offices</h3>
                    <ul className="branch-list">
                      {company_information.branch_office.map(
                        (branch: string) => (
                          <li key={branch} className="branch-item">
                            {branch}
                          </li>
                        ),
                      )}
                    </ul>
                  </Card.Body>
                </Card>

                <Card className="perks-card">
                  <Card.Body>
                    <h3 className="detail-card-title">Perks & benefits</h3>
                    {!user.perks_benefits ? (
                      <p className="perks-empty-message">No perks added yet.</p>
                    ) : (
                      <ul className="branch-list">
                        {user.perks_benefits.map((perk) => (
                          <li key={perk} className="perk-item">
                            {perk}
                          </li>
                        ))}
                      </ul>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="jobs-section">
          <Card.Body className="p-5">
            <Row className="jobs-header">
              <Col md={8}>
                <p className="section-label">Posted jobs</p>
                <h2 className="section-title">Job listings</h2>
              </Col>
            </Row>
            <Row>
              <Col className="text-md-end">
                <Badge pill className="px-3 py-2 mb-2">
                  Total jobs: {jobs.length}
                </Badge>
              </Col>
            </Row>

            {jobs ? (
              <Row>
                {jobs.map((job) => (
                  <Col
                    key={job.id}
                    lg={3}
                    md={4}
                    s={6}
                    xs={12}
                    className="mb-4"
                  >
                    <JobCard job={job} />
                  </Col>
                ))}
              </Row>
            ) : (
              <div className="jobs-placeholder">
                <p className="jobs-placeholder-title">No jobs listed yet.</p>
                <p className="jobs-placeholder-subtitle">
                  Your posted jobs will appear here once created.
                </p>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default CompanyProfilePage;
