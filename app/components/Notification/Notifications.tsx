import { useState } from "react";
import Notification, { MessageType, NotificationProps } from "./Notification";

export type Notifications = {
  id: string;
  type: MessageType,
  content: JSX.Element | string
}

const NotificationCorner = (props: { notifications: Notifications[], onCloseOne: (id: string) => void }) => {
  const [notifications, setNotifications] = useState<Notifications[]>(props.notifications)

  const closeNotification = (i: number) => {

  }

  return (
    <div style={{ position: "absolute", right: 0, top: 0, padding: 20, width: "100%", maxWidth: 100, display: "flex", flexDirection: "column", gap: 10 }}>
      {notifications.map(({ content, type, id }, index) => (
        <Notification key={id} type={type} onClose={() => props.onCloseOne(id)}>
          {content}
        </Notification>
      ))}
    </div>
  )
}

export default NotificationCorner;