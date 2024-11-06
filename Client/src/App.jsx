import React, { createContext, useEffect, useState } from "react";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import Axios from "axios";
import { AnimatePresence } from "framer-motion"; // If you're using framer-motion
import { loginUser } from "./API/API"; // Adjust the import path
import Home from "./UI/home/Home";
import Login from "./UI/log/Login";
import Register from "./UI/log//Register";
import AskQue from "./UI/askQuestion/AskQue";
import Forum from "./UI/forum/Forum";
import MyTeams from "./UI/howItworks/MyTeams";
import Section from "./components/section/Section"; // Assuming this is a layout component
import AnswerUI from "./UI/answer_Questions/AnswerUI";
export const ClientContext = createContext();

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  const getUser = async () => {
    console.log(token);
    if (!token) {
      navigate("/login", {
        state: {
          message: "You Don't Have Any Authorization",
          from: location.pathname,
        },
      });
      setLoading(false); // Stop loading if no token
      return;
    }

    try {
      const { data } = await Axios.get("/users/checkuser", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token in headers if required
        },
      });
      console.log(data);
      setUser(data);
      console.log(user);
      navigate("/forum"); // Redirect to forum after successful fetch
    } catch (err) {
      console.error(err);
      navigate("/login", {
        state: {
          message: "You must log in first",
          from: location.pathname,
        },
      });
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  const handleLogin = async (loginFormData) => {
    setLoading(true);
    const data = await loginUser(loginFormData);
    if (data && data.token) {
      // If login is successful, call getUser to fetch user data
      setUser(data.user || {}); // Set user data if provided
      navigate("/forum");
    } else {
      // Handle login failure (optional)
      console.error("Login failed");
    }
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, [token]);

  return (
    <ClientContext.Provider value={{ user, setUser }}>
      <AnimatePresence mode="wait">
        <Routes key={location.key} location={location}>
          <Route path="/" element={<Home />}>
            <Route element={<Section />}>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route path="/askQue" element={<AskQue />}>
              <Route index element={<Comment />} />
            </Route>
            <Route path="/forum" element={<Forum />}>
              <Route index element={<AskQue />} />
            </Route>
            <Route path="/questions/:questionid" element={<AnswerUI />} />
            <Route path="/how" element={<MyTeams />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </ClientContext.Provider>
  );
}

export default App;
