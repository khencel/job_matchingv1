"use client";
import { formatDate } from "@/helper/formatDate";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAppliedJobs } from "@/redux/slices/jobs/jobsThunk";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Col, Pagination, Row, Badge, Container } from "react-bootstrap";
import { useTranslations } from "next-intl";

const AppliedJobsPage = () => {
  const t = useTranslations("jobSeekerAppliedJobs");
  const dispatch = useAppDispatch();
  const { loading, error, appliedJob } = useAppSelector((s) => s.appliedJob);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil((appliedJob?.count || 0) / pageSize);

  useEffect(() => {
    dispatch(fetchAppliedJobs({ page: currentPage, page_size: pageSize }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page: number) => setCurrentPage(page);

  // Helper to get status badge color
  const getStatusBadge = (status: string) => {
    // You can expand this logic based on your real status values
    return (
      <Badge bg="primary" pill className="px-3 py-2">
        {status || t("status.applied")}
      </Badge>
    );
  };

  return (
    <Container className="py-5">
      {/* Header Section */}
      <div className="mb-4">
        <h2 className="fw-bold text-dark">{t("title")}</h2>
        <p className="text-muted h-100 gap-2 d-flex align-items-center">
          {t("totalApplications")}
          <Badge bg="dark" pill>
            {appliedJob?.count}
          </Badge>
        </p>
      </div>

      {loading && (
        <div className="text-center py-5 text-muted">
          {t("states.loading")}
        </div>
      )}
      {error && <div className="text-center py-5 text-danger">{error}</div>}

      {/* Empty State */}
      {!loading && appliedJob?.results?.length === 0 && (
        <div className="text-center py-5 bg-light rounded-3">
          <h5 className="text-muted">
            {t("states.empty")}
          </h5>
          <Link href="/find-jobs" className="btn btn-primary mt-3">
            {t("states.findJobs")}
          </Link>
        </div>
      )}

      {/* Table Header - Hidden on small screens for cleaner mobile look */}
      {appliedJob?.results?.length > 0 && (
        <Row className="d-none d-md-flex mb-3 px-3 text-uppercase fs-7 text-muted fw-bold">
          <Col md={6}>{t("table.roleAndCompany")}</Col>
          <Col md={3} className="text-center">
            {t("table.dateApplied")}
          </Col>
          <Col md={3} className="text-center">
            {t("table.status")}
          </Col>
        </Row>
      )}

      {/* Job Cards */}
      <div className="job-card-hover">
        {appliedJob?.results?.map((job) => {
          const details = job.job_post.jobPostDetails;

          return (
            <Link
              href={`/job-description/${details.id}`}
              key={job.id}
              className="text-decoration-none text-dark"
            >
              <Row className="bg-white border rounded-3 p-3 mb-3 align-items-center shadow-sm job-card-hover position-relative">
                {/* 1. Job Info & Company */}
                <Col md={6} className="d-flex align-items-center gap-3">
                  {/* Logo Placeholder (Circle) */}
                  <div
                    className="d-flex align-items-center justify-content-center bg-light text-secondary rounded-3 border"
                    style={{ width: "50px", height: "50px", minWidth: "50px" }}
                  >
                    {/* Use first letter of title if no logo */}
                    <span className="fw-bold fs-5">
                      {details.title.charAt(0)}
                    </span>
                  </div>

                  <div>
                    <span className="d-flex gap-3 align-items-center">
                      <h5 className="m-0 fw-bold text-dark">{details.title}</h5>
                      {/* Job Type Tag */}
                      <span className="badge bg-light text-dark border fw-normal">
                        {details.type_of_emp.type}
                      </span>
                    </span>
                    <div className="d-flex gap-2 align-items-center mt-1">
                      {/* You assume you have company name, if not, hardcode or fetch */}
                      <span className="text-muted small">
                        {job.job_post.employerDetails?.email}
                      </span>
                      <span className="text-muted small">•</span>
                      {/* Salary Tag */}
                      <span className="text-primary small fw-semibold">
                        ${details.salary.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </Col>

                {/* 2. Date */}
                <Col md={3} className="text-md-center mt-3 mt-md-0">
                  <small className="text-muted d-block d-md-none fw-bold mb-1">
                    {t("appliedOn")}
                  </small>
                  <span className="fw-medium text-secondary">
                    {formatDate(job.created_at)}
                  </span>
                </Col>

                {/* 3. Status Badge */}
                <Col
                  md={3}
                  className="text-md-center mt-3 mt-md-0 d-flex justify-content-md-center align-items-center"
                >
                  {getStatusBadge(t("status.applied"))}
                </Col>
              </Row>
            </Link>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination>
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {[...Array(totalPages)].map((_, idx) => (
              <Pagination.Item
                key={idx + 1}
                active={idx + 1 === currentPage}
                onClick={() => handlePageChange(idx + 1)}
              >
                {idx + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      )}
    </Container>
  );
};

export default AppliedJobsPage;
