"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
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
  const router = useRouter();
  // All the data will be fetched from the database
  // 1. Get the ID from the URL (e.g., /job-description/5 -> id = "5")
  const params = useParams();
  const id = params.id;

  const dispatch = useAppDispatch();
  // Get job details from the Redux store
  const { jobDetails, loading, error } = useAppSelector(
    (state) => state.jobPost,
  );
  const applyStatus = useAppSelector((state) => state.jobSlice.applyStatus);
  const user = useAppSelector((state) => state.authState.user);

  // Fetch data when the ID changes
  useEffect(() => {
    if (id) {
      // @ts-expect-error : id is string, but our thunk expects a number
      dispatch(fetchJobDetails(id));
    }
  }, [id, dispatch]);

  // Loading State
  if (loading) {
    return (
      <Container className="m-auto">
        <Spinner animation="grow" variant="primary" />
      </Container>
    );
  }
  // Error State
  if (error) {
    return (
      <Container className="py-5 text-danger text-center">{error}</Container>
    );
  }
  // Empty/Not Found State
  if (!jobDetails) {
    return <Container className="py-5 text-center">{t("jobNotFound")}</Container>;
  }

  const handleClickApply = () => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Not Logged In",
        text: "Please log in to apply for jobs.",
      });
      router.push("/login");
      return;
    }

    if (!user.resume) {
      Swal.fire({
        icon: "warning",
        title: "Resume Required",
        text: "Please upload your resume before applying for jobs.",
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
        title: "Application Sent",
        text: "Your application has been sent successfully!",
      });
    } catch (error) {
      console.log("Error applying", error);
    }
  };

  const isApplied = false; // Placeholder: Replace with actual logic to check if the user has applied

  return (
    <div>
      <Navbar />
      {/* Title */}
      <div className="w-100 py-5 bg-body-secondary">
        <CardBody className="d-flex w-75 bg-body p-3 m-auto justify-content-between align-items-center">
          <div className="d-flex justify-content-center align-items-center gap-3">
            <Image
              width={75}
              src={"/globe.svg"}
              height={75}
              alt="Company Logo"
            ></Image>
            <div className="d-flex flex-column gap-2">
              <CardTitle className="fw-bold text-dark">
                {jobDetails.title}
              </CardTitle>
              <CardSubtitle className="fw-normal text-dark small">
                {
                  jobDetails.employer[0].userDetails_emp.company_information
                    .name
                }
              </CardSubtitle>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center gap-2">
            <Button
              onClick={() =>
                router.push(`/company_profile/${jobDetails.user_id}`)
              }
              variant="outline-secondary"
              className="rounded-pill py-1"
            >
              {t("visitProfile")}
            </Button>
            <div
              style={{ borderRight: "1px solid #ccc", height: "36px" }}
              className="mx-3"
            ></div>
            <Button
              className="btn-primary-custom"
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
                t("applied")
              ) : (
                t("buttons.apply")
              )}
            </Button>
          </div>
        </CardBody>
      </div>

      {/* Main Grid */}
      <Container fluid>
        {/* Main > Row 1: Job Description */}
        <Row>
          {/* Main > Row 1 > Column 1 */}
          <Col md={8} className="p-5">
            <div className="d-flex flex-column gap-3">
              <div>
                <h4>{t("headings.description")}</h4>
                <p dangerouslySetInnerHTML={{
                                        __html: jobDetails.job_desc
                                    }}/>
              </div>
              <div>
                <h4>{t("headings.responsibilities")}</h4>
                <span dangerouslySetInnerHTML={{
                                        __html: jobDetails.responsibility
                                    }} />
                
              </div>
              <div>
                <h4>{t("headings.whoYouAre")}</h4>
                <span dangerouslySetInnerHTML={{
                                        __html: jobDetails.who_you_are
                                    }} />
              </div>
              <div>
                <h4>{t("headings.niceToHaves")}</h4>
                <span dangerouslySetInnerHTML={{
                                        __html: jobDetails.nice_to_have
                                    }} />
              
              </div>
            </div>
          </Col>
          {/* Main > Row 1 > Column 2 */}
          <Col className="p-5">
            {/* About Grid */}
            <Container>
              <h4 className="mb-4">{t("headings.aboutThisRole")}</h4>
              <Row>
                <Col>
                  <p className="fw-light">{t("labels.jobPostedOn")}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p className="fw-light">{t("labels.jobType")}</p>
                </Col>
                <Col>
                  <p className="fw-medium text-end">
                    {jobDetails.type_of_emp.type}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p className="fw-light">{t("labels.salary")}</p>
                </Col>
                <Col>
                  <p className="fw-medium text-end">
                    $ {jobDetails.salary.toLocaleString()}
                  </p>
                </Col>
              </Row>
            </Container>
            <hr />
            <div>
              <h4>{t("headings.categories")}</h4>
              <p>{jobDetails.category.category}</p>
            </div>
            <hr />
            {/* <div>
              <h4>{t("headings.requiredSkills")}</h4>
              <p>{jobDetails.skill.skill}</p>
            </div> */}
          </Col>
        </Row>
        {/* Main Row 2 */}
        <Row></Row>
      </Container>

      {/* Perks & Benefits Grid */}
      {jobDetails.benefits.length < 1 ? (
        <></>
      ) : (
        <>
          <hr />
          {jobDetails.benefits.map((item, idx) => {
            <Container
              key={idx}
              fluid
              className="d-flex flex-column gap-5 px-5 py-3"
            >
              <h4>{t("headings.perksAndBenefits")}</h4>
              {/* Row 1 */}
              <Row>
                <Col md={3}>
                  <h5>{item}</h5>
                </Col>
              </Row>
            </Container>;
          })}
        </>
      )}
      <hr />
      <h3 className="fw-semibold text-dark ms-5 mt-5">{t("moreJobs")}</h3>
      <JobPost />
      <Footer />
    </div>
  );
};

export default JobDescriptionPage;
