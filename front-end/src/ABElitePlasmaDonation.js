import "./styles/DonationElig.css";

/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const ABElitePlasmaDonation = (props) => {
  return (
    <>
      <h1>AB Elite Plasma Donation!</h1>
      <div className="inner">
        <h2 className="firstQ">What is it?</h2>
        <p>
          During a plasma-only donation, blood is drawn from one arm and sent
          through a high-tech machine that collects your plasma and then safely
          and comfortably returns your red cells and platelets back to you,
          along with some saline. It takes only a few minutes longer than
          donating blood but can have a profound impact.
        </p>
        <h2 classname="secondQ">Benefits</h2>
        <ul>You can donate every 28 days, up to 13 times per year.</ul>
        <ul>Plasma products are used by burn, trauma and cancer patients.</ul>
        <ul>The average donation takes one hour and 15 minutes.</ul>
        <h2>Who is Eligible</h2>
        <ul>Those with AB positive and AB negative blood</ul>
        <a href="https://tinyurl.com/2p96eksf">Link to more info</a>
      </div>
    </>
  );
};

// make this component available to be imported into any other file
export default ABElitePlasmaDonation;
