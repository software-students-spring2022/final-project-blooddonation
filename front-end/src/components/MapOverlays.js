import React, { useRef, useEffect, useCallback, useState } from "react";
import { useSpring, animated } from "react-spring";
import { TextField, Button, Input, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import axios from "axios";

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 80;
  top: 0px;
  left: 0px;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 620px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 90;
  border-radius: 10px;
`;

const ModalContentCreate = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.8;
  align-items: center;
  justify-content: start;
  margin-top: 60px;
  color: #141414;
  width: 780px;
  height: 500px;

  button {
    padding: 10px 50px;
    margin-right: 10px;
    background: #141414;
    color: #fff;
    border: none;
    cursor: pointer;
  }

  button:hover {
    background: #a9a9a9;
  }

  .redirect-link:hover {
    color: #141414;
  }

  .redirect-link {
    color: #fff;
    text-decoration: none;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.8;
  align-items: center;
  justify-content: start;
  margin-top: 100px;
  color: #141414;
  width: 780px;
  height: 500px;

  .question-section {
    font-size: 30px;
  }

  .answer-section {
    font-size: 30px;
    top: 20px;
  }

  button {
    padding: 10px 50px;
    margin-right: 10px;
    background: #141414;
    color: #fff;
    border: none;
    cursor: pointer;
  }

  button:hover {
    background: #a9a9a9;
  }

  .redirect-link:hover {
    color: #141414;
  }

  .redirect-link {
    color: #fff;
    text-decoration: none;
  }
`;

const ModalContentQuizRes = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.5;
  align-items: center;
  justify-content: start;
  margin-top: 60px;
  color: #141414;
  width: 790px;
  max-height: calc(100vh - 100px);
  overflow-y: auto;

  p {
    padding-bottom: 10px;
    padding-top: 5px;
  }

  .spacing {
    padding-bottom: 10px;
    padding-top: 30px;
  }

  button {
    padding: 10px 50px;
    margin-right: 10px;
    background: #141414;
    color: #fff;
    border: none;
    cursor: pointer;
  }

  button:hover {
    background: #a9a9a9;
  }

  .redirect-link:hover {
    color: #141414;
  }

  .redirect-link {
    color: #fff;
    text-decoration: none;
  }
`;

const ModalContentNotification = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.8;
  align-items: center;
  justify-content: start;
  margin-top: 200px;
  color: #141414;
  width: 780px;
  height: 500px;

  p {
    padding-bottom: 10px;
    padding-top: 5px;
  }

  .spacing {
    padding-bottom: 10px;
    padding-top: 30px;
  }

  button {
    padding: 10px 50px;
    margin-right: 10px;
    background: #141414;
    color: #fff;
    border: none;
    cursor: pointer;
  }

  button:hover {
    background: #a9a9a9;
  }

  .redirect-link:hover {
    color: #141414;
  }

  .redirect-link {
    color: #fff;
    text-decoration: none;
  }

  .emphasis {
    color: red;
    font-weight: bold;
    text-decoration: underline;
  }

  .paragraph-link {
    color: red;
    text-decoration: underline;
  }
`;

const ModalContentSmall = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.8;
  align-items: center;
  justify-content: start;
  margin-top: 100px;
  color: #141414;
  width: 780px;
  height: 500px;

  p {
    padding-bottom: 10px;
    padding-top: 5px;
  }

  .spacing {
    padding-bottom: 10px;
    padding-top: 30px;
  }

  button {
    padding: 10px 50px;
    margin-right: 10px;
    background: #141414;
    color: #fff;
    border: none;
    cursor: pointer;
  }

  button:hover {
    background: #a9a9a9;
  }

  .redirect-link:hover {
    color: #141414;
  }

  .redirect-link {
    color: #fff;
    text-decoration: none;
  }

  .emphasis {
    color: red;
    font-weight: bold;
    text-decoration: underline;
  }

  .paragraph-link {
    color: red;
    text-decoration: underline;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

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

const Ul = styled.div`
  list-style: none;
  padding-bottom: 20px;
  padding-top: 10px;

  li:before {
    content: "• ";
    color: red;
    font-weight: bold;
    font-size: 20px;
    display: inline-block;
    width: 1em;
  }

  .linkStyle {
    color: red;
    font-weight: bold;
    text-decoration: underline;
  }
`;

export const MapOverlays = ({ showModal, setShowModal, link }) => {
  // important data
  // setting states

  const [done, setDone] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizCurrentQuestion, setQuizCurrentQuestion] = useState(0);
  const [showLogin, setLogin] = useState(false);
  const [showCreate, setCreate] = useState(false);
  const [showEligible, setEligible] = useState(false);
  const [showNotEligible, setNotEligible] = useState(false);
  const [showNotEligibleAge, setNotEligibleAge] = useState(false);
  const [score, setScore] = useState(0);
  const [showPassword, setShow] = useState(false);
  const [wholeBloodQuiz, setWholeBlood] = useState(false);
  const [powerRedQuiz, setPowerRed] = useState(false);
  const [plateletQuiz, setPlatelet] = useState(false);
  const [plasmaQuiz, setPlasma] = useState(false);
  const [bleedingCondition, setBleedingCondition] = useState(false);
  const [cancer, setCancer] = useState(false);
  const [heartDisease, setHeartDisease] = useState(false);

  const [created, setCreated] = useState(false);

  const [allQuestions, setAllQuestions] = useState({
    questions: [],
    WholeBloodQuestions: [],
    PowerRedQuestions: [],
    PlateletQuestions: [],
    PlasmaQuestions: [],
  });

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [young, setYoung] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [user, setUser] = useState([]);

  const [response, setResponse] = useState({}); // we expect the server to send us a simple object in this case

  const jwtToken =
    Object.keys(response).length !== 0
      ? response.token
      : localStorage.getItem("token"); // the JWT token, if we have already received one and stored it in localStorage
  // console.log(`JWT token: ${jwtToken}`); // debugging

  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true); // if we already have a JWT token in local storage, set this to true, otherwise false
  // console.log(isLoggedIn);
  // console.log(response);

  const fetchData = () => {
    // setMessages([])
    // console.log("fetch data");
    // setLoaded(false)

    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/finddonationsite`)
      .then((response) => {
        setAllQuestions({
          questions: response.data.questions,
          WholeBloodQuestions: response.data.WholeBloodQuestions,
          PowerRedQuestions: response.data.PowerRedQuestions,
          PlateletQuestions: response.data.PlateletQuestions,
          PlasmaQuestions: response.data.PlasmaQuestions,
        });
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        // the response has been received, so remove the loading icon
        setLoaded(true);
      });
  };

  const getLoggedInUser = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/profile`, {
        headers: { Authorization: `JWT ${jwtToken}` }, // pass the token, if any, to the server
      })
      .then((res) => {
        // setResponse(res.data); // store the response data
        setUser(res.data.user);
        setCurrentQuestion(2);
        setLogin(false);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(
          "The server rejected the request for this protected resource... we probably do not have a valid JWT token."
        );
        // update this state variable, so the component re-renders
      });
  };

  const handleStorage = (incomingResonse) => {
    if (incomingResonse.success && incomingResonse.token) {
      console.log(`User successfully logged in: ${incomingResonse.email}`);
      localStorage.setItem("token", incomingResonse.token); // store the token into localStorage
    }
    setCurrentQuestion(0);
    setLogin(false);
    setCreate(false);
    setIsLoggedIn(true);
    // setgoHandleStorage(false);
  };

  const handleStorageCreate = (incomingResonse) => {
    if (incomingResonse.success && incomingResonse.token) {
      console.log(`User successfully logged in: ${incomingResonse.email}`);
      localStorage.setItem("token", incomingResonse.token); // store the token into localStorage
    }
    setCurrentQuestion(2);
    setLogin(false);
    setCreate(false);
    // setIsLoggedIn(true);
    // setgoHandleStorage(false);
  };

  const getCreatedUser = () => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/createaccount/eligibilityquestionnaire`,
        {
          headers: { Authorization: `JWT ${jwtToken}` }, // pass the token, if any, to the server
        }
      )
      .then((res) => {
        // setResponse(res.data); // store the response data
        setUser(res.data.user);
        addType(res.data.user);
        setCreated(false);
      })
      .catch((err) => {
        console.log(
          "The server rejected the request for this protected resource... we probably do not have a valid JWT token."
        );
        // update this state variable, so the component re-renders
      });
  };

  //Handling Button Pushes
  const handleLoginSubmit = async (e) => {
    // Send user data to backend here
    e.preventDefault();

    try {
      // create an object with the data we want to send to the server
      const requestData = {
        email: e.target.email.value, // gets the value of the field in the submitted form with name='username'
        password: e.target.password.value, // gets the value of the field in the submitted form with name='password',
      };
      // send a POST request with the data to the server api to authenticate
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/login`,
        requestData
      );
      // store the response data into the data state variable
      console.log(`Server response: ${JSON.stringify(response.data, null, 0)}`);
      setResponse(response.data);
      // setgoHandleStorage(true);
    } catch (err) {
      // request failed... user entered invalid credentials
      console.log(err);
      setErrorMessage("You entered invalid credentials.");
      // setErrorMessage("You entered invalid credentials.");
    }
  };

  const handleRegister = async (e) => {
    // Send user data to backend here
    e.preventDefault();
    // prevent the HTML form from actually submitting... we use React's javascript code instead
    e.preventDefault();

    try {
      // create an object with the data we want to send to the server
      if (isNaN(e.target.age.value)) {
        setErrorMessage("Please enter a valid age");
      } else {
        if (e.target.age.value < 17) {
          setCreate(false);
          setNotEligibleAge(true);
        } else {
          const requestData = {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            password: e.target.password.value,
            age: e.target.age.value,
            // gets the value of the field in the submitted form with name='password',
          };
          // send a POST request with the data to the server api to authenticate
          const response = await axios.post(
            `${process.env.REACT_APP_SERVER_HOSTNAME}/createaccount`,
            requestData
          );
          // store the response data into the data state variable
          console.log(
            `Server response: ${JSON.stringify(response.data, null, 0)}`
          );
          setResponse(response.data);
          setCreated(true);
        }
      }
    } catch (err) {
      // request failed... user entered invalid credentials
      console.log(err);

      setErrorMessage("An account with that email already exists");
    }
  };

  const addType = async (incomingResonse) => {
    try {
      // create an object with the data we want to send to the server
      // console.log(user.id);

      const type = [];
      if (wholeBloodQuiz) {
        type.push("Whole Blood");
      } else if (powerRedQuiz) {
        type.push("Power Red");
      } else if (plateletQuiz) {
        type.push("Platelet");
      } else if (plasmaQuiz) {
        type.push("Power Red");
      }
      const requestData = {
        eligible: type,
        userID: incomingResonse.id,
      };

      // send a POST request with the data to the server api to authenticate
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/createaccount/eligibilityquestionnaire`,
        requestData
      );
      // store the response data into the data state variable
      console.log(`Server response: ${JSON.stringify(response.data, null, 0)}`);
    } catch (err) {
      // request failed... user entered invalid credentials
      console.log(err);
    }
  };

  const handleAnswerOptionClick = (isCorrect, currentQuestion) => {
    if (
      isCorrect === "t" &&
      allQuestions.questions[currentQuestion].questionText ===
        "Do you have an Account?"
    ) {
      setLogin(true);
    } else if (
      isCorrect === "t" &&
      allQuestions.questions[currentQuestion].questionText ===
        "Would you like to create an account?"
    ) {
      setCreate(true);
    } else if (
      isCorrect === "Whole" &&
      allQuestions.questions[currentQuestion].questionText ===
        "What type of donation would you like to make?" &&
      allQuestions.questions[currentQuestion].answerOptions.filter(
        (textObj) => textObj.answerText === "Whole Blood"
      )
    ) {
      if (isLoggedIn) {
        if (user.eligible.includes("Whole Blood")) {
          return setEligible(true);
        } else {
          return setNotEligible(true);
        }
      } else {
        setWholeBlood(true);
      }
    } else if (
      isCorrect === "Power" &&
      allQuestions.questions[currentQuestion].questionText ===
        "What type of donation would you like to make?" &&
      allQuestions.questions[currentQuestion].answerOptions.filter(
        (textObj) => textObj.answerText === "Power Red (Double Red Cell)"
      )
    ) {
      if (isLoggedIn) {
        if (user.eligible.includes("Power Red")) {
          return setEligible(true);
        } else {
          return setNotEligible(true);
        }
      } else {
        setPowerRed(true);
      }
    } else if (
      isCorrect === "Platelet" &&
      allQuestions.questions[currentQuestion].questionText ===
        "What type of donation would you like to make?" &&
      allQuestions.questions[currentQuestion].answerOptions.filter(
        (textObj) => textObj.answerText === "Platelet"
      )
    ) {
      if (isLoggedIn) {
        if (user.eligible.includes("Platelet")) {
          return setEligible(true);
        } else {
          return setNotEligible(true);
        }
      } else {
        setPlatelet(true);
      }
    } else if (
      isCorrect === "Plasma" &&
      allQuestions.questions[currentQuestion].questionText ===
        "What type of donation would you like to make?" &&
      allQuestions.questions[currentQuestion].answerOptions.filter(
        (textObj) => textObj.answerText === "Plasma"
      )
    ) {
      if (isLoggedIn) {
        if (user.eligible.includes("Plasma")) {
          return setEligible(true);
        } else {
          return setNotEligible(true);
        }
      } else {
        setPlasma(true);
      }
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < allQuestions.questions.length) {
      if (showLogin === false && showCreate === false) {
        setCurrentQuestion(nextQuestion);
      } else if (showLogin === true) {
        setLogin(true);
      } else if (wholeBloodQuiz === true) {
        setWholeBlood(true);
      } else if (powerRedQuiz === true) {
        setPowerRed(true);
      } else if (plateletQuiz === true) {
        setPlatelet(true);
      } else if (plasmaQuiz === true) {
        setPlasma(true);
      }
    }
  };

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
      setHeartDisease(true);
      setScore(score + 1);
    } else if (
      quizQuestions[quizCurrentQuestion].questionText ===
        "Do you have/had cancer?" &&
      isCorrect === "cancer"
    ) {
      setCancer(true);
      setScore(score + 1);
    } else if (
      quizQuestions[quizCurrentQuestion].questionText ===
        "Do you have a bleeding Condition?" &&
      isCorrect === "bleeding"
    ) {
      setBleedingCondition(true);
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
      setErrorMessage("");
    } else if (backQuestion === 0) {
      setCurrentQuestion(0);
      setErrorMessage("");
    } else {
      setShowModal(false);
      setLogin(false);
      setCreate(false);
      setEligible(false);
      setNotEligible(false);
      setNotEligibleAge(false);
      setWholeBlood(false);
      setPowerRed(false);
      setPlatelet(false);
      setPlasma(false);
      setCurrentQuestion(0);
      setQuizCurrentQuestion(0);
      setScore(0);
      setBleedingCondition(false);
      setCancer(false);
      setHeartDisease(false);
      setDone(false);
      setErrorMessage("");
    }
  };

  const handleLoginBackClick = (currentQuestion) => {
    setCurrentQuestion(0);
    setErrorMessage("");
    setLogin(false);
  };

  const handleCreateBackClick = (currentQuestion) => {
    setCurrentQuestion(1);
    setErrorMessage("");
    setCreate(false);
  };

  //handling close and open
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
  });

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
      setLogin(false);
      setCreate(false);
      setEligible(false);
      setNotEligible(false);
      setNotEligibleAge(false);
      setWholeBlood(false);
      setPowerRed(false);
      setPlatelet(false);
      setPlasma(false);
      setErrorMessage("");

      setCurrentQuestion(0);
      setQuizCurrentQuestion(0);
      setScore(0);
      setBleedingCondition(false);
      setCancer(false);
      setHeartDisease(false);
      setDone(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        setLogin(false);
        setCreate(false);
        setEligible(false);
        setNotEligible(false);
        setNotEligibleAge(false);
        setWholeBlood(false);
        setPowerRed(false);
        setPlatelet(false);
        setPlasma(false);
        setErrorMessage("");

        setCurrentQuestion(0);
        setScore(0);
        setBleedingCondition(false);
        setCancer(false);
        setHeartDisease(false);
        setDone(false);
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  //overlay content
  return (
    <>
      {loaded ? (
        <>
          {showModal ? (
            <Background onClick={closeModal} ref={modalRef}>
              <animated.div style={animation}>
                <ModalWrapper showModal={showModal}>
                  {isLoggedIn && currentQuestion === 0 ? (
                    <>{getLoggedInUser()}</>
                  ) : Object.keys(response).length !== 0 &&
                    currentQuestion === 1 ? (
                    <>{handleStorage(response)}</>
                  ) : Object.keys(response).length !== 0 && showCreate ? (
                    <>{handleStorageCreate(response)}</>
                  ) : created && showEligible ? (
                    <>{getCreatedUser()}</>
                  ) : showLogin ? (
                    <>
                      <ModalContent>
                        <h1>Login</h1>
                        {errorMessage ? (
                          <p className="error">{errorMessage}</p>
                        ) : (
                          ""
                        )}
                        <form onSubmit={handleLoginSubmit}>
                          <Stack alignItems="center" spacing={2}>
                            <TextField
                              sx={{ width: "100%" }}
                              required
                              label="Email"
                              name="email"
                            />
                            <TextField
                              sx={{ width: "100%" }}
                              type={showPassword ? "text" : "password"}
                              required
                              label="Password"
                              name="password"
                            />
                          </Stack>
                          <Input type="submit" value="Submit">
                            LogIn
                          </Input>
                          <br></br>

                          <h1>Don't Have an Account?</h1>

                          <Button
                            onClick={() => {
                              setLogin(false);
                              setCreate(true);
                            }}
                          >
                            Create Account
                          </Button>
                        </form>
                      </ModalContent>
                      <BackButton
                        onClick={() => handleLoginBackClick(currentQuestion)}
                      >
                        {" "}
                        Back{" "}
                      </BackButton>
                    </>
                  ) : showCreate ? (
                    <>
                      <ModalContentCreate>
                        <h1>Create Account</h1>
                        {errorMessage ? (
                          <p className="error">{errorMessage}</p>
                        ) : (
                          ""
                        )}

                        <form onSubmit={handleRegister}>
                          <Stack alignItems="center" spacing={2}>
                            <TextField
                              sx={{ width: "100%" }}
                              required
                              label="First Name"
                              name="firstName"
                            />

                            <TextField
                              sx={{ width: "100%" }}
                              required
                              label="Last Name"
                              name="lastName"
                            />
                            <TextField
                              sx={{ width: "100%" }}
                              required
                              label="Age"
                              name="age"
                            />
                            <TextField
                              sx={{ width: "100%" }}
                              required
                              label="Email"
                              name="email"
                            />
                            <TextField
                              sx={{ width: "100%" }}
                              type={showPassword ? "text" : "password"}
                              required
                              label="Password"
                              name="password"
                            />
                          </Stack>
                          <Input type="submit" value="Submit">
                            Register
                          </Input>
                          <br></br>

                          <h1>Already Have an Account?</h1>

                          <Button
                            onClick={() => {
                              setLogin(true);
                              setCreate(false);
                            }}
                          >
                            Login
                          </Button>
                        </form>
                      </ModalContentCreate>
                      <BackButton
                        onClick={() => handleCreateBackClick(currentQuestion)}
                      >
                        {" "}
                        Back
                      </BackButton>
                    </>
                  ) : showEligible ? (
                    <>
                      {heartDisease &&
                      cancer === false &&
                      bleedingCondition === false ? (
                        <ModalContentQuizRes>
                          <h1>You may be eligible! please read below</h1>
                          <p>
                            {" "}
                            You indicated that you have heart disease. In
                            general, as long as you have been medically
                            evaluated and treated, have have had no heart
                            related symptoms such as chest pain and have no
                            limitations or restrictions on your normal daily
                            activities. Additionally:{" "}
                          </p>
                          <Ul>
                            <li>
                              Wait at least 6 months following an episode of
                              angina.
                            </li>
                            <li>
                              Wait at least 6 months following a heart attack.
                            </li>
                            <li>
                              Wait at least 6 months after bypass surgery or
                              angioplasty.
                            </li>
                            <li>
                              Wait at least 6 months after a change in your
                              heart condition that resulted in a change to your
                              medications.
                            </li>
                          </Ul>
                          <p>
                            If you have a pacemaker, you ARE eligible to donate
                            as long as your pulse is between 50 and 100 beats
                            per minute and you meet the other heart disease
                            criteria. You should discuss your situation with
                            your personal healthcare provider and those at the
                            donation site .
                          </p>
                          <div className="spacing">
                            <Button>
                              <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="redirect-link"
                              >
                                Click Here to make an appointment!
                              </a>
                            </Button>
                          </div>
                          <Button>
                            <NavLink
                              to="/FAQ/otherwaystohelp"
                              className="redirect-link"
                            >
                              Not Eligible? Find other ways to help!
                            </NavLink>
                          </Button>
                        </ModalContentQuizRes>
                      ) : cancer &&
                        heartDisease === false &&
                        bleedingCondition === false ? (
                        <ModalContentSmall>
                          <h1>You may be eligible! please read below</h1>
                          <p>
                            {" "}
                            You indicated that you have or haf cancer. Please
                            know that eligibility depends on the type of cancer
                            and treatment history. If you had leukemia or
                            lymphoma, you are NOT eligible to donate. If you had
                            other types of cancer you ARE eligible to donate, if
                            the cancer has been treated successfully and it has
                            been more than 12 months since treatment was
                            completed and there has been no cancer recurrence in
                            this time. Lower risk in-situ cancers including
                            squamous or basal cell cancers of the skin that have
                            been completely removed and healed do not require a
                            12-month waiting period. You should discuss your
                            situation with those at your donation site
                          </p>
                          <div className="spacing">
                            <Button>
                              <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="redirect-link"
                              >
                                Click Here to make an appointment!
                              </a>
                            </Button>
                          </div>
                          <Button>
                            <NavLink
                              to="/FAQ/otherwaystohelp"
                              className="redirect-link"
                            >
                              Not Eligible? Find other ways to help!
                            </NavLink>
                          </Button>
                        </ModalContentSmall>
                      ) : bleedingCondition &&
                        cancer === false &&
                        heartDisease === false ? (
                        <ModalContentQuizRes>
                          <h1>You may be eligible! please read below</h1>
                          <p>
                            {" "}
                            You indicated that you have a bleeding condition.
                            You will be asked additional questions at the site.
                            If your blood clots abnormally, you should NOT
                            donate because you may have excessive bleeding where
                            the needle is placed. You should NOT donate if you
                            are taking any "blood thinner" such as:
                          </p>
                          <Ul>
                            <li>Atrixa (fondaparinux)</li>
                            <li>Heparin</li>
                            <li>Jantoven (warfarin)</li>
                            <li>Lovenox (enoxaparin)</li>
                            <li>Pradaxa (dabigatran)</li>
                            <li>Savaysa (edoxaban)</li>
                            <li>Warfilone (warfarin)</li>
                            <li>Coumadin (warfarin)</li>
                            <li>Eliquis (apixaban)</li>
                            <li>Fragmin (dalteparin)</li>
                            <li>Xarelto (rivaroxaban)</li>
                          </Ul>
                          <p>
                            {" "}
                            If you are on aspirin, you ARE eligible donate whole
                            blood. However, you must be off of aspirin for at
                            least 2 full days in order to donate platelets by
                            apheresis.
                          </p>
                          <div className="spacing">
                            <Button>
                              <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="redirect-link"
                              >
                                Click Here to make an appointment!
                              </a>
                            </Button>
                          </div>
                          <Button>
                            <NavLink
                              to="/FAQ/otherwaystohelp"
                              className="redirect-link"
                            >
                              Not Eligible? Find other ways to help!
                            </NavLink>
                          </Button>
                        </ModalContentQuizRes>
                      ) : cancer &&
                        heartDisease &&
                        bleedingCondition === false ? (
                        <ModalContentQuizRes>
                          <h1>You may be eligible! please read below</h1>
                          <p>
                            {" "}
                            You indicated that you have or haf cancer. Please
                            know that eligibility depends on the type of cancer
                            and treatment history. If you had leukemia or
                            lymphoma, you are NOT eligible to donate. If you had
                            other types of cancer you ARE eligible to donate, if
                            the cancer has been treated successfully and it has
                            been more than 12 months since treatment was
                            completed and there has been no cancer recurrence in
                            this time. Lower risk in-situ cancers including
                            squamous or basal cell cancers of the skin that have
                            been completely removed and healed do not require a
                            12-month waiting period. You should discuss your
                            situation with those at your donation site
                          </p>
                          <br></br>
                          <p>
                            {" "}
                            You also indicated that you have heart disease. In
                            general, as long as you have been medically
                            evaluated and treated, have have had no heart
                            related symptoms such as chest pain and have no
                            limitations or restrictions on your normal daily
                            activities. Additionally:{" "}
                          </p>
                          <Ul>
                            <li>
                              Wait at least 6 months following an episode of
                              angina.
                            </li>
                            <li>
                              Wait at least 6 months following a heart attack.
                            </li>
                            <li>
                              Wait at least 6 months after bypass surgery or
                              angioplasty.
                            </li>
                            <li>
                              Wait at least 6 months after a change in your
                              heart condition that resulted in a change to your
                              medications.
                            </li>
                          </Ul>
                          <p>
                            If you have a pacemaker, you ARE eligible to donate
                            as long as your pulse is between 50 and 100 beats
                            per minute and you meet the other heart disease
                            criteria. You should discuss your situation with
                            your personal healthcare provider and those at the
                            donation site .
                          </p>
                          <div className="spacing">
                            <Button>
                              <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="redirect-link"
                              >
                                Click Here to make an appointment!
                              </a>
                            </Button>
                          </div>
                          <Button>
                            <NavLink
                              to="/FAQ/otherwaystohelp"
                              className="redirect-link"
                            >
                              Not Eligible? Find other ways to help!
                            </NavLink>
                          </Button>
                        </ModalContentQuizRes>
                      ) : cancer &&
                        heartDisease === false &&
                        bleedingCondition ? (
                        <ModalContentQuizRes>
                          <h1>You may be eligible! please read below</h1>
                          <p>
                            {" "}
                            You indicated that you have or haf cancer. Please
                            know that eligibility depends on the type of cancer
                            and treatment history. If you had leukemia or
                            lymphoma, you are NOT eligible to donate. If you had
                            other types of cancer you ARE eligible to donate, if
                            the cancer has been treated successfully and it has
                            been more than 12 months since treatment was
                            completed and there has been no cancer recurrence in
                            this time. Lower risk in-situ cancers including
                            squamous or basal cell cancers of the skin that have
                            been completely removed and healed do not require a
                            12-month waiting period. You should discuss your
                            situation with those at your donation site
                          </p>
                          <br></br>
                          <p>
                            {" "}
                            You also indicated that you have a bleeding
                            condition. You will be asked additional questions at
                            the site. If your blood clots abnormally, you should
                            NOT donate because you may have excessive bleeding
                            where the needle is placed. You should NOT donate if
                            you are taking any "blood thinner" such as:
                          </p>
                          <Ul>
                            <li>Atrixa (fondaparinux)</li>
                            <li>Heparin</li>
                            <li>Jantoven (warfarin)</li>
                            <li>Lovenox (enoxaparin)</li>
                            <li>Pradaxa (dabigatran)</li>
                            <li>Savaysa (edoxaban)</li>
                            <li>Warfilone (warfarin)</li>
                            <li>Coumadin (warfarin)</li>
                            <li>Eliquis (apixaban)</li>
                            <li>Fragmin (dalteparin)</li>
                            <li>Xarelto (rivaroxaban)</li>
                          </Ul>
                          <p>
                            {" "}
                            If you are on aspirin, you ARE eligible donate whole
                            blood. However, you must be off of aspirin for at
                            least 2 full days in order to donate platelets by
                            apheresis.
                          </p>
                          <div className="spacing">
                            <Button>
                              <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="redirect-link"
                              >
                                Click Here to make an appointment!
                              </a>
                            </Button>
                          </div>
                          <Button>
                            <NavLink
                              to="/FAQ/otherwaystohelp"
                              className="redirect-link"
                            >
                              Not Eligible? Find other ways to help!
                            </NavLink>
                          </Button>
                        </ModalContentQuizRes>
                      ) : heartDisease &&
                        cancer === false &&
                        bleedingCondition ? (
                        <ModalContentQuizRes>
                          <h1>You may be eligible! please read below</h1>
                          <p>
                            {" "}
                            You indicated that you have heart disease. In
                            general, as long as you have been medically
                            evaluated and treated, have have had no heart
                            related symptoms such as chest pain and have no
                            limitations or restrictions on your normal daily
                            activities. Additionally:{" "}
                          </p>
                          <Ul>
                            <li>
                              Wait at least 6 months following an episode of
                              angina.
                            </li>
                            <li>
                              Wait at least 6 months following a heart attack.
                            </li>
                            <li>
                              Wait at least 6 months after bypass surgery or
                              angioplasty.
                            </li>
                            <li>
                              Wait at least 6 months after a change in your
                              heart condition that resulted in a change to your
                              medications.
                            </li>
                          </Ul>
                          <p>
                            If you have a pacemaker, you ARE eligible to donate
                            as long as your pulse is between 50 and 100 beats
                            per minute and you meet the other heart disease
                            criteria. You should discuss your situation with
                            your personal healthcare provider and those at the
                            donation site .
                          </p>
                          <br></br>
                          <p>
                            {" "}
                            You also indicated that you have a bleeding
                            condition. You will be asked additional questions at
                            the site. If your blood clots abnormally, you should
                            NOT donate because you may have excessive bleeding
                            where the needle is placed. You should NOT donate if
                            you are taking any "blood thinner" such as:
                          </p>
                          <Ul>
                            <li>Atrixa (fondaparinux)</li>
                            <li>Heparin</li>
                            <li>Jantoven (warfarin)</li>
                            <li>Lovenox (enoxaparin)</li>
                            <li>Pradaxa (dabigatran)</li>
                            <li>Savaysa (edoxaban)</li>
                            <li>Warfilone (warfarin)</li>
                            <li>Coumadin (warfarin)</li>
                            <li>Eliquis (apixaban)</li>
                            <li>Fragmin (dalteparin)</li>
                            <li>Xarelto (rivaroxaban)</li>
                          </Ul>
                          <p>
                            {" "}
                            If you are on aspirin, you ARE eligible donate whole
                            blood. However, you must be off of aspirin for at
                            least 2 full days in order to donate platelets by
                            apheresis.
                          </p>
                          <div className="spacing">
                            <Button>
                              <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="redirect-link"
                              >
                                Click Here to make an appointment!
                              </a>
                            </Button>
                          </div>
                          <Button>
                            <NavLink
                              to="/FAQ/otherwaystohelp"
                              className="redirect-link"
                            >
                              Not Eligible? Find other ways to help!
                            </NavLink>
                          </Button>
                        </ModalContentQuizRes>
                      ) : cancer && heartDisease && bleedingCondition ? (
                        <ModalContentQuizRes>
                          <h1>You may be eligible! please read below</h1>
                          <p>
                            {" "}
                            You indicated that you have or haf cancer. Please
                            know that eligibility depends on the type of cancer
                            and treatment history. If you had leukemia or
                            lymphoma, you are NOT eligible to donate. If you had
                            other types of cancer you ARE eligible to donate, if
                            the cancer has been treated successfully and it has
                            been more than 12 months since treatment was
                            completed and there has been no cancer recurrence in
                            this time. Lower risk in-situ cancers including
                            squamous or basal cell cancers of the skin that have
                            been completely removed and healed do not require a
                            12-month waiting period. You should discuss your
                            situation with those at your donation site
                          </p>
                          <br></br>
                          <p>
                            {" "}
                            You also indicated that you have a bleeding
                            condition. You will be asked additional questions at
                            the site. If your blood clots abnormally, you should
                            NOT donate because you may have excessive bleeding
                            where the needle is placed. You should NOT donate if
                            you are taking any "blood thinner" such as:
                          </p>
                          <Ul>
                            <li>Atrixa (fondaparinux)</li>
                            <li>Heparin</li>
                            <li>Jantoven (warfarin)</li>
                            <li>Lovenox (enoxaparin)</li>
                            <li>Pradaxa (dabigatran)</li>
                            <li>Savaysa (edoxaban)</li>
                            <li>Warfilone (warfarin)</li>
                            <li>Coumadin (warfarin)</li>
                            <li>Eliquis (apixaban)</li>
                            <li>Fragmin (dalteparin)</li>
                            <li>Xarelto (rivaroxaban)</li>
                          </Ul>
                          <p>
                            {" "}
                            If you are on aspirin, you ARE eligible donate whole
                            blood. However, you must be off of aspirin for at
                            least 2 full days in order to donate platelets by
                            apheresis.
                          </p>

                          <br></br>
                          <p>
                            {" "}
                            You indicated also that you have heart disease. In
                            general, as long as you have been medically
                            evaluated and treated, have have had no heart
                            related symptoms such as chest pain and have no
                            limitations or restrictions on your normal daily
                            activities. Additionally:{" "}
                          </p>
                          <Ul>
                            <li>
                              Wait at least 6 months following an episode of
                              angina.
                            </li>
                            <li>
                              Wait at least 6 months following a heart attack.
                            </li>
                            <li>
                              Wait at least 6 months after bypass surgery or
                              angioplasty.
                            </li>
                            <li>
                              Wait at least 6 months after a change in your
                              heart condition that resulted in a change to your
                              medications.
                            </li>
                          </Ul>
                          <p>
                            If you have a pacemaker, you ARE eligible to donate
                            as long as your pulse is between 50 and 100 beats
                            per minute and you meet the other heart disease
                            criteria. You should discuss your situation with
                            your personal healthcare provider and those at the
                            donation site .
                          </p>
                          <div className="spacing">
                            <Button>
                              <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="redirect-link"
                              >
                                Click Here to make an appointment!
                              </a>
                            </Button>
                          </div>
                          <Button>
                            <NavLink
                              to="/FAQ/otherwaystohelp"
                              className="redirect-link"
                            >
                              Not Eligible? Find other ways to help!
                            </NavLink>
                          </Button>
                        </ModalContentQuizRes>
                      ) : (
                        <>
                          <ModalContentNotification>
                            <h1>Congratulations, You're Eligible!</h1>
                            <p>
                              Make sure you are feeling well before your
                              appointment! Also if you are a teen donor please
                              check out{" "}
                              <NavLink
                                to="FAQ/eligibility/informationforteens"
                                className="paragraph-link"
                              >
                                our information for teens page!
                              </NavLink>{" "}
                            </p>
                            <Button>
                              <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="redirect-link"
                              >
                                Click Here to make an appointment!
                              </a>
                            </Button>
                          </ModalContentNotification>
                        </>
                      )}
                      ]
                    </>
                  ) : showNotEligible ? (
                    <ModalContentNotification>
                      <h1>Sorry, You're Not Eligible</h1>
                      <h3> There are still other ways that you can help!</h3>
                      <Button>
                        <NavLink
                          to="/FAQ/otherwaystohelp"
                          className="redirect-link"
                        >
                          Check out our Other Ways To Help page for more info!
                        </NavLink>
                      </Button>
                    </ModalContentNotification>
                  ) : showNotEligibleAge ? (
                    <ModalContentNotification>
                      <h1>
                        Sorry, You are not old enought to create account, and
                        you are too young to donate blood
                      </h1>
                      <h3> There are still other ways that you can help!</h3>
                      <Button>
                        <NavLink
                          to="/FAQ/otherwaystohelp"
                          className="redirect-link"
                        >
                          Check out our Other Ways To Help page for more info!
                        </NavLink>
                      </Button>
                    </ModalContentNotification>
                  ) : wholeBloodQuiz ? (
                    <>
                      {done ? (
                        <>
                          {score === allQuestions.WholeBloodQuestions.length
                            ? setEligible(true)
                            : setNotEligible(true)}
                        </>
                      ) : (
                        <>
                          <ModalContent>
                            <h1>Whole Blood Eligibility Quiz</h1>
                            <div className="question-section">
                              <div className="question-text">
                                {
                                  allQuestions.WholeBloodQuestions[
                                    quizCurrentQuestion
                                  ].questionText
                                }
                              </div>
                            </div>
                            <div className="answer-section">
                              {allQuestions.WholeBloodQuestions[
                                quizCurrentQuestion
                              ].answerOptions.map((answerOption) => (
                                <button
                                  onClick={() => {
                                    handleQuizAnswerOptionClick(
                                      answerOption.isCorrect,
                                      quizCurrentQuestion,
                                      allQuestions.WholeBloodQuestions
                                    );
                                  }}
                                >
                                  {answerOption.answerText}
                                </button>
                              ))}
                            </div>
                          </ModalContent>
                        </>
                      )}
                    </>
                  ) : powerRedQuiz ? (
                    <>
                      {done ? (
                        <>
                          {score === allQuestions.PowerRedQuestions.length
                            ? setEligible(true)
                            : setNotEligible(true)}
                        </>
                      ) : (
                        <>
                          <ModalContent>
                            <h1>Power Red (Double Red) Eligibility Quiz</h1>
                            <div className="question-section">
                              <div className="question-text">
                                {
                                  allQuestions.PowerRedQuestions[
                                    quizCurrentQuestion
                                  ].questionText
                                }
                              </div>
                            </div>
                            <div className="answer-section">
                              {allQuestions.PowerRedQuestions[
                                quizCurrentQuestion
                              ].answerOptions.map((answerOption) => (
                                <button
                                  onClick={() =>
                                    handleQuizAnswerOptionClick(
                                      answerOption.isCorrect,
                                      quizCurrentQuestion,
                                      allQuestions.PowerRedQuestions
                                    )
                                  }
                                >
                                  {answerOption.answerText}
                                </button>
                              ))}
                            </div>
                          </ModalContent>
                        </>
                      )}
                    </>
                  ) : plateletQuiz ? (
                    <>
                      {done ? (
                        <>
                          {score === allQuestions.PlateletQuestions.length
                            ? setEligible(true)
                            : setNotEligible(true)}
                        </>
                      ) : (
                        <>
                          <ModalContent>
                            <h1>Platelet Eligibility Quiz</h1>
                            <div className="question-section">
                              <div className="question-text">
                                {
                                  allQuestions.PlateletQuestions[
                                    quizCurrentQuestion
                                  ].questionText
                                }
                              </div>
                            </div>
                            <div className="answer-section">
                              {allQuestions.PlateletQuestions[
                                quizCurrentQuestion
                              ].answerOptions.map((answerOption) => (
                                <button
                                  onClick={() =>
                                    handleQuizAnswerOptionClick(
                                      answerOption.isCorrect,
                                      quizCurrentQuestion,
                                      allQuestions.PlateletQuestions
                                    )
                                  }
                                >
                                  {answerOption.answerText}
                                </button>
                              ))}
                            </div>
                          </ModalContent>
                        </>
                      )}
                    </>
                  ) : plasmaQuiz ? (
                    <>
                      {done ? (
                        <>
                          {score === allQuestions.PlasmaQuestions.length
                            ? setEligible(true)
                            : setNotEligible(true)}
                        </>
                      ) : (
                        <>
                          <ModalContent>
                            <h1>Plasma Donation Eligibility Quiz</h1>
                            <div className="question-section">
                              <div className="question-text">
                                {
                                  allQuestions.PlasmaQuestions[
                                    quizCurrentQuestion
                                  ].questionText
                                }
                              </div>
                            </div>
                            <div className="answer-section">
                              {allQuestions.PlasmaQuestions[
                                quizCurrentQuestion
                              ].answerOptions.map((answerOption) => (
                                <button
                                  onClick={() =>
                                    handleQuizAnswerOptionClick(
                                      answerOption.isCorrect,
                                      quizCurrentQuestion,
                                      allQuestions.PlasmaQuestions
                                    )
                                  }
                                >
                                  {answerOption.answerText}
                                </button>
                              ))}
                            </div>
                          </ModalContent>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <ModalContent>
                        <h1>Eligibility Quiz</h1>
                        <div className="question-section">
                          <div className="question-text">
                            {
                              allQuestions.questions[currentQuestion]
                                .questionText
                            }
                          </div>
                        </div>
                        <div className="answer-section">
                          {allQuestions.questions[
                            currentQuestion
                          ].answerOptions.map((answerOption) => (
                            <button
                              onClick={() =>
                                handleAnswerOptionClick(
                                  answerOption.isCorrect,
                                  currentQuestion
                                )
                              }
                            >
                              {answerOption.answerText}
                            </button>
                          ))}
                        </div>
                      </ModalContent>
                      <BackButton
                        onClick={() => handleBackClick(currentQuestion)}
                      >
                        {" "}
                        Back
                      </BackButton>
                    </>
                  )}
                  <CloseModalButton
                    aria-label="Close modal"
                    onClick={() => {
                      setShowModal((prev) => !prev);
                      setLogin(false);
                      setCreate(false);
                      setEligible(false);
                      setErrorMessage("");
                      setNotEligible(false);
                      setNotEligibleAge(false);
                      setCurrentQuestion(0);
                      setQuizCurrentQuestion(0);
                      setScore(0);
                      setDone(false);
                      setWholeBlood(false);
                      setPowerRed(false);
                      setPlatelet(false);
                      setPlasma(false);
                      setBleedingCondition(false);
                      setCancer(false);
                      setHeartDisease(false);
                    }}
                  />
                </ModalWrapper>
              </animated.div>
            </Background>
          ) : null}
        </>
      ) : (
        <>{fetchData()}</>
      )}
    </>
  );
};
