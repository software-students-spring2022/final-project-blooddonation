import "./styles/FindDonationSite.css";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MapOverlays } from "./components/MapOverlays";
import logo from "./images/logo.svg";
import { mapStyle } from "./components/MapStyle";
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow,  SearchBox} from "react-google-maps";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
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
  console.warn = () => {}
  const [showModal, setShowModal] = useState(false);
  const [mapData, setMapData] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [link, setLink] = useState("");


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
     <Search mapData={mapData}></Search>
     
       <GoogleMap defaultZoom={9.5} defaultCenter ={{lat: 40.729511, lng: -73.996460}} defaultOptions = {{styles: mapStyle}}>

            {mapData.map(center => (
              <>
              <Marker
                key = {center.name}
                position ={{lat: center.coordinates[0], lng:center.coordinates[1]}}
                onClick={()=>{setSelectedCenter(center); setLink(center.link);}}
              

              />
              </>
              
            ))}

            {selectedCenter &&
              (<InfoWindow 
                position ={{lat: selectedCenter.coordinates[0],  lng:selectedCenter.coordinates[1]}}
                onCloseClick = {() => {
                  setSelectedCenter(null);
                }}
                >
                  <>
                    <h2 onClick={openModal}>{selectedCenter.name}</h2>
                    <p>{selectedCenter.Address}</p>
                  </>
                </InfoWindow>)}
                {selectedCenter && (
                  <div className="find-body">
                    <MapOverlays showModal={showModal} setShowModal={setShowModal} link = {link}/>
                  </div>
                )}
                
        </GoogleMap>
      </>
    ): null}
    </>
   
      
  );
}

function Search(mapData) {
  console.warn = () => {}
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 40.729511, lng: () => -73.996460 },
      radius: 100 * 1000,
    },
  });

  let distances = [];
  const [link, setLink] = useState("");
  const [distObjs, setDistObjs] = useState([]);
  const [results, setResults] = useState(false);

  function distance(lat1, lon1, lat2, lon2, unit) {
    let radlat1 = Math.PI * lat1/180
    let radlat2 = Math.PI * lat2/180
    let theta = lon1-lon2
    let radtheta = Math.PI * theta/180
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
        dist = 1;
    }
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit==="K") { dist = dist * 1.609344 }
    if (unit==="N") { dist = dist * 0.8684 }
    distances.push(dist);
    return dist;
}



  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      const temp = [];
      mapData.mapData.map(center => {
        const dist = distance(lat, lng, center.coordinates[0], center.coordinates[1], 'K');
        temp.push({name: center.name, dist: dist, link: center.link, address: center.Address})
      });
      temp.sort(function(a, b) {
        return a.dist - b.dist;
      });
      setResults(true);
      setDistObjs(temp);
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  const handleCurrent = (lat, lng) =>{
    try {
      const temp = [];
      mapData.mapData.map(center => {
        const dist = distance(lat, lng, center.coordinates[0], center.coordinates[1], 'K');
        temp.push({name: center.name, dist: dist, link: center.link, address: center.Address})
      });
      temp.sort(function(a, b) {
        return a.dist - b.dist;
      });
      setResults(true);
      setDistObjs(temp);
    } catch (error) {
      console.log("😱 Error: ", error);
    }

  }

  return (
    <div className="controls">
      <h1 className="searchHeading"> Find a Donation Center in the NYC area!</h1>
        <div className="search">
          <Combobox onSelect={handleSelect}>
            <ComboboxInput
              value={value}
              onChange={handleInput}
              disabled={!ready}
              placeholder="Search your location"
            />
            <ComboboxPopover>
              <ComboboxList>
                {status === "OK" &&
                  data.map(({ id, description }) => (
                    <ComboboxOption key={id} value={description} />
                  ))}
              </ComboboxList>
            </ComboboxPopover>
          </Combobox>
        </div>

        <h3 className="currentLoc" onClick={() => {navigator.geolocation.getCurrentPosition((position) => {
          handleCurrent(position.coords.latitude, position.coords.longitude);},() => null);}}>Use Current location</h3>

        <h2 className="searchResults">The Closest Sites to You:</h2>
        {results ?(
          <>
            <div className="results">
              {distObjs.map((center) => (
                <p key={center.name} className="listingSites" onClick={()=>{setLink(center.link)}}> <div className="centerName" onClick={openModal}>{center.name}</div> {Math.round(center.dist * 10) / 10}km away 
                <br/><br/>
                {center.address}
                </p>
                
              ))}
            </div>
            <div className="find-body">
                    <MapOverlays showModal={showModal} setShowModal={setShowModal} link = {link}/>
            </div>
          </>
             
          ):
          <><p className="noResults"> Type in your location or select "Use Current Location" to see donation centers close to you! You can also click the markers on the map to choose a site!</p></>
          }
       
    </div>
    
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

function FindDonationSite() {
  console.warn = () => {}
  const [showModal, setShowModal] = useState(false);


  const openModal = () => {
    setShowModal((prev) => !prev);
  };



  return (
    <>
   <div style={{width: '97vw', height: '100vh', left: '-20%'}}>
      <WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`} loadingElement={<div style={{height: "100%"}}/>} containerElement={<div style={{height: "100%"}}/>} mapElement={<div style={{height: "100%"}}/>}/>
    </div>
   
    </>
      
  );
}

// make this component available to be imported into any other file
export default FindDonationSite;
