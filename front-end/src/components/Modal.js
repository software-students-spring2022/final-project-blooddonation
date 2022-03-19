import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useSpring, animated } from 'react-spring';
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
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 90;
  border-radius: 10px;
`;



const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  p {
    margin-bottom: 1rem;
  }
  button {
    padding: 10px 24px;
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


    

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [showLogin, setLogin] = useState(false);
    const [showCreate, setCreate] = useState(false);
    const [showEnd, setEnd] = useState(false);
    const [score, setScore] = useState(0);
    //const [start, setStart] = useState(false);

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

                        <button onClick={() => handleBackClick()}>back</button>
                        </ModalContent>


                    ):showEnd ?(
                        <ModalContent>
                        <h1>End</h1>

                        
                        </ModalContent>

                    )
                    :(
                        <>
                            <div className='question-section'>
                                <div className='question-text'>{questions[currentQuestion].questionText}</div>
                            </div>
                            <div className='answer-section'>
                                {questions[currentQuestion].answerOptions.map((answerOption) => (
                                    <button onClick={() => handleAnswerOptionClick(answerOption.isCorrect, currentQuestion)}>{answerOption.answerText}</button>
                                ))}
                            </div>
                        </>
                    )
                    
                    }
                <CloseModalButton
                    aria-label='Close modal'
                    onClick={() => setShowModal(prev => !prev)}
                />
                </ModalWrapper>
            </animated.div>
            </Background>
        ) : null}
        </>
    );
};