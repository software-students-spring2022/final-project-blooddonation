/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
import { TextField, Button, Input, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const CreateAccount = ({tokenPresent, setTokenPresent}) => {
  const [showPassword] = useState(false);
  const [young, setYoung] = useState(false);

  const [response, setResponse] = useState({}); // the API will return an object with a JWT token, if the user logs in successfully
  const [errorMessage, setErrorMessage] = useState("");

  // if the user's logged-in status changes, save the token we receive from the server
  useEffect(() => {
    // if the user is logged-in, save the token to local storage
    if (response.success && response.token) {
      console.log(`User successfully logged in: ${response.email}`);
      localStorage.setItem("token", response.token); // store the token into localStorage
      setTokenPresent(true);
    }
  }, [response]);

  // what to do when the user clicks the submit buton on the form
  const handleSubmit = async (e) => {
    // prevent the HTML form from actually submitting... we use React's javascript code instead
    e.preventDefault();
    console.log("here");

    try {
      // create an object with the data we want to send to the server
      if (isNaN(e.target.age.value)) {
        setErrorMessage("Please enter a valid age");
      } else {
        if (e.target.age.value < 17) {
          setYoung(true);
        } else {
          const requestData = {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            password: e.target.password.value,
            age: e.target.age.value,
            // gets the value of the field in the submitted form with name='password',
          };
          // send a POST request with the data to the server api to authenticate
          const response = await axios.post(
            `${process.env.REACT_APP_SERVER_HOSTNAME}/createaccount`,
            requestData
          );
          // store the response data into the data state variable
          console.log(
            `Server response: ${JSON.stringify(response.data, null, 0)}`
          );
          setResponse(response.data);
        }
      }
    } catch (err) {
      // request failed... user entered invalid credentials
      console.log(err);
      console.log(response.data);
      setErrorMessage("An account with that email already exists");
    }
  };

  return (
    <>
      {response.success ? (
        <Navigate to="/createaccount/eligibilityquestionnaire" />
      ) : (
        <>
          {young ? (
            <>
              <h1>Sorry, you are too young to create an account</h1>
              <h3> There are still other ways that you can help!</h3>
              <Button>
                <Link to="/FAQ/otherwaystohelp" className="redirect-link">
                  Check out our Other Ways To Help page for more info!
                </Link>
              </Button>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <Stack alignItems="center" spacing={2}>
                <h1>Create Account</h1>
                {errorMessage ? <p className="error">{errorMessage}</p> : ""}
                <TextField
                  sx={{ width: "25%" }}
                  required
                  label="First Name"
                  name="firstName"
                />

                <TextField
                  sx={{ width: "25%" }}
                  required
                  label="Last Name"
                  name="lastName"
                />
                <TextField
                  sx={{ width: "25%" }}
                  required
                  label="Age"
                  name="age"
                />
                <TextField
                  sx={{ width: "25%" }}
                  required
                  label="Email"
                  name="email"
                />
                <TextField
                  sx={{ width: "25%" }}
                  type={showPassword ? "text" : "password"}
                  required
                  label="Password"
                  name="password"
                />
              </Stack>
              <Input type="submit" value="Submit">
                Register
              </Input>
              <br></br>
              <h1>Already have an account?</h1>
              <Button component={Link} to={"/login"}>
                Login
              </Button>
            </form>
          )}
        </>
      )}
    </>
  );
};

// make this component available to be imported into any other file
export default CreateAccount;
