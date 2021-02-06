import React, { useState, useEffect } from "react";
import './App.css';
import InputView from "./components/InputView";
import ListView from "./components/ListView";

function App() {
  const [inputView, setInputView] = useState(true);
  const [result, setResult] = useState(null);
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");

  let movieDBKey = "9d78113e827667b65962602869de3b76"

  async function getItem(item) {

    let titleString = item.title.split(' ').join('+')

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${movieDBKey}&query=${titleString}`;

    setItem(null);
    setResult(null);

    try {
      let response = await fetch(url);
      if (response.ok) {
        let data = await response.json();
        setResult(data);
      } else {
        setError(`Server Error: ${response.status} ${response.statusText}`)
      }
    } catch (err) {
      setError(`Network error: ${err.message}`);
    }

    let idurl = `https://api.themoviedb.org/3/movie/${result.id}?api_key=${movieDBKey}&append_to_response=watch/providers`;

    try {
      let response = await fetch(idurl);
      if (response.ok) {
        let data = await response.json();
        setItem(data);
      } else {
        setError(`Server Error: ${response.status} ${response.statusText}`)
      }
    } catch (err) {
      setError(`Network error: ${err.message}`);
    }


  }


  const handleChangeView = (inputView) => {
    setInputView(inputView)
  }

  return (
    <div className="App">
      <button className={inputView?"button-active":"button"} onClick={ () => handleChangeView(true)}>ADD NEW</button>
      <button className={!inputView?"button-active":"button"} onClick={ () => handleChangeView(false)}>VIEW LIST</button>
      <h1>Media Stash</h1>
      {inputView && <InputView onSubmit={(item) => getItem(item)}/>}
      {!inputView && <ListView item={item}/>}
    </div>
  );
}

export default App;
