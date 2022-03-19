import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { TextField, Button, Input, Stack } from '@mui/material';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 80;
  top:0px;
  left:0px;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 600px;
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

export const Modal = ({ showModal, setShowModal }) => {

    const questions = [
        {
            questionText: 'Do you have an Account?',
            answerOptions: [
                { answerText: 'Yes', isCorrect: true },
                { answerText: 'No', isCorrect: false },
                
            ],
        },
        {
            questionText: 'Would you like to create an account?',
            answerOptions: [
                { answerText: 'Yes', isCorrect: true },
                { answerText: 'No', isCorrect: false },
                
            ],
        },
        {
            questionText: 'What type of donation would you like to make?',
            answerOptions: [
                { answerText: 'Yes', isCorrect: true },
                { answerText: 'No', isCorrect: false },
                
            ],
        },
        
    ];


    const accountData = [
        {
            firstName:"",
            lastName:"",
            email:"", 
            password: "",
            age: 0,
            eligible: []
        },

        {
            firstName: "Rachel",
            lastName: "Kindagen",
            email: "rmk461@nyu.edu", 
            password: "helloworld123",
            age: 21,
            eligible: ["Whole Blood", "Power Red", "Platelet"]
        },

        
        
    ];


    


    

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [showLogin, setLogin] = useState(false);
    const [showCreate, setCreate] = useState(false);
    const [showEnd, setEnd] = useState(false);
    const [score, setScore] = useState(0);
    const [showPassword,setShow] = useState(false);
    //const [start, setStart] = useState(false);


    const [LoginData, setLoginData] = useState({
        email:"", 
        password: ""
    })
    const handleSubmit = (e) => {
        // Send user data to backend here

        e.preventDefault()

    };


    const [createAccountData, setCreateAccountData] = useState({
        firstName:"",
        lastName:"",
        email:"", 
        password: ""
    })
    const handleRegister = (e) => {
        // Send user data to backend here
        e.preventDefault()

    };

    const handleAnswerOptionClick = (isCorrect, currentQuestion) => {

        if (isCorrect && questions[currentQuestion].questionText === "Do you have an Account?") {

            setLogin(true);
             

        }
        else if (isCorrect && questions[currentQuestion].questionText === "Would you like to create an account?") {
            setCreate(true);
            
        }

        

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            
            if(showLogin === false && showCreate === false){
                setCurrentQuestion(nextQuestion);
            }
            else if(showLogin === false){
                setLogin(true);
            }
            else{
                setEnd(true);
            }
            
        } else{
            setEnd(true);

        }

    }

    const modalRef = useRef();

    const animation = useSpring({
        config: {
        duration: 250
        },
        opacity: showModal ? 1 : 0,
        transform: showModal ? `translateY(0%)` : `translateY(-100%)`
    });

    const closeModal = e => {
        if (modalRef.current === e.target) {
            setShowModal(false);
            setLogin(false);
            setCreate(false);
            setEnd(false);
            setCurrentQuestion(0);

        }
    };

    const keyPress = useCallback(
        e => {
            if (e.key === 'Escape' && showModal) {
                setShowModal(false);
                setLogin(false);
                setCreate(false);
                setEnd(false);
                setCurrentQuestion(0);
                
            }
        },
        [setShowModal, showModal]
    );

    useEffect(
        () => {
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
    );

    const handleBackClick = () => {
        setShowModal(false);
        setLogin(false);
        setCreate(false);

        
    };


    return (
        <>
        {showModal ? ( 
            <Background onClick={closeModal} ref={modalRef}>
            <animated.div style={animation}>
                <ModalWrapper showModal={showModal}>
                    {showLogin ?(

                        <ModalContent>
                        <h1>Login</h1>

                        <form onSubmit={handleSubmit}>
                                <Stack alignItems = 'center' spacing = {2}>
                                

                                <TextField 
                                    sx= {{ width: '100%'}}
                                    required 
                                    label = "Email"
                                    value = {LoginData.email}
                                    name = "email"
                                    onChange = {(e) => setLoginData({...LoginData, email: e.target.value})}
                                />
                                <TextField 
                                    sx= {{ width: '100%'}}
                                    type={showPassword?"text":"password"}
                                    required 
                                    label = "Password"
                                    value = {LoginData.password}
                                    name = "password"
                                    onChange = {(e) => setLoginData({...LoginData, password: e.target.value})}
                                />
                                </Stack>
                                    
                                <Input 
                                    type = "submit" value = "Submit" 
                                    onClick={() => {setLogin(false);
                                    setCurrentQuestion(2);}}>
                                        LogIn
                                </Input><br></br>

                                <h1>Don't Have an Account?</h1>

                                <Button 
                                    onClick={() => {setLogin(false);
                                    setCreate(true);}}>
                                        Create Account
                                </Button>
                        </form>
                        </ModalContent>


                    ):showCreate ?(

                        <ModalContentCreate>
                        <h1>Create Account</h1>

                        <form onSubmit={handleRegister}>
                                <Stack alignItems = 'center' spacing = {2}>

                                <TextField 
                                    sx= {{ width: '100%'}}
                                    required 
                                    label = "First Name"
                                    value = {createAccountData.firstName}
                                    name = "firstName"
                                    onChange = {(e) => setCreateAccountData({...createAccountData, email: e.target.value})}
                                />

                                <TextField 
                                    sx= {{ width: '100%'}}
                                    required 
                                    label = "Last Name"
                                    value = {createAccountData.lastName}
                                    name = "lastName"
                                    onChange = {(e) => setCreateAccountData({...createAccountData, email: e.target.value})}
                                />
                                

                                <TextField 
                                    sx= {{ width: '100%'}}
                                    required 
                                    label = "Email"
                                    value = {LoginData.email}
                                    name = "email"
                                    onChange = {(e) => setCreateAccountData({...createAccountData, email: e.target.value})}
                                />
                                <TextField 
                                    sx= {{ width: '100%'}}
                                    required 
                                    label = "Password"
                                    value = {LoginData.password}
                                    name = "password"
                                    onChange = {(e) => setCreateAccountData({...createAccountData, password: e.target.value})}
                                />
                                </Stack>
                                    
                                <Input 
                                    type = "submit" value = "Submit" 
                                    onClick={() => {setCreate(false);
                                    setCurrentQuestion(2);}}>
                                        Register
                                </Input><br></br>

                                <h1>Already Have an Account?</h1>

                                <Button 
                                    onClick={() => {setLogin(true);
                                    setCreate(false);}}>
                                        Login
                                </Button>
                        </form>
                        </ModalContentCreate>


                    ):showEnd ?(
                        <ModalContent>
                        <h1>End</h1>

                        
                        </ModalContent>

                    )
                    :(
                        <ModalContent>
                            <div className='question-section'>
                                <div className='question-text'>{questions[currentQuestion].questionText}</div>
                            </div>
                            <div className='answer-section'>
                                {questions[currentQuestion].answerOptions.map((answerOption) => (
                                    <button onClick={() => handleAnswerOptionClick(answerOption.isCorrect, currentQuestion)}>{answerOption.answerText}</button>
                                ))}
                            </div>
                        </ModalContent>
                    )
                    
                    }
                <CloseModalButton
                    aria-label='Close modal'
                    onClick={() => {setShowModal(prev => !prev);
                        setLogin(false);
                        setCreate(false);
                        setEnd(false);
                        setCurrentQuestion(0);}}
                />
                </ModalWrapper>
            </animated.div>
            </Background>
        ) : null}
        </>
    );
};