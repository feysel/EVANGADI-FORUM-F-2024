import { Link, useNavigate } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState, useRef } from "react";
import { motion as m } from "framer-motion";
import { registerUser } from "../../API/API";

function Register() {
  const [click, setClick] = useState(false);
  const [show, setShow] = useState(false);
  const [register, setRegister] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    username: "",
  });
  const { email, password, firstname, lastname, username } = register;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isNavigating = useRef(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error message

    // Simple validation
    if (!email || !password || !firstname || !lastname || !username) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      setLoading(false);
      return;
    }
    console.log("Registering with data:", register); // Log the register object
    try {
      await registerUser(register);
      setRegister({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        username: "",
      }); // Reset fields
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
      console.error("Registration Error bbb:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="sign-form sign-up" style={{ marginTop: "60px" }}>
      <m.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        exit={{ opacity: 0, x: -100 }}
      >
        <div>
          <h2>Join the network</h2>
          <div style={{ marginTop: "60px", marginBottom: "-60px" }}>
            {error?.message && <h3 className="login-error">{error.message}</h3>}
          </div>
          <p>
            <span>Already have an account? </span>
            <Link to="/login"> Log In</Link>
          </p>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              name="email"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={handleChange}
            />
            <div className="names">
              <input
                name="firstname"
                type="text"
                placeholder="First Name"
                value={firstname}
                onChange={handleChange}
              />
              <input
                name="lastname"
                type="text"
                placeholder="Last Name"
                value={lastname}
                onChange={handleChange}
              />
            </div>
            <input
              name="username"
              type="text"
              placeholder="User Name"
              value={username}
              onChange={handleChange}
            />
            <input
              name="password"
              type={show ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handleChange}
            />
            {!click ? (
              <FaRegEyeSlash
                className="eye"
                onClick={() => {
                  setClick(!click);
                  setShow(true);
                }}
              />
            ) : (
              <MdOutlineRemoveRedEye
                className="eye"
                onClick={() => {
                  setClick(!click);
                  setShow(false);
                }}
              />
            )}
            <div className="agree">
              <p>
                <span>
                  I agree to the <a href="#"> Privacy Policy </a> and{" "}
                  <a href="#"> terms of service.</a>
                </span>
              </p>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Joining..." : "Agree and Join"}
            </button>
            <div className="account">
              <Link to="/login">Already have an account? </Link>
            </div>
          </form>
        </div>
      </m.div>
    </div>
  );
}

export default Register;
