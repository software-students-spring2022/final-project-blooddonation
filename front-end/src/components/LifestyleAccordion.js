import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { FiPlus, FiMinus } from "react-icons/fi";
import axios from "axios";

const AccordionSection = styled.div`
  flex: 0 0 100%;
  max-width: 100%;
  width: 990px;
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
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  text-align: center;
  margin-top: 0px;
  border-radius: 5px;
  border-bottom: 1px solid #ff0000;
  border-top: 1px solid #ff0000;
  overflow-y: scroll;

  p {
    font-size: 2rem;
  }

  .p-info {
    font-size: 20px;
    margin-top: 100px;
    text-align: center;
  }

  .p-info2 {
    font-size: 20px;
    margin-top: 15px;
    margin-bottom: 15px;
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

  .linkStyle {
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

const LifestyleAccordion = () => {
  const [clicked, setClicked] = useState(false);
  const [LifestyleData, setLifestyleData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");

  const fetchLifestyleData = () => {
    // setMessages([])
    // setLoaded(false)
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/FAQ/eligibility`)
      .then((response) => {
        // axios bundles up all response data in response.data property
        const LifestyleData = response.data.LifestyleData;
        console.log(LifestyleData);
        setLifestyleData(LifestyleData);
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
    fetchLifestyleData();
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
              {LifestyleData.map((item, index) => {
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
                              {item.question === "Age" ? (
                                <>
                                  <p className="p-info2">
                                    You must be at least 17 years old to donate,
                                    or 16 years old with parental/guardian
                                    consent, if allowed by state law. (
                                    <Link
                                      to="./eligibility/informationforteens"
                                      className="linkStyle"
                                    >
                                      Find out more information for teen donors)
                                    </Link>
                                    There is no upper age limit for blood
                                    donation as long as you are well with no
                                    restrictions or limitations to your
                                    activities.
                                  </p>
                                </>
                              ) : answerObj.points.length === 1 ? (
                                <>
                                  {answerObj.points.map((point) => {
                                    return (
                                      <>
                                        <p className="p-info">{point}</p>
                                      </>
                                    );
                                  })}
                                </>
                              ) : (
                                answerObj.points.map((point) => {
                                  return (
                                    <>
                                      <Ul>
                                        <li key={point}>{point}</li>
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

export default LifestyleAccordion;
