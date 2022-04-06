import "./styles/ContactUs.css";
import { Container, Typography } from "@mui/material";

/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const ContactUs = (props) => {
  return (
    <>
      <div className="contact-body">
        <Container maxWidth="md">
          <h1 className="contact-h1">Contact Us</h1>
          <Typography
            variant="body"
            component="div"
            sx={{ textAlign: "left", margin: 2 }}
          >
            If you have any question contact us by the following ways{" "}
          </Typography>
          <div className="contact">
            <div className="contactItem">
              <div className="ion-box">
                <i className="fa fa-envelope"></i>
              </div>
              <div>
                <h3 style={{ textAlign: "left", color: "gray" }}>Email</h3>
                <p>bloodonation@gmail.com</p>
              </div>
            </div>
            <div className="contactItem">
              <div className="ion-box">
                <i className="fa fa-phone"></i>
              </div>
              <div>
                <h3 style={{ textAlign: "left", color: "gray" }}>Phone</h3>
                <p>1(167)-952-3697</p>
              </div>
            </div>
            <div className="contactItem">
              <div className="ion-box">
                <i className="fa fa-comment"></i>
              </div>
              <div>
                <h3 style={{ textAlign: "left", color: "gray" }}>Message</h3>
                <p>This is our live chat channel</p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

// make this component available to be imported into any other file
export default ContactUs;
