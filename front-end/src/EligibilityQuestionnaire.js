import React, { useRef, useEffect, useCallback, useState } from "react";
import { useSpring, animated } from "react-spring";
import { TextField, Button, Input, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { EligibilityQuestionnaireData } from "./components/EligibilityQuestionnaireData";

const BackButton = styled.div`
  cursor: pointer;
  position: absolute;
  bottom: 20px;
  left: 20px;
  padding: 10px 50px;
  background: #141414;
  color: #fff;
  border: none;
  cursor: pointer;
  z-index: 10;
`;

/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const EligibilityQuestionnaire = (props) => {
  const [done, setDone] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizCurrentQuestion, setQuizCurrentQuestion] = useState(0);
  const [showEligible, setEligible] = useState(false);
  const [showNotEligible, setNotEligible] = useState(false);
  const [score, setScore] = useState(0);

  const handleQuizAnswerOptionClick = (
    isCorrect,
    quizCurrentQuestion,
    quizQuestions
  ) => {
    if (isCorrect) {
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
      setQuizCurrentQuestion(nextQuestion);
    } else {
      if (score === quizQuestions.length) {
        setEligible(true);
      } else {
        setDone(true);
      }
    }
  };

  const handleAgeClick = (age, quizCurrentQuestion, quizQuestions) => {
    if (age >= 17) {
      setScore(score + 1);
    }

    const nextQuestion = quizCurrentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setQuizCurrentQuestion(nextQuestion);
    } else {
      if (score === quizQuestions.length) {
        setEligible(true);
      } else {
        setDone(true);
      }
    }
  };

  const handleBackClick = (currentQuestion) => {
    const backQuestion = currentQuestion - 1;
    if (backQuestion > 0) {
      setCurrentQuestion(backQuestion);
    } else if (backQuestion === 0) {
      setCurrentQuestion(0);
    } else {
      setEligible(false);
      setNotEligible(false);
      setCurrentQuestion(0);
      setQuizCurrentQuestion(0);
      setScore(0);
      setDone(false);
    }
  };

  return (
    <>
      <h1>Eligibility Questionnaire</h1>
      <div className="question-section">
        <div className="question-text">
          {EligibilityQuestionnaireData[currentQuestion].questionText}
        </div>
      </div>
      <div className="answer-section">
        {EligibilityQuestionnaireData[currentQuestion].answerOptions.map(
          (answerOption) => (
            <button
              onClick={() =>
                handleQuizAnswerOptionClick(
                  answerOption.isCorrect,
                  currentQuestion
                )
              }
            >
              {answerOption.answerText}
            </button>
          )
        )}
      </div>

      <BackButton onClick={() => handleBackClick(currentQuestion)}>
        {" "}
        Back
      </BackButton>
    </>
  );
};

// make this component available to be imported into any other file
export default EligibilityQuestionnaire;
