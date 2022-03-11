import { Link } from 'react-router-dom'
import './Eligibility.css'
import { EligibilityData} from './components/EligibilityData';
import { Card, CardContent, CardMedia, Box, Typography as t} from '@mui/material';


/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Eligibility = props => {
  return (
    <>
      <body className="eligibilitybody">

        <nav className='eligibilitynav'>
          <div className="eligibilityleft-link">
            <Link to="/FAQ" className="backlink">Back to FAQ</Link>
          </div>
        </nav>

        <div className="container">
          <a href="#wholeblood" className='side-link'>Whole Blood Donation</a>
          <a href="#powerred" className='side-link'>Power Red Donation (Double Red Cell)</a>
          <a href="#platelet" className='side-link'>Platelet Donation</a>
          <a href="#plasma" className='side-link'>Plasma Donation</a>
        </div>

        {EligibilityData.map((item)=>{
          return(
              item.section === "Whole Blood Donation" ?
              <div class="main" id="wholeblood">
                <p>{item.image}</p>

              <Card sx={{ display: 'flex', minWidth: 200, height: 400}}>
                  <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>  
                      {item.image && 
                      <CardMedia component = "img" sx= {{ width: 100, borderRadius: '50%'}}image = {item.image}/>
                      }
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <CardContent>
                          <h2 className='sectionheader'>{item.name}</h2> 
                          <t component = "div" variant = "h1"> {item.points}<br /></t>
                          <t component = "div" variant = "h1"> {item.links}</t>
                      </CardContent>
                  </Box>
              </Card>
            </div>

            :null
          );
        })
        }
        

        <div class="main" id="powerred">
          <h2 className='sectionheader'>Power Red Donation (Double Red Cell)</h2>
          <a href="#platelet">Click Me to Smooth Scroll to below</a>
        </div>

        <div class="main" id="platelet">
          <h2 className='sectionheader'>Platelet Donation</h2>
          <a href="#plasma">Click Me to Smooth Scroll to below</a>
        </div>

        <div class="main" id="plasma">
          <h2 className='sectionheader'>AB Elite Plasma Donation</h2>
          <a href="#wholeblood">Click Me to Smooth Scroll to top</a>
        </div>

      </body>

    </>
    
  )
}

// make this component available to be imported into any other file
export default Eligibility 