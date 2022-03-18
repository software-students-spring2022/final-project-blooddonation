import './styles/Home.css';
import { Card, CardContent, Typography, Grid,CardMedia } from '@mui/material';

/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Home = props => {
  return (
    <>
      <body className='home-body'>
        <h1>Hello and welcome!</h1>
        <Grid container>
          <Grid item xs={7}>
            <Card className="home-card" sx={{ boxShadow: 1 }}>
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
            </Card>
          </Grid>
          <Grid item xs={5}>
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

      </body>
    </>
  )
}


// make this component available to be imported into any other file
export default Home