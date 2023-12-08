import React, { useState, useEffect } from "react";
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

const Ul2 = styled.div`
  list-style: none;
  padding-left: 20px;

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

const STDAccordion = () => {
  const [clicked, setClicked] = useState(false);

  const [STDData, setSTDData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");

  const fetchSTDData = () => {
    // setMessages([])
    // setLoaded(false)
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/FAQ/eligibility`)
      .then((response) => {
        // axios bundles up all response data in response.data property
        const STDData = response.data.STDData;
        console.log(STDData);
        setSTDData(STDData);
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
    fetchSTDData();
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
              {STDData.map((item, index) => {
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
                              {item.question === "HIV, AIDS" ? (
                                <>
                                  <p className="p-info2">
                                    You should not give blood if you have AIDS
                                    or have ever had a positive HIV test, or if
                                    you have done something that puts you at
                                    risk for becoming infected with HIV. You are
                                    at risk for getting infected if you:
                                  </p>
                                  {answerObj.points.map((point) => {
                                    return (
                                      <>
                                        <Ul2>
                                          <li key={point}>{point}</li>
                                        </Ul2>
                                      </>
                                    );
                                  })}

                                  <p className="p-info2">
                                    You should not give blood if you have any of
                                    the following conditions that can be signs
                                    or symptoms of HIV/AIDS:
                                  </p>
                                  <>
                                    <Ul2>
                                      <li key="fever2">Fever</li>
                                      <li key="enlarged2">
                                        Enlarged lymph glands
                                      </li>
                                      <li key="sore2">Sore throat</li>
                                      <li key="rash2">Rash</li>
                                    </Ul2>
                                  </>
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

export default STDAccordion;
