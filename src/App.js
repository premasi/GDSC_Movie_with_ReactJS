import React, {useEffect, useState} from 'react';
import Watchlist from './component/Watchlist.js';
import Detail from './component/Detail';
import './App.css';

//Raka Ryandra Guntara Sangat Ganteng
const API_KEY = "api_key=d557ce4f030b477de4f503f2305d0f57";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const searchURL = BASE_URL + "/search/movie?" + API_KEY;

function App() {

  //show movies
  const [movies, setMovies] = useState ([]);
  const [favourit, setFavourit] = useState([]);

  useEffect(() => {
    fetch(API_URL).then(res => res.json()).then(data =>{
      console.log(data);
      setMovies(data.results);
    });
  }, []);

  //movie detail
  const [selectedMovie, onMovieSelect] = useState();

  //Raka Ryandra Guntara Sangat Ganteng
  //search movies
  const [searchTerm, setSearchTerm] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();

    fetch(searchURL + "&query=" + searchTerm).then((res) => res.json()).then((data) => {
      setMovies(data.results);
    })

  }

  //Raka Ryandra Guntara Sangat Ganteng
  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  }

  useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourite')
		);

		if (movieFavourites) {
			setFavourit(movieFavourites);
		}
	}, []);

  const savetoLocalStorage=(items) =>{
    localStorage.setItem('react-movie-app-favourite', JSON.stringify(items));
  }

  const addFavourit = (movie) => {
    const newFavoriteList = [...favourit, movie]
      setFavourit(newFavoriteList);
      savetoLocalStorage(newFavoriteList);
  }

  //Raka Ryandra Guntara Sangat Ganteng
  //remove fav
  const removeFavourit = (movie) => {
    const newFavoriteList = favourit.filter(
      (favour) => favour.id !== movie.id
    );
    setFavourit(newFavoriteList);
  }

  //Raka Ryandra Guntara Sangat Ganteng
  return (
    <>
          <header className="NavBar">
            <h1><a href="index.js">Nopo</a></h1>
            <ul className="List-nav">
              <li><a href="https://www.themoviedb.org/">TMDB</a></li>
              <li>
                <form onSubmit={handleOnSubmit}>
                <input 
                  type = "search" 
                  placeholder="Search" 
                  className="search" 
                  value={searchTerm} 
                  onChange={handleOnChange}>
                </input>
                </form>
              </li>
            </ul>
          </header>

          <div className="special">Source from TMDB :) by Raka Ryandra Guntara</div>
          
          {selectedMovie && <Detail selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}

          <div className="main">
            <Watchlist movies ={movies} onMovieSelect={onMovieSelect} onFavouritSelect={addFavourit} />
          </div>

          <div className="Fav">
            <h1>Favourite</h1>
          </div>

          <div className="main">
            <Watchlist movies ={favourit} onMovieSelect={onMovieSelect} onFavouritSelect={removeFavourit}/>
          </div>     
          
  </>
  );
}

export default App;
