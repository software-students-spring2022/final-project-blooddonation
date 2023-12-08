import "./styles/Faq.css";
import FAQHeader from "./FAQHeader";
import FAQAccordion from "./components/FAQAccordion";

/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Faq = (props) => {
  return (
    <>
      <FAQHeader />
      <FAQAccordion />
    </>
  );
};

// make this component available to be imported into any other file
export default Faq;
