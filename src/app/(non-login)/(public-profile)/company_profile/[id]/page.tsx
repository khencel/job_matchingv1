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
    return (
      <Container className="py-5 d-flex justify-content-center">
        <div className="text-muted">Loading...</div>
      </Container>
    );
  }

  if (!user || !company_information || !contact_person) {
    return (
      <Container className="py-5 text-center">
        <div className="text-muted">No company profile data available.</div>
      </Container>
    );
  }

  return (
    <div className="company-profile-wrapper">
      <Container className="mt-4 mb-5">
        {/* HERO CARD */}
        <Card className="company-profile-card border-0 shadow-sm rounded-4 overflow-hidden">
          {/* Banner */}
          <div
            className={`banner position-relative ${user.banner ? "" : "banner-gradient"}`}
            style={{ height: 260 }}
          >
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

            {/* overlay for readability */}
            <div
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,.15) 55%, rgba(0,0,0,0) 100%)",
              }}
            />
          </div>

          <Card.Body className="company-profile-body p-4 p-md-5">
            {/* Header row */}
            <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">
              <div className="d-flex align-items-center gap-3">
                {/* Avatar */}
                <div
                  className={`avatar ${hasAvatar ? "with-image" : ""} border bg-white shadow-sm`}
                  style={{
                    width: 88,
                    height: 88,
                    borderRadius: 20,
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: 28,
                  }}
                >
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

                {/* Company name */}
                <div>
                  <h1 className="company-name mb-1" style={{ fontSize: "1.6rem" }}>
                    {company_information.name}
                  </h1>
                  <div className="d-flex flex-wrap align-items-center gap-2">
                    <span className="text-muted small">{company_information.region}</span>

                    {company_information.company_industry?.length ? (
                      <Badge bg="light" text="dark" className="border rounded-pill px-3 py-2">
                        {company_information.company_industry.length} industries
                      </Badge>
                    ) : null}

                    {jobs ? (
                      <Badge bg="light" text="dark" className="border rounded-pill px-3 py-2">
                        {jobs.length} jobs
                      </Badge>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Quick chips */}
              <div className="d-flex flex-wrap gap-2">
                {company_information.founded ? (
                  <Badge bg="primary-subtle" text="dark" className="border rounded-pill px-3 py-2">
                    Founded: {company_information.founded}
                  </Badge>
                ) : null}

                {company_information.no_of_emp ? (
                  <Badge bg="primary-subtle" text="dark" className="border rounded-pill px-3 py-2">
                    Employees: {company_information.no_of_emp}
                  </Badge>
                ) : null}
              </div>
            </div>

            <hr className="my-4" />

            {/* Main Content */}
            <Row className="g-4">
              {/* LEFT */}
              <Col lg={8} md={12}>
                <Card className="border-0 shadow-sm rounded-4 mb-4">
                  <Card.Body className="p-4">
                    <p className="section-label mb-1">Company Overview</p>
                    <h2 className="section-title mb-3">About this company</h2>

                    <div
                      className="section-description text-muted"
                      style={{ lineHeight: 1.85 }}
                      dangerouslySetInnerHTML={{
                        __html: company_information.profile,
                      }}
                    />
                  </Card.Body>
                </Card>

                <Row className="g-3 mb-3">
                  <Col md={6}>
                    <Card className="info-card border-0 shadow-sm rounded-4 h-100">
                      <Card.Body className="p-4">
                        <p className="info-card-label text-muted mb-1">Founded</p>
                        <p className="info-card-value fw-semibold mb-0">
                          {company_information.founded}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col md={6}>
                    <Card className="info-card border-0 shadow-sm rounded-4 h-100">
                      <Card.Body className="p-4">
                        <p className="info-card-label text-muted mb-1">Employees</p>
                        <p className="info-card-value fw-semibold mb-0">
                          {company_information.no_of_emp}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Row className="g-3 mb-4">
                  <Col md={6}>
                    <Card className="info-card border-0 shadow-sm rounded-4 h-100">
                      <Card.Body className="p-4">
                        <p className="info-card-label text-muted mb-1">Phone</p>
                        <p className="info-card-value fw-semibold mb-0">
                          {company_information.phone}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col md={6}>
                    <Card className="info-card border-0 shadow-sm rounded-4 h-100">
                      <Card.Body className="p-4">
                        <p className="info-card-label text-muted mb-1">Fee</p>
                        <p className="info-card-value fw-semibold mb-0">
                          {company_information.fee}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Card className="detail-card border-0 shadow-sm rounded-4 mb-3">
                  <Card.Body className="p-4">
                    <h3 className="subsection-title mb-2">Appeal point</h3>
                    <p className="text-muted mb-0" style={{ fontSize: 14, lineHeight: 1.8 }}>
                      {company_information.appeal_point}
                    </p>
                  </Card.Body>
                </Card>

                <Card className="detail-card border-0 shadow-sm rounded-4">
                  <Card.Body className="p-4">
                    <h3 className="subsection-title mb-2">Company Address</h3>
                    <p className="text-muted mb-0" style={{ fontSize: 14, lineHeight: 1.8 }}>
                      {company_information.address}
                    </p>
                  </Card.Body>
                </Card>
              </Col>

              {/* RIGHT (Sticky Sidebar) */}
              <Col lg={4}>
                <div className="position-sticky" style={{ top: 90 }}>
                  <Card className="detail-card border-0 shadow-sm rounded-4 mb-3">
                    <Card.Body className="p-4">
                      <h3 className="detail-card-title mb-3">Contact person</h3>

                      <div className="detail-row d-flex justify-content-between gap-3 py-2 border-bottom">
                        <p className="detail-label text-muted mb-0">Name</p>
                        <p className="detail-value fw-semibold mb-0">{contact_person.name}</p>
                      </div>

                      <div className="detail-row d-flex justify-content-between gap-3 py-2 border-bottom">
                        <p className="detail-label text-muted mb-0">Department</p>
                        <p className="detail-value mb-0">{contact_person.department_name}</p>
                      </div>

                      <div className="detail-row d-flex justify-content-between gap-3 py-2 border-bottom">
                        <p className="detail-label text-muted mb-0">Email</p>
                        <p className="detail-value mb-0">{contact_person.email}</p>
                      </div>

                      <div className="detail-row d-flex justify-content-between gap-3 py-2">
                        <p className="detail-label text-muted mb-0">Phone</p>
                        <p className="detail-value mb-0">{contact_person.phone}</p>
                      </div>
                    </Card.Body>
                  </Card>

                  <Card className="detail-card border-0 shadow-sm rounded-4 mb-3">
                    <Card.Body className="p-4">
                      <h3 className="detail-card-title mb-3">Company industry</h3>
                      <div className="industry-container d-flex flex-wrap gap-2">
                        {company_information.company_industry.map((industry: any, idx: number) => (
                          <Badge
                            pill
                            bg="primary-subtle"
                            text="dark"
                            className="py-2 px-3 border"
                            key={typeof industry === "string" ? `${industry}-${idx}` : `industry-${idx}`}
                          >
                            {typeof industry === "string"
                              ? industry
                              : industry?.label ?? industry?.name ?? "Industry"}
                          </Badge>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>

                  <Card className="detail-card border-0 shadow-sm rounded-4 mb-3">
                    <Card.Body className="p-4">
                      <h3 className="detail-card-title mb-3">Branch offices</h3>
                      <ul className="branch-list mb-0 ps-3">
                        {company_information.branch_office.map((branch: any, idx: number) => (
                          <li
                            key={typeof branch === "string" ? `${branch}-${idx}` : `branch-${idx}`}
                            className="branch-item text-muted"
                            style={{ lineHeight: 1.9 }}
                          >
                            {typeof branch === "string"
                              ? branch
                              : branch?.name ?? branch?.label ?? "Branch"}
                          </li>
                        ))}
                      </ul>
                    </Card.Body>
                  </Card>

                  <Card className="perks-card border-0 shadow-sm rounded-4">
                    <Card.Body className="p-4">
                      <h3 className="detail-card-title mb-3">Perks & benefits</h3>
                      {!user.perks_benefits ? (
                        <p className="perks-empty-message text-muted mb-0">
                          No perks added yet.
                        </p>
                      ) : (
                        <ul className="branch-list mb-0 ps-3">
                          {user.perks_benefits.map((perk: any, idx: number) => (
                            <li
                              key={typeof perk === "string" ? `${perk}-${idx}` : `perk-${idx}`}
                              className="perk-item text-muted"
                              style={{ lineHeight: 1.9 }}
                            >
                              {typeof perk === "string"
                                ? perk
                                : perk?.title ?? perk?.name ?? "Perk"}
                            </li>
                          ))}
                        </ul>
                      )}
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* JOBS SECTION */}
        <Card className="jobs-section border-0 shadow-sm rounded-4 mt-4">
          <Card.Body className="p-4 p-md-5">
            <Row className="align-items-center g-2 mb-3">
              <Col md={8}>
                <p className="section-label mb-1">Posted jobs</p>
                <h2 className="section-title mb-0">Job listings</h2>
              </Col>
              <Col md={4} className="text-md-end">
                <Badge pill bg="light" text="dark" className="border px-3 py-2">
                  Total jobs: {jobs.length}
                </Badge>
              </Col>
            </Row>

            {jobs ? (
              <Row className="g-3">
                {jobs.map((job) => (
                  <Col
                    key={job.id}
                    lg={3}
                    md={4}
                    sm={6}
                    xs={12}
                    className="mb-1"
                  >
                    <div className="h-100">
                      <JobCard job={job} />
                    </div>
                  </Col>
                ))}
              </Row>
            ) : (
              <div className="jobs-placeholder text-center py-5">
                <p className="jobs-placeholder-title fw-semibold mb-1">
                  No jobs listed yet.
                </p>
                <p className="jobs-placeholder-subtitle text-muted mb-0">
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
