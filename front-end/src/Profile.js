import "./styles/Profile.css";
import ProfileCard from "./components/ProfileCard.js";
import ProfileImage from "./assets/ProfilePlaceholder.jpg";
import { Button } from "@mui/material";
import { accountData } from "./components/AccountData";
import { Link } from "react-router-dom";
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
  return (
    <>
      <div className="profilebody">
        {accountData[0].loggedIn ? (
          <>
            <Button>Edit Profile</Button>
            <ProfileCard
              title="Hi, Rachel!"
              text={{ Name: "Rachel", Age: 13, BloodType: "Type A" }}
              image={ProfileImage}
            />
            <ProfileCard
              title="You are eligible for these blood donations"
              text_chip={["Whole Blood", "Power Red", "Platelet"]}
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
