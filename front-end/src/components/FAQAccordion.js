import React, { useState } from 'react';
import { FAQData } from './FAQData';
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { FiPlus, FiMinus } from 'react-icons/fi';
import {Link} from 'react-router-dom'

const AccordionSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 900px;
  margin-left: 250px;
  margin-left: 250px;
  position: absolute;
`;

const Container = styled.div`
  top: 5%;
`;

const Wrap = styled.div`
  background: #272727;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  cursor: pointer;
  width: 100%;


  h1 {
    padding: 2rem;
    font-size: 2rem;
  }
  h2 {
    padding: 1rem;
    font-size: 2rem;
    
  }
  span {
    margin-right: 1.5rem;
  }
`;

const Dropdown = styled.div`
  background: #1c1c1c;
  color: #ffffff;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  text-align: center;
  margin-top:0px;
  border-bottom: 1px solid #ff0000;
  border-top: 1px solid #ff0000;
  transition: all 0.5s cubic-bezier(0,1,0,1);
  overflow-y: scroll;

  p {
    font-size: 2rem;
  }

  h2 {
    padding: 1rem;
    font-size: 2rem;
    padding-top: 5px;
    border-top: 2px solid red;
    
  }
  
`;

const Ul = styled.div`
    list-style: none;

   
   

      li:before {
        content: "• "; 
        color: red; 
        font-weight: bold;
        font-size: 30px; 
        display: inline-block; 
        width: 1em; 
      }
`;
  






const Accordion = () => {
  const [clicked, setClicked] = useState(false);

  const toggle = index => {
    if (clicked === index) {
      //if clicked question is already active, then close it
      return setClicked(null);
    }

    setClicked(index);
  };

  let count = 1;

  return (
    <IconContext.Provider value={{ color: '#ff0000', size: '25px' }}>
      <AccordionSection>
        <Container>
          {FAQData.map((item, index, count) => {
            return (
              <>
                <Wrap onClick={() => toggle(index)} key={index}>
                  <h1>{item.question}</h1>
                  <span>{clicked === index ? <FiMinus /> : <FiPlus />}</span>
                </Wrap>
                {clicked === index ? (
                  <Dropdown>
                   {item.answer.map((answerObj)=>{
                     return(
                       <>
                        <h2>{answerObj.subHeading}</h2>
                        {answerObj.points.map((point)=>{
                          return(
                            <>
                              <Ul>
                                <li>{point}</li>
                              </Ul>
                              <p></p>
                            </>
                          )
                          })}
                       </>
                      
                      
                     )

                   })}
                  </Dropdown>
                ) : null}
              </>
            );
          })}
        </Container>
      </AccordionSection>
    </IconContext.Provider>
  );
};

export default Accordion;