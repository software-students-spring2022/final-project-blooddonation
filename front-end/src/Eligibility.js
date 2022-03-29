import { Link } from "react-router-dom";
import "./styles/Eligibility.css";
import { EligibilityData } from "./components/EligibilityData";
import {
  Card,
  CardContent,
  CardMedia,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import MedicationAccordion from "./components/MedicationAccordion";
import GeneralHealthAccordion from "./components/GeneralHealthAccordion";
import TravelAccordion from "./components/TravelAccordion";
import MedicalCondAccordion from "./components/MedicalCondAccordion";
import MedicalTreatAccordion from "./components/MedicalTreatAccordion";
import LifestyleAccordion from "./components/LifestyleAccordion";
import STDAccordion from "./components/STDAccordion";

/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Eligibility = (props) => {
  return (
    <>
      <div className="eligibilitybody">
        <h1 className="title">Eligibility</h1>

        <div className="sidenav">
          <div className="movelink">
            <Link to="/FAQ" className="backlink">
              Back to FAQ
            </Link>
          </div>
          <div className="site-container">
            <a href="/finddonationsite" className="findSite-link">
              Find a Donation Site
            </a>
          </div>
          <div className="container">
            <a href="#wholeblood" className="side-link">
              Whole Blood Donation
            </a>
            <a href="#powerred" className="side-link">
              Power Red Donation (Double Red Cell)
            </a>
            <a href="#platelet" className="side-link">
              Platelet Donation
            </a>
            <a href="#plasma" className="side-link">
              Plasma Donation
            </a>
            <a href="#meds" className="side-link">
              Medications and Vaccinations
            </a>
            <a href="#general" className="side-link">
              General Health Considerations
            </a>
            <a href="#travel" className="side-link">
              Travel Outside the U.S., Immigration
            </a>
            <a href="#medcond" className="side-link">
              Medical Conditions
            </a>
            <a href="#medtreat" className="side-link">
              Medical Treatments
            </a>
            <a href="#life" className="side-link">
              Lifestyle
            </a>
            <a href="#std" className="side-link">
              Sexually Transmitted Diseases
            </a>
          </div>
          <div className="help-container">
            <a href="/FAQ/otherwaystohelp" className="findSite-link">
              Unable to Give Blood?
            </a>
          </div>
        </div>

        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          {EligibilityData.map((item) => {
            return item.section === "Whole Blood Donation" ? (
              <div className="main" id="wholeblood">
                <Grid item>
                  <Card
                    sx={{
                      display: "flex",
                      minWidth: 200,
                      width: 990,
                      height: 515,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "left" }}>
                      {item.image && (
                        <CardMedia
                          component="img"
                          sx={{ width: 580, height: 515 }}
                          image={item.image}
                        />
                      )}
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <CardContent>
                        <Typography
                          component="div"
                          variant="h4"
                          sx={{ pr: 15, pb: 1 }}
                          key="{item.section}"
                        >
                          {" "}
                          {item.section}
                          <br />
                        </Typography>

                        {item.points.map((point) => {
                          return (
                            <Typography
                              component="div"
                              sx={{
                                pl: 0,
                                pt: 2,
                                pb: 0,
                                color: "red",
                                fontSize: 30,
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              •{" "}
                              <Typography
                                component="div"
                                sx={{ pt: 1, pl: 1, pb: 0, color: "black" }}
                                key="{point}"
                              >
                                {point}
                              </Typography>
                            </Typography>
                          );
                        })}

                        {item.links.map((link) => {
                          return (
                            <Typography
                              component="div"
                              variant="subtitle1"
                              sx={{ color: "red", pt: 3, whiteSpace: "nowrap" }}
                            >
                              {" "}
                              {link}
                            </Typography>
                          );
                        })}
                      </CardContent>
                    </Box>
                  </Card>
                </Grid>
              </div>
            ) : item.section === "Power Red Donation (Double Red Cell)" ? (
              <div className="main" id="powerred">
                <Card
                  sx={{
                    display: "flex",
                    minWidth: 200,
                    width: 990,
                    height: 540,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "left" }}>
                    {item.image && (
                      <CardMedia
                        component="img"
                        sx={{ width: 580, height: 540 }}
                        image={item.image}
                      />
                    )}
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent>
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{ pr: 15, pb: 1 }}
                        key="{item.section}"
                      >
                        {" "}
                        {item.section}
                      </Typography>

                      {item.points.map((point) => {
                        return (
                          <Typography
                            component="div"
                            sx={{
                              pl: 0,
                              pt: 2,
                              pb: 0,
                              color: "red",
                              fontSize: 30,
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            •{" "}
                            <Typography
                              component="div"
                              sx={{ pt: 1, pl: 1, pb: 0, color: "black" }}
                            >
                              {point}
                            </Typography>
                          </Typography>
                        );
                      })}

                      {item.links.map((link) => {
                        return (
                          <Typography
                            component="div"
                            variant="subtitle1"
                            sx={{ color: "red", pt: 3, whiteSpace: "nowrap" }}
                          >
                            {" "}
                            {link}
                          </Typography>
                        );
                      })}
                    </CardContent>
                  </Box>
                </Card>
              </div>
            ) : item.section === "Platelet Donation" ? (
              <div className="main" id="platelet">
                <Grid item>
                  <Card
                    sx={{
                      display: "flex",
                      minWidth: 200,
                      width: 990,
                      height: 515,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "left" }}>
                      {item.image && (
                        <CardMedia
                          component="img"
                          sx={{ width: 580, height: 515 }}
                          image={item.image}
                        />
                      )}
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <CardContent>
                        <Typography
                          component="div"
                          variant="h4"
                          sx={{ pr: 15, pb: 1 }}
                          key="{item.section}"
                        >
                          {" "}
                          {item.section}
                          <br />
                        </Typography>

                        {item.points.map((point) => {
                          return (
                            <Typography
                              component="div"
                              sx={{
                                pl: 0,
                                pt: 2,
                                pb: 0,
                                color: "red",
                                fontSize: 30,
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              •{" "}
                              <Typography
                                component="div"
                                sx={{ pt: 1, pl: 1, pb: 0, color: "black" }}
                                key="{point}"
                              >
                                {point}
                              </Typography>
                            </Typography>
                          );
                        })}

                        {item.links.map((link) => {
                          return (
                            <Typography
                              component="div"
                              variant="subtitle1"
                              sx={{ color: "red", pt: 3, whiteSpace: "nowrap" }}
                            >
                              {" "}
                              {link}
                            </Typography>
                          );
                        })}
                      </CardContent>
                    </Box>
                  </Card>
                </Grid>
              </div>
            ) : item.section === "AB Elite Plasma Donation" ? (
              <div className="main" id="plasma">
                <Grid item>
                  <Card
                    sx={{
                      display: "flex",
                      minWidth: 200,
                      width: 990,
                      height: 535,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "left" }}>
                      {item.image && (
                        <CardMedia
                          component="img"
                          sx={{ width: 580, height: 700 }}
                          image={item.image}
                        />
                      )}
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <CardContent>
                        <Typography
                          component="div"
                          variant="h4"
                          sx={{ pr: 15, pb: 1 }}
                          key="{item.section}"
                        >
                          {" "}
                          {item.section}
                        </Typography>

                        {item.points.map((point) => {
                          return (
                            <Typography
                              component="div"
                              sx={{
                                pl: 0,
                                pt: 2,
                                pb: 0,
                                color: "red",
                                fontSize: 30,
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              •{" "}
                              <Typography
                                component="div"
                                sx={{ pt: 1, pl: 1, pb: 0, color: "black" }}
                                key="{point}"
                              >
                                {point}
                              </Typography>
                            </Typography>
                          );
                        })}

                        {item.links.map((link) => {
                          return (
                            <Typography
                              component="div"
                              variant="subtitle1"
                              sx={{ color: "red", pt: 3, whiteSpace: "nowrap" }}
                            >
                              {" "}
                              {link}
                            </Typography>
                          );
                        })}
                      </CardContent>
                    </Box>
                  </Card>
                </Grid>
              </div>
            ) : null;
          })}

          <div className="main" id="meds">
            <Grid item>
              <Typography
                component="div"
                variant="h3"
                sx={{ pt: 10, pb: 2, color: "red" }}
              >
                {" "}
                Medications and Vaccinations
              </Typography>
              <MedicationAccordion />
            </Grid>
          </div>

          <div className="main" id="general">
            <Grid item>
              <Typography
                component="div"
                variant="h3"
                sx={{ pt: 10, pb: 2, color: "red" }}
              >
                {" "}
                General Health Considerations
              </Typography>
              <GeneralHealthAccordion />
            </Grid>
          </div>

          <div className="main" id="travel">
            <Grid item>
              <Typography
                component="div"
                variant="h3"
                sx={{ pt: 10, pb: 2, color: "red" }}
              >
                {" "}
                Travel Outside the U.S., Immigration
              </Typography>
              <TravelAccordion />
            </Grid>
          </div>

          <div className="main" id="medcond">
            <Grid item>
              <Typography
                component="div"
                variant="h3"
                sx={{ pt: 10, pb: 2, color: "red" }}
              >
                {" "}
                Medical Conditions
              </Typography>
              <MedicalCondAccordion />
            </Grid>
          </div>

          <div className="main" id="medtreat">
            <Grid item>
              <Typography
                component="div"
                variant="h3"
                sx={{ pt: 10, pb: 2, color: "red" }}
              >
                {" "}
                Medical Treatments
              </Typography>
              <MedicalTreatAccordion />
            </Grid>
          </div>

          <div className="main" id="life">
            <Grid item>
              <Typography
                component="div"
                variant="h3"
                sx={{ pt: 10, pb: 2, color: "red" }}
              >
                {" "}
                Lifestyle
              </Typography>
              <LifestyleAccordion />
            </Grid>
          </div>

          <div className="main" id="std">
            <Grid item>
              <Typography
                component="div"
                variant="h3"
                sx={{ pt: 10, pb: 2, color: "red" }}
              >
                {" "}
                Sexually Transmitted Diseases
              </Typography>
              <STDAccordion />
            </Grid>
          </div>
        </Grid>
      </div>
    </>
  );
};

// make this component available to be imported into any other file
export default Eligibility;
