import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import FindDonationSite from "./FindDonationSite";
import Faq from "./Faq";
import Profile from "./Profile";
import ContactUs from "./ContactUs";
import LogIn from "./LogIn";
import Logout from "./Logout";
import Home from "./Home";
import Header from "./Header";
import Eligibility from "./Eligibility";
import OtherWaysToHelp from "./OtherWaysToHelp";
import WholeBloodDonation from "./WholeBloodDonation";
import ABElitePlasmaDonation from "./ABElitePlasmaDonation";
import PlateletDonation from "./PlateletDonation";
import PowerRedDonation from "./PowerRedDonation";
import InformationForTeens from "./InformationForTeens";
import CreateAccount from "./CreateAccount";
import EligibilityQuestionnaire from "./EligibilityQuestionnaire";
import EditProfileForm from "./EditProfileForm";
import { useState} from "react";


const App = (props) => {
  const jwtToken = localStorage.getItem("token")
  console.log( "token state "+localStorage.getItem("token")===null)
  console.warn("loading "+Math.random())
  const [tokenPresent, setTokenPresent] = useState(localStorage.getItem("token")!==null);
  
  return (
    <div className="App">
      <Router>
        <Header tokenPresent={tokenPresent}/>
        <main className="App-main">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/finddonationsite"
              element={<FindDonationSite />}
            ></Route>
            <Route path="/FAQ" element={<Faq />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/contactus" element={<ContactUs />}></Route>
            <Route path="/login" element={<LogIn tokenPresent={tokenPresent} setTokenPresent={setTokenPresent}/>}></Route>
            <Route path="/createaccount" element={<CreateAccount  tokenPresent={tokenPresent} setTokenPresent={setTokenPresent}/>}></Route>
            <Route path="/logout" element={<Logout tokenPresent={tokenPresent} setTokenPresent={setTokenPresent}/>}></Route>
            <Route path="FAQ/eligibility" element={<Eligibility />} />
            <Route path="FAQ/otherwaystohelp" element={<OtherWaysToHelp />} />
            <Route
              path="FAQ/eligibility/informationforteens"
              element={<InformationForTeens />}
            />
            <Route
              path="FAQ/eligibility/wholeblooddonation"
              element={<WholeBloodDonation />}
            />
            <Route
              path="FAQ/eligibility/abeliteplasmadonation"
              element={<ABElitePlasmaDonation />}
            />
            <Route
              path="FAQ/eligibility/plateletdonation"
              element={<PlateletDonation />}
            />
            <Route
              path="FAQ/eligibility/powerreddonation"
              element={<PowerRedDonation />}
            />
            <Route
              path="/createaccount/eligibilityquestionnaire"
              element={<EligibilityQuestionnaire />}
            ></Route>
            <Route exact path="/editprofile/:id" element={<EditProfileForm/>} component={EditProfileForm} />
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
