/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
import { useForm } from "react-hook-form";
import { TextField, Input } from "@mui/material";
import { useState } from "react";

const ProfileForm = (props) => {
  const [accountData, setAccountData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { handleSubmit } = useForm();

  const onSubmit = (accountData) => {
    console.log(accountData);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          required
          label="First Name"
          value={accountData.firstName}
          name="firstName"
          onChange={(e) =>
            setAccountData({ ...accountData, firstName: e.target.value })
          }
        />

        <TextField
          required
          label="Last Name"
          value={accountData.lastName}
          name="lastName"
          onChange={(e) =>
            setAccountData({ ...accountData, lastName: e.target.value })
          }
        />
        <TextField
          required
          label="Email"
          value={accountData.email}
          name="email"
          onChange={(e) =>
            setAccountData({ ...accountData, email: e.target.value })
          }
        />
        <TextField
          required
          label="Password"
          value={accountData.password}
          name="password"
          onChange={(e) =>
            setAccountData({ ...accountData, password: e.target.value })
          }
        />

        <Input type="submit" value="Submit">
          Create Account
        </Input>
      </form>
    </>
  );
};

// make this component available to be imported into any other file
export default ProfileForm;
