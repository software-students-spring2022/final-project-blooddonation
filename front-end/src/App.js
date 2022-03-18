import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './styles/App.css'
import FindDonationSite from './FindDonationSite'
import Faq from './Faq'
import Profile from './Profile'
import ContactUs from './ContactUs'
import LogIn from './LogIn'
import Home from './Home'
import Header from './Header'
import Eligibility from './Eligibility'
import OtherWaysToHelp from './OtherWaysToHelp'
import WholeBloodDonation from './WholeBloodDonation'
import ABElitePlasmaDonation from './ABElitePlasmaDonation'
import PlateletDonation from './PlateletDonation'
import PowerRedDonation from './PowerRedDonation'
import InformationForTeens from './InformationForTeens'
<<<<<<< HEAD
=======
import CreateAccount from './CreateAccount'
>>>>>>> fb30b8ac802ab5d8d428cd98d306aab5afd3cf57


const App = props => {
  return (
    <div className="App">
      <Router>
        <Header />
        <main className="App-main">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/finddonationsite" element={<FindDonationSite />}></Route>
            <Route path="/FAQ" element={<Faq />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/contactus" element={<ContactUs />}></Route>
            <Route path="/login" element={<LogIn />}></Route>
<<<<<<< HEAD
=======
            <Route path="/createaccount" element={<CreateAccount />}></Route>
>>>>>>> fb30b8ac802ab5d8d428cd98d306aab5afd3cf57
            <Route path="FAQ/eligibility" element={<Eligibility />}/>
            <Route path="FAQ/otherwaystohelp" element={<OtherWaysToHelp />}/>
            <Route path="FAQ/eligibility/informationforteens" element={<InformationForTeens />}/>
            <Route path="FAQ/eligibility/wholeblooddonation" element={<WholeBloodDonation />}/>
            <Route path="FAQ/eligibility/abeliteplasmadonation" element={<ABElitePlasmaDonation/>}/>
            <Route path="FAQ/eligibility/plateletdonation" element={<PlateletDonation />}/>
            <Route path="FAQ/eligibility/powerreddonation" element={<PowerRedDonation />}/>
<<<<<<< HEAD

=======
>>>>>>> fb30b8ac802ab5d8d428cd98d306aab5afd3cf57
          </Routes>
        </main>
      </Router>
    </div>

  )
}

export default App
