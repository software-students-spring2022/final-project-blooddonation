/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
import { useForm } from "react-hook-form";
import { TextField, Button, Input, Stack } from '@mui/material';
import { useState } from "react";
import { Link } from 'react-router-dom'

const CreateAccount = props => {
const [accountData, setAccountData] = useState({
    firstName:"",
    lastName:"",
    email:"", 
    password: ""
})
const { handleSubmit } = useForm();

const onSubmit = (accountData) => {
    // Send user data to backend here
    console.log(accountData)
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
          <Stack alignItems = 'center' spacing = {2}>
          <t>Create Account</t>
          <TextField 
            sx= {{ width: '25%'}}
            required 
            label = "First Name"
            value = {accountData.firstName}
            name = "firstName"
            onChange = {(e) => setAccountData({...accountData, firstName: e.target.value})}
          />

        <TextField
            sx= {{ width: '25%'}} 
            required 
            label = "Last Name"
            value = {accountData.lastName}
            name = "lastName"
            onChange = {(e) => setAccountData({...accountData, lastName: e.target.value})}
          />
        <TextField 
            sx= {{ width: '25%'}}
            required 
            label = "Email"
            value = {accountData.email}
            name = "email"
            onChange = {(e) => setAccountData({...accountData, email: e.target.value})}
          />
        <TextField 
            sx= {{ width: '25%'}}
            required 
            label = "Password"
            value = {accountData.password}
            name = "password"
            onChange = {(e) => setAccountData({...accountData, password: e.target.value})}
          />
          </Stack>
               
        <Input type = "submit" value = "Submit">Register</Input><br></br>
        <t>Already have an account?</t>
        <Button component = {Link} to = {'/login'}>Login</Button>
      </form>
    </>
  )
}


// make this component available to be imported into any other file
export default CreateAccount