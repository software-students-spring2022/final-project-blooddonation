import "./styles/FindDonationSite.css";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MapOverlays } from "./components/MapOverlays";
import logo from "./images/logo.svg";
import { mapStyle } from "./components/MapStyle";
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from "react-google-maps";
import axios from "axios";


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

function Map(){
  const [showModal, setShowModal] = useState(false);
  const [mapData, setMapData] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");


  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const getMapData = () => {
    // setMessages([])
    // setLoaded(false)
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/finddonationsite`)
      .then((response) => {
        // axios bundles up all response data in response.data property
        const MapData = response.data.donationCenters;
        console.log(MapData);
        setMapData(MapData);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        // the response has been received, so remove the loading icon
        setLoaded(true);
      });
  };

  // set up loading data from server when the component first loads
  useEffect(() => {
    // fetch messages this once
    getMapData();
  }, []); // p

  
  return (
    <>
    {loaded ? (
      <>
       <GoogleMap defaultZoom={10} defaultCenter ={{lat: 40.729511, lng: -73.996460}} defaultOptions = {{styles: mapStyle}}>

            {mapData.map(center => (
              <>
              {console.log("here")}
              <Marker
                key = {center.name}
                position ={{lat: center.coordinates[0], lng:center.coordinates[1]}}
                onClick={()=>{setSelectedCenter(center);}}
              

              />
              </>
              
            ))}

            {selectedCenter &&
              (<InfoWindow 
                position ={{lat: selectedCenter.coordinates[0],  lng:selectedCenter.coordinates[1]}}
                onCloseClick = {() => {
                  setSelectedCenter(null);
                }}
                icon = {{
                  url: {logo},
                  scaledSize: new window.google.maps.Size(25,25)
                }}>
                  <div>
                    <h2>{selectedCenter.name}</h2>
                    <p>{selectedCenter.Address}</p>
                  </div>
                </InfoWindow>)}
        </GoogleMap>
      </>
    ): null}
    </>
   
      
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

function FindDonationSite() {
  const [showModal, setShowModal] = useState(false);


  const openModal = () => {
    setShowModal((prev) => !prev);
  };



  return (
    <>
   <div style={{width: '100vw', height: '100vh'}}>
      <WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`} loadingElement={<div style={{height: "100%"}}/>} containerElement={<div style={{height: "100%"}}/>} mapElement={<div style={{height: "100%"}}/>}/>
    </div>
   
    </>
      
  );
}

// make this component available to be imported into any other file
export default FindDonationSite;
