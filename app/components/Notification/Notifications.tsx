import Notification, { MessageType } from "./Notification";

export type Notifications = {
  id: string;
  type: MessageType,
  content: JSX.Element | string
}

const NotificationCorner = (props: { notifications: Notifications[], onCloseOne: (id: string) => void }) => {
  return (
    <div style={{ position: "absolute", right: 0, top: 0, padding: 20, width: "auto", maxWidth: 400, display: "flex", flexDirection: "column", gap: 10 }}>
      {props.notifications.map(({ content, type, id }) => (
        <Notification key={id} type={type} onClose={() => {
          props.onCloseOne(id);
        }}>
          {content}
        </Notification>
      ))}
    </div>
  )
}

export default NotificationCorner;