import "./styles/EligibilityQuestionnaire.css";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@mui/material";

// import { EligibilityQuestionnaireData } from "./components/EligibilityQuestionnaireData";
import axios from "axios";

/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const EligibilityQuestionnaire = (props) => {
  const [done, setDone] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  //const [showEligible, setEligible] = useState(false);
  //const [showNotEligible, setNotEligible] = useState(false);
  const [score, setScore] = useState(0);
  const [wholeBloodScore, setWholeBloodScore] = useState(0);
  const [powerRedScore, setPowerRedScore] = useState(0);
  const [plateletScore, setPlateletScore] = useState(0);
  const [plasmaScore, setPlasmaScore] = useState(0);
  const [answerData, setAnswerData] = useState({
    types: [],
  });
  const jwtToken = localStorage.getItem("token"); // the JWT token, if we have already received one and stored it in localStorage
  console.log(`JWT token: ${jwtToken}`); // debugging
  const [response, setResponse] = useState({}); // we expect the server to send us a simple object in this case
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true); // if we already have a JWT token in local storage, set this to true, otherwise false

  const [EligibilityQuestionnaireData, setEligibilityQuestionnaireData] =
    useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [user, setUser] = useState([]);
  const [scoreDone, setScoreDone] = useState(false);

  const fetchEligibilityQuestionnaireData = () => {
    // setMessages([])
    // setLoaded(false)
    axios
      .get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/createaccount/eligibilityquestionnaire`,
        { headers: { Authorization: `JWT ${jwtToken}` } }
      )
      .then((response) => {
        // axios bundles up all response data in response.data property
        const EligibilityQuestionnaireData =
          response.data.EligibilityQuestionnaireData;
        console.log(EligibilityQuestionnaireData);
        setEligibilityQuestionnaireData(EligibilityQuestionnaireData);
        setUser(response.data.user);
      })
      .catch((err) => {
        setError(err);
        setIsLoggedIn(false);
      })
      .finally(() => {
        // the response has been received, so remove the loading icon
        setLoaded(true);
      });
  };

  // set up loading data from server when the component first loads
  useEffect(() => {
    // fetch messages this once
    fetchEligibilityQuestionnaireData();
  }, []); // p

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    // Send user data to backend here

    e.preventDefault();
    console.log(answerData);
  };

  const handleQuizAnswerOptionClick = (
    isCorrect,
    quizCurrentQuestion,
    quizQuestions
  ) => {
    if (quizCurrentQuestion === 1 && isCorrect) {
      setWholeBloodScore(wholeBloodScore + 1);
      setPlateletScore(plateletScore + 1);
      setPlasmaScore(plasmaScore + 1);
    } else if (
      (quizCurrentQuestion === 2 || quizCurrentQuestion === 3) &&
      isCorrect
    ) {
      //console.log(quizCurrentQuestion, wholeBloodScore);
      setWholeBloodScore(wholeBloodScore + 1);
    } else if (
      (quizCurrentQuestion === 4 || quizCurrentQuestion === 5) &&
      isCorrect
    ) {
      setPlasmaScore(plasmaScore + 1);
    } else if (
      (quizCurrentQuestion === 6 || quizCurrentQuestion === 7) &&
      isCorrect
    ) {
      setPlateletScore(plateletScore + 1);
    } else if (
      (quizCurrentQuestion === 8 ||
        quizCurrentQuestion === 9 ||
        quizCurrentQuestion === 10) &&
      isCorrect
    ) {
      setPowerRedScore(powerRedScore + 1);
    } else if (quizCurrentQuestion > 10 && isCorrect) {
      setScore(score + 1);
    }

    if (
      quizQuestions[quizCurrentQuestion].questionText ===
        "Do you have Heart Disease?" &&
      isCorrect === "heart"
    ) {
      setScore(score + 1);
    } else if (
      quizQuestions[quizCurrentQuestion].questionText ===
        "Do you have/had cancer?" &&
      isCorrect === "cancer"
    ) {
      setScore(score + 1);
    } else if (
      quizQuestions[quizCurrentQuestion].questionText ===
        "Do you have a bleeding Condition?" &&
      isCorrect === "bleeding"
    ) {
      setScore(score + 1);
    }

    const nextQuestion = quizCurrentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setDone(true);
    }
  };

  const scoreCheck = async () => {
    setDone(false);
    setScoreDone(true);
    console.log("scorecheck");
    const typeArr = [];
    //console.log(wholeBloodScore, powerRedScore, plasmaScore, plateletScore);
    if (wholeBloodScore === 3) {
      typeArr.push("Whole Blood");
    }

    if (powerRedScore === 3) {
      typeArr.push("Power Red");
    }

    if (plateletScore === 3) {
      typeArr.push("Platelet");
    }

    if (plasmaScore === 3) {
      typeArr.push("Plasma");
    }

    console.log(typeArr);
    console.log("score", score);

    if (score === 24 && typeArr.length > 0) {
      //setEligible(true);
      //Also add to backend

      setAnswerData({ ...answerData, types: typeArr });
      try {
        // create an object with the data we want to send to the server
        // console.log(user.id);
        const requestData = {
          eligible: typeArr,
          userID: user.id,
        };
        console.log(requestData);
        // send a POST request with the data to the server api to authenticate
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/createaccount/eligibilityquestionnaire`,
          requestData
        );
        // store the response data into the data state variable
        console.log(done, scoreDone);
        console.log(
          `Server response: ${JSON.stringify(response.data, null, 0)}`
        );
      } catch (err) {
        // request failed... user entered invalid credentials
        console.log(err);
      }
    } else {
      setAnswerData({ ...answerData, types: typeArr });
      try {
        // create an object with the data we want to send to the server
        // console.log(user.id);
        const requestData = {
          eligible: typeArr,
          userID: user.id,
        };
        console.log(requestData);
        // send a POST request with the data to the server api to authenticate
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/createaccount/eligibilityquestionnaire`,
          requestData
        );
        // store the response data into the data state variable
        console.log(done, scoreDone);
        console.log(
          `Server response: ${JSON.stringify(response.data, null, 0)}`
        );
      } catch (err) {
        // request failed... user entered invalid credentials
        console.log(err);
      }
    }
  };

  return (
    <>
      <h1>Eligibility Questionnaire</h1>
      {loaded && isLoggedIn ? (
        <>
          <div className="question-section">
            <div className="question-text">
              {EligibilityQuestionnaireData[currentQuestion].questionText}
            </div>
          </div>
          {done ? (
            <>
              {console.log("done")} {scoreCheck()}{" "}
            </>
          ) : scoreDone ? (
            <>
              {console.log("here")} {navigate("/profile")}
            </>
          ) : (
            <div className="answer-section">
              {EligibilityQuestionnaireData[currentQuestion].answerOptions.map(
                (answerOption) => (
                  <button
                    onClick={() =>
                      handleQuizAnswerOptionClick(
                        answerOption.isCorrect,
                        currentQuestion,
                        EligibilityQuestionnaireData
                      )
                    }
                  >
                    {answerOption.answerText}
                  </button>
                )
              )}
            </div>
          )}
        </>
      ) : (
        <>
          <h2>Create an account or login to access the questionnaire</h2>
          <Button component={Link} to={"/login"}>
            Login
          </Button>
          <Button component={Link} to={"/createaccount"}>
            Sign Up
          </Button>
        </>
      )}
    </>
  );
};

// make this component available to be imported into any other file
export default EligibilityQuestionnaire;
