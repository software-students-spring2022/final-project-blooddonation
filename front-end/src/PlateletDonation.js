import "./styles/DonationElig.css";

/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const PlateletDonation = (props) => {
  return (
    <>
      <h1>Platelet Donation!</h1>
      <div className="inner">
        <h2 classname="firstQ">What is it?</h2>
        <p>
          Platelets are tiny cells in your blood that form clots and stop
          bleeding. For millions of Americans, they are essential to surviving
          and fighting cancer, chronic diseases, and traumatic injuries.
        </p>
        <h2 classname="secondQ">Benefits</h2>
        <ul>
          Knowing you’re helping cancer patients have a good day when each day
          counts.
        </ul>
        <ul>
          A smaller needle is used for a platelet donation compared to a
          traditional whole blood donation so some donors find it to be more
          comfortable.
        </ul>
        <ul>
          Because you’re getting fluids and red cells back after donating
          platelets, some donors say they feel less sluggish afterwards.{" "}
        </ul>
        <h2>Who is Eligible</h2>
        <ul>
          At age 16-17 depending on state, individuals in generally good health
          who meet weight and height requirements may become eligible to donate
          platelets.
        </ul>
        <ul>
          Do not take aspirin products for at least 2 full calendar days prior
          to your appointment. For example, if you take aspirin products on
          Monday, the soonest you may donate platelets is Thursday.
        </ul>
        <ul>
          Eligibility requirements for platelet donation are the same as a whole
          blood donation. As long as you meet the minimum requirements for
          donating whole blood you may be able to donate platelets.
        </ul>
        <a href="https://tinyurl.com/33dsencj">Link to more info</a>
      </div>
    </>
  );
};

// make this component available to be imported into any other file
export default PlateletDonation;
