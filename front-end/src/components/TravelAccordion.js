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

const TravelAccordion = () => {
  const [clicked, setClicked] = useState(false);

  const [TravelData, setTravelData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");

  const fetchTravelData = () => {
    // setMessages([])
    // setLoaded(false)
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/FAQ/eligibility`)
      .then((response) => {
        // axios bundles up all response data in response.data property
        const TravelData = response.data.TravelData;
        console.log(TravelData);
        setTravelData(TravelData);
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
    fetchTravelData();
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
              {TravelData.map((item, index) => {
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
                              {item.question === "Travel" ? (
                                <>
                                  <p className="p-info2">
                                    You can be exposed to malaria through travel
                                    and travel in some areas can sometimes defer
                                    donors. If you have traveled outside of the
                                    United States and Canada, your travel
                                    destinations will be reviewed at the time of
                                    donation.
                                  </p>
                                  <p className="p-info2">
                                    Malaria is transmitted by the bite of
                                    mosquitoes found in certain countries and
                                    may be transmitted to patients through blood
                                    transfusion. Blood donations are not tested
                                    for malaria because there is no sensitive
                                    blood test available for malaria.
                                  </p>
                                  <p className="p-info2">
                                    If you have traveled or lived in a
                                    malaria-risk country, we may require a
                                    waiting period before you can donate blood
                                  </p>
                                  {answerObj.points.map((point) => {
                                    return (
                                      <>
                                        <Ul2>
                                          <li>{point}</li>
                                        </Ul2>
                                      </>
                                    );
                                  })}

                                  <p className="p-info2">
                                    People who have spent long periods of time
                                    in countries where "mad cow disease" is
                                    found are not eligible to donate.
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
                                        <li>{point}</li>
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

export default TravelAccordion;
