import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './index.css';

const Navbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchQuery); 
    history.push('/searched'); 
  };

  return (
    <div className="nav-container">
      <h1 className="nav-heading">MovieDB</h1>
      <div className="items-container">
        <ul className="nav-items-container">
          <Link to="/">
            <li>Popular</li>
          </Link>
          <Link to="/top-rated-movies">
            <li>Top Rated</li>
          </Link>
          <Link to="/upcoming-movies">
            <li>Upcoming</li>
          </Link>
        </ul>
        <form onSubmit={handleSearch}>
          <input style={{marginRight:'10px'}}
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search Movie"
          />
          <button type="submit" style={{backgroundColor:'grey',borderWidth:'0px',borderRadius:'5px',fontSize:'13px',height:'25px',color:'white'}}>Search</button>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
