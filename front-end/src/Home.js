import "./styles/Home.css";
import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Grid,
  CardMedia,
} from "@mui/material";
import { Section1, Section2, Section3 } from "./components/HomeData";
import { Link } from "react-router-dom";
/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Home = (props) => {
  return (
    <>
      <div className="home-body">
        <h1 style={{ margin: "20px" }}>Hello and welcome!</h1>

        <Grid container>
          <Grid item xs={12}>
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
                  className="card-item"
                  variant="body1"
                  color="text.secondary"
                  sx={{ textAlign: "left", margin: 2 }}
                >
                  {Section1.text}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid container direction="row" style={{ height: "400px" }}>
            {Section1.media.map((image) => (
              <Grid item xs={4}>
                <img style={{ height: "50%" }} src={image} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={7}>
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
                  className="card-item"
                  variant="body1"
                  color="text.secondary"
                  sx={{ textAlign: "left", margin: 2 }}
                >
                  {Section2.text[0]}
                  <br></br>
                  <br></br>
                  {Section2.text[1]}
                  <br></br>
                  <br></br>
                  {Section2.text[2]}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={5}>
            <Card style={{ height: "100%" }} className="video-card">
              <CardMedia
                component="iframe"
                title="test"
                src={Section2.media}
                style={{ height: "100%" }}
              />
            </Card>
          </Grid>
        </Grid>

        <Grid container>
          <Card className="home-card" sx={{ boxShadow: 1 }}>
            <CardActionArea component={Link} to="/FAQ/OtherWaysToHelp">
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
                </Grid>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </div>
    </>
  );
};

// make this component available to be imported into any other file
export default Home;
