import { Link } from 'react-router-dom'
import './styles/Eligibility.css'

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
          <div className="left-links">
            <Link to="/FAQ" className="backlink">Back to FAQ</Link>
          </div>
        </nav>

        <div class="main" id="wholeblood">
          <h2 className='sectionheader'>Whole Blood Donation</h2>
          <p>Click on the link to see the "smooth" scrolling effect.</p>
          <a href="#powerred">Click Me to Smooth Scroll to Power Red Donation (Double Red Cell) Below</a>
          <p>Note: Remove the scroll-behavior property to remove smooth scrolling.</p>
        </div>

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