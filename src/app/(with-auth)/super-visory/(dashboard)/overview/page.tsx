"use client";

import {
  Card,
  Col,
  Container,
  Row,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "react-bootstrap";
import { useTranslations } from "next-intl";

export default function SuperVisoryOverviewPage() {
  const t = useTranslations("supervisoryOverview");
  return (
    <Container fluid className="p-5">
      <Row>
        <Col md={3}>
          <Card className="text-white bg-primary bg-gradient border-0 shadow-md">
            <CardBody>
              <CardTitle className="fs-6 mb-4">
                {t("stats.totalTrainees.label")}
              </CardTitle>
              <CardSubtitle className="fs-1 fw-bolder">1000</CardSubtitle>
            </CardBody>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-white bg-primary bg-gradient border-0 shadow-md">
            <CardBody>
              <CardTitle className="fs-6 mb-4">
                {t("stats.pendingTrainees.label")}
              </CardTitle>
              <CardSubtitle className="fs-1 fw-bolder">1000</CardSubtitle>
            </CardBody>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-white bg-primary bg-gradient border-0 shadow-md">
            <CardBody>
              <CardTitle className="fs-6 mb-4">
                {t("stats.ongoingTrainees.label")}
              </CardTitle>
              <CardSubtitle className="fs-1 fw-bolder">1000</CardSubtitle>
            </CardBody>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-white bg-primary bg-gradient border-0 shadow-md">
            <CardBody>
              <CardTitle className="fs-6 mb-4">
                {t("stats.finishedTrainees.label")}
              </CardTitle>
              <CardSubtitle className="fs-1 fw-bolder">1000</CardSubtitle>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
