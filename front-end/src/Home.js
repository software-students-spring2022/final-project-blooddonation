import './Home.css'

/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Home = props => {
  return (
    <>
      <body className='home-body'>
        <h1>Hello and welcome!</h1>
        <p>This is our blood donation Home Page!</p>
      </body>
    </>
  )
}


// make this component available to be imported into any other file
export default Home