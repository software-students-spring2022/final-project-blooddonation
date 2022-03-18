import './styles/Home.css'
import { Container , Grid, Item} from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import {national_blood_crisis_text} from './text/HomePageText';

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
        <Container>
          <h1>National Blood Crisis</h1>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Item>{national_blood_crisis_text}</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>{national_blood_crisis_text}</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>{national_blood_crisis_text}</Item>
          </Grid>
        </Grid>
        </Container>
      </body>
    </>
  )
}


// make this component available to be imported into any other file
export default Home