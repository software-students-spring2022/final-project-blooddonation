import "./styles/Profile.css";
import ProfileCard from "./components/ProfileCard.js";
import ProfileImage from "./assets/ProfilePlaceholder.jpg";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
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
  const [user, setUser] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");

  const fetchUsers = () => {
    // setMessages([])
    // setLoaded(false)
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/profile`)
      .then((response) => {
        // axios bundles up all response data in response.data property
        const user = response.data.user;
        console.log(user);
        setUser(user);
        setLoaded(true);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        // the response has been received, so remove the loading icon
        setLoaded(true);
      });
  };

  const addUserToList = (user) => {
    const newMessages = [...user, user]; // make an array with all the old values plus the new one
    setUser(newMessages); // save the new array
  };

  // set up loading data from server when the component first loads
  useEffect(() => {
    // fetch messages this once
    fetchUsers();

    // set a timer to load data from server every n seconds
    const intervalHandle = setInterval(() => {
      fetchUsers();
    }, 5000);

    // return a function that will be called when this component unloads
    return (e) => {
      // clear the timer, so we don't still load messages when this component is not loaded anymore
      clearInterval(intervalHandle);
    };
  }, []); // p

  return (
    <>
      <div className="profilebody">
        {loaded ? (
          <>
            <Button>Edit Profile</Button>
            <ProfileCard
              title="Hi, Rachel!"
              text={{ Name: user.firstName, Age: user.age }}
              image={ProfileImage}
            />
            <ProfileCard
              title="You are eligible for these blood donations"
              text_chip={user.eligible}
            />
            {/* Navigate to another page */}
            <Button>Donate Now</Button>
            <Button>Take Quiz Again</Button>
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

      {/* to do add button */}
    </>
  );
};

// make this component available to be imported into any other file
export default Profile;
