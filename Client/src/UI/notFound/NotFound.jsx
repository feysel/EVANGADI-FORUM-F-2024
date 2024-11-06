import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Not Found</h1>
      <p style={styles.message}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" style={styles.link}>
        Go back to LOGIN
      </Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
  },
  heading: {
    fontSize: "2rem",
    color: "#ff4757",
  },
  message: {
    fontSize: "1.2rem",
    marginBottom: "20px",
  },
  link: {
    color: "#3498db",
    textDecoration: "underline",
  },
};

export default NotFound;
