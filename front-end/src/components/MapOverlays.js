import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { TextField, Button, Input, Stack } from '@mui/material';
import {NavLink} from 'react-router-dom'
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { WholeBloodQuestions } from './WholeBloodQuestions';
import { PowerRedQuestions } from './PowerRedQuestions';
import { PlateletQuestions } from './PlateletQuestions';
import { PlasmaQuestions } from './PlasmaQuestions';
import { accountData } from './AccountData';

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

  

  button {
    padding: 10px 50px;
    margin-right: 10px;
    background: #141414;
    color: #fff;
    border: none;
    cursor: pointer;
  }

  button:hover{
    background: #A9A9A9;
  }

  .redirect-link:hover{
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

  button:hover{
    background: #A9A9A9;
  }

  .redirect-link:hover{
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
  
  p{
      padding-bottom: 10px;
      padding-top: 5px;
  }

  .spacing{
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

  button:hover{
    background: #A9A9A9;
  }

  .redirect-link:hover{
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

  p{
    padding-bottom: 10px;
    padding-top: 5px;
  }

 .spacing{
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

  button:hover{
    background: #A9A9A9;
  }

  .redirect-link:hover{
    color: #141414;
  }

  .redirect-link {
    color: #fff;
    text-decoration: none;
  }

  .emphasis{
    color: red;
    font-weight: bold;
    text-decoration: underline;
    
  }

  .paragraph-link{
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

  p{
    padding-bottom: 10px;
    padding-top: 5px;
  }

 .spacing{
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

  button:hover{
    background: #A9A9A9;
  }

  .redirect-link:hover{
    color: #141414;
  }

  .redirect-link {
    color: #fff;
    text-decoration: none;
  }

  .emphasis{
    color: red;
    font-weight: bold;
    text-decoration: underline;
    
  }

  .paragraph-link{
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

      .linkStyle{
        color: red;
        font-weight: bold;
        text-decoration: underline;
   
      }
`;

export const MapOverlays = ({ showModal, setShowModal }) => {


    //important data
    const questions = [
        {
            questionText: 'Do you have an Account?',
            answerOptions: [
                { answerText: 'Yes', isCorrect: "t" },
                { answerText: 'No', isCorrect: "f" },
                
            ],
        },
        {
            questionText: 'Would you like to create an account?',
            answerOptions: [
                { answerText: 'Yes', isCorrect: "t" },
                { answerText: 'No', isCorrect: "f" },
                
            ],
        },
        {
            questionText: 'What type of donation would you like to make?',
            answerOptions: [
                { answerText: 'Whole Blood', isCorrect: "Whole" },
                { answerText: 'Power Red (Double Red Cell)', isCorrect: "Power"},
                { answerText: 'Platelet', isCorrect: "Platelet"},
                { answerText: 'Plasma', isCorrect: "Plasma"}
                
            ],
        },
        
    ];



  


    


    
    //setting states
    const [done, setDone] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [quizCurrentQuestion, setQuizCurrentQuestion] = useState(0);
    const [showLogin, setLogin] = useState(false);
    const [showCreate, setCreate] = useState(false);
    const [showEligible, setEligible] = useState(false);
    const [showNotEligible, setNotEligible] = useState(false);
    const [score, setScore] = useState(0);
    const [showPassword,setShow] = useState(false);
    const [wholeBloodQuiz, setWholeBlood] = useState(false);
    const [powerRedQuiz, setPowerRed] = useState(false);
    const [plateletQuiz, setPlatelet] = useState(false);
    const [plasmaQuiz, setPlasma] = useState(false);
    const [bleedingCondition, setBleedingCondition] = useState(false);
    const [cancer, setCancer] = useState(false);
    const [heartDisease, setHeartDisease] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [LoginData, setLoginData] = useState({
        email:"", 
        password: ""
    });
    const [createAccountData, setCreateAccountData] = useState({
        firstName:"",
        lastName:"",
        email:"", 
        password: ""
    });





    //Handling Button Pushes
    const handleSubmit = (e) => {
        // Send user data to backend here


        e.preventDefault()

    };


    
    const handleRegister = (e) => {
        // Send user data to backend here
        e.preventDefault()

    };

    const handleAnswerOptionClick = (isCorrect, currentQuestion) => {

        if (isCorrect === "t" && questions[currentQuestion].questionText === "Do you have an Account?") {

            setLogin(true);
             

        }
        else if (isCorrect === "t" && questions[currentQuestion].questionText === "Would you like to create an account?") {
            setCreate(true);
            
        }
        else if (isCorrect === "Whole" && questions[currentQuestion].questionText === "What type of donation would you like to make?" && questions[currentQuestion].answerOptions.filter(textObj => textObj.answerText === 'Whole Blood')) {
            if(loggedIn){

                const user = accountData.filter(accountObj => accountObj.email === LoginData.email);
                user.map(userObj => {
                    if(userObj.eligible.includes('Whole Blood')){
                        return setEligible(true);
                    }
                    else{
                        return setNotEligible(true);
                    }
                })
                
    
            }
            else{

                setWholeBlood(true);
               
            }
            
            
        }
        else if (isCorrect === "Power" && questions[currentQuestion].questionText === "What type of donation would you like to make?" && questions[currentQuestion].answerOptions.filter(textObj => textObj.answerText === 'Power Red (Double Red Cell)')) {
            if(loggedIn){

                const user = accountData.filter(accountObj => accountObj.email === LoginData.email);
                user.map(userObj => {
                    if(userObj.eligible.includes('Power Red')){
                        return setEligible(true);
                    }
                    else{
                        return setNotEligible(true);
                    }
                })
                
    
            }
            else{

                setPowerRed(true);
               
            }
            
            
        }
        else if (isCorrect === "Platelet" && questions[currentQuestion].questionText === "What type of donation would you like to make?" && questions[currentQuestion].answerOptions.filter(textObj => textObj.answerText === 'Platelet')) {
            if(loggedIn){

                const user = accountData.filter(accountObj => accountObj.email === LoginData.email);
                user.map(userObj => {
                    if(userObj.eligible.includes('Platelet')){
                        return setEligible(true);
                    }
                    else{
                        return setNotEligible(true);
                    }
                })
                
    
            }
            else{

                setPlatelet(true);
               
            }
            
            
        }
        else if (isCorrect === "Plasma" && questions[currentQuestion].questionText === "What type of donation would you like to make?" && questions[currentQuestion].answerOptions.filter(textObj => textObj.answerText === 'Plasma')) {
            if(loggedIn){

                const user = accountData.filter(accountObj => accountObj.email === LoginData.email);
                user.map(userObj => {
                    if(userObj.eligible.includes('Plasma')){
                        return setEligible(true);
                    }
                    else{
                        return setNotEligible(true);
                    }
                })
                
    
            }
            else{

                setPlasma(true);
               
            }
            
            
        }

        

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            
            if(showLogin === false && showCreate === false){
                setCurrentQuestion(nextQuestion);
            }
            else if(showLogin === true){
                setLogin(true);
            }
            else if(wholeBloodQuiz === true){
                setWholeBlood(true);
            }
            else if(powerRedQuiz === true){
                setPowerRed(true);
            }
            else if(plateletQuiz === true){
                setPlatelet(true);
            }
            else if(plasmaQuiz=== true){
                setPlasma(true);
            }
            
        } 

    }


    const handleQuizAnswerOptionClick = (isCorrect, quizCurrentQuestion, quizQuestions) => {
        

        if (isCorrect) {
            setScore(score + 1);
        }

        if(quizQuestions[quizCurrentQuestion].questionText === "Do you have Heart Disease?" && isCorrect === "heart"){
            setHeartDisease(true);
            setScore(score + 1);
 
        }
        else if(quizQuestions[quizCurrentQuestion].questionText === "Do you have/had cancer?" && isCorrect === "cancer" ){
            setCancer(true);
            setScore(score + 1);
    

        }
        else if(quizQuestions[quizCurrentQuestion].questionText === "Do you have a bleeding Condition?" && isCorrect === "bleeding"){
            setBleedingCondition(true);
            setScore(score + 1);
        

        }

        const nextQuestion = quizCurrentQuestion + 1;
        if (nextQuestion < quizQuestions.length) {
            setQuizCurrentQuestion(nextQuestion);
        } else {
            if(score === quizQuestions.length){
                setEligible(true);
            }
            else{
               setDone(true);
            }
            
        }


        

    }


    const handleBackClick = (currentQuestion) => {
        const backQuestion = currentQuestion - 1;
        if (backQuestion > 0) {
            setCurrentQuestion(backQuestion);
            
        }
        else if (backQuestion === 0) {
            setCurrentQuestion(0);
        }  
        else {
            setShowModal(false);
            setLogin(false);
            setCreate(false);
            setEligible(false);
            setNotEligible(false);
            setWholeBlood(false);
            setPowerRed(false);
            setPlatelet(false);
            setPlasma(false);
            setLoggedIn(false);
            setCurrentQuestion(0);
            setQuizCurrentQuestion(0);
            setScore(0);
            setBleedingCondition(false);
            setCancer(false);
            setHeartDisease(false);
            setDone(false);
    

        }


        
    };


    

    const handleLoginBackClick = (currentQuestion) => {
        
        setCurrentQuestion(0);
        setLogin(false);

        
    };

    const handleCreateBackClick = (currentQuestion) => {
        
        setCurrentQuestion(1);
        setCreate(false);

        
    };




    //handling close and open
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
            setEligible(false);
            setNotEligible(false);
            setWholeBlood(false);
            setPowerRed(false);
            setPlatelet(false);
            setPlasma(false);
            setLoggedIn(false);
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
        e => {
            if (e.key === 'Escape' && showModal) {
                setShowModal(false);
                setLogin(false);
                setCreate(false);
                setEligible(false);
                setNotEligible(false);
                setWholeBlood(false);
                setPowerRed(false);
                setPlatelet(false);
                setPlasma(false);
                setLoggedIn(false);
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



    useEffect(
        () => {
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
    );


    //overlay content
    return (
        <>
      
        {showModal ? ( 
            <Background onClick={closeModal} ref={modalRef}>
            <animated.div style={animation}>
                <ModalWrapper showModal={showModal}>
                    {showLogin ?(
                        <>
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
                                        onClick={() => {setLogin(false); setLoggedIn(true);
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
                            <BackButton onClick={() => handleLoginBackClick(currentQuestion)}> Back </BackButton>
                        </>

                    ):showCreate ?(
                        <>
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
                            <BackButton onClick={() => handleCreateBackClick(currentQuestion)}> Back</BackButton>
                        </>

                    ):showEligible ?(

                        <>
                            {heartDisease && cancer === false && bleedingCondition === false?(
                                                       
                                    <ModalContentQuizRes>
                                    <h1>You may be eligible! please read below</h1>
                                    <p> You indicated that you have heart disease. In general, as long as you have been medically evaluated and treated, have have had no heart related symptoms such as chest pain and have no limitations or restrictions on your normal daily activities. Additionally: </p>
                                    <Ul>
                                        <li>Wait at least 6 months following an episode of angina.</li>
                                        <li>Wait at least 6 months following a heart attack.</li>
                                        <li>Wait at least 6 months after bypass surgery or angioplasty.</li>
                                        <li>Wait at least 6 months after a change in your heart condition that resulted in a change to your medications.</li>
                                    </Ul>
                                    <p>If you have a pacemaker, you ARE eligible to donate as long as your pulse is between 50 and 100 beats per minute and you meet the other heart disease criteria. 
                                    You should discuss your situation with your personal healthcare provider and those at the donation site .</p>
                                    <div className='spacing'><Button><a href="http://example.com/" target="_blank" rel="noopener noreferrer" className='redirect-link'>Click Here to make an appointment!</a></Button></div>
                                    <Button><NavLink to="/FAQ/otherwaystohelp" className='redirect-link'>Not Eligible? Find other ways to help!</NavLink></Button>
                                    </ModalContentQuizRes>
               
                                                  
                                                   
                            ):cancer && heartDisease === false && bleedingCondition === false?(

                                <ModalContentSmall>
                                    <h1>You may be eligible! please read below</h1>
                                    <p> You indicated that you have or haf cancer. Please know that eligibility depends on the type of cancer and treatment history. If you had leukemia or lymphoma, you are NOT eligible to donate. 
                                        If you had other types of cancer you ARE eligible to donate, if the cancer has been treated successfully and it has been more than 12 months since treatment was completed and there has been no cancer recurrence in this time. 
                                        Lower risk in-situ cancers including squamous or basal cell cancers of the skin that have been completely removed and healed do not require a 12-month waiting period.
                                        You should discuss your situation with those at your donation site</p>
                                        <div className='spacing'><Button><a href="http://example.com/" target="_blank" rel="noopener noreferrer" className='redirect-link'>Click Here to make an appointment!</a></Button></div>
                                    <Button><NavLink to="/FAQ/otherwaystohelp" className='redirect-link'>Not Eligible? Find other ways to help!</NavLink></Button>
                                </ModalContentSmall>


                            ):bleedingCondition && cancer === false && heartDisease === false?(
                                <ModalContentQuizRes>
                                    <h1>You may be eligible! please read below</h1>
                                    <p> You indicated that you have a bleeding condition. You will be asked additional questions at the site. If your blood clots abnormally, you should NOT donate because you may have excessive bleeding where the needle is placed. 
                                        You should NOT donate if you are taking any "blood thinner" such as:</p>
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
                                    <p> If you are on aspirin, you ARE eligible donate whole blood. 
                                        However, you must be off of aspirin for at least 2 full days in order to donate platelets by apheresis.</p>
                                        <div className='spacing'><Button><a href="http://example.com/" target="_blank" rel="noopener noreferrer" className='redirect-link'>Click Here to make an appointment!</a></Button></div>
                                    <Button><NavLink to="/FAQ/otherwaystohelp" className='redirect-link'>Not Eligible? Find other ways to help!</NavLink></Button>
                                    </ModalContentQuizRes>


                            ):cancer && heartDisease && bleedingCondition === false? (

                                <ModalContentQuizRes>
                                    <h1>You may be eligible! please read below</h1>
                                    <p> You indicated that you have or haf cancer. Please know that eligibility depends on the type of cancer and treatment history. If you had leukemia or lymphoma, you are NOT eligible to donate. 
                                        If you had other types of cancer you ARE eligible to donate, if the cancer has been treated successfully and it has been more than 12 months since treatment was completed and there has been no cancer recurrence in this time. 
                                        Lower risk in-situ cancers including squamous or basal cell cancers of the skin that have been completely removed and healed do not require a 12-month waiting period.
                                        You should discuss your situation with those at your donation site</p>
                                    <br></br>
                                    <p> You also indicated that you have heart disease. In general, as long as you have been medically evaluated and treated, have have had no heart related symptoms such as chest pain and have no limitations or restrictions on your normal daily activities. Additionally: </p>
                                    <Ul>
                                        <li>Wait at least 6 months following an episode of angina.</li>
                                        <li>Wait at least 6 months following a heart attack.</li>
                                        <li>Wait at least 6 months after bypass surgery or angioplasty.</li>
                                        <li>Wait at least 6 months after a change in your heart condition that resulted in a change to your medications.</li>
                                    </Ul>
                                    <p>If you have a pacemaker, you ARE eligible to donate as long as your pulse is between 50 and 100 beats per minute and you meet the other heart disease criteria. 
                                    You should discuss your situation with your personal healthcare provider and those at the donation site .</p>
                                    <div className='spacing'><Button><a href="http://example.com/" target="_blank" rel="noopener noreferrer" className='redirect-link'>Click Here to make an appointment!</a></Button></div>
                                    <Button><NavLink to="/FAQ/otherwaystohelp" className='redirect-link'>Not Eligible? Find other ways to help!</NavLink></Button>
                                </ModalContentQuizRes>

                            ):cancer && heartDisease === false && bleedingCondition?(
                                <ModalContentQuizRes>
                                    <h1>You may be eligible! please read below</h1>
                                    <p> You indicated that you have or haf cancer. Please know that eligibility depends on the type of cancer and treatment history. If you had leukemia or lymphoma, you are NOT eligible to donate. 
                                        If you had other types of cancer you ARE eligible to donate, if the cancer has been treated successfully and it has been more than 12 months since treatment was completed and there has been no cancer recurrence in this time. 
                                        Lower risk in-situ cancers including squamous or basal cell cancers of the skin that have been completely removed and healed do not require a 12-month waiting period.
                                        You should discuss your situation with those at your donation site</p>
                                    <br></br>
                                    <p> You also indicated that you have a bleeding condition. You will be asked additional questions at the site. If your blood clots abnormally, you should NOT donate because you may have excessive bleeding where the needle is placed. 
                                        You should NOT donate if you are taking any "blood thinner" such as:</p>
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
                                    <p> If you are on aspirin, you ARE eligible donate whole blood. 
                                        However, you must be off of aspirin for at least 2 full days in order to donate platelets by apheresis.</p>
                                        <div className='spacing'><Button><a href="http://example.com/" target="_blank" rel="noopener noreferrer" className='redirect-link'>Click Here to make an appointment!</a></Button></div>
                                    <Button><NavLink to="/FAQ/otherwaystohelp" className='redirect-link'>Not Eligible? Find other ways to help!</NavLink></Button>
                                </ModalContentQuizRes>
                                
                            ):heartDisease && cancer === false && bleedingCondition?(
                                <ModalContentQuizRes>
                                    <h1>You may be eligible! please read below</h1>
                                    <p> You indicated that you have heart disease. In general, as long as you have been medically evaluated and treated, have have had no heart related symptoms such as chest pain and have no limitations or restrictions on your normal daily activities. Additionally: </p>
                                    <Ul>
                                        <li>Wait at least 6 months following an episode of angina.</li>
                                        <li>Wait at least 6 months following a heart attack.</li>
                                        <li>Wait at least 6 months after bypass surgery or angioplasty.</li>
                                        <li>Wait at least 6 months after a change in your heart condition that resulted in a change to your medications.</li>
                                    </Ul>
                                    <p>If you have a pacemaker, you ARE eligible to donate as long as your pulse is between 50 and 100 beats per minute and you meet the other heart disease criteria. 
                                    You should discuss your situation with your personal healthcare provider and those at the donation site .</p>
                                    <br></br>
                                    <p> You also indicated that you have a bleeding condition. You will be asked additional questions at the site. If your blood clots abnormally, you should NOT donate because you may have excessive bleeding where the needle is placed. 
                                        You should NOT donate if you are taking any "blood thinner" such as:</p>
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
                                    <p> If you are on aspirin, you ARE eligible donate whole blood. 
                                        However, you must be off of aspirin for at least 2 full days in order to donate platelets by apheresis.</p>
                                        <div className='spacing'><Button><a href="http://example.com/" target="_blank" rel="noopener noreferrer" className='redirect-link'>Click Here to make an appointment!</a></Button></div>
                                    <Button><NavLink to="/FAQ/otherwaystohelp" className='redirect-link'>Not Eligible? Find other ways to help!</NavLink></Button>

                                </ModalContentQuizRes>
                            ):cancer && heartDisease && bleedingCondition ?(
                                <ModalContentQuizRes>
                                     <h1>You may be eligible! please read below</h1>
                                    <p> You indicated that you have or haf cancer. Please know that eligibility depends on the type of cancer and treatment history. If you had leukemia or lymphoma, you are NOT eligible to donate. 
                                        If you had other types of cancer you ARE eligible to donate, if the cancer has been treated successfully and it has been more than 12 months since treatment was completed and there has been no cancer recurrence in this time. 
                                        Lower risk in-situ cancers including squamous or basal cell cancers of the skin that have been completely removed and healed do not require a 12-month waiting period.
                                        You should discuss your situation with those at your donation site</p>
                                    <br></br>
                                    <p> You also indicated that you have a bleeding condition. You will be asked additional questions at the site. If your blood clots abnormally, you should NOT donate because you may have excessive bleeding where the needle is placed. 
                                        You should NOT donate if you are taking any "blood thinner" such as:</p>
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
                                    <p> If you are on aspirin, you ARE eligible donate whole blood. 
                                        However, you must be off of aspirin for at least 2 full days in order to donate platelets by apheresis.</p>
                                    
                                    <br></br>
                                    <p> You indicated also that you have heart disease. In general, as long as you have been medically evaluated and treated, have have had no heart related symptoms such as chest pain and have no limitations or restrictions on your normal daily activities. Additionally: </p>
                                    <Ul>
                                        <li>Wait at least 6 months following an episode of angina.</li>
                                        <li>Wait at least 6 months following a heart attack.</li>
                                        <li>Wait at least 6 months after bypass surgery or angioplasty.</li>
                                        <li>Wait at least 6 months after a change in your heart condition that resulted in a change to your medications.</li>
                                    </Ul>
                                    <p>If you have a pacemaker, you ARE eligible to donate as long as your pulse is between 50 and 100 beats per minute and you meet the other heart disease criteria. 
                                    You should discuss your situation with your personal healthcare provider and those at the donation site .</p>
                                    <div className='spacing'><Button><a href="http://example.com/" target="_blank" rel="noopener noreferrer" className='redirect-link'>Click Here to make an appointment!</a></Button></div>
                                    <Button><NavLink to="/FAQ/otherwaystohelp" className='redirect-link'>Not Eligible? Find other ways to help!</NavLink></Button>
                                </ModalContentQuizRes>

                            ):(
                                <ModalContentNotification>
                                    <h1>Congratulations, You're Eligible!</h1>
                                    <p>Make sure you are feeling well before your appointment! Also if you are a teen donor please check out <NavLink to="FAQ/eligibility/informationforteens" className='paragraph-link'>our information for teens page!</NavLink> </p>
                                    <Button><a href="http://example.com/" target="_blank" rel="noopener noreferrer" className='redirect-link'>Click Here to make an appointment!</a></Button>
                                </ModalContentNotification>

                            )
                            }
                        </>
                    ):showNotEligible ?(
                        <ModalContentNotification>
                        <h1>Sorry, You're Not Eligible</h1>
                        <h3> There are still other ways that you can help!</h3>
                        <Button><NavLink to="/FAQ/otherwaystohelp" className='redirect-link'>Check out our Other Ways To Help page for more info!</NavLink></Button>
                        </ModalContentNotification>

                    ):wholeBloodQuiz ?(
                      
                        <>
                              {done ? (
                                  <>

                                    {score === WholeBloodQuestions.length? (setEligible(true)):(setNotEligible(true))}

                                  </>

                              ):(
                                  <>
                                    <ModalContent>
                                            <h1>Whole Blood Eligibility Quiz</h1>
                                            <div className='question-section'>
                                                <div className='question-text'>{WholeBloodQuestions[quizCurrentQuestion].questionText}</div>
                                            </div>
                                            <div className='answer-section'>
                                                {WholeBloodQuestions[quizCurrentQuestion].answerOptions.map((answerOption) => (
                                                    <button onClick={() => {handleQuizAnswerOptionClick (answerOption.isCorrect, quizCurrentQuestion, WholeBloodQuestions)}}>{answerOption.answerText}</button>
                                                ))}
                                            </div>

                                        </ModalContent>
                                        
                                    </>
                              )}
                           
                        </>
                        

                    ):powerRedQuiz ?(
                        <>
                            {done ? (
                                  <>

                                    {score === PowerRedQuestions.length? (setEligible(true)):(setNotEligible(true))}

                                  </>

                              ):(
                                  <>
                                    <ModalContent>
                                        <h1>Power Red (Double Red) Eligibility Quiz</h1>
                                        <div className='question-section'>
                                            <div className='question-text'>{PowerRedQuestions[quizCurrentQuestion].questionText}</div>
                                        </div>
                                        <div className='answer-section'>
                                            {PowerRedQuestions[quizCurrentQuestion].answerOptions.map((answerOption) => (
                                                <button onClick={() => handleQuizAnswerOptionClick (answerOption.isCorrect, quizCurrentQuestion, PowerRedQuestions)}>{answerOption.answerText}</button>
                                            ))}
                                        </div>

                                    </ModalContent>
                                   
                            

                                  </>
                              )
                            }
                             </>
                    ):plateletQuiz ?(
                        <>

                            {done ? (
                                  <>

                                    {score === PlateletQuestions.length? (setEligible(true)):(setNotEligible(true))}

                                  </>

                              ):(
                                  <>

                                    <ModalContent>
                                        <h1>Platelet Eligibility Quiz</h1>
                                        <div className='question-section'>
                                            <div className='question-text'>{PlateletQuestions[quizCurrentQuestion].questionText}</div>
                                        </div>
                                        <div className='answer-section'>
                                            {PlateletQuestions[quizCurrentQuestion].answerOptions.map((answerOption) => (
                                                <button onClick={() => handleQuizAnswerOptionClick (answerOption.isCorrect, quizCurrentQuestion, PlateletQuestions)}>{answerOption.answerText}</button>
                                            ))}
                                        </div>

                                    </ModalContent>
                                    
                                  </>
                              )
                            }       
                            </>
                    ):plasmaQuiz ?(
                        <>
                            {done ? (
                                  <>

                                    {score === PlasmaQuestions.length? (setEligible(true)):(setNotEligible(true))}

                                  </>

                              ):(
                                  
                                  <>
                                        <ModalContent>
                                            <h1>Plasma Donation Eligibility Quiz</h1>
                                            <div className='question-section'>
                                                <div className='question-text'>{PlasmaQuestions[quizCurrentQuestion].questionText}</div>
                                            </div>
                                            <div className='answer-section'>
                                                {PlasmaQuestions[quizCurrentQuestion].answerOptions.map((answerOption) => (
                                                    <button onClick={() => handleQuizAnswerOptionClick (answerOption.isCorrect, quizCurrentQuestion, PlasmaQuestions)}>{answerOption.answerText}</button>
                                                ))}
                                            </div>

                                        </ModalContent>
                                         
                                  </>
                              )
                            }
                           
                        </>
                    ):(
                        <>
                        <ModalContent>
                            <h1>Eligibility Quiz</h1>
                            <div className='question-section'>
                                <div className='question-text'>{questions[currentQuestion].questionText}</div>
                            </div>
                            <div className='answer-section'>
                                {questions[currentQuestion].answerOptions.map((answerOption) => (
                                    <button onClick={() => handleAnswerOptionClick(answerOption.isCorrect, currentQuestion)}>{answerOption.answerText}</button>
                                ))}
                            </div>
                        </ModalContent>
                        <BackButton onClick={() => handleBackClick(currentQuestion)}> Back</BackButton>
                        </>
                        
                    )
                    
                    }
                <CloseModalButton
                    aria-label='Close modal'
                    onClick={() => {setShowModal(prev => !prev);
                        setLogin(false);
                        setCreate(false);
                        setEligible(false);
                        setNotEligible(false);
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
                        setLoggedIn(false);}}
                />
                </ModalWrapper>
            </animated.div>
            </Background>
        ) : null}
        </>
    );
};