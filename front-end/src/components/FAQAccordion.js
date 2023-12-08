import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { FiPlus, FiMinus } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import axios from "axios";

const AccordionSection = styled.div`
  flex: 0 0 100%;
  max-width: 100%;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin-left: 0px;
  margin-top: 0px
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
  border-top: 1px solid #ff0000;
  border-radius: 5px;

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
  border-radius: 5px;
  border-bottom: 1px solid #ff0000;
  border-top: 1px solid #ff0000;
  overflow-y: scroll;
  



  p {
    font-size: 2rem;
  }

  .p-info {
    font-size: 20px;
    margin-top 100px;
    text-align: center;
  }

  .p-other {
    font-size: 1rem;
  }

  h2 {
    padding: 1rem;
    font-size: 2rem;
    padding-top: 5px;
    border-top: 2px solid white;
    text-decoration: underline;
    color: white;
    
  }

  .linkStyle{
    color: red;
    font-weight: bold;
    text-decoration: underline;
    
  }
  
`;

const Ul = styled.div`
  list-style: none;

  li {
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

  .linkStyle {
    color: red;
    font-weight: bold;
    text-decoration: underline;
    font-size: 20px;
  }
`;

const Accordion = () => {
  const [clicked, setClicked] = useState(false);
  const [FAQData, setFAQData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");

  const fetchFAQData = () => {
    // setMessages([])
    // setLoaded(false)
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/FAQ`)
      .then((response) => {
        // axios bundles up all response data in response.data property
        const FAQData = response.data.FAQData;
        console.log(FAQData);
        setFAQData(FAQData);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        // the response has been received, so remove the loading icon
        setLoaded(true);
      });
  };

  // set up loading data from server when the component first loads
  useEffect(() => {
    // fetch messages this once
    fetchFAQData();
  }, []); // p

  const toggle = (index) => {
    if (clicked === index) {
      //if clicked question is already active, then close it
      return setClicked(null);
    }

    setClicked(index);
  };

  return (
    <>
      {loaded ? (
        <IconContext.Provider value={{ color: "#ff0000", size: "25px" }}>
          <AccordionSection>
            <Container>
              {FAQData.map((item, index) => {
                return (
                  <>
                    <Wrap onClick={() => toggle(index)} key={index}>
                      <h1>{item.question}</h1>
                      <span>
                        {clicked === index ? <FiMinus /> : <FiPlus />}
                      </span>
                    </Wrap>
                    {clicked === index ? (
                      <Dropdown>
                        {item.answer.map((answerObj) => {
                          return (
                            <>
                              {answerObj.subHeading !== "" &&
                              answerObj.subHeading !== "Eligible" ? (
                                <h2>{answerObj.subHeading}</h2>
                              ) : (
                                <></>
                              )}

                              {answerObj.subHeading === "Registration" ? (
                                <>
                                  <Ul>
                                    <li key="reg1">
                                      You'll sign in and go over{" "}
                                      <NavLink
                                        to="./eligibility"
                                        className="linkStyle"
                                      >
                                        basic eligibility
                                      </NavLink>
                                    </li>
                                    <li key="reg2">
                                      You'll be asked to show ID, such as your
                                      driver's license
                                    </li>
                                    <li key="reg3">
                                      You'll read some information about
                                      donating blood
                                    </li>
                                    <li key="reg4">
                                      You'll be asked for your complete address.
                                      Your address needs to be complete
                                      (including PO Box, street/apartment
                                      number) and the place where you will
                                      receive your mail 8 weeks from donation
                                    </li>
                                  </Ul>
                                </>
                              ) : answerObj.subHeading === "Your donation" ? (
                                <>
                                  <Ul>
                                    <li key="don1">
                                      If you're donating whole blood, an area on
                                      your arm will be cleansed and a brand new
                                      sterile needle will be inserted for the
                                      blood draw. (This feels like a quick pinch
                                      and is over in seconds.)
                                    </li>
                                    <li key="don2">
                                      Other types of donations, like{" "}
                                      <NavLink
                                        to="./eligibility/plateletdonation"
                                        className="linkStyle"
                                      >
                                        platelets
                                      </NavLink>
                                      , are made using an aphaeresis machine
                                      that will be connected to both arms.
                                    </li>
                                    <li key="don3">
                                      A{" "}
                                      <NavLink
                                        to="./eligibility/wholeblooddonation"
                                        className="linkStyle"
                                      >
                                        whole blood donation
                                      </NavLink>{" "}
                                      takes 8-10 minutes, during which you'll be
                                      seated comfortably or lying down.
                                    </li>
                                    <li key="don4">
                                      When about a pint of whole blood has been
                                      collected, the donation is complete and a
                                      staff person will place a bandage on your
                                      arm.
                                    </li>
                                    <li key="don5">
                                      For platelets, the aphaeresis machine will
                                      collect a small amount of blood, remove
                                      the platelets, and return the rest of the
                                      blood through your other arm; this cycle
                                      will be repeated several times for about 2
                                      hours.
                                    </li>
                                  </Ul>
                                </>
                              ) : answerObj.subHeading ===
                                "Before Your Donation" ? (
                                <>
                                  <Ul>
                                    <li key="bef1">
                                      Make an Appointment! Select a donation
                                      type and find a convenient time that works
                                      best for you.
                                      <NavLink
                                        to="/finddonationsite"
                                        className="linkStyle"
                                      >
                                        Find a donation site!
                                      </NavLink>
                                    </li>
                                    <li key="bef2">
                                      Have iron-rich foods, such as red meat,
                                      fish, poultry, beans, spinach,
                                      iron-fortified cereals or raisins.
                                    </li>
                                    <li key="bef3">
                                      Get a good night's rest the night before
                                      your donation, eat healthy foods and drink
                                      plenty of liquids.
                                    </li>
                                    <li key="bef4">
                                      If you are donating platelets Don't take
                                      aspirin for 2 days before your
                                      appointment.
                                    </li>
                                    <li key="bef5">
                                      Ask a friend to donate at the same time to
                                      support each other and help with the
                                      national blood shortage!{" "}
                                    </li>
                                  </Ul>
                                </>
                              ) : answerObj.subHeading === "Eligible" ? (
                                <>
                                  <Ul>
                                    <p>
                                      These are the basic requirements for most
                                      donations:
                                    </p>
                                    <br></br>
                                    <li key="rule1">
                                      You must be in good health. You generally
                                      feel well, even if you're being treated
                                      for a chronic condition.
                                    </li>
                                    <li key="rule2">
                                      In most states you must be 17 years old.
                                      16 year olds may donate with parental
                                      permission if allowed by state law. If
                                      you're a teen donor check out our{" "}
                                      <NavLink
                                        to="./eligibility/informationforteens"
                                        className="linkStyle"
                                      >
                                        information for teens page!
                                      </NavLink>
                                    </li>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                  </Ul>
                                  <p className="p-other">
                                    <NavLink to="/login" className="linkStyle">
                                      Create a profile and take a quiz to
                                      determine your eligibility for each type
                                      of blood donation (Whole Blood Donation,
                                      Power Red Donation (Double Red Cell),
                                      Platelet Donation ,Plasma Donation)
                                    </NavLink>
                                  </p>
                                </>
                              ) : answerObj.subHeading === "" ? (
                                answerObj.points.map((point) => {
                                  return (
                                    <>
                                      <p className="p-info" key={point}>
                                        {point}
                                      </p>
                                    </>
                                  );
                                })
                              ) : (
                                answerObj.points.map((point) => {
                                  return (
                                    <>
                                      <Ul>
                                        <li key={point}> {point}</li>
                                      </Ul>
                                    </>
                                  );
                                })
                              )}
                            </>
                          );
                        })}
                      </Dropdown>
                    ) : null}
                  </>
                );
              })}
            </Container>
          </AccordionSection>
        </IconContext.Provider>
      ) : null}
    </>
  );
};

export default Accordion;
