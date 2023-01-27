type ImageSize = "16" | "24" | "32" | "48" | "64" | "96" | "128";

const Image = (props: { source: string | undefined, size: ImageSize, isRounded?: Boolean }) => {
  const { source, size, isRounded } = props;
  return (
    <figure className={`image is-square is-fullwidth is-${size}x${size}`}>
      <img className={`has-ratio${isRounded && " is-rounded"}`} src={source} />
    </figure>
  )
}

export default Image;
