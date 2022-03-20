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

     li{
        font-size: 20px;
     }

      li:before {
        content: "• "; 
        color: red; 
        font-weight: bold;
        font-size: 30px; 
        display: inline-block; 
        width: 1em; 
      }

      .linkStyle{
        color: red;
        font-weight: bold;
        text-decoration: underline;
        font-size: 20px;
      }
`;

export const Modal = ({ showModal, setShowModal }) => {


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


  


    


    
    //setting states
    const [testing, setTesting] = useState(false);
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

        if(quizQuestions.questionText === "Do you have Heart Disease?" && isCorrect === false){
            setHeartDisease(true);
            setScore(score + 1);

        }
        else if(quizQuestions.questionText === "Do you have/had cancer?" && isCorrect === false){
            setCancer(true);
            setScore(score + 1);

        }
        else if(quizQuestions.questionText === "Do you have a bleeding Condition?" && isCorrect === false){
            setBleedingCondition(true);
            setScore(score + 1);

        }

        const nextQuestion = quizCurrentQuestion + 1;
        if (nextQuestion < quizQuestions.length) {
            setQuizCurrentQuestion(nextQuestion);
        } else {
            if(score === quizQuestions.length && nextQuestion >= quizQuestions.length){
                setEligible(true);
            }
            else if(score !== quizQuestions.length && nextQuestion > quizQuestions.length){
                if(showEligible === false){
                    setNotEligible(true);
                }
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
    

        }


        
    };


    const handleQuizBackClick = (quizCurrentQuestion, quizQuestions) => {
        const quizBackQuestion = quizCurrentQuestion - 1;

        if(quizQuestions.questionText === "Do you have Heart Disease?"){
            setHeartDisease(false);
        

        }
        else if(quizQuestions.questionText === "Do you have/had cancer?"){
            setCancer(false);
          

        }
        else if(quizQuestions.questionText === "Do you have a bleeding Condition?"){
            setBleedingCondition(false);
  

        }


        if (quizBackQuestion > 0) {
            setQuizCurrentQuestion(quizBackQuestion);
            setScore(score - 1);
            
        }
        else if (quizBackQuestion === 0) {
            setQuizCurrentQuestion(0);
            setScore(score - 1);
        }  
        else {
            setWholeBlood(false);
            setPowerRed(false);
            setPlatelet(false);
            setPlasma(false);
            setQuizCurrentQuestion(0);
            setCurrentQuestion(2);
            setScore(0);
            setBleedingCondition(false);
            setCancer(false);
            setHeartDisease(false);
    


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
                            <BackButton onClick={() => handleLoginBackClick(currentQuestion)}> Back {currentQuestion}</BackButton>
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
                            <BackButton onClick={() => handleCreateBackClick(currentQuestion)}> Back {currentQuestion}</BackButton>
                        </>

                    ):showEligible ?(

                        <>
                            {cancer && heartDisease === false && bleedingCondition === false?(
                                <ModalContentNotification>
                                    <h1>You may be eligible! please read below</h1>
                                    <p> You indicated that you have or haf cancer. Please know that eligibility depends on the type of cancer and treatment history. If you had leukemia or lymphoma, <div className='emphasis'>you are NOT eligible to donate</div>. 
                                        If you had other types of cancer <div className='emphasis'>you ARE eligible to donate</div>, if the cancer has been treated successfully and it has been more than 12 months since treatment was completed and there has been no cancer recurrence in this time. 
                                        Lower risk in-situ cancers including squamous or basal cell cancers of the skin that have been completely removed and healed do not require a 12-month waiting period.
                                        <div className='emphasis'>You should discuss your situation with those at your donation site</div></p>
                                    <Button><a href="http://example.com/" target="_blank" rel="noopener noreferrer">Click Here to make an appointment!</a></Button>
                                    <Button><NavLink to="/FAQ/otherwaystohelp" className='redirect-link'>Not Eligible? Find other ways to help!</NavLink></Button>
                                </ModalContentNotification>


                                ):heartDisease && cancer === false && bleedingCondition === false?(
                                   
                                        <ModalContentNotification>
                                        <h1>You may be eligible! please read below</h1>
                                        <p> You indicated that you have heart disease. In general, <div className='emphasis'>you ARE eligible</div> as long as you have been medically evaluated and treated, have have had no heart related symptoms such as chest pain and have no limitations or restrictions on your normal daily activities.</p>
                                        <p>Additionally: </p>
                                        <Ul>
                                            <li>Wait at least 6 months following an episode of angina.</li>
                                            <li>Wait at least 6 months following a heart attack.</li>
                                            <li>Wait at least 6 months after bypass surgery or angioplasty.</li>
                                            <li>Wait at least 6 months after a change in your heart condition that resulted in a change to your medications.</li>
                                        </Ul>
                                        <p>If you have a pacemaker, <div className='emphasis'>you ARE eligible</div> to donate as long as your pulse is between 50 and 100 beats per minute and you meet the other heart disease criteria. 
                                        <div className='emphasis'>You should discuss your situation with your personal healthcare provider and those at the donation site .</div></p>
                                        <Button><a href="http://example.com/" target="_blank" rel="noopener noreferrer">Click Here to make an appointment!</a></Button>
                                        <Button><NavLink to="/FAQ/otherwaystohelp" className='redirect-link'>Not Eligible? Find other ways to help!</NavLink></Button>
                                        </ModalContentNotification>

                                   
                                    
                                ):bleedingCondition && cancer === false && heartDisease === false?(
                                    <ModalContentNotification>
                                        <h1>You may be eligible! please read below</h1>
                                        <p> You indicated that you have a bleeding condition. You will be asked additional questions at the site. If your blood clots abnormally, <div className='emphasis'>you should NOT donate</div> because you may have excessive bleeding where the needle is placed. 
                                            You <div className='emphasis'>should NOT donate</div> if you are taking any "blood thinner" such as:</p>
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
                                        <p> If you are on aspirin, <div className='emphasis'>you ARE eligible donate whole blood</div>. 
                                            However, you must be off of aspirin for at least 2 full days in order to donate platelets by apheresis.</p>
                                        <Button><a href="http://example.com/" target="_blank" rel="noopener noreferrer">Click Here to make an appointment!</a></Button>
                                        <Button><NavLink to="/FAQ/otherwaystohelp" className='redirect-link'>Not Eligible? Find other ways to help!</NavLink></Button>
                                        </ModalContentNotification>


                                ):cancer && heartDisease && bleedingCondition === false?(
                                    <ModalContentNotification>
                                        <h1>You may be eligible! please read below</h1>
                                        <p> You indicated that you have or had cancer. Please know that eligibility depends on the type of cancer and treatment history. If you had leukemia or lymphoma, <div className='emphasis'>you are NOT eligible to donate</div>. 
                                            If you had other types of cancer <div className='emphasis'>you ARE eligible to donate</div>, if the cancer has been treated successfully and it has been more than 12 months since treatment was completed and there has been no cancer recurrence in this time. 
                                            Lower risk in-situ cancers including squamous or basal cell cancers of the skin that have been completely removed and healed do not require a 12-month waiting period.
                                            <div className='emphasis'>You should discuss your situation with those at your donation site</div></p>
                                        <br></br>
                                        <br></br>
                                        <p>Additionally you indicated that you have heart disase. In general, <div className='emphasis'>you ARE eligible</div> as long as you have been medically evaluated and treated, have have had no heart related symptoms such as chest pain and have no limitations or restrictions on your normal daily activities.</p>
                                        <p>Additionally: </p>
                                        <Ul>
                                            <li>Wait at least 6 months following an episode of angina.</li>
                                            <li>Wait at least 6 months following a heart attack.</li>
                                            <li>Wait at least 6 months after bypass surgery or angioplasty.</li>
                                            <li>Wait at least 6 months after a change in your heart condition that resulted in a change to your medications.</li>
                                        </Ul>
                                        <p>If you have a pacemaker, <div className='emphasis'>you ARE eligible</div> to donate as long as your pulse is between 50 and 100 beats per minute and you meet the other heart disease criteria.</p>
                                        <Button><a href="http://example.com/" target="_blank" rel="noopener noreferrer">Click Here to make an appointment!</a></Button>
                                        <Button><NavLink to="/FAQ/otherwaystohelp" className='redirect-link'>Not Eligible? Find other ways to help!</NavLink></Button>
                                    </ModalContentNotification>


                                ):cancer && heartDisease === false && bleedingCondition?(
                                    <ModalContentNotification>
                                        <h1>You may be eligible! please read below</h1>
                                        <p> You indicated that you have or had cancer. Please know that eligibility depends on the type of cancer and treatment history. If you had leukemia or lymphoma, <div className='emphasis'>you are NOT eligible to donate</div>. 
                                            If you had other types of cancer <div className='emphasis'>you ARE eligible to donate</div>, if the cancer has been treated successfully and it has been more than 12 months since treatment was completed and there has been no cancer recurrence in this time. 
                                            Lower risk in-situ cancers including squamous or basal cell cancers of the skin that have been completely removed and healed do not require a 12-month waiting period.
                                            <div className='emphasis'>You should discuss your situation with those at your donation site</div></p>
                                        <br></br>
                                        <br></br>
                                        <p> You also indicated that you have a bleeding condition. You will be asked additional questions at the site. If your blood clots abnormally, <div className='emphasis'>you should NOT donate</div> because you may have excessive bleeding where the needle is placed. 
                                            You <div className='emphasis'>should NOT donate</div> if you are taking any "blood thinner" such as:</p>
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
                                        <p> If you are on aspirin, <div className='emphasis'>you ARE eligible donate whole blood</div>. 
                                            However, you must be off of aspirin for at least 2 full days in order to donate platelets by apheresis.</p>
                                        <Button><a href="http://example.com/" target="_blank" rel="noopener noreferrer">Click Here to make an appointment!</a></Button>
                                        <Button><NavLink to="/FAQ/otherwaystohelp" className='redirect-link'>Not Eligible? Find other ways to help!</NavLink></Button>
                                    </ModalContentNotification>


                                ):heartDisease && cancer === false && bleedingCondition?(
                                    <ModalContentNotification>
                                    <h1>You may be eligible! please read below</h1>
                                    <p> You indicated that you have heart disease. In general, <div className='emphasis'>you ARE eligible</div> as long as you have been medically evaluated and treated, have have had no heart related symptoms such as chest pain and have no limitations or restrictions on your normal daily activities.</p>
                                    <p>Additionally: </p>
                                    <Ul>
                                        <li>Wait at least 6 months following an episode of angina.</li>
                                        <li>Wait at least 6 months following a heart attack.</li>
                                        <li>Wait at least 6 months after bypass surgery or angioplasty.</li>
                                        <li>Wait at least 6 months after a change in your heart condition that resulted in a change to your medications.</li>
                                    </Ul>
                                    <p>If you have a pacemaker, <div className='emphasis'>you ARE eligible</div> to donate as long as your pulse is between 50 and 100 beats per minute and you meet the other heart disease criteria. 
                                    <div className='emphasis'>You should discuss your situation with your personal healthcare provider and those at the donation site .</div></p>
                                    <br></br>
                                    <br></br>
                                    <p> You also indicated that you have a bleeding condition. You will be asked additional questions at the site. If your blood clots abnormally, <div className='emphasis'>you should NOT donate</div> because you may have excessive bleeding where the needle is placed. 
                                            You <div className='emphasis'>should NOT donate</div> if you are taking any "blood thinner" such as:</p>
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
                                    <p> If you are on aspirin, <div className='emphasis'>you ARE eligible donate whole blood</div>. 
                                        However, you must be off of aspirin for at least 2 full days in order to donate platelets by apheresis.</p>
                                        
                                    <Button><a href="http://example.com/" target="_blank" rel="noopener noreferrer">Click Here to make an appointment!</a></Button>
                                    <Button><NavLink to="/FAQ/otherwaystohelp" className='redirect-link'>Not Eligible? Find other ways to help!</NavLink></Button>
                                </ModalContentNotification>


                                ):cancer && heartDisease && bleedingCondition ?(
                                    <ModalContentNotification>
                                    <h1>You may be eligible! please read below</h1>
                                    <p> You indicated that you have heart disease. In general, <div className='emphasis'>you ARE eligible</div> as long as you have been medically evaluated and treated, have have had no heart related symptoms such as chest pain and have no limitations or restrictions on your normal daily activities.</p>
                                    <p>Additionally: </p>
                                    <Ul>
                                        <li>Wait at least 6 months following an episode of angina.</li>
                                        <li>Wait at least 6 months following a heart attack.</li>
                                        <li>Wait at least 6 months after bypass surgery or angioplasty.</li>
                                        <li>Wait at least 6 months after a change in your heart condition that resulted in a change to your medications.</li>
                                    </Ul>
                                    <p>If you have a pacemaker, <div className='emphasis'>you ARE eligible</div> to donate as long as your pulse is between 50 and 100 beats per minute and you meet the other heart disease criteria. 
                                    <div className='emphasis'>You should discuss your situation with your personal healthcare provider and those at the donation site .</div></p>
                                    <br></br>
                                    <br></br>
                                    <p> You also indicated that you have or had cancer. Please know that eligibility depends on the type of cancer and treatment history. If you had leukemia or lymphoma, <div className='emphasis'>you are NOT eligible to donate</div>. 
                                        If you had other types of cancer <div className='emphasis'>you ARE eligible to donate</div>, if the cancer has been treated successfully and it has been more than 12 months since treatment was completed and there has been no cancer recurrence in this time. 
                                        Lower risk in-situ cancers including squamous or basal cell cancers of the skin that have been completely removed and healed do not require a 12-month waiting period.
                                        <div className='emphasis'>You should discuss your situation with those at your donation site</div></p>
                                    <br></br>
                                    <br></br>
                                    <p> You indicated that you have a bleeding condition. You will be asked additional questions at the site. If your blood clots abnormally, <div className='emphasis'>you should NOT donate</div> because you may have excessive bleeding where the needle is placed. 
                                        You <div className='emphasis'>should NOT donate</div> if you are taking any "blood thinner" such as:</p>
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
                                    <p> If you are on aspirin, <div className='emphasis'>you ARE eligible donate whole blood</div>. 
                                        However, you must be off of aspirin for at least 2 full days in order to donate platelets by apheresis.</p>
                                
                                    <Button><a href="http://example.com/" target="_blank" rel="noopener noreferrer">Click Here to make an appointment!</a></Button>
                                    <Button><NavLink to="/FAQ/otherwaystohelp" className='redirect-link'>Not Eligible? Find other ways to help!</NavLink></Button>
                                </ModalContentNotification>


                                ):cancer === false && heartDisease === false && bleedingCondition === false?(
                                    <ModalContentNotification>
                                        <h1>Congratulations, You're Eligible!</h1>
                                        <p>Make sure you are feeling well before your appointment! Also if you are a teen donor please check out <NavLink to="FAQ/eligibility/informationforteens" className='paragraph-link'>our information for teens page!</NavLink> </p>
                                        <Button><a href="http://example.com/" target="_blank" rel="noopener noreferrer">Click Here to make an appointment!</a></Button>
                                    </ModalContentNotification>


                                ):(
                                    <ModalContentNotification>
                                        <h1>Congratulations, You're Eligible!</h1>
                                        <p>Make sure you are feeling well before your appointment! Also if you are a teen donor please check out <NavLink to="FAQ/eligibility/informationforteens" className='paragraph-link'>our information for teens page!</NavLink> </p>
                                        <Button><a href="http://example.com/" target="_blank" rel="noopener noreferrer">Click Here to make an appointment!</a></Button>
                                    </ModalContentNotification>

                                )
                            }
                        </>
                    ):showNotEligible ?(
                        <ModalContentNotification>
                        <h1>Sorry, You're Not Eligible {score} {WholeBloodQuestions.length}</h1>
                        <h3> There are still other ways that you can help!</h3>
                        <Button><NavLink to="/FAQ/otherwaystohelp" className='redirect-link'>Check out our Other Ways To Help page for more info!</NavLink></Button>
                        </ModalContentNotification>

                    ):wholeBloodQuiz ?(
                        <>
                            <ModalContent>
                                <h1>Whole Blood Eligibility Quiz</h1>
                                <div className='question-section'>
                                    <div className='question-text'>{WholeBloodQuestions[quizCurrentQuestion].questionText}</div>
                                </div>
                                <div className='answer-section'>
                                    {WholeBloodQuestions[quizCurrentQuestion].answerOptions.map((answerOption) => (
                                        <button onClick={() => handleQuizAnswerOptionClick (answerOption.isCorrect, quizCurrentQuestion, WholeBloodQuestions)}>{answerOption.answerText}</button>
                                    ))}
                                </div>

                            </ModalContent>
                            <BackButton onClick={() => handleQuizBackClick(quizCurrentQuestion, WholeBloodQuestions)}> Back</BackButton>
                        </>
                        

                    ):powerRedQuiz ?(
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
                            <BackButton onClick={() => handleQuizBackClick(quizCurrentQuestion, PowerRedQuestions)}> Back</BackButton>
                        </>
                    ):plateletQuiz ?(
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
                            <BackButton onClick={() => handleQuizBackClick(quizCurrentQuestion, PlateletQuestions)}> Back</BackButton>
                        </>
                    ):plasmaQuiz ?(
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
                            <BackButton onClick={() => handleQuizBackClick(quizCurrentQuestion, PlasmaQuestions)}> Back</BackButton>
                        </>
                    ):testing ?(
                        <>
                        <ModalContent>
                            <h1>hello</h1>
                            

                        </ModalContent>
                       
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