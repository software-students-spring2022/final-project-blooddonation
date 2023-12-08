import { Link } from "react-router-dom";
import WholeBloodPic from "../assets/wholebloodpic.jpeg";
import PowerRedPic from "../assets/powerredpic.jpeg";
import PlateletPic from "../assets/plateletpic.jpeg";
import PlasmaPic from "../assets/plasmapic.jpeg";

export const EligibilityData = [
  {
    section: "Whole Blood Donation",

    image: WholeBloodPic,

    points: [
      "Donation frequency: Every 56 days, up to 6 times a year",
      "You must be in good health and feeling well",
      "You must be at least 16 years old in most states",
      "You must weigh at least 110 lbs",
    ],

    links: [
      <Link to="./informationforteens">
        See aditional requirements for students!
      </Link>,
      <Link to="./wholeblooddonation">
        {" "}
        Learn more about whole blood donation
      </Link>,
    ],
  },

  {
    section: "Power Red Donation (Double Red Cell)",

    image: PowerRedPic,

    points: [
      "Donation frequency: Every 112 days, up to 3 times/year",
      "You must be in good health and feeling well",
      "Male donors must be at least 17 years old in most states, at least 5'1 tall and weigh at least 130 lbs",
      "Female donors+ must be at least 19 years old, at least 5'5 tall and weigh at least 150 lbs",
    ],

    links: [
      <Link to="./informationforteens">
        See aditional requirements for students!
      </Link>,
      <Link to="./powerreddonation">
        {" "}
        Learn more about power red donation (double red cell)
      </Link>,
    ],
  },

  {
    section: "Platelet Donation",

    image: PlateletPic,

    points: [
      "Donation frequency: Every 7 days, up to 24 times/year",
      "You must be in good health and feeling well",
      "You must be at least 17 years old in most states",
      "You must weigh at least 110 lbs",
    ],

    links: [
      <Link to="./informationforteens" className="linkStyle">
        See aditional requirements for students!
      </Link>,
      <Link to="./plateletdonation" className="linkStyle">
        {" "}
        Learn more about platelet donation
      </Link>,
    ],
  },

  {
    section: "AB Elite Plasma Donation",

    image: PlasmaPic,

    points: [
      "Donation frequency: Every 28 days, up to 13 times/year",
      "You must have type AB blood",
      "You must be in good health and feeling well",
      "You must be at least 17 years old",
      "You must weigh at least 110 lbs",
    ],

    links: [
      <Link to="./informationforteens" className="linkStyle">
        See aditional requirements for students!
      </Link>,
      <Link to="./abeliteplasmadonation" className="linkStyle">
        {" "}
        Learn more about plasma donation
      </Link>,
    ],
  },
];
