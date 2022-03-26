import { TextField, Button, Stack } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { accountData } from "./components/AccountData";

/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const LogIn = (props) => {
  const [LoginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    // Send user data to backend here
    e.preventDefault();
    console.log(LoginData);
  };

  const [showPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLoginData = () => {
    const person = accountData.filter((personObj) => {
      return personObj.email === LoginData.email;
    });
    person[0].loggedIn = true;
    console.log(
      accountData.filter((personObj) => {
        return personObj.email === LoginData.email;
      })
    );
  };

  return (
    <>
      {loggedIn}
      <form onSubmit={handleSubmit}>
        <Stack alignItems="center" spacing={2}>
          <h1>Login</h1>
          <TextField
            sx={{ width: "25%" }}
            required
            label="Email"
            value={LoginData.email}
            name="email"
            onChange={(e) =>
              setLoginData({ ...LoginData, email: e.target.value })
            }
          />
          <TextField
            sx={{ width: "25%" }}
            type={showPassword ? "text" : "password"}
            required
            label="Password"
            value={LoginData.password}
            name="password"
            onChange={(e) =>
              setLoginData({ ...LoginData, password: e.target.value })
            }
          />
        </Stack>

        <Button component={Link} to={"/profile"} onClick={handleLoginData()}>
          Login
        </Button>
        <br></br>
        <h1>Don't have an Account?</h1>
        <Button component={Link} to={"/createaccount"}>
          Create an Account
        </Button>
      </form>
    </>
  );
};

// make this component available to be imported into any other file
export default LogIn;
