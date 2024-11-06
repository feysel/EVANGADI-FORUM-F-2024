import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Axios from "../../Utils/axiosConfig";
import { ClientContext } from "../../App";
import Spinner from "../../components/Spinner";
import { ToastContainer, toast } from "react-toastify";
import Avatar from "react-avatar";
import "./styles/answerUI.css";
import ClipLoader from "react-spinners/ClipLoader";

const AnswerUI = () => {
  const { questionid } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [getAns, setAnswers] = useState([]);
  const answerDom = useRef();
  const [loading, setLoading] = useState(true);
  const [newAnswer, setNewAnswer] = useState("");
  const [error, setError] = useState(null);
  const { user } = useContext(ClientContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (!Number.isInteger(Number(questionid)) || questionid <= 0) {
        alert("Invalid question ID");
        navigate("/");
        setLoading(false);
        return;
      }

      await fetchQuestion();
      console.log("Fetching answers for question ID:", questionid);

      await getAnswers();
    };
    fetchData();
  }, [questionid]);

  const fetchQuestion = async () => {
    try {
      const response = await Axios.get(`/questions/${questionid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const queData = response?.data?.data;
      setQuestion(queData);
    } catch (err) {
      console.error("Error fetching question:", err);
      setError("Failed to load question. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getAnswers = async () => {
    const response = await Axios.get(`/answers/${questionid}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const ansData = response?.data?.answers;
    setAnswers(ansData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const answerContent = answerDom.current.value.trim();
    if (!answerContent) {
      toast.error("Please fill in the answer field.");
      return;
    }

    try {
      await Axios.post(
        `/answers/questions/${questionid}/create`,
        { questionid: questionid, answer: answerContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setError(null);
      toast.success("Answer added successfully.");
      answerDom.current.value = "";
      await getAnswers();
    } catch (error) {
      toast.error("Failed to add answer. Please try again.");
    }
  };

  const handleDeleteAnswer = async (answerid) => {
    try {
      await Axios.delete(`/questions/${questionid}/answers/${answerid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnswers((prev) =>
        prev.filter((answer) => answer.answerid !== answerid)
      );
      toast.success("Answer deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete answer.");
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error text-red-500">{error}</div>;
  }

  if (!getAns) return <Spinner />;

  return (
    <div className="container my-5 " style={{ marginTop: "70px" }}>
      <div className="question-card">
        <h3>Title:- {question.title}</h3>
        <p>Question:- {question.description}</p>
      </div>
      <div className="answers-section">
        <h4>Answers From The Community</h4>
        {loading ? (
          <div className="loading-content">
            <ClipLoader loading={loading} size={50} color="#3498db" />
            <span className="loading-text">Loading...</span>
          </div>
        ) : getAns.length > 0 ? (
          <div className="answers-list">
            {getAns.map((item) => (
              <div key={item.answerid} className="answer-card">
                <div className="answer-header">
                  <Avatar name={item.username} round size="40" />
                  <span className="answer-username">{item.username}</span>
                </div>
                <p className="answer-content">{item.answer}</p>
              </div>
            ))}
          </div>
        ) : (
          <div>No answers available.</div>
        )}
      </div>

      <div className="form-section">
        <h3 className="text-center">Answer To The Top Question</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            ref={answerDom}
            className="form-control"
            placeholder="Write Your Answer..."
            rows="5"
          />
          <button type="submit" className="btn btn-primary my-3">
            Post your answer
          </button>
        </form>
        <ToastContainer
          position="bottom-right"
          autoClose={0}
          hideProgressBar={true}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
      <Link to="/forum" className="text-center">
        Go To Home
      </Link>
    </div>
  );
};

export default AnswerUI;
