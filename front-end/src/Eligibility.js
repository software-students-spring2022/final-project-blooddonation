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
    </body>

      <h1>Eligibility!</h1>
      <p>
        Check out the <Link to="./informationforteens">Information for Teens</Link>.
      </p>
      <p>
        Check out the <Link to="./wholeblooddonation">Whole Blood Donation</Link>.
      </p>
      <p>
        Check out the <Link to="./powerreddonation">Power Red Donation</Link>.
      </p>
      <p>
        Check out the <Link to="./plateletdonation">Platelet Donation</Link>.
      </p>
      <p>
        Check out the <Link to="./abeliteplasmadonation">AB Elite Plasma Donation</Link>.
      </p>
    </>
    
  )
}

// make this component available to be imported into any other file
export default Eligibility 