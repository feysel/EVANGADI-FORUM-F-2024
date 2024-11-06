import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Ans from "./Ans";
import Spinner from "../components/Spinner";
import Axios from "../Utils/axiosConfig";
import { ClientContext } from "../App";
import { getAnswers } from "../API/API";
import "./answerQuestion.css";

function AnsQ() {
  const { questionid } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(ClientContext);
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (!Number.isInteger(Number(questionid)) || questionid <= 0) {
        toast.error("Invalid question ID");
        navigate("/");
        setLoading(false);
        return;
      }
      try {
        const questionRes = await Axios.get(`/questions/${questionid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuestion(questionRes.data);

        // const { ansData } = await Axios.get(`/answers/${questionid}`, {
        //   headers: { Authorization: `Bearer ${token}` },
        // });
        // setAnswers(ansData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data. Please try again.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [questionid, navigate, token]);

  const handlePostAnswer = async (e) => {
    e.preventDefault();
    if (!newAnswer.trim()) return;

    try {
      await Axios.post(
        `/answers/questions/${questionid}/create`,
        { answer: newAnswer },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Answer posted successfully!");
      setNewAnswer(""); // Reset the input field
      await fetchAnswers(); // Refresh answers after posting
    } catch (error) {
      console.error("Failed to post answer:", error);
      toast.error("Failed to post answer.");
    }
  };

  const fetchAnswers = async () => {
    try {
      const { ansData } = await Axios.get(`/answers/questions/${questionid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnswers(ansData);
    } catch (err) {
      console.error("Error fetching answers:", err);
      setError("Failed to load answers. Please try again later.");
    }
  };

  if (loading) return <Spinner>Loading...</Spinner>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="answer-question-container" style={{ marginTop: "260px" }}>
      <h2>{question.title}</h2>
      <p>{question.description}</p>

      <form onSubmit={handlePostAnswer}>
        <textarea
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          placeholder="Write your answer here..."
          required
        />
        <button type="submit">Post Answer</button>
      </form>

      <div className="answers-list">
        {answers.map((answer) => (
          <Ans key={answer.id} answer={answer} user={user} />
        ))}
      </div>

      <ToastContainer />
    </div>
  );
}

export default AnsQ;
