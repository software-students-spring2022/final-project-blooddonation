/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
 import { TextField, Input, Stack } from "@mui/material";
 import { useState, useEffect } from "react";
 import axios from "axios";
 import { useParams } from 'react-router-dom';

 const inital_data = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    age: 0
}  

 const EditProfileForm = (props) => {
   const [user, setUser] = useState(inital_data);
   const jwtToken = localStorage.getItem("token"); // the JWT token, if we have already received one and stored it in localStorage

   useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/profile`, {
        headers: { Authorization: `JWT ${jwtToken}` }, // pass the token, if any, to the server
      })
      .then((res) => {
        setUser({...res.data.user});
        console.log(res.data.user);
      })
      .catch((err) => {
        console.log(
          "The server rejected the request for this protected resource... we probably do not have a valid JWT token."
        );
      });
  }, []); 
  
  const handleInput = (e) => {
    console.log(e.target.name, " : ", e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const { id } = useParams();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      const requestData = {
        userId: id, 
        firstName: e.target.firstName.value, 
        lastName: e.target.lastName.value,
        email: e.target.email.value,
        age: e.target.age.value
      };


      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/editprofile/:id`,
        requestData
      );

      alert("Profile successfully saved!")

      console.log(
        `Server response: ${JSON.stringify(response.data, null, 0)}`
      );

    } catch (err) {
      console.log(err);
    }

  };


   return (
     <>
     
     <form onSubmit={handleSubmit}>
     <Stack alignItems="center" spacing={2}>
     <h1>Edit Profile</h1>
         <TextField
           required
           label="First Name"
           value={user.firstName}
           name="firstName"
           onChange = {handleInput}
          //  variant = "standard"
         />
 
         <TextField
           required
           label = "Last Name"
           value={user.lastName}
           name="lastName"
           onChange = {handleInput}
         />
         <TextField
           required
           label = "Email"
           value={user.email}
           name="email"
           onChange = {handleInput}
         />
         <TextField
           required
           label = "Age"
           value={user.age}
           name="age"
           onChange = {handleInput}
         />

          {/* <TextField
           required
           label = "Password"
           value={user.age}
           name="age"
           onChange = {handleInput}
         />
  */}
         <Input type="submit" value="Save">
           Confirm
         </Input>
         </Stack>
       </form>

    
     </>
   );
 };
 
 // make this component available to be imported into any other file
 export default EditProfileForm;
 