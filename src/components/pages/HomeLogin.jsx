import React, { useState } from 'react';
import HomePage from '../HomePage/HomePage';
import SearchResults from '../SearchResults/index';
// import './styles/homelogin.css';

const HomeLogin = () => {

  const [searchValue, setSearchValue] = useState('New York, NY, USA');

  return searchValue !== ''
    ? <SearchResults searchValue={ searchValue } setSearchValue={ setSearchValue } /> 
    : <HomePage setSearchValue={ setSearchValue } />;
};

export default HomeLogin;
