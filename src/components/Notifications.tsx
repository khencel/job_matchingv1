import { Container, Card } from "react-bootstrap";

const Notifications = () => {
  return (
    <Container>
      {/* Map Notifications from database */}
      <Card className="border shadow-sm mb-2 bg-light">
        <Card.Body>
          <Card.Title>Notifications Title</Card.Title>
          <Card.Text className="text-truncate">
            {`Your application for the 'Sales Admin' role at Cecil grocery inc.
              didn’t meet the criteria."`}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Notifications;
