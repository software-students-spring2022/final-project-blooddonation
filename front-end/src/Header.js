import "./styles/Header.css";
import logo from "./images/logo.svg";
import { NavLink } from "react-router-dom";
import { useState} from "react";

/**
 * A React component that is used for the header displayed at the top of every page of the site.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Header = ({tokenPresent}) => {

  return (
    <header className="Header-header">
      <nav className="Header-navbar">
        <ul className="nav-links">
          <li className="nav-item">
            <NavLink to="/" className="logo">
              <img src={logo} alt="Our fabulous logo" />
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={(navData) => (navData.isActive ? "active" : "none")}
              to="/finddonationsite"
            >
              Find Donation Site
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={(navData) => (navData.isActive ? "active" : "none")}
              to="/FAQ"
            >
              FAQ
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={(navData) => (navData.isActive ? "active" : "none")}
              to="/profile"
            >
              Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={(navData) => (navData.isActive ? "active" : "none")}
              to="/ContactUs"
            >
              Contact Us
            </NavLink>
          </li>
          <li className="nav-item">
            {tokenPresent ? (
              <>
              <NavLink
              to="/logout"
              style={({ isActive }) =>
                isActive
                  ? {
                      color: "#fff",
                      background: "#000000",
                      borderRadius: 30,
                      paddingTop: 5,
                      paddingBottom: 5,
                      paddingLeft: 20,
                      paddingRight: 20,
                    }
                  : {
                      color: "#000000",
                      background: "#fff",
                      borderRadius: 30,
                      paddingTop: 5,
                      paddingBottom: 5,
                      paddingLeft: 20,
                      paddingRight: 20,
                    }
              }
            >
              Logout
            </NavLink>
            </>
            ):(
              <>
              <NavLink
              to="/login"
              style={({ isActive }) =>
                isActive
                  ? {
                      color: "#fff",
                      background: "#000000",
                      borderRadius: 30,
                      paddingTop: 5,
                      paddingBottom: 5,
                      paddingLeft: 20,
                      paddingRight: 20,
                    }
                  : {
                      color: "#000000",
                      background: "#fff",
                      borderRadius: 30,
                      paddingTop: 5,
                      paddingBottom: 5,
                      paddingLeft: 20,
                      paddingRight: 20,
                    }
              }
            >
              Login
            </NavLink>
              </>

            )}
            
            <NavLink
              to="/createaccount"
              style={({ isActive }) =>
                isActive
                  ? {
                      color: "#fff",
                      background: "#000000",
                      borderRadius: 30,
                      paddingTop: 5,
                      paddingBottom: 5,
                      paddingLeft: 20,
                      paddingRight: 20,
                    }
                  : {
                      color: "#000000",
                      background: "#fff",
                      borderRadius: 30,
                      paddingTop: 5,
                      paddingBottom: 5,
                      paddingLeft: 20,
                      paddingRight: 20,
                    }
              }
            >
              Sign Up
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

// make this component available to be imported into any other file
export default Header;
