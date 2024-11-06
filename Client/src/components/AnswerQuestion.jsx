// AnswerQuestion.jsx
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getAnswers, createAnswer } from "../API/API"; // Make sure these functions are defined
import Axios from "../Utils/axiosConfig";
import { ClientContext } from "../App";
import Answer from "./Answer"; // Importing Answer component
import Spinner from "../components/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "./answerQuestion.css"; // Create this CSS file for styling

const AnswerQuestion = () => {
  const { questionid } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const { user } = useContext(ClientContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchQuestionAndAnswers = async () => {
      try {
        const res = await Axios.get(`/questions/${questionid}`);
        console.log(res.data)
        setQuestion(res.data);
        const answersRes = await Axios.get(`/answers/${questionid}`);
        setAnswers(answersRes);
      } catch (error) {
        toast.error("Failed to fetch question and answers.");
      }
    };

    fetchQuestionAndAnswers();
  }, [questionid]);

  const handlePostAnswer = async (e) => {
    e.preventDefault();
    if (!newAnswer.trim()) return;

    try {
      const response = await createAnswer(token, questionid, newAnswer);
      setAnswers((prev) => [...prev, response]);
      setNewAnswer("");
      toast.success("Answer posted successfully!");
    } catch (error) {
      toast.error("Failed to post answer.");
    }
  };

  if (!question) return <Spinner />;

  return (
    <div className="answer-question-container">
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
          <Answer key={answer.id} answer={answer} user={user} />
        ))}
      </div>

      <ToastContainer />
    </div>
  );
};

export default AnswerQuestion;
