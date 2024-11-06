import { Link, Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import ClipLoader from "react-spinners/ClipLoader";
import { ClientContext } from "../../App";
import "./forum.css";
import {
  getAllQuestions,
  createQuestionLike,
  createQuestionDislike,
  fetchUserDetails,
} from "../../API/API";
import UserProfile from "../../components/userProfile/UserProfile";
import Notification from "../../components/notification/Notification";

import Avatar from "react-avatar";

function Forum() {
  const [search, setSearch] = useState("");

  const [dataQue, setQueData] = useState([]);
  const [comment, setComment] = useState(null);
  //   const [like, setLike] = useState(null);
  const [commentCount, setCommentCount] = useState({});
  const [commentToggle, setCommentToggle] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const { user, setUser } = useContext(ClientContext); // Access user and loading from context
  const [userData, setUserData] = useState({}); // Local state for user data
  const token = localStorage.getItem("token");
  // const [userImage, setUserImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // New loading state
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 10; // Adjust this as needed
  const totalPages = Math.ceil(dataQue.length / questionsPerPage);
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = dataQue.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  const options = {
    minute: "numeric",
    hour: "numeric",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  // Run effect when user changes
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start loading
      try {
        const questions = await getAllQuestions(token);
        questions.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setQueData(questions);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false); // End loading
      }

      const userData = await fetchUserDetails(token);
      console.log("Login successful, token:", userData.username);
      setUser(userData); // Set user data in context
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     try {
  //       // Fetch user profile image data
  //       await getAllUserImages(token).then((data) => {
  //         setUser((prevUser) => ({ ...prevUser, imageBlob: data }));
  //       });
  //     } catch (error) {
  //       console.error(`Error fetching user profile image: ${error.message}`);
  //     }
  //   };

  //   fetchUserProfile();
  // }, [token, userImage]);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleLike = async (questionid) => {
    try {
      const response = await createQuestionLike(token, questionid);
      // Update the local state with the new like count
      setQueData((prevData) =>
        prevData.map((question) =>
          question.questionid === questionid
            ? { ...question, like_count: response?.data?.like_count }
            : question
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDislike = async (questionid) => {
    try {
      const response = await createQuestionDislike(token, questionid);
      // Update the local state with the new dislike count
      setQueData((prevData) =>
        prevData.map((question) =>
          question.questionid === questionid
            ? { ...question, dislike_count: response?.data?.dislike_count }
            : question
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleComment = (questionid) => {
    setComment(questionid);
    comment === questionid
      ? setCommentToggle(!commentToggle)
      : setCommentToggle(true);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  console.log(user.username);
  return (
    <section className="forum">
      <div className="forum-main">
        <div className="notifications">
          <Notification />
        </div>
        {isLoading ? ( // Show loading indicator while fetching user data
          <div className="loading-content">
            <ClipLoader loading={isLoading} size={50} color="#3498db" />
            <span className="loading-text">Loading user data...</span>
          </div>
        ) : (
          <h3 className="welcome">
            Welcome: {user && user.username ? user.username : "Guest"}
          </h3>
        )}
        <div className="forum-header">
          <div className="askq">
            <Link to="/askQue">Ask Question</Link>
          </div>
          <div className="search">
            <input
              type="text"
              placeholder="Search for question"
              onChange={handleSearch}
            />
          </div>
          {user && (
            <div className="user">
              <Avatar size="40" round={true} />
              <h3>{user.username}</h3>
            </div>
          )}
        </div>
        <div className="forum-body">
          <div className="forum-title">
            <h1>Questions</h1>
          </div>
          {/* Using a ternary operator */}
          {isLoading ? (
            <div className="loading-content">
              <ClipLoader loading={isLoading} size={50} color="#3498db" />
              <span className="loading-text">Loading questions...</span>
            </div>
          ) : currentQuestions.length > 0 ? (
            currentQuestions
              .filter((question) =>
                question.title.toLowerCase().includes(search)
              )
              .map((data) => {
                return (
                  <div key={data?.questionid}>
                    {data.title.toLowerCase().includes(search) && (
                      <div className="question">
                        <div className="question-header">
                          <div className="question-title">
                            <h3>{data.title}</h3>
                          </div>
                          <div className="question-user">
                            <div className="user-profile">
                              <UserProfile
                                username={data.username}
                                userid={data.userid}
                              />
                            </div>
                            <div className="user-name">
                              <h3>
                                by <span> {data.username}</span>
                              </h3>
                            </div>
                            <div className="created-at">
                              {new Date(data.created_at).toLocaleString(
                                "en-US",
                                options
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="question-body">
                          <p>{data?.description}</p>
                        </div>
                        <div className="question-reply">
                          <button onClick={() => handleLike(data?.questionid)}>
                            {console.log(data?.like_count)}
                            <AiFillLike />
                            {data?.like_count > 0 && (
                              <span style={{ margin: "0px 5px" }}>
                                {data?.like_count}
                              </span>
                            )}
                          </button>
                          <button
                            onClick={() => handleDislike(data?.questionid)}
                          >
                            {console.log(data?.dislike_count)}
                            <AiFillDislike />
                            {data.dislike_count > 0 && (
                              <span style={{ margin: "0px 5px" }}>
                                {data.dislike_count}
                              </span>
                            )}
                          </button>
                          <button
                            onClick={() => handleComment(data.questionid)}
                          >
                            {data.comment_count > 0 && (
                              <span style={{ margin: "0px 5px" }}>
                                {data.comment_count}{" "}
                              </span>
                            )}
                            ASK?
                          </button>
                          <Link to={`/questions/${data?.questionid}`}>
                            Shoot Answer
                          </Link>
                        </div>{" "}
                        {comment === data.questionid && commentToggle && (
                          <Outlet
                            context={{
                              questionid: data.questionid,
                              options: options,
                              addCommentCount: (commentCount) => {
                                setCommentCount((prev) => ({
                                  ...prev,
                                  [data.questionid]: commentCount,
                                }));
                              },
                            }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
              })
          ) : (
            <div>No questions available.</div> // Handle empty data case
          )}
          {/* // Pagination Controls */}
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Forum;
