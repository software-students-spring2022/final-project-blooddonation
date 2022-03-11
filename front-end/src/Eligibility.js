import { Link } from 'react-router-dom'
import './Eligibility.css'
import { EligibilityData} from './components/EligibilityData';
import { Card, CardContent, CardMedia, Box, Typography, Grid} from '@mui/material';


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
          <div>
            <h1 className='title'>Eligibility</h1>
          </div>
        </nav>

        <div className='site-container'><a href="/finddonationsite" className='findSite-link'>Find a Donation Site</a></div>
        <div className="container">
          <a href="#wholeblood" className='side-link'>Whole Blood Donation</a>
          <a href="#powerred" className='side-link'>Power Red Donation (Double Red Cell)</a>
          <a href="#platelet" className='side-link'>Platelet Donation</a>
          <a href="#plasma" className='side-link'>Plasma Donation</a>
        </div>

        <Grid container direction="column" justifyContent="center" alignItems="center"> 
        
        
        
      
          {EligibilityData.map((item)=>{
            return(
                item.section === "Whole Blood Donation" ?
                <div class="main" id="wholeblood">

                  <Grid item>
                    <Card sx={{ display: 'flex', minWidth: 200, width: 1100, height: 515}}>
                        <Box sx={{ display: 'flex', alignItems: 'left'}}>  
                            {item.image && 
                            <CardMedia component = "img" sx= {{ width: 580, height: 515}}image = {item.image}/>
                            }
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent>


                                <Typography component = "div" variant = "h4" sx={{ pr: 15, pb: 1}}> {item.section}<br /></Typography>

                                
                               
                                  {item.points.map((point)=>{
                                    return(
                                      <Typography sx={{ pl: 0, pt: 2, pb: 0, color: 'red', fontSize: 30, display: 'flex',  flexDirection: 'row'}}>•  <Typography sx={{ pt: 1, pl: 1, pb: 0, color: 'black'}}>{point}</Typography></Typography>
                                    );
                                  })}
                                  
                       
                                {item.links.map((link)=>{
                                    return(
                                      <Typography component = "div" variant = "subtitle1" sx={{ color: 'red', pt: 3, whiteSpace: 'nowrap'}}> {link}</Typography>
                                    );
                                })}

                                
                            </CardContent>
                        </Box>
                    </Card>
                  </Grid>
                </div>

                :item.section === "Power Red Donation (Double Red Cell)" ?
                 
                 <Grid item>

                  <div class="main" id="powerred">

                    <Card sx={{ display: 'flex', minWidth: 200, width: 1100, height: 515}}>
                        <Box sx={{ display: 'flex', alignItems: 'left'}}>  
                            {item.image && 
                            <CardMedia component = "img" sx= {{ width: 580, height: 515}}image = {item.image}/>
                            }
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent>


                            <Typography component = "div" variant = "h4" sx={{ pr: 15, pb: 1}}> {item.section}<br /></Typography>

                                
                               
                            {item.points.map((point)=>{
                              return(
                                <Typography sx={{ pl: 0, pt: 2, pb: 0, color: 'red', fontSize: 30, display: 'flex',  flexDirection: 'row'}}>•  <Typography sx={{ pt: 1, pl: 1, pb: 0, color: 'black'}}>{point}</Typography></Typography>
                              );
                            })}


                            {item.links.map((link)=>{
                              return(
                                <Typography component = "div" variant = "subtitle1" sx={{ color: 'red', pt: 3, whiteSpace: 'nowrap'}}> {link}</Typography>
                              );
                            })}

                                
                            </CardContent>
                        </Box>
                    </Card>
                  </div>
                 </Grid>

                :item.section === "Platelet Donation" ?

                <div class="main" id="platelet">

                  <Grid item>
                    <Card sx={{ display: 'flex', minWidth: 200, width: 1100, height: 515}}>
                        <Box sx={{ display: 'flex', alignItems: 'left'}}>  
                            {item.image && 
                            <CardMedia component = "img" sx= {{ width: 580, height: 515}}image = {item.image}/>
                            }
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent>


                                <Typography component = "div" variant = "h4" sx={{ pr: 15, pb: 1}}> {item.section}<br /></Typography>

                                
                              
                                  {item.points.map((point)=>{
                                    return(
                                      <Typography sx={{ pl: 0, pt: 2, pb: 0, color: 'red', fontSize: 30, display: 'flex',  flexDirection: 'row'}}>•  <Typography sx={{ pt: 1, pl: 1, pb: 0, color: 'black'}}>{point}</Typography></Typography>
                                    );
                                  })}
                                  
                      
                                {item.links.map((link)=>{
                                    return(
                                      <Typography component = "div" variant = "subtitle1" sx={{ color: 'red', pt: 3, whiteSpace: 'nowrap'}}> {link}</Typography>
                                    );
                                })}

                                
                            </CardContent>
                        </Box>
                    </Card>
                  </Grid>
                </div>


                
                :item.section === "AB Elite Plasma Donation" ?

                  <div class="main" id="plasma">

                    <Grid item>
                      <Card sx={{ display: 'flex', minWidth: 200, width: 1100, height: 515}}>
                          <Box sx={{ display: 'flex', alignItems: 'left'}}>  
                              {item.image && 
                              <CardMedia component = "img" sx= {{ width: 580, height: 700}}image = {item.image}/>
                              }
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <CardContent>


                                  <Typography component = "div" variant = "h4" sx={{ pr: 15, pb: 1}}> {item.section}<br /></Typography>

                                  
                                
                                    {item.points.map((point)=>{
                                      return(
                                        <Typography sx={{ pl: 0, pt: 2, pb: 0, color: 'red', fontSize: 30, display: 'flex',  flexDirection: 'row'}}>•  <Typography sx={{ pt: 1, pl: 1, pb: 0, color: 'black'}}>{point}</Typography></Typography>
                                      );
                                    })}
                                    
                        
                                  {item.links.map((link)=>{
                                      return(
                                        <Typography component = "div" variant = "subtitle1" sx={{ color: 'red', pt: 3, whiteSpace: 'nowrap'}}> {link}</Typography>
                                      );
                                  })}

                                  
                              </CardContent>
                          </Box>
                      </Card>
                    </Grid>
                  </div>

          
              
                :null
              );
            })
          }
              
              

        
        
        
        
        
        
        </Grid>
           

       

      </body>

    </>
    
  )
}

// make this component available to be imported into any other file
export default Eligibility 