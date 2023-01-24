type MessageType = "success" | "info" | "warning" | "danger";
type Size = "small" | "medium" | "large";

const MessageBox = (children: JSX.Element, title?: string, type?: MessageType, size?: Size) => {
  return (
    <article className={`message${type && " is-" + type}${size && " is-" + size}`}>
      {title && (<div className="message-header">
        <p>{title}</p>
        <button className="delete" aria-label="delete"></button>
      </div>)}
      <div className="message-body">
        {children}
      </div>
    </article>
  )
}

export default MessageBox