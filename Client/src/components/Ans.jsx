// Answer.jsx
import React from "react";
import Avatar from "react-avatar"; // Assuming you're using this for displaying user avatars
import { toast } from "react-toastify";
import Axios from "../Utils/axiosConfig";
import "./answer.css"; // Create this CSS file for styling

const Ans = ({ answer, user }) => {
  const handleDelete = async () => {
    try {
      await Axios.delete(`/answers/${answer.answerid}`); // Adjust the URL if needed
      toast.success("Answer deleted successfully!");
      // Add additional logic to remove the answer from the list
    } catch (error) {
      toast.error("Failed to delete answer.");
    }
  };

  return (
    <div className="answer-card">
      <Avatar name={answer.username} round size="40" />
      <p>{answer.content}</p>
      {user && user.id === answer.userid && (
        <button onClick={handleDelete}>Delete</button>
      )}
    </div>
  );
};

export default Ans;
