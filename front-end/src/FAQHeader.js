import "./styles/FAQHeader.css";
import { NavLink } from "react-router-dom";

/**
 * A React component that is used for the header displayed at the top of every page of the site.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const FAQHeader = (props) => {
  return (
    <div className="faqheaderbody">
      <nav className="faqnav">
        <div className="left">
          <h2 className="faqh2">Frequently Asked Questions</h2>
        </div>
        <div className="right-links">
          <NavLink to="./eligibility" className="links">
            Eligibility
          </NavLink>
          <NavLink to="./otherwaystohelp" className="links">
            Other Ways To Help
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

// make this component available to be imported into any other file
export default FAQHeader;
