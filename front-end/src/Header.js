import './Header.css'
import logo from './logo.svg'
import { Link } from 'react-router-dom'
import {NavLink} from 'react-router-dom'

/**
 * A React component that is used for the header displayed at the top of every page of the site.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Header = props => {
  return (
    <header className="Header-header">
      <nav className="Header-navbar">
        <ul className="nav-links">
          <li className="nav-item">
            <Link to="/" className="logo"><img src={logo} alt="Our fabulous logo" /></Link>
          </li>
          <li className="nav-item">
            <NavLink activeClassName="active" to="/finddonationsite">Find Donation Site</NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName="active" to="/FAQ">FAQ</NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName="active" to="/profile">Profile</NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName="active" to="/ContactUs">Contact Us</NavLink>
          </li>
          <li className="nav-box">
            <NavLink activeClassName="active-box" to="/login">Login</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

// make this component available to be imported into any other file
export default Header