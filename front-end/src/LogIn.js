import { TextField, Button, Stack, Input } from "@mui/material";
import { useState, useEffect } from "react";
import { Link, useSearchParams, Navigate } from "react-router-dom";
// import { accountData } from "./components/AccountData";
import axios from "axios";

/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const LogIn = ({tokenPresent, setTokenPresent}) => {
  let [urlSearchParams] = useSearchParams(); // get access to the URL query string parameters
  const [showPassword] = useState(false);

  // create state variables to hold username and password
  const [response, setResponse] = useState({}); // the API will return an object with a JWT token, if the user logs in successfully
  const [errorMessage, setErrorMessage] = useState("");

  // if the user's logged-in status changes, save the token we receive from the server
  useEffect(() => {
    // if the user is logged-in, save the token to local storage
    if (response.success && response.token) {
      console.log(`User successfully logged in: ${response.username}`);
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
      const requestData = {
        email: e.target.email.value, // gets the value of the field in the submitted form with name='username'
        password: e.target.password.value, // gets the value of the field in the submitted form with name='password',
      };
      // send a POST request with the data to the server api to authenticate
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/login`,
        requestData
      );
      // store the response data into the data state variable
      console.log(`Server response: ${JSON.stringify(response.data, null, 0)}`);
      setResponse(response.data);
    } catch (err) {
      // request failed... user entered invalid credentials
      console.log(err);
      setErrorMessage("You entered invalid credentials.");
    }
  };
  return (
    <>
      {response.success ? (
        <Navigate to="/profile" />
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <Stack alignItems="center" spacing={2}>
              <h1>Login</h1>
              {errorMessage ? <p className="error">{errorMessage}</p> : ""}
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
              Log In
            </Input>
            <br></br>
            <br></br>
            <h1>Don't have an Account?</h1>
            <Button component={Link} to={"/createaccount"}>
              Create an Account
            </Button>
          </form>
        </>
      )}
    </>
  );
};

// make this component available to be imported into any other file
export default LogIn;
