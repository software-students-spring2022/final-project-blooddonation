import "./styles/DonationElig.css";

/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const WholeBloodDonation = (props) => {
  return (
    <>
      <h1>Whole Blood Donation!</h1>
      <div className="inner">
        <h2 className="firstQ">What is it?</h2>
        <p>
          The 'Whole Blood' Donation includes red cells, white cells, and
          platelets that are suspended in plasma.
        </p>
        <h2 classname="secondQ">Benefits</h2>
        <ul>
          Whole blood is the most flexible type of donation. It can be
          transfused in its original form, or used to help multiple people when
          separated into its specific components of red cells, plasma and
          platelets.
        </ul>
        <ul>
          Every day, whole blood donations help save the lives of children and
          adults fighting to survive cancer, blood disorders, traumatic injuries
          and more.
        </ul>
        <h2>Who is Eligible</h2>
        <ul>
          In most states, you must be 17 or older to donate whole blood. In
          states where 16 year olds are eligible to donate, parental consent is
          required.
        </ul>
        <ul>
          You must weigh at least 110 lbs. and be in good health and can perform
          normal activities. If you have a chronic condition such as diabetes
          and you want to donate blood, it’s important that you are being
          treated and the condition is under control.
        </ul>
        <a href="https://tinyurl.com/sdz6pzp7">Link to more info</a>
      </div>
    </>
  );
};

// make this component available to be imported into any other file
export default WholeBloodDonation;
