import './FAQHeader.css'
import {Link} from 'react-router-dom'

/**
 * A React component that is used for the header displayed at the top of every page of the site.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const FAQHeader = props => {
  return (
    <nav className='faqnav'>
    <div className="left-links">
      <h2 className='faqh2'>FAQ</h2>
    </div>
      <div>
      <Link to="./eligibility" className="links">Eligibility</Link>
      <Link to="./otherwaystohelp" className="links2">Other Ways To Help</Link>
    </div>
  </nav>
   
  )
}

// make this component available to be imported into any other file
export default FAQHeader


