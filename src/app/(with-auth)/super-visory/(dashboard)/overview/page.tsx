import {
  Card,
  Col,
  Container,
  Row,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "react-bootstrap";

export default function SuperVisoryOverviewPage() {
  return (
    <Container fluid className="p-5">
      <Row>
        <Col md={3}>
          <Card className="text-white bg-primary bg-gradient border-0 shadow-md">
            <CardBody>
              <CardTitle className="fs-6 mb-4">Total Trainees</CardTitle>
              <CardSubtitle className="fs-1 fw-bolder">1000</CardSubtitle>
            </CardBody>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-white bg-primary bg-gradient border-0 shadow-md">
            <CardBody>
              <CardTitle className="fs-6 mb-4">Pending Trainees</CardTitle>
              <CardSubtitle className="fs-1 fw-bolder">1000</CardSubtitle>
            </CardBody>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-white bg-primary bg-gradient border-0 shadow-md">
            <CardBody>
              <CardTitle className="fs-6 mb-4">Ongoing Trainees</CardTitle>
              <CardSubtitle className="fs-1 fw-bolder">1000</CardSubtitle>
            </CardBody>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-white bg-primary bg-gradient border-0 shadow-md">
            <CardBody>
              <CardTitle className="fs-6 mb-4">Finished Trainees</CardTitle>
              <CardSubtitle className="fs-1 fw-bolder">1000</CardSubtitle>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
