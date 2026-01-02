import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge, Col, Row } from "react-bootstrap";

// Status mapping object - moved outside component to avoid recreation
const STATUS_MAP = {
  applied: { label: "Applied", bg: "warning" },
  viewed: { label: "Viewed", bg: "info" },
  interview: { label: "Interview", bg: "primary" },
  accepted: { label: "Accepted", bg: "success" },
  rejected: { label: "Rejected", bg: "danger" },
} as const;

export type JobStatus = keyof typeof STATUS_MAP;

interface AppliedJobs {
  jobTitle: string;
  appliedDate: string;
  status: JobStatus;
}

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState<AppliedJobs[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // TODO: Replace this with the actual logged-in user's ID from your Redux/Context
  const CURRENT_USER_ID = "1";

  useEffect(() => {
    // Mock data Fetching
    const fetchAppliedJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(
          `/mock-api/applied-jobs?user_id=${CURRENT_USER_ID}`
        );
        setAppliedJobs(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch applied jobs:", error);
        setError("Failed to load applied jobs");
        setAppliedJobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAppliedJobs();
  }, []);

  return (
    <div className="p-5">
      {loading && (
        <p className="text-center text-muted">Loading applied jobs...</p>
      )}
      {error && <p className="text-center text-danger">{error}</p>}
      {!loading && appliedJobs.length === 0 && (
        <p className="text-center text-muted">No applied jobs yet</p>
      )}
      {/* Tags */}
      {appliedJobs.length > 0 && (
        <>
          <Row className="">
            <Col md={4} className="d-flex m-0 p-0 py-3 ps-3 border-bottom">
              <p className="fs-5 fw-semibold  p-0 m-0">Job Title</p>
            </Col>
            <Col md={4} className="d-flex m-0 p-0 py-3 border-bottom">
              <p className="fs-5 fw-semibold p-0 m-0 mx-auto">Date Applied</p>
            </Col>
            <Col md={4} className="d-flex m-0 p-0 py-3 pe-3 border-bottom">
              <p className="fs-5 fw-semibold p-0 m-0 mx-auto">Status</p>
            </Col>
          </Row>
          {/* Map Applied Jobs */}
          {appliedJobs.map((job, index) => {
            const statusInfo = STATUS_MAP[job.status];
            return (
              <Link
                href="/job-description"
                key={index}
                className="text-decoration-none text-dark"
              >
                <Row className="bg-light border rounded-3 my-2 px-3">
                  <Col md={4} className="d-flex m-0 p-0 py-3 ">
                    <p className="fs-6   p-0 m-0">{job.jobTitle}</p>
                  </Col>
                  <Col md={4} className="d-flex m-0 p-0 py-3 ">
                    <p className="fs-6  p-0 m-0 mx-auto">{job.appliedDate}</p>
                  </Col>
                  <Col md={4} className="d-flex m-0 p-0 py-3 ">
                    <p className="fs-6  p-0 m-0 mx-auto">
                      <Badge pill className="px-2" bg={statusInfo.bg}>
                        {statusInfo.label}
                      </Badge>
                    </p>
                  </Col>
                </Row>
              </Link>
            );
          })}
        </>
      )}
    </div>
  );
};

export default AppliedJobs;
