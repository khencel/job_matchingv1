import Link from "next/link";
import { Badge, Col, Row } from "react-bootstrap";

// Status mapping object - moved outside component to avoid recreation
const STATUS_MAP = {
  applied: { label: "Applied", bg: "warning" },
  viewed: { label: "Viewed", bg: "info" },
  interview: { label: "Interview", bg: "primary" },
  accepted: { label: "Accepted", bg: "success" },
  rejected: { label: "Rejected", bg: "danger" },
} as const;

type JobStatus = keyof typeof STATUS_MAP;

//sample data with unique IDs
const sampleAppliedJobs = [
  {
    id: 1,
    jobTitle: "Sales Associate",
    appliedDate: "July 24, 2025",
    status: "applied" as JobStatus,
  },
  {
    id: 2,
    jobTitle: "Sales Associate",
    appliedDate: "July 24, 2025",
    status: "viewed" as JobStatus,
  },
  {
    id: 3,
    jobTitle: "Sales Associate",
    appliedDate: "July 24, 2025",
    status: "interview" as JobStatus,
  },
  {
    id: 4,
    jobTitle: "Sales Associate",
    appliedDate: "July 24, 2025",
    status: "accepted" as JobStatus,
  },
  {
    id: 5,
    jobTitle: "Sales Associate",
    appliedDate: "July 24, 2025",
    status: "rejected" as JobStatus,
  },
];

const AppliedJobs = () => {
  return (
    <div className="p-5">
      {/* Tags */}
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
      {sampleAppliedJobs.map((job) => {
        const statusInfo = STATUS_MAP[job.status];
        return (
          <Link
            href="/job-description"
            key={job.id}
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
    </div>
  );
};

export default AppliedJobs;
