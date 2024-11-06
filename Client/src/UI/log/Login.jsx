import { Link, useLocation } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState, useContext, useRef } from "react";
import { motion as m } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { loginUser, fetchUserDetails } from "../../API/API";
import { ClientContext } from "../../App";
//import handleNavigate from "./Register";
function LogIn() {
  const { user, setUser } = useContext(ClientContext); // Destructure setUser
  const [click, setClick] = useState(false);
  const [show, setShow] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const isNavigating = useRef(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    if (!isNavigating.current) {
      isNavigating.current = true;
      navigate(path);
      setTimeout(() => {
        isNavigating.current = false;
      }, 500); // Adjust as needed
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      const data = await loginUser(loginFormData);

      if (data) {
        localStorage.setItem("token", data.token); // Store token

        // Fetch user details
        const userData = await fetchUserDetails();
        setUser(userData); // Update context with user data
        navigate("/forum"); // Navigate to forum
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Login error:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log(user);
  return (
    <>
      <div className="sign-form" style={{ marginTop: "60px" }}>
        <m.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          exit={{ opacity: 0, x: -100 }}
        >
          {location.state?.message && (
            <h3 className="login-error">{location.state.message}</h3>
          )}
          <div>
            <h2>Login to your account</h2>{" "}
            {error?.message && <h3 className="login-error">{error.message}</h3>}
            <p>
              <span>Don’t have an account?</span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate("/register");
                }}
              >
                Register
              </button>
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <h3>
                  {user?.username
                    ? `Welcome, ${user.username}!`
                    : "Please log in."}
                </h3>
              </div>
              <input
                name="email"
                type="email"
                placeholder="Email address"
                value={loginFormData.email}
                onChange={handleChange}
                required
              />
              <input
                name="password"
                type={show ? "text" : "password"}
                placeholder="Password"
                value={loginFormData.password}
                onChange={handleChange}
                required
              />
              {!click ? (
                <FaRegEyeSlash
                  className="eye"
                  style={{
                    position: "absolute",
                    top: "36%",
                    right: "2%",
                    fontSize: "1.3rem",
                    cursor: "pointer",
                    opacity: "0.5",
                  }}
                  onClick={() => {
                    setClick(!click);
                    setShow(true);
                  }}
                />
              ) : (
                <MdOutlineRemoveRedEye
                  className="eye"
                  style={{
                    position: "absolute",
                    top: "36%",
                    right: "2%",
                    fontSize: "1.3rem",
                    cursor: "pointer",
                    color: "#fe8402",
                  }}
                  onClick={() => {
                    setClick(!click);
                    setShow(false);
                  }}
                />
              )}
              <div className="forgot">
                <a href="#">Forgot Password</a>
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        </m.div>
      </div>
    </>
  );
}
export default LogIn;
