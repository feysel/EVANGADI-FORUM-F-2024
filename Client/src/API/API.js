import Axios from "../Utils/axiosConfig";

// Token helper function for Authorization header
const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); // Ensure you're getting the current token

  if (token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
  } else {
    console.warn("No token found. Authorization headers not set.");
    return {}; // Return empty headers if no token
  }
};

// Centralized error handling helper
const handleError = (error) => {
  const errorMsg =
    error.response?.data?.msg ||
    error.message ||
    "An error occurred. Please try again.";
  console.error("Error:", errorMsg);
  throw new Error(errorMsg);
};

// Register User
export async function registerUser(registerData) {
  try {
    const response = await Axios.post("/users/register", registerData, {
      headers: getAuthHeaders().headers,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Login User
export async function loginUser(loginFormData) {
  try {
    const response = await Axios.post("/users/login", loginFormData, {
      headers: getAuthHeaders().headers,
    });

    return response.data; // Return the data directly
  } catch (error) {
    handleError(error); // Use a centralized error handler
  }
}

// Fetch User Details
export async function fetchUserDetails() {
  try {
    const response = await Axios.get("/users/checkuser", {
      headers: getAuthHeaders().headers,
    });
    return response.data; // Return user data
  } catch (error) {
    // Use a centralized error handler to throw the error
    handleError(error); // Ensure this doesn't terminate your flow
    throw error; // Re-throw the error so it can be handled by the calling function
  }
}

// Create Question
// Create Question
export async function createQuestion(questionData) {
  try {
    const { data } = await Axios.post(
      "/questions/create",
      questionData,
      getAuthHeaders() // Make sure this returns the correct headers
    );
    console.log("Created Question:", data); // Log the response
    return data;
  } catch (error) {
    handleError(error);
  }
}

//const questionRes = await Axios.get(`/questions/${id}`);
// Get Questions

export async function getQuestionById(token) {
  // const token = localStorage.getItem("token");
  try {
    const { data } = await Axios.get(
      "/questions/:questionid/",
      getAuthHeaders(token)
    );
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error.message);
    alert(error.message);
    console.log(error.response.data);
  }
}
// export async function getQuestions(token) {
//   try {
//     const { data } = await Axios.get("/questions/all", getAuthHeaders(token));
//     console.log("Fetched Questions:", data); // Log the response

//     return data;
//   } catch (error) {
//     handleError(error);
//   }
// }
// Example usage in API call
export async function getAllQuestions(token) {
  try {
    const { data } = await Axios.get("/questions/all", getAuthHeaders(token));
    console.log("Fetched Questions:", data);

    return data;
  } catch (error) {
    handleError(error);
  }
}

// Create Answer
export async function createAnswer(answer, token, questionid) {
  try {
    const { data } = await Axios.post(
      `/answers/questions/${questionid}/create`,
      answer,
      getAuthHeaders(token)
    );
    console.log("Created Answer:", data); // Log the response
    return data;
  } catch (error) {
    handleError(error);
  }
}

// Get Answers
export async function getAnswers(token, questionid) {
  try {
    const { data } = await Axios.get(
      `/answers/${questionid}`,
      getAuthHeaders(token)
    );
    console.log("Fetched Answers:", data); // Log the data
    return data;
  } catch (error) {
    handleError(error);
  }
}

// Upload User Profile Image
// Upload User Profile Image
export async function uploadImage(formData, token) {
  try {
    const { data } = await Axios.post(
      "/images/upload",
      formData,
      getAuthHeaders(token)
    );
    return data;
  } catch (error) {
    handleError(error);
  }
}

// Get User Profile Image
export async function getUserProfileImage(token) {
  try {
    const { data } = await Axios.get("/images/profile", {
      ...getAuthHeaders(token),
      responseType: "blob", // Handle image as a blob
    });
    return data;
  } catch (error) {
    handleError(error);
  }
}

// // Get All User Images
// export async function getAllUserImages(token) {
//   try {
//     const { data } = await Axios.get("/Images/assets/", getAuthHeaders(token));
//     return data;
//   } catch (error) {
//     handleError(error);
//   }
// }

//Like a Question
export const createQuestionLike = async (token, questionid) => {
  return await Axios.post(
    `/like/questions/${questionid}/like`,
    {},
    {
      "Content-Type": "application/json",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const createQuestionDislike = async (token, questionid) => {
  return await Axios.post(
    `/like/questions/${questionid}/dislike`,
    {},
    {
      "Content-Type": "application/json",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
