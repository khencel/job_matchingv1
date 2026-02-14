"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import NavbarAuth from "@/app/components/NavbarAuth";
import Image from "next/image";
import {
  Button,
  CardBody,
  CardSubtitle,
  CardTitle,
  Container,
  Row,
  Col,
  Spinner,
  Card,
  Badge,
} from "react-bootstrap";
import { useTranslations } from "next-intl";
import { applyToJob, fetchJobDetails } from "@/redux/slices/jobs/jobsThunk";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams, useRouter } from "next/navigation";
import JobPost from "@/components/JobPost";
import Swal from "sweetalert2";

const JobDescriptionPage = () => {
  const t = useTranslations("jobDescriptionPage");
  const tExtended = useTranslations("jobDescriptionPageExtended");
  const router = useRouter();

  const params = useParams();
  const id = params.id;

  const dispatch = useAppDispatch();
  const { jobDetails, loading, error } = useAppSelector((state) => state.jobPost);
  const applyStatus = useAppSelector((state) => state.jobSlice.applyStatus);
  const user = useAppSelector((state) => state.authState.user);

  console.log(jobDetails);

  useEffect(() => {
    if (id) {
      // @ts-expect-error : id is string, but our thunk expects a number
      dispatch(fetchJobDetails(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return (
      <Container className="py-5 d-flex justify-content-center align-items-center">
        <Spinner animation="grow" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return <Container className="py-5 text-danger text-center">{error}</Container>;
  }

  if (!jobDetails) {
    return <Container className="py-5 text-center">{tExtended("errors.notFound")}</Container>;
  }

  const handleClickApply = () => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: tExtended("alerts.notLoggedIn.title"),
        text: tExtended("alerts.notLoggedIn.message"),
      });
      router.push("/login");
      return;
    }

    if (!user.resume) {
      Swal.fire({
        icon: "warning",
        title: tExtended("alerts.resumeRequired.title"),
        text: tExtended("alerts.resumeRequired.message"),
      });
      return;
    }

    try {
      dispatch(
        applyToJob({
          user: user.id,
          job_post: jobDetails.id,
          employer: jobDetails.user_id,
        }),
      );
      Swal.fire({
        icon: "success",
        title: tExtended("alerts.applicationSent.title"),
        text: tExtended("alerts.applicationSent.message"),
      });
    } catch (error) {
      console.log("Error applying", error);
    }
  };

  const isApplied = false; // Placeholder: Replace with actual logic to check if the user has applied

  const bannerUrl = jobDetails?.employer?.[0]?.banner
    ? `${process.env.NEXT_PUBLIC_API_CONTENT_URL}media/${jobDetails.employer[0].banner}`
    : "";

  const avatarUrl = jobDetails?.employer?.[0]?.avatar
    ? `${process.env.NEXT_PUBLIC_API_CONTENT_URL}media/${jobDetails.employer[0].avatar}`
    : "";

  return (
    <div>
      <Navbar />

      {/* HERO */}
      <div
        className="w-100 position-relative"
        style={{
          minHeight: "260px",
          backgroundImage: bannerUrl ? `url(${bannerUrl})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* overlay */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,.25) 55%, rgba(0,0,0,.0) 100%)",
          }}
        />

        {/* header card */}
        <Container className="position-relative" style={{ paddingTop: "32px", paddingBottom: "28px" }}>
          <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
            <CardBody className="p-3 p-md-4">
              <div className="d-flex flex-column flex-md-row gap-3 justify-content-between align-items-start align-items-md-center">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="rounded-4 border bg-white d-flex align-items-center justify-content-center overflow-hidden"
                    style={{ width: 84, height: 84 }}
                  >
                    {/* keep <img> since that's what you use; design only */}
                    <img
                      width={84}
                      height={84}
                      src={avatarUrl}
                      alt={tExtended("companyLogo")}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>

                  <div className="d-flex flex-column">
                    <CardTitle className="fw-bold text-dark mb-1" style={{ fontSize: "1.25rem" }}>
                      {jobDetails.title}
                    </CardTitle>

                    <CardSubtitle className="fw-normal text-muted small mb-2">
                      {jobDetails.employer[0].userDetails_emp.company_information.name}
                    </CardSubtitle>

                    <div className="d-flex flex-wrap gap-2">
                      <Badge bg="light" text="dark" className="border rounded-pill px-3 py-2">
                        {jobDetails.type_of_emp.type}
                      </Badge>
                      <Badge bg="light" text="dark" className="border rounded-pill px-3 py-2">
                        $ {jobDetails.salary.toLocaleString()}
                      </Badge>
                      <Badge bg="light" text="dark" className="border rounded-pill px-3 py-2">
                        {jobDetails.category.category}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <Button
                    onClick={() => router.push(`/company_profile/${jobDetails.user_id}`)}
                    variant="outline-secondary"
                    className="rounded-pill px-3"
                  >
                    {tExtended("buttons.visitProfile")}
                  </Button>

                  <Button
                    className="btn-primary-custom rounded-pill px-4"
                    onClick={handleClickApply}
                    disabled={applyStatus === "loading" || isApplied}
                  >
                    {applyStatus === "loading" ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : isApplied ? (
                      tExtended("buttons.applied")
                    ) : (
                      t("buttons.apply")
                    )}
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>

      {/* CONTENT */}
      <Container className="py-4 py-md-5">
        <Row className="g-4">
          {/* LEFT */}
          <Col md={8}>
            <Card className="border-0 shadow-sm rounded-4">
              <CardBody className="p-4 p-md-5">
                <div className="d-flex flex-column gap-4">
                  <section>
                    <h4 className="mb-3">{t("headings.description")}</h4>
                    <div
                      className="text-muted"
                      style={{ lineHeight: 1.8 }}
                      dangerouslySetInnerHTML={{ __html: jobDetails.job_desc }}
                    />
                  </section>

                  <hr className="my-0" />

                  <section>
                    <h4 className="mb-3">{t("headings.responsibilities")}</h4>
                    <div
                      className="text-muted"
                      style={{ lineHeight: 1.8 }}
                      dangerouslySetInnerHTML={{ __html: jobDetails.responsibility }}
                    />
                  </section>

                  <hr className="my-0" />

                  <section>
                    <h4 className="mb-3">{t("headings.whoYouAre")}</h4>
                    <div
                      className="text-muted"
                      style={{ lineHeight: 1.8 }}
                      dangerouslySetInnerHTML={{ __html: jobDetails.who_you_are }}
                    />
                  </section>

                  <hr className="my-0" />

                  <section>
                    <h4 className="mb-3">{t("headings.niceToHaves")}</h4>
                    <div
                      className="text-muted"
                      style={{ lineHeight: 1.8 }}
                      dangerouslySetInnerHTML={{ __html: jobDetails.nice_to_have }}
                    />
                  </section>
                </div>
              </CardBody>
            </Card>
          </Col>

          {/* RIGHT (sticky summary) */}
          <Col md={4}>
            <div className="position-sticky" style={{ top: "90px" }}>
              <Card className="border-0 shadow-sm rounded-4 mb-4">
                <CardBody className="p-4">
                  <h5 className="mb-3">{t("headings.aboutThisRole")}</h5>

                  <div className="d-flex justify-content-between py-2">
                    <span className="text-muted">{t("labels.jobPostedOn")}</span>
                    <span className="fw-semibold text-end">
                      {/* you can replace with actual date if you have it */}
                      —
                    </span>
                  </div>

                  <div className="d-flex justify-content-between py-2 border-top">
                    <span className="text-muted">{t("labels.jobType")}</span>
                    <span className="fw-semibold text-end">{jobDetails.type_of_emp.type}</span>
                  </div>

                  <div className="d-flex justify-content-between py-2 border-top">
                    <span className="text-muted">{t("labels.salary")}</span>
                    <span className="fw-semibold text-end">$ {jobDetails.salary.toLocaleString()}</span>
                  </div>

                  <div className="mt-3 pt-3 border-top">
                    <h6 className="mb-2">{t("headings.categories")}</h6>
                    <Badge bg="light" text="dark" className="border rounded-pill px-3 py-2">
                      {jobDetails.category.category}
                    </Badge>
                  </div>
                </CardBody>
              </Card>

              {/* CTA mini-card */}
              <Card className="border-0 shadow-sm rounded-4">
                <CardBody className="p-4">
                  <div className="d-flex flex-column gap-2">
                    <div className="fw-semibold text-dark">{tExtended("applySection.heading")}</div>
                    <div className="text-muted small">
                      {tExtended("applySection.subtitle")}
                    </div>

                    <Button
                      className="btn-primary-custom rounded-pill mt-2"
                      onClick={handleClickApply}
                      disabled={applyStatus === "loading" || isApplied}
                    >
                      {applyStatus === "loading" ? (
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                      ) : isApplied ? (
                        tExtended("buttons.applied")
                      ) : (
                        t("buttons.apply")
                      )}
                    </Button>

                    <Button
                      variant="outline-secondary"
                      className="rounded-pill"
                      onClick={() => router.push(`/company_profile/${jobDetails.user_id}`)}
                    >
                      {tExtended("buttons.visitCompanyProfile")}
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>

        {/* Perks & Benefits */}
        {jobDetails.benefits.length < 1 ? null : (
          <>
            <hr className="my-5" />
            <Card className="border-0 shadow-sm rounded-4">
              <CardBody className="p-4 p-md-5">
                <h4 className="mb-4">{t("headings.perksAndBenefits")}</h4>

                <Row className="g-3">
                  {jobDetails.benefits.map((item, idx) => (
                    <Col key={idx} md={6} lg={4}>
                      <div className="p-3 border rounded-4 h-100 bg-white">
                        <div className="fw-semibold text-dark mb-1">{item}</div>
                        <div className="text-muted small">
                          {/* placeholder description UI only; replace if you store descriptions */}
                          {tExtended("perksDescription")}
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </CardBody>
            </Card>
          </>
        )}

        <hr className="my-5" />

        {/* More Jobs */}
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
          <h3 className="fw-semibold text-dark mb-0">{tExtended("moreJobs")}</h3>
        </div>
        <JobPost />
      </Container>

      <Footer />
    </div>
  );
};

export default JobDescriptionPage;
