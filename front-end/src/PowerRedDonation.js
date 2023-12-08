import "./styles/DonationElig.css";

/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const PowerRedDonation = (props) => {
  return (
    <>
      <h1>Power Red Donation (Double Red Cell)!</h1>
      <div className="inner">
        <h2 className="firstQ">What is it?</h2>
        <p>
          Power Red is similar to a whole blood donation, except a special
          machine is used to allow you to safely donate two units of red blood
          cells during one donation while returning your plasma and platelets to
          you.
        </p>
        <h2>Benefits</h2>
        <ul>
          Whole blood donations contain red blood cells, platelets, plasma and
          white blood cells. Red blood cells are the most frequently used blood
          component and are needed by almost every type of patient requiring
          transfusion. If you meet certain criteria, Power Red allows you to
          safely donate two units of red cells during one appointment as an
          automated donation process. It is as safe as whole blood donation.
        </ul>
        <ul>
          During your Power Red, blood is drawn from one arm through an
          automated process. The machine separates and collects two units of red
          cells and then safely returns the remaining blood components, along
          with some saline, back to you through the same arm.
        </ul>
        <ul>
          With all of your platelets and plasma returned to you along with some
          saline, you don’t lose the liquid portion of your blood and may feel
          more hydrated after your donation.
        </ul>
        <h2 classname="secondQ">Who is Eligible</h2>
        <ul>
          In addition to meeting other whole blood donor qualifications, you
          must also meet specific criteria for donating Power Red, especially
          for hemoglobin, weight and height. The thresholds for each vary by
          gender.
        </ul>
        <ul>
          <li>Power Red is for type O, A negative or B negative donors</li>
          <li>Donation Frequency: Every 112 days, up to 3 times/year</li>
          <li>You must be in good health and feeling well</li>
        </ul>
        <li>
          Males: At least 17 years old in most states, at least 5'1" tall and
          weigh at least 130 lbs
        </li>
        <li>
          Females: At least 19 years old, at least 5'5" tall and weigh at least
          150 lbs
        </li>
        <a href="https://tinyurl.com/sbkv8c5b">Link to more info</a>
      </div>
    </>
  );
};

// make this component available to be imported into any other file
export default PowerRedDonation;
