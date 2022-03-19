import './styles/Home.css'
import { Button, Grid, Card, CardMedia, CardContent, Typography} from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import {national_blood_crisis_text} from './text/HomePageText';
import ReactFullpage from "@fullpage/react-fullpage";

/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Home = props => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
  return (
    <>
    <body className='home-body'>
      <ReactFullpage
      scrollingSpeed = {700} 
      sectionsColor={["orange"]}
      scrollOverflow = {"true"}
      render={() => {
        return (
          <ReactFullpage.Wrapper>
            <div className="section">
              <div className="slide">
                    <h3>Image</h3>
                  </div>
                  <div className="slide">
                    <h3>Image</h3>
                  </div>
                  <div className="slide">
                    <h3>Image</h3>
                  </div>
            </div>
            <div className="section">
            <Grid container spacing={2} sx = {{mb: 9}}>
              <Grid item xs={12}>
                <h1>National Blood Crisis</h1>
                <h3>{national_blood_crisis_text}</h3>
              </Grid>
              <Grid item xs={4}>
                <h1>Picture</h1>
                <Button>Read More</Button>
              </Grid>
              <Grid item xs={4}>
                <h1>Picture</h1>
                <Button>Read More</Button>
              </Grid>
              <Grid item xs={4}>
                <h1>Picture</h1>
                <Button>Read More</Button>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx = {{mb: 9}}>
              <Grid item xs={12}>
                <h1>How Blood Donations Help</h1>
              </Grid>
              <Grid item xs={8}>
                <Item>
                    <CardContent>
                    <Typography variant="h5" component="div" sx={{ textAlign: 'left', margin: 2 }}>How Blood Donations Help : </Typography>
                    <Typography className='card-item' variant="body2" color="text.secondary" sx={{ textAlign: 'left', margin: 2 }}>
                    Safe blood saves lives. Blood is needed by women with complications during pregnancy and childbirth, children with severe anaemia, often resulting from malaria or malnutrition, accident victims and surgical and cancer patients.
                    </Typography>
                    <Typography className='card-item' variant="body2" color="text.secondary" sx={{ textAlign: 'left', margin: 2 }}>
                    There is a constant need for a regular supply of blood because it can be stored only for a limited period of time before use. Regular blood donation by a sufficient number of healthy people is needed to ensure that blood will always be available whenever and wherever it is needed.
                    </Typography>
                    <Typography className='card-item' variant="body2" color="text.secondary" sx={{ textAlign: 'left', margin: 2 }}>
                    Blood is the most precious gift that anyone can give to another person – the gift of life. A decision to donate your blood can save a life, or even several if your blood is separated into its components – red cells, platelets and plasma – which can be used individually for patients with specific conditions.
                    </Typography>
                </CardContent>
                </Item>
              </Grid>
              <Grid item xs={4}>
              <Card  style={{height:'100%'}} className="video-card">
              <CardMedia
                component='iframe'
                title='test'
                src='https://www.youtube.com/embed/gYUcQT6Gxts'
                style={{height:'100%'}}
              />
            </Card>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx = {{mb: 9}}>
              <Grid item xs={12}>
                <h1>Why Host a Blood Drive</h1>
              </Grid>
              <Grid item xs={12}>
                <Item>{national_blood_crisis_text}</Item>
                <Button>Find Out How to Host a Blood Drive</Button>
              </Grid>
            </Grid>
            </div>
          </ReactFullpage.Wrapper>
        );
      }}
    />

      </body>
    </>
  )
}


// make this component available to be imported into any other file
export default Home