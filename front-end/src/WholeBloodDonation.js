import './styles/DonationElig.css'

/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const WholeBloodDonation = props => {
  return (
    <>
      <body>
        <h1>Whole Blood Donation!</h1>
          <div className='inner'>
            <h2>What is it?</h2>
              <p>The 'Whole Blood' Donation includes</p>
            <h2>Who is Eligible?</h2>
              <p></p>
            <h2>How often can you donate?</h2>
              <p></p>

            <a href="https://tinyurl.com/sdz6pzp7">Link to more info</a>
          </div>
      </body>
      
    </>
  )
}


// make this component available to be imported into any other file
export default WholeBloodDonation