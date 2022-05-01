import "./styles/OtherWaysToHelp.css";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
  Button,
} from "@mui/material";
import { Section1, Section2, Section3 } from "./components/OtherWaysToHelpData";

/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const OtherWaysToHelp = (props) => {
  return (
    <>
      <body className="help-body">
      <h1 style={{ margin: "20px" }}>Other Ways To Help!</h1>

        <Grid container>
          <Grid item xs={7}>
            <Card className="home-card">
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ textAlign: "left", margin: 2 }}
                >
                  {Section1.section}
                </Typography>
                <Typography 
                  variant="h6"
                  style={{ fontWeight: 600 }}
                  sx={{ textAlign: "left", margin: 2 }}>
                    {Section1.subhead[0]}
                </Typography>
                <Typography
                  className="card-item"
                  variant="body1"
                  color="text.secondary"
                  sx={{ textAlign: "left", margin: 2 }}
                >
                  <ul>
                    <li>{Section1.text[0]}</li>
                    <li>{Section1.text[1]}</li>
                    <li>{Section1.text[2]}</li>
                  </ul>
                </Typography>
                <Typography 
                  variant="h6"
                  style={{ fontWeight: 600 }}
                  sx={{ textAlign: "left", margin: 2 }}>
                    {Section1.subhead[1]}
                </Typography>
                <Typography
                  className="card-item"
                  variant="body1"
                  color="text.secondary"
                  sx={{ textAlign: "left", margin: 2 }}
                >
                  <ul>
                    <li>{Section1.text[3]}</li>
                    <li>{Section1.text[4]}</li>
                    <li>{Section1.text[5]}</li>
                    <li>{Section1.text[6]}</li>
                  </ul>
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => {
                    window.open('https://www.redcrossblood.org/hosting-a-blood-drive/learn-about-hosting/how-hosting-a-blood-drive-works/apply-to-host-a-blood-drive.html');
                  }}>Host a drive</Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={5}>
            <Card style={{ height: "513px", width: "812px" }} className="video-card">
              <CardMedia
                component="img"
                src={Section1.media}
                style={{ height: "513px", width: "812px" }}
                sx={{ display: 'inline' }}
              />
            </Card>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <Card className="home-card" sx={{ boxShadow: 1 }}>
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ textAlign: "left", margin: 2 }}
                >
                  {Section2.section}
                </Typography>
                <Typography 
                  variant="h6"
                  style={{ fontWeight: 600 }}
                  sx={{ textAlign: "left", margin: 2 }}>
                    {Section2.subhead[0]}
                </Typography>
                <Typography
                  className="card-item"
                  variant="body1"
                  color="text.secondary"
                  sx={{ textAlign: "left", margin: 2 }}
                >
                  {Section2.text[0]}
                </Typography>
                <Typography 
                  variant="h6"
                  style={{ fontWeight: 600 }}
                  sx={{ textAlign: "left", margin: 2 }}>
                    {Section2.subhead[1]}
                </Typography>
                <Typography
                  className="card-item"
                  variant="body1"
                  color="text.secondary"
                  sx={{ textAlign: "left", margin: 2 }}
                >
                  {Section2.text[1]}
                </Typography>
                <Typography 
                  variant="h6"
                  style={{ fontWeight: 600 }}
                  sx={{ textAlign: "left", margin: 2 }}>
                    {Section2.subhead[2]}
                </Typography>
                <Typography
                  className="card-item"
                  variant="body1"
                  color="text.secondary"
                  sx={{ textAlign: "left", margin: 2 }}
                >
                  {Section2.text[2]}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <Card className="home-card" sx={{ boxShadow: 1 }}>
                <CardContent>
                  <Grid item xs={12}>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ textAlign: "left", margin: 2 }}
                    >
                      {Section3.section}
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      color="text.secondary"
                      sx={{ textAlign: "left", margin: 2 }}
                    >
                      {Section3.text}
                    </Typography>
                    <Button
                    variant="outlined"
                    onClick={() => {
                      window.open('https://www.redcross.org/donate/donation.html/');
                    }}>Donate Now</Button>
                  </Grid>
                </CardContent>
            </Card>
          </Grid>  
        </Grid>

      </body>
    </>
  );
};

// make this component available to be imported into any other file
export default OtherWaysToHelp;
