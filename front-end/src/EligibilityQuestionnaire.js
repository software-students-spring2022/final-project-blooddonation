import "./styles/EligibilityQuestionnaire.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Input, Stack } from "@mui/material";
import styled from "styled-components";
import { EligibilityQuestionnaireData } from "./components/EligibilityQuestionnaireData";
import { accountData } from "./components/AccountData"; //use for mocking the logged in profile page once quiz done

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
    age: 0,
    types: [],
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    // Send user data to backend here

    e.preventDefault();
    console.log(answerData);
    handleAgeClick(currentQuestion, EligibilityQuestionnaireData);
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

  const handleAgeClick = (quizCurrentQuestion, quizQuestions) => {
    //TODO: add age to new user object you will send to database.
    //When the user is created, the name and password will automatically be added and the user will be authenticated.
    // so when adding look for that user and then update the age field

    //console.log(age);

    if (answerData.age < 17) {
      accountData[0].loggedIn = true;
      navigate("/profile");
    }

    const nextQuestion = quizCurrentQuestion + 1;
    setCurrentQuestion(nextQuestion);
  };

  const scoreCheck = () => {
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

    if (score === 25 && typeArr.length > 0) {
      //setEligible(true);
      //Also add to backend
      setAnswerData({ ...answerData, types: typeArr });
    } else {
      //don't add to backend
      //setNotEligible(true);
    }

    accountData[0].loggedIn = true;
    navigate("/profile");
  };

  return (
    <>
      <h1>Eligibility Questionnaire</h1>
      <div className="question-section">
        <div className="question-text">
          {EligibilityQuestionnaireData[currentQuestion].questionText}
        </div>
      </div>

      {currentQuestion === 0 ? (
        <form onSubmit={handleSubmit}>
          <Stack alignItems="center" spacing={2}>
            <TextField
              sx={{ width: "20%", marginTop: "30px" }}
              required
              label="Age"
              name="age"
              onChange={(e) => {
                setAnswerData({ ...answerData, age: e.target.value });
              }}
            />
          </Stack>
          <Input type="submit" value="next"></Input>
          <br></br>
        </form>
      ) : done ? (
        <>{scoreCheck()}</>
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
  );
};

// make this component available to be imported into any other file
export default EligibilityQuestionnaire;
