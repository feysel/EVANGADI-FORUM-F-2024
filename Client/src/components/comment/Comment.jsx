import "./comment.css";
import { getAnswers } from "../../API/API";
import { createAnswer } from "../../API/API";
import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import UserProfile from "../userProfile/UserProfile";


function Comment() {
  //const commentAuth = useContext(AuthContext());
  //  const user_vnamu=(commentAuth(useFetchUser.username));
  const [answers, setAnswers] = useState([]);
  const token = localStorage.getItem("token");
  const { questionid, options, addCommentCount } = useOutletContext();
  //  console.log(useFetchUser.username);
  const [answer, setAnswer] = useState({
    answer: "",
  });
  const navigate = useNavigate();
  const handlePost = async (e) => {
    e.preventDefault();
    try {
      await createAnswer(answer, token, questionid);
      setAnswer({
        answer: "",
      });
      addCommentCount();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await getAnswers(token, questionid)
        .then((data) => {
          setAnswers(data);
          addCommentCount(data.length);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, [token, questionid, answer]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="comment">
      <form onSubmit={handlePost}>
        <textarea
          name="answer"
          id=""
          placeholder="Add Comment"
          value={answer.answer}
          onChange={handleChange}
        ></textarea>
        {/* <div>commenter:{user_vnamu}</div> */}
        <button type="submit">Add To Comment</button>
      </form>
      {answers.length > 0 &&
        answers?.map((data) => (
          <div className="question">
            <div className="question-header">
              <div className="question-user">
                <div className="user-profile">
                  <UserProfile username={data.username} userid={data.userid} />
                </div>
                <div className="user-name">
                  <h3>
                    by <span>{data.username}</span>
                  </h3>
                </div>
                <div className="created-at">
                  <h3>
                    {new Date(data.createdAt).toLocaleDateString(
                      "en-US",
                      options
                    )}
                  </h3>
                </div>
              </div>
            </div>
            <div className="question-body">
              <p>{data.answer}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Comment;
