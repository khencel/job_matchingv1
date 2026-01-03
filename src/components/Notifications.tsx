import { NotificationInterface } from "@/app/mock-api/notifications/[userId]/route";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Container, Card, Spinner } from "react-bootstrap";
import Link from "next/link";

const Notifications = () => {
  const [notifs, setNotifs] = useState<NotificationInterface[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const USER_ID = "2"; // --> USER_ID will come from the authState

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`/mock-api/notifications/${USER_ID}`);
        setNotifs(res.data || []);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 404) {
            setError("User not found!");
          }
        }
        setError("Failed to load notifications");
        setNotifs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <Container>
      {loading && (
        <div className="text-center text-primary">
          <Spinner />
        </div>
      )}
      {error && <p className="text-center text-danger">{error}</p>}
      {!loading && notifs.length === 0 && (
        <p className="text-center text-muted">No notifications for today.</p>
      )}
      {notifs.map((notif, idx) => (
        <Card key={idx} className="border shadow-sm mb-2 bg-light">
          <Card.Body
            as={Link}
            href={"/job-seeker/messages"}
            className="text-decoration-none"
          >
            <Card.Title>{notif.title}</Card.Title>
            <Card.Text className="text-truncate">{notif.description}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default Notifications;
