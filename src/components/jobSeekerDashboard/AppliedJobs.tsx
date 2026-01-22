import { formatDate } from "@/helper/formatData";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAppliedJobs } from "@/redux/slices/apply_job/appliedJobSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Col, Pagination, Row, Badge, Container } from "react-bootstrap";

// Optional: Add a simple CSS for the hover effect in your global css or styled component
// .job-card-hover { transition: all 0.2s ease-in-out; }
// .job-card-hover:hover { transform: translateY(-3px); box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important; }

const AppliedJobs = () => {
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
        {status || "Applied"}
      </Badge>
    );
  };

  return (
    <Container className="py-5">
      {/* Header Section */}
      <div className="mb-4">
        <h2 className="fw-bold text-dark">My Applications</h2>
        <p className="text-muted">Track the status of your job applications</p>
      </div>

      {loading && (
        <div className="text-center py-5 text-muted">
          Loading applications...
        </div>
      )}
      {error && <div className="text-center py-5 text-danger">{error}</div>}

      {/* Empty State */}
      {!loading && appliedJob?.results?.length === 0 && (
        <div className="text-center py-5 bg-light rounded-3">
          <h5 className="text-muted">
            You haven{"'"}t applied to any jobs yet.
          </h5>
          <Link href="/find-jobs" className="btn btn-primary mt-3">
            Find Jobs
          </Link>
        </div>
      )}

      {/* Table Header - Hidden on small screens for cleaner mobile look */}
      {appliedJob?.results?.length > 0 && (
        <Row className="d-none d-md-flex mb-3 px-3 text-uppercase fs-7 text-muted fw-bold">
          <Col md={6}>Role & Company</Col>
          <Col md={3} className="text-center">
            Date Applied
          </Col>
          <Col md={3} className="text-center">
            Status
          </Col>
        </Row>
      )}

      {/* Job Cards */}
      <div className="">
        {appliedJob?.results?.map((job) => {
          const details = job.job_post.jobPostDetails;

          return (
            <Link
              href={`/job-description/${job.id}`}
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
                    Applied On:
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
                  {getStatusBadge("Applied")}
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

export default AppliedJobs;
