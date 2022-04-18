import "./styles/Profile.css";
import ProfileCard from "./components/ProfileCard.js";
import ProfileImage from "./assets/ProfilePlaceholder.jpg";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Logout from "./Logout";
/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */

//on line 20 we can instead check if the user is authenticated and if they are then display that user's info
//when displaying the user info add a check to see if their eligibility array is of length 0 and if it is then display a message
// telling them that they are not eligible to donate anything and give link to other ways to help page
//if their age is below 17 tell them that they are too young on the profile page

const Profile = (props) => {
  const [user, setUser] = useState();
  const jwtToken = localStorage.getItem("token"); // the JWT token, if we have already received one and stored it in localStorage
  console.log(`JWT token: ${jwtToken}`); // debugging

  const [response, setResponse] = useState({}); // we expect the server to send us a simple object in this case
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true); // if we already have a JWT token in local storage, set this to true, otherwise false

  // try to load the protected data from the server when this component first renders
  useEffect(() => {
    // send the request to the server api, including the Authorization header with our JWT token in it
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/profile`, {
        headers: { Authorization: `JWT ${jwtToken}` }, // pass the token, if any, to the server
      })
      .then((res) => {
        setResponse(res.data); // store the response data
        setUser(res.data.user);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(
          "The server rejected the request for this protected resource... we probably do not have a valid JWT token."
        );
        setIsLoggedIn(false); // update this state variable, so the component re-renders
      });
  }, []); // es

  return (
    <>
      <div className="profilebody">
        {user ? (
          <>
            {console.log(user)}
            <Button component={Link} to={`/editprofile/${user.id}`}>
              Edit Profile
            </Button>
            <Button component={Link} to={"/logout"}>
              Log Out
            </Button>
            <ProfileCard
              text={{ Name: user.firstName, Age: user.age }}
              image={ProfileImage}
            />
            {user.eligible.length ? (
              <>
                <ProfileCard
                  title="You are eligible for these blood donations"
                  text_chip={user.eligible}
                />
                <Button component={Link} to={"/finddonationsite"}>
                  Donate Now
                </Button>
              </>
            ) : (
              <>
                <h3>You are not eligible for any blood donations</h3>
                <Button component={Link} to={"/FAQ/otherwaystohelp"}>
                  Other Ways to Help
                </Button>
              </>
            )}

            <Button
              component={Link}
              to={"/createaccount/eligibilityquestionnaire"}
            >
              Take Quiz Again
            </Button>
          </>
        ) : (
          <>
            <h1>
              Login to see what types of blood donation you're eligible for!
            </h1>
            <Button component={Link} to={"/login"}>
              Login
            </Button>
          </>
        )}
      </div>
    </>
  );
};

// make this component available to be imported into any other file
export default Profile;
