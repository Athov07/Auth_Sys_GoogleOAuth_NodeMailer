export default function Alert({ type = "error", message }) {
  return <p className={type === "error" ? "text-error" : "text-success"}>{message}</p>;
}