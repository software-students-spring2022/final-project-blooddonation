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
  margin-top: 200px
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
    border-top: 2px solid white;
    
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

      .linkStyle{
        color: red;
        font-weight: bold;
        text-decoration: underline;
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


  return (
    <IconContext.Provider value={{ color: '#ff0000', size: '25px' }}>
      <AccordionSection>
        <Container>
          {FAQData.map((item, index) => {
            return (
              <>
                <Wrap onClick={() => toggle(index)} key={index}>
                  <h1>{item.question}</h1>
                  <span>{clicked === index ? <FiMinus /> : <FiPlus />}</span>
                </Wrap>
                {clicked === index ? (
                  <Dropdown>
                   { 
                    item.answer.map((answerObj)=>{
                      return(
                        <>
                          <h2>{answerObj.subHeading}</h2>
                          { answerObj.subHeading === "Registration" ? 
                              <>
                                <Ul>
                                  <li>You'll sign in and go over <Link to="./eligibility" className='linkStyle'>basic eligibility</Link></li>
                                  <li>You'll be asked to show ID, such as your driver's license</li>
                                  <li>You'll read some information about donating blood</li>
                                  <li>You'll be asked for your complete address.  
                                      Your address needs to be complete (including PO Box, street/apartment number) and 
                                      the place where you will receive your mail 8 weeks from donation</li>

                                </Ul>
                              </>
                          
                            :answerObj.subHeading === "Your donation" ?
                            
                                <>
                                  <Ul>
                                    <li>If you're donating whole blood, an area on your arm will be cleansed and a brand new 
                                        sterile needle will be inserted for the blood draw. (This feels like a quick pinch 
                                        and is over in seconds.)</li>
                                    <li>Other types of donations, like <Link to="./eligibility/plateletdonation" className='linkStyle'>platelets</Link>, are made using 
                                        an aphaeresis machine that will be connected to both arms.</li>
                                    <li>A <Link to="./eligibility/wholeblooddonation" className='linkStyle'>whole blood donation</Link> takes 8-10 minutes, during which 
                                        you'll be seated comfortably or lying down.</li>
                                    <li>When about a pint of whole blood has been collected, the donation is complete and a staff 
                                        person will place a bandage on your arm.</li>
                                    <li>For platelets, the aphaeresis machine will collect a small amount of blood, remove the platelets, 
                                        and return the rest of the blood through your other arm; this cycle will be repeated several times 
                                        for about 2 hours.</li>

                                  </Ul>
                                </>

                            :answerObj.subHeading === "Before Your Donation" ?
                            
                                <>
                                  <Ul>
                                    <li>Make an Appointment! Select a donation type and find a convenient time that works best for you. 
                                    <Link to="/finddonationsite" className='linkStyle'>Find a donation site!</Link></li>
                                    <li>Have iron-rich foods, such as red meat, fish, poultry, beans, spinach, iron-fortified cereals or raisins.</li>
                                    <li>Get a good night's rest the night before your donation, eat healthy foods and drink plenty of liquids.</li>
                                    <li>If you are donating platelets Don't take aspirin for 2 days before your appointment.</li>
                                    <li>Ask a friend to donate at the same time to support each other and help with the national blood shortage! </li>

                                  </Ul>
                                </>

                            :answerObj.points.map((point)=>{
                            return(
                              <>
                                <Ul>
                                  <li>{point}</li>
                                </Ul>
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