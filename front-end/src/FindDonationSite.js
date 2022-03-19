import './styles/FindDonationSite.css'
import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from './components/Modal';

/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */



const Button = styled.button`
 min-width: 100px;
 padding: 16px 32px;
 border-radius: 4px;
 border: none;
 background: #141414;
 color: #fff;
 font-size: 24px;
 cursor: pointer;
`;


function FindDonationSite() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(prev => !prev);
  };

  return (
    <>

      <div className='find-body'>
        <h1>Hello and welcome!</h1>
        <Button onClick={openModal}>This is our blood donation Find Donation Site Page, click for questions/overlays</Button>
        <Modal showModal={showModal} setShowModal={setShowModal} />
 
      </div>
     
    </>
  );
}


// make this component available to be imported into any other file
export default FindDonationSite;