import './styles/Profile.css'
import ProfileCard from './components/ProfileCard.js'
import ProfileImage from './assets/ProfilePlaceholder.jpg';
import { Button } from '@mui/material';
/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Profile = props => {
  return (
    <>
      <body className='profilebody'>
      <Button>Edit Profile</Button>
      <ProfileCard 
        title = "Hi, Rachel!" 
        text = {{"Name": "Rachel", "Age" : 13, "BloodType": "Type A"}} 
        image = {ProfileImage}
      />
      <ProfileCard 
        title = "You are eligible for these blood donations" 
        text_chip = {["Whole Blood", "Power Red", "Platelet"]}
      />
      {/* Navigate to another page */}
      <Button>Donate Now</Button>
      <Button>Take Quiz Again</Button>
      </body>
     
      {/* to do add button */}
    </>
  )
}


// make this component available to be imported into any other file
export default Profile