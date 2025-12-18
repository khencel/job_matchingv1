"use client";

import Footer from "@/components/Footer";
import JobPost from "@/components/JobPost";
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
} from "react-bootstrap";
import { useTranslations } from "next-intl";

const JobDescriptionPage = () => {
  const t = useTranslations("jobDescriptionPage");
  // All the data will be fetched from the database
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
              <CardTitle>Sales Admin</CardTitle>
              <CardSubtitle>Japan - Full Time</CardSubtitle>
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
            <Button className="btn-primary-custom">{t("buttons.apply")}</Button>
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
                <p>
                  We looking for Social Media Marketing expert to help manage
                  our online networks. You will be responsible for monitoring
                  our social media channels, creating content, finding effective
                  ways to engage the community and incentivize others to engage
                  on our channels.
                </p>
              </div>
              <div>
                <h4>{t("headings.responsibilities")}</h4>
                <p>
                  -Community engagement to ensure that is supported and actively
                  represented online
                </p>
                <p>
                  -Focus on social media content development and publication
                </p>
                <p>-Marketing and strategy support</p>
                <p>
                  -Stay on top of trends on social media platforms, and suggest
                  content ideas to the team
                </p>
                <p>-Engage with online communities</p>
              </div>
              <div>
                <h4>{t("headings.whoYouAre")}</h4>
                <p>
                  -You get energy from people and building the ideal work
                  environment
                </p>
                <p>
                  -You have a sense for beautiful spaces and office experiences
                </p>
                <p>
                  -You are a confident office manager, ready for added
                  responsibilities
                </p>
                <p>{"-You're detail-oriented and creative"}</p>
                <p>
                  {"-You're a growth marketer and know how to run campaigns"}
                </p>
              </div>
              <div>
                <h4>{t("headings.niceToHaves")}</h4>
                <p>-Fluent in English</p>
                <p>-Project management skills</p>
                <p>-Copy editing skills</p>
              </div>
            </div>
          </Col>
          {/* Main > Row 1 > Column 2 */}
          <Col className="p-5">
            {/* About Grid */}
            <Container>
              <h4 className="mb-4">{t("headings.aboutThisRole")}</h4>
              {/* About > Row 1 */}
              <Row>
                <Col>
                  <p className="fw-light">{t("labels.applyBefore")}</p>
                </Col>
                <Col>
                  <p className="fw-medium text-end">December 1, 2025</p>
                </Col>
              </Row>
              {/* About > Row 2 */}
              <Row>
                <Col>
                  <p className="fw-light">{t("labels.jobPostedOn")}</p>
                </Col>
                <Col>
                  <p className="fw-medium text-end">November 28, 2025</p>
                </Col>
              </Row>
              {/* About > Row 3 */}
              <Row>
                <Col>
                  <p className="fw-light">{t("labels.jobType")}</p>
                </Col>
                <Col>
                  <p className="fw-medium text-end">Full-Time</p>
                </Col>
              </Row>
              {/* About > Row 4 */}
              <Row>
                <Col>
                  <p className="fw-light">{t("labels.salary")}</p>
                </Col>
                <Col>
                  <p className="fw-medium text-end">18,000</p>
                </Col>
              </Row>
            </Container>
            <hr />
            <h4>{t("headings.categories")}</h4>
            <hr />
            <h4>{t("headings.requiredSkills")}</h4>
          </Col>
        </Row>
        {/* Main Row 2 */}
        <Row></Row>
      </Container>
      <hr />

      {/* Perks & Benefits Grid */}
      <Container fluid className="d-flex flex-column gap-5 px-5 py-3">
        <h4>{t("headings.perksAndBenefits")}</h4>
        {/* Row 1 */}
        <Row>
          <Col md={3}>
            <h5>{t("headings.fullHealthcare")}</h5>
            <p>
              We believe in thriving communities and that starts with our team
              being happy and healthy.
            </p>
          </Col>
          <Col md={3}>
            <h5>{t("headings.fullHealthcare")}</h5>
            <p>
              We believe in thriving communities and that starts with our team
              being happy and healthy.
            </p>
          </Col>
          <Col md={3}>
            <h5>{t("headings.fullHealthcare")}</h5>
            <p>
              We believe in thriving communities and that starts with our team
              being happy and healthy.
            </p>
          </Col>
          <Col md={3}>
            <h5>{t("headings.fullHealthcare")}</h5>
            <p>
              We believe in thriving communities and that starts with our team
              being happy and healthy.
            </p>
          </Col>
        </Row>
        {/* Row 2 */}
        <Row>
          <Col md={3}>
            <h5>{t("headings.fullHealthcare")}</h5>
            <p>
              We believe in thriving communities and that starts with our team
              being happy and healthy.
            </p>
          </Col>
          <Col md={3}>
            <h5>Full Healthcare</h5>
            <p>
              We believe in thriving communities and that starts with our team
              being happy and healthy.
            </p>
          </Col>
          <Col md={3}>
            <h5>{t("headings.fullHealthcare")}</h5>
            <p>
              We believe in thriving communities and that starts with our team
              being happy and healthy.
            </p>
          </Col>
        </Row>
      </Container>
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
        <h3 className="fw-semibold">{t("headings.relatedJobs")}</h3>
        <Button variant="outline-primary" className="text-decoration-none px-3">
          {t("buttons.showAllJobs")}
          <MoveRightIcon size="16px" className="text-primary ms-2" />
        </Button>
      </div>
      <JobPost />
      <Footer />
    </div>
  );
};

export default JobDescriptionPage;
