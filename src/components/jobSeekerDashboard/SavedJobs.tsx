"use client"; // Required for client-side fetching

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Card,
  Container,
  Spinner,
  Alert,
  Badge,
  Button,
} from "react-bootstrap";
import axios from "axios";
import { MapPin, Building2, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

interface SavedJob {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  salaryRange: string;
  savedDate: string;
  description: string;
}

const SavedJobs = () => {
  const router = useRouter();
  const t = useTranslations("savedJobs");
  const [jobs, setJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // TODO: Replace this with the actual logged-in user's ID from your Redux/Context
  const CURRENT_USER_ID = "1";

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        setLoading(true);
        // Make sure this path matches your actual API folder structure
        const response = await axios.get(
          `/mock-api/saved-jobs?user_id=${CURRENT_USER_ID}`
        );

        // Handle the response structure { message: "...", data: [...] }
        setJobs(response.data.data);
      } catch (err) {
        console.error(err);
        setError(t("errorLoading"));
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  // 1. Loading State
  if (loading) {
    return (
      <Container className="d-flex justify-content-center py-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <Container className="py-3">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  // 3. Empty State
  if (jobs.length === 0) {
    return (
      <Container className="py-5 text-center text-muted">
        <h4>{t("noSavedJobs")}</h4>
        <p>{t("savedJobsMessage")}</p>
      </Container>
    );
  }

  // 4. Data List
  return (
    <Container fluid className="py-2">
      <h4 className="mb-4">{t("title")} ({jobs.length})</h4>

      {jobs.map((job) => (
        <Card
          key={job.id}
          className="border-0 shadow-sm mb-3 bg-white hover-shadow"
        >
          <Card.Body>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <Card.Title className="fw-bold text-primary mb-1">
                  {job.jobTitle}
                </Card.Title>

                <div className="text-muted small mb-2 d-flex gap-3">
                  <span className="d-flex align-items-center gap-1">
                    <Building2 size={14} /> {job.company}
                  </span>
                  <span className="d-flex align-items-center gap-1">
                    <MapPin size={14} /> {job.location}
                  </span>
                </div>
              </div>

              {/* Saved Date Badge */}
              <Badge
                bg="light"
                text="dark"
                className="d-flex align-items-center gap-1 border"
              >
                <Calendar size={12} /> Saved: {job.savedDate}
              </Badge>
            </div>

            <Card.Text
              className="text-secondary mt-2 text-truncate"
              style={{ maxWidth: "80%" }}
            >
              {job.description}
            </Card.Text>

            <div className="d-flex justify-content-between align-items-center mt-3 border-top pt-3">
              <span className="fw-bold text-success">{job.salaryRange}</span>
              <Button variant="outline-primary" size="sm" onClick={()=> router.push("/job-description")}>
                {t("removeSaved")}
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default SavedJobs;
