import './styles/FAQHeader.css'
<<<<<<< HEAD
import {Link} from 'react-router-dom'
=======
import {NavLink} from 'react-router-dom'
>>>>>>> fb30b8ac802ab5d8d428cd98d306aab5afd3cf57

/**
 * A React component that is used for the header displayed at the top of every page of the site.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const FAQHeader = props => {
  return (

<<<<<<< HEAD
    <body className='faqheaderbody'>
=======
    <div className='faqheaderbody'>
>>>>>>> fb30b8ac802ab5d8d428cd98d306aab5afd3cf57

      <nav className='faqnav'>
          <div className="left">
            <h2 className='faqh2'>Frequently Asked Questions</h2>
          </div>
            <div className="right-links">
<<<<<<< HEAD
            <Link to="./eligibility" className="links">Eligibility</Link>
            <Link to="./otherwaystohelp" className="links">Other Ways To Help</Link>
          </div>
      </nav>
      
    </body>
=======
            <NavLink to="./eligibility" className="links">Eligibility</NavLink>
            <NavLink to="./otherwaystohelp" className="links">Other Ways To Help</NavLink>
          </div>
      </nav>
      
    </div>
>>>>>>> fb30b8ac802ab5d8d428cd98d306aab5afd3cf57
   
  )
}

// make this component available to be imported into any other file
export default FAQHeader


