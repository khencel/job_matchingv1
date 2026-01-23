"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { BookmarkIcon, MoveRightIcon, Share2Icon } from "lucide-react";
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
import { formatDate } from "@/helper/formatDate";
import { showErrorToast, showSuccessToast } from "@/app/(util)/toaster";

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
  const userId = useAppSelector((state) => state.authState.user?.id);

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
      <Container className="d-flex justify-content-center align-items-center vh-50">
        <Spinner animation="border" variant="primary" />
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
    return <Container className="py-5 text-center">Job not found.</Container>;
  }

  const handleClickApply = () => {
    if (!userId) {
      showErrorToast("Not Logged In", "Please log in to apply for jobs.");
      router.push("/login");
      return;
    }
    try {
      dispatch(applyToJob({ user: userId, job_post: jobDetails.id }));
      showSuccessToast(
        "Application Successful",
        "You have successfully applied to the job.",
      );
    } catch (error) {
      showErrorToast("Error applying to job", "Please try again later.");
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
              alt="sample pic"
            ></Image>
            <div className="d-flex flex-column gap-2">
              <CardTitle className="fw-bold text-dark">
                {jobDetails.title}
              </CardTitle>
              <CardSubtitle className="fw-normal text-dark small">
                {jobDetails.type_of_emp.type}
              </CardSubtitle>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center gap-2">
            <Button variant="ghost">
              <Share2Icon />
            </Button>
            <Button variant="ghost">
              <BookmarkIcon />
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
                "Application Sent"
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
                <p>{jobDetails.job_desc}</p>
              </div>
              <div>
                <h4>{t("headings.responsibilities")}</h4>
                {jobDetails.responsibility}
              </div>
              <div>
                <h4>{t("headings.whoYouAre")}</h4>
                {jobDetails.who_you_are}
              </div>
              <div>
                <h4>{t("headings.niceToHaves")}</h4>
                {jobDetails.nice_to_have}
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
                <Col>
                  <p className="fw-medium text-end">
                    {formatDate(jobDetails.created_at)}
                  </p>
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
            <div>
              <h4>{t("headings.requiredSkills")}</h4>
              <p>{jobDetails.skill.skill}</p>
            </div>
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
      {/* About Job Support */}
      <Container fluid className="p-5">
        <Row>
          <Col
            md={6}
            className="px-5 d-flex flex-column justify-content-center align-items-center"
          >
            <div className="d-flex flex-column align-items-start gap-3">
              <div className="d-flex justify-content-center align-items-center gap-3">
                <Image
                  width={200}
                  src={"/logo.png"}
                  height={50}
                  alt="."
                ></Image>
                <div>
                  <h3>{t("headings.jobSupport")}</h3>
                  <Button
                    variant="link"
                    className="p-0 pe-2 text-decoration-none"
                  >
                    {t("buttons.readMoreAboutUs")}
                    <MoveRightIcon size="16px" className="text-primary ms-2" />
                  </Button>
                </div>
              </div>
              <p>
                Jobsupport is a company that sda d v VWEJFWE FEVF G AG RG E RE E
                EM QE GR EM GVER G REGQR Gfggg gew gerg reg ergwrg g erge
              </p>
            </div>
          </Col>
          <Col md={6} className="p-5">
            <div className="d-flex gap-3 m-auto justify-content-center align-items-center">
              <Image
                width={250}
                src={"/img/card/card1.jpg"}
                height={250}
                alt="."
                className="border rounded-3"
              ></Image>
              <div className="d-flex flex-column gap-3">
                <Image
                  width={125}
                  src={"/img/card/card2.jpg"}
                  height={125}
                  alt="."
                  className="border rounded-3"
                ></Image>
                <Image
                  width={125}
                  src={"/img/card/card3.jpg"}
                  height={125}
                  alt="."
                  className="border rounded-3"
                ></Image>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <hr />
      <div className="d-flex px-5 mt-5 mb-3 justify-content-between">
        <h3 className="fw-semibold text-dark">More Jobs</h3>
        <Button
          variant="outline-primary"
          className="text-decoration-none px-3"
          onClick={() => router.push("/find-jobs")}
        >
          {t("buttons.showAllJobs")}
          <MoveRightIcon size="16px" className="text-primary ms-2" />
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default JobDescriptionPage;
