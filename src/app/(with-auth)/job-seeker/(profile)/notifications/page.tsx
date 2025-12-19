"use client";
import Notifications from "@/components/Notifications";
import { Tab } from "react-bootstrap";

const NotificationsPage = () => {
  return (
    <Tab.Pane eventKey="notifications">
      <Notifications />
    </Tab.Pane>
  );
};
export default NotificationsPage;
