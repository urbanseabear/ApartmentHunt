import React, { useState } from 'react';
import PlacesAutoComplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import '../SearchResults/styles.scss';
import TopBanner from '../SearchResults/TopBanner';
import axios from 'axios';

const UploadListing = ({ searchValue, setSearchValue }) => {
    const [url, setUrl] = useState('');
  const [listing, setListing] = useState({
    address: '',
    applicants: [],
    listingName: '',
    state: 'NY',
    zipCode: '',
    city: '',
    country: 'USA',
    description: '',
    sqft: null,
    neighborhoods: [],
    position: {},
    price: null,
    pics: [],
    videos: [],
    pets: {dogs: false, cats: false},
    beds: null,
    baths: null,
    agent: ''
});

const addUrl = (e) => {
    e.preventDefault();
    setListing(prevState => ({...prevState, [e.target.name]: [...prevState[e.target.name], url]}));
    setUrl('');
    if (e.target.name === 'pics') {
      let reset = document.getElementById("picIn");
      reset.value = '';
    } else if (e.target.name === 'videos') {
        let reset = document.getElementById("vidIn");
        reset.value = '';
    } else {
        let reset = document.getElementById("hoods");
        reset.value = '';
    }
  };

const getPos = async () => {
    // converts location value to coordinates for API call
    let address = `${listing.address}, ${listing.city}, NY, USA`;
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    console.log(latLng);
    setListing(prevState => ({...prevState,  position: {type: "Point", coordinates: [latLng.lng, latLng.lat]}}));
  };

  const handleChange = (e) => {
      setListing(prevState => ({...prevState, [e.target.name]: e.target.value}));
  };

  const handleUrl = (e) => {
    e.preventDefault();
      setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log(listing);
      axios.post('http://localhost:3000/listing', listing)
      .then(() => {
          console.log("success meow!");
      })
      .catch((err) => {
          console.log("Fail meow", err);
      })
  };

  
  const handlePets = (e) => {
    e.preventDefault();
    if(e.target.value === 'yes') {
        
        setListing(prevState => ({...prevState, pets: {...prevState.pets, [e.target.name]: true}}));
    }
    if(e.target.value === 'no') {
        
        setListing(prevState => ({...prevState, pets: {...prevState.pets, [e.target.name]: false}}));
    }
  };

  return (
    <div className='main'>
      <TopBanner searchValue={ searchValue } setSearchValue={ setSearchValue } />
      <div className='bottomContainer'>
          <form className="listingForm">
          <div>
                  <label>City: </label>
                  <input type="text" name="city" onChange={handleChange}></input>
              </div>
          <div>
                  <label>Listing Name: </label>
                  <input type="text" name="listingName" onChange={handleChange}></input>
              </div>
              <div>
                  <label>Address(DO NOT ABBREVIATE STREET TYPE): </label>
                  <input type="text" name="address" onChange={handleChange}></input>
              </div>
              <div>
                  <label>Zip Code: </label>
                  <input type="text" name="zipCode" onChange={handleChange}></input>
              </div>
              <div>
                  <label>Get Position </label>
                  <input type="button" name="getPos" value="get coordinates" onClick={getPos}></input>
              </div>
              <div>
                  <label>Description: </label>
                  <textarea name="description" onChange={handleChange}></textarea>
              </div>
              
              <div>
                  <label>Agent: </label>
                  <input type="text" name="agent" onChange={handleChange}></input>
              </div>
              <div>
                  <label>Beds: </label>
                  <input type="number" name="beds" onChange={handleChange}></input>
              </div>
              <div>
                  <label>Baths: </label>
                  <input type="number" name="baths" onChange={handleChange}></input>
              </div>
              <div>
                  <label>Price: </label>
                  <input type="number" name="price" onChange={handleChange}></input>
              </div>
              <div>
                  <label>Square Feet: </label>
                  <input type="number" name="sqft" onChange={handleChange}></input>
              </div>
              <div>
              <div>PETS?</div>
                  <label>Cats? </label>
                  <input type="button"  name="cats" value='yes' onClick={handlePets}></input><input type="button"  name="cats" value='no' onClick={handlePets}></input><br></br>
                  <label>Dogs? </label>
                  <input type="button"  name="dogs" value='yes'  onClick={handlePets}></input><input type="button"  name="dogs" value='no'  onClick={handlePets}></input><br></br>
                
              </div>
              <div>
                  
                  <label>Neighborhoods (ADD BORROUGH TO HERE AS WELL): </label>
                  <input type="text" id="hoods" name="neighborhoods" onChange={handleUrl}></input>
                  <input type="submit" value="Add" name="neighborhoods" onClick={addUrl}></input>
                  
              </div>
              <div>
                  
                  <label>Pictures: </label>
                  <input type="url" id="picIn" name="pics" onChange={handleUrl}></input>
                  <input type="submit" value="Submit" name="pics" onClick={addUrl}></input>
                  
              </div>
              <div>
                  
                  <label>Videos: </label>
                  <input type="url" id="vidIn" name="videos" onChange={handleUrl}></input>
                  <input type="submit" value="Submit" name="videos" onClick={addUrl}></input>
                
              </div>
              <input type="submit" value="Submit Listing" onClick={handleSubmit}></input>
          </form>
        </div>
      </div>
  );
};

export default UploadListing;