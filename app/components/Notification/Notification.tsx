import { useEffect, useRef } from "react";

export type MessageType = "success" | "info" | "warning" | "danger";

export type NotificationProps = {
  children: JSX.Element | string;
  type: MessageType;
  onClose: () => void
}

const Notification = (props: NotificationProps) => {
  const { children, type, onClose } = props;
  const timeOutRef = useRef<any>(null);

  useEffect(() => {
    timeOutRef.current = setTimeout(() => {
      onClose();
    }, 3000)

    return () => {
      clearTimeout(timeOutRef.current)
    }
  }, [])


  return (
    <div className={`notification${type && " is-" + type}`}>
      <button onClick={onClose} className="delete"></button>
      {children}
    </div>
  )
}

export default Notification;