"use client";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getPublicProfile } from "@/redux/slices/publicProfileSlice";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import Image from "next/image";
import "../job-seeker-profile.css";
import DisplayDocuments from "../../../../../components/DisplayDocuments";
import DisplayResume from "@/components/DisplayResume";

export default function PublicJobSeekerPage() {
  const t = useTranslations("jobSeekerProfile");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, user } = useAppSelector((s) => s.publicProfile);

  const params = useParams();
  const userId = params?.id as string;

  useEffect(() => {
    if (!userId) return;

    const fetchPublicProfile = async () => {
      try {
        dispatch(getPublicProfile(Number(userId)));
      } catch (error) {
        console.log("Error fetching Job Seeker Profile", error);
      }
    };

    fetchPublicProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user?.role === "employer") {
    return router.push(`/company_profile/${userId}`);
  }
  if (user?.role === "supervisory") {
    return router.push(`/supervisory_profile/${userId}`);
  }

  const jobSeekerData = user?.userDetails_job_seeker?.jobSeekerData;
  const hasAvatar = Boolean(user?.avatar);

  if (loading) {
    return <div>{t("loading")}</div>;
  }

  if (!user || !jobSeekerData) {
    return <div className="text-center">{t("noDataAvailable")}</div>;
  }

  const fullName =
    `${jobSeekerData.firstName} ${jobSeekerData.midName} ${jobSeekerData.lastName}`.trim();
  const initials =
    `${jobSeekerData.firstName?.charAt(0) || ""}${jobSeekerData.lastName?.charAt(0) || ""}`.toUpperCase();

  // Format birthdate
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Map education levels
  const educationMap: Record<string, string> = {
    highSchool: t("education.highSchool"),
    associateDegree: t("education.associateDegree"),
    bachelorDegree: t("education.bachelorDegree"),
    masterDegree: t("education.masterDegree"),
    doctorate: t("education.doctorate"),
  };

  return (
    <div className="job-seeker-profile-wrapper">
      <Container className="mt-4 mb-5 d-flex flex-column gap-4">
        <Card className="shadow-sm rounded-4 border-light-subtle">
          <Card.Body className="job-seeker-profile-body">
            <div className="avatar-header-container">
              <div className={`avatar ${hasAvatar ? "with-image" : ""}`}>
                {!user.avatar ? (
                  initials || "JS"
                ) : (
                  <Image
                    src={user.avatar}
                    alt={t("avatarAlt")}
                    fill
                    objectFit="cover"
                    className="avatar-image"
                    unoptimized
                  />
                )}
              </div>
              <div>
                <h1 className="seeker-name">{fullName}</h1>
                <p className="seeker-location">
                  {jobSeekerData.currentPlaceResidence || "-"}
                </p>
              </div>
            </div>

            <Row className="mt-5">
              <Col lg={8} md={12} className="mb-4 mb-lg-0">
                <div className="mb-4">
                  <p className="section-label">{t("sections.overview")}</p>
                  <h2 className="section-title">
                    {t("sections.personalInformation")}
                  </h2>
                </div>

                <Row className="mb-4">
                  <Col md={6} className="mb-3">
                    <Card className="info-card">
                      <Card.Body>
                        <p className="info-card-label">
                          {t("infoLabels.fullName")}
                        </p>
                        <p className="info-card-value">{fullName}</p>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Card className="info-card">
                      <Card.Body>
                        <p className="info-card-label">
                          {t("infoLabels.gender")}
                        </p>
                        <p className="info-card-value">
                          {jobSeekerData.gender
                            ? jobSeekerData.gender.charAt(0).toUpperCase() +
                              jobSeekerData.gender.slice(1)
                            : "-"}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col md={6} className="mb-3">
                    <Card className="info-card">
                      <Card.Body>
                        <p className="info-card-label">
                          {t("infoLabels.birthdate")}
                        </p>
                        <p className="info-card-value">
                          {formatDate(jobSeekerData.birthdate)}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Card className="info-card">
                      <Card.Body>
                        <p className="info-card-label">
                          {t("infoLabels.nationality")}
                        </p>
                        <p className="info-card-value">
                          {jobSeekerData.nationality || "-"}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Card className="detail-card">
                  <Card.Body>
                    <h3 className="subsection-title">
                      {t("infoLabels.contactInformation")}
                    </h3>
                    <div className="detail-row">
                      <p className="detail-label">{t("infoLabels.phone")}</p>
                      <p className="detail-value">
                        {jobSeekerData.contactNo || "-"}
                      </p>
                    </div>
                    {jobSeekerData.facebook && (
                      <div className="detail-row">
                        <p className="detail-label">
                          {t("infoLabels.facebook")}
                        </p>
                        <p className="detail-value">{jobSeekerData.facebook}</p>
                      </div>
                    )}
                  </Card.Body>
                </Card>

                <Card className="detail-card">
                  <Card.Body>
                    <h3 className="subsection-title">
                      {t("infoLabels.currentResidence")}
                    </h3>
                    <p
                      style={{ fontSize: "14px", color: "#475569", margin: 0 }}
                    >
                      {jobSeekerData.currentPlaceResidence || "-"}
                    </p>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={4}>
                <Card className="detail-card">
                  <Card.Body>
                    <h3 className="detail-card-title">
                      {t("infoLabels.professionalInformation")}
                    </h3>
                    <div className="detail-row">
                      <p className="detail-label">
                        {t("infoLabels.education")}
                      </p>
                      <p className="detail-value">
                        {educationMap[jobSeekerData.highestEducation] ||
                          jobSeekerData.highestEducation ||
                          "-"}
                      </p>
                    </div>
                    <div className="detail-row">
                      <p className="detail-label">
                        {t("infoLabels.japaneseLevel")}
                      </p>
                      <p className="detail-value">
                        {jobSeekerData.japaneseLevel || "-"}
                      </p>
                    </div>
                    <div className="detail-row">
                      <p className="detail-label">
                        {t("infoLabels.visaStatus")}
                      </p>
                      <Badge
                        bg={
                          jobSeekerData.visaStatus === "APPROVED"
                            ? "success"
                            : jobSeekerData.visaStatus === "DENIED"
                              ? "danger"
                              : "warning"
                        }
                        className="py-2 px-3"
                      >
                        {jobSeekerData.visaStatus || "-"}
                      </Badge>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        {/* Display resume */}

        <DisplayResume
          resumeUrl={`${process.env.NEXT_PUBLIC_API_BASE_URL}media/${user.resume}`}
          existingResume={user.resume}
          isPublic={true}
        />
        {/* Display Documents */}
        <DisplayDocuments
          isPublic={true}
          documents={user.documents}
          user_id={userId}
        />
      </Container>
    </div>
  );
}
