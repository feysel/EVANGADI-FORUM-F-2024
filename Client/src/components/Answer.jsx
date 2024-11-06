// Answer.jsx
import React from "react";
import Avatar from "react-avatar"; // Assuming you're using this for displaying user avatars
import { ToastContainer, toast } from "react-toastify";
import Axios from "../Utils/axiosConfig";
import "./answer.css"; // Ensure this CSS file exists for styling

const Answer = ({ answer, user, onDelete }) => {
  const handleDelete = async () => {
    try {
      await Axios.delete(`/answers/${answer.answerid}`, {
        // Adjust the URL if needed
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Answer deleted successfully!");
      onDelete(answer.answerid); // Call the parent function to update the state
    } catch (error) {
      toast.error("Failed to delete answer.");
      console.error("Error deleting answer:", error);
    }
  };

  return (
    <div className="answer-card">
      <Avatar name={answer.username} round size="40" />
      <div className="answer-content">
        <p>{answer.content}</p>
        {user && user.id === answer.userid && (
          <button className="delete-button" onClick={handleDelete}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Answer;
