import React, { useState, useEffect } from "react";
import './App.css';
//import InputView from "./components/InputView";
import AutoSuggest from "./components/AutoSuggest";
import ListView from "./components/ListView";

function App() {
  const [inputView, setInputView] = useState(true);
  const [movie, setMovieData] = useState(null);

  const movieDBKey = "9d78113e827667b65962602869de3b76"

  const handleChangeView = (inputView) => {
    setInputView(inputView)
  }

  /*

  const getMovieData = (movieObject) => {

    let idurl = `https://api.themoviedb.org/3/movie/${movieObject.results[0].id}?api_key=${movieDBKey}`

    fetch(idurl)
            .then(response => response.json())
            .then(jsonResponse => {
                if(jsonResponse.Response === 'True') {
                    setMovieData(jsonResponse.search)
                } else {
                    console.log("That didn't work!")
                }
            })

  }
  */

  return (
    <div className="App">
      <button className={inputView?"button-active":"button"} onClick={ () => handleChangeView(true)}>ADD NEW</button>
      <button className={!inputView?"button-active":"button"} onClick={ () => handleChangeView(false)}>VIEW LIST</button>
      <h1>Media Stash</h1>
      {inputView && <AutoSuggest /*onSubmit={(movieObject) => getMovieData(movieObject)}*/ />}
      {!inputView && <ListView movie={movie} />}
    </div>
  );
}

export default App;


/*
  let movieDBKey = "9d78113e827667b65962602869de3b76"

  async function apiSearch(url) {
    try {
      let response = await fetch(url);
      if (response.ok) {
        let data = await response.json();
        return data;
      } else {
        console.log(`Server Error: ${response.status} ${response.statusText}`)
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }

  function getMovieData(movieObject) {

    let result = movieObject;

    let idurl = "https://api.themoviedb.org/3/movie/${result.results[0].id}?api_key=${movieDBKey}&append_to_response=watch/providers";

    setMovieData(apiSearch(idurl))

  }
*/