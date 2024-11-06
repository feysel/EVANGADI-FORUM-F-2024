import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "../../Utils/axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import "./askQue.css";

function AskQue() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Auto-focus the title input on mount
    const titleInput = document.querySelector('input[name="title"]');
    if (titleInput) titleInput.focus();
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !tag.trim()) {
      toast.error("Please provide all required information.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to ask a question.");
      return;
    }

    setLoading(true);

    try {
      await Axios.post(
        `/questions/create`,
        { title, description, tag },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Question added successfully.");
      setTitle("");
      setDescription("");
      setTag("");
      navigate("/forum");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to add question. Please try again.";

      toast.error(errorMessage);
      console.error("Error adding question:", error.response || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="forum">
      <div className="forum-main">
        <div className="forum-header askQ-header">
          <div className="askQ-rule">
            <h1>Steps To Write A Good Question</h1>
            <ul>
              <li>Summarize your problem in one-line title</li>
              <li>Describe your problem in more detail</li>
              <li>Describe what you tried and what you expected to happen</li>
              <li>Review your question and post it to the site</li>
            </ul>
          </div>
          <div>
            <Link to="/forum" relative="path">
              Back
            </Link>
          </div>
        </div>
        <div className="askQ-body">
          <div className="title">
            <h2>Ask A Public Question</h2>
          </div>
          <form onSubmit={handlePost}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              maxLength={50}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              name="description"
              cols="30"
              rows="10"
              placeholder="Question Description"
              maxLength={500}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
            <input
              type="text"
              name="tag"
              placeholder="Tag (e.g. JavaScript, React)"
              maxLength={20}
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              required
            />
            <div>
              <button type="submit" className="btn" disabled={loading}>
                {loading ? "Submitting..." : "Post Your Question"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        draggable
      />
    </section>
  );
}

export default AskQue;
