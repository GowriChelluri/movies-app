import './App.css';
import React, { useState } from 'react';
import { BrowserRouter,Switch, Route} from 'react-router-dom';
import Navbar from './components/Navbar'
import TopRatedMovies from './components/TopRatedMovies'
import UpcomingMovies from './components/UpcomingMovies'
import Home from './components/Home';
import MovieDetails from './components/MovieDetails';
import SearchedMoviePage from './components/SearchedMoviePage';


const App=()=>{
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  return(
    <BrowserRouter>
      <Navbar onSearch={handleSearch}/> 
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/top-rated-movies" component={TopRatedMovies}/>
        <Route exact path="/upcoming-movies" component={UpcomingMovies}/>
        <Route exact path="/movie/:movie_id" component={MovieDetails} />
        <Route exact path="/movie/:movie_id">
          <SearchedMoviePage searchQuery={searchQuery} />
        </Route>
      </Switch>
  </BrowserRouter>
)
}

export default App
