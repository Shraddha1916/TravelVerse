import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: "70px" }}>404</h1>

      <h2>Page Not Found</h2>

      <Link to="/">
        <button
          style={{
            marginTop: "20px",
            padding: "10px 25px",
            cursor: "pointer",
          }}
        >
          Go Home
        </button>
      </Link>
    </div>
  );
}

export default NotFound;