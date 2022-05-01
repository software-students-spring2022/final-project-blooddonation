
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const Logout = ({tokenPresent, setTokenPresent}) => {


  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("token");
    setTokenPresent(false);
    navigate('/');
  }

  const handleCancel = () => {
    navigate('/profile');
  }


  return (
    <>
      <div>
        <h3 style={{ backgroundColor: "whitesmoke", padding: "30px", borderRadius: "18px", marginBottom: "20px" }}>Are you sure you want to logout? </h3>
      </div>
      <div>
        <Button onClick={handleLogout} style={{ backgroundColor: "red", color: "white" }}>
          Yes,Logout
        </Button>
        <Button onClick={handleCancel} style={{ border: "1px solid grey", marginLeft: "20px" }}>
          No,Cancel
        </Button>
      </div>
    </>
  );

}


export default Logout;
