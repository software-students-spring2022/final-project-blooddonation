import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Map from './Map'
import Faq from './Faq'
import Profile from './Profile'
import ContactUs from './ContactUs'
import LogIn from './LogIn'
import Home from './Home'
import Header from './Header'

const App = props => {
  return (
    <div className="App">
      <Router>
        <Header />
        <main className="App-main">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/map" element={<Map />}></Route>
            <Route path="/FAQ" element={<Faq />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/contactus" element={<ContactUs />}></Route>
            <Route path="/login" element={<LogIn />}></Route>
          </Routes>
        </main>
      </Router>
    </div>
  )
}

export default App
