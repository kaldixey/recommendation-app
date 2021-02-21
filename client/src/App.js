import React, { useState, useEffect } from "react";
import './App.css';
import InputView from "./components/InputView";
import ListView from "./components/ListView";

function App() {
  const [inputView, setInputView] = useState(true);
  const [allItems, setAllItems] = useState([]);

  const movieDBKey = "9d78113e827667b65962602869de3b76"

  const handleChangeView = (inputView) => {
    setInputView(inputView)
  }

  const handleNewItem = (item) => {

    let idurl = `https://api.themoviedb.org/3/movie/${item.id}?api_key=${movieDBKey}`

    fetch(idurl)
      .then(response => response.json())
      .then(data => setAllItems([...allItems, data]))
      .catch(error => error.message)    

    setInputView(false);
  }

  return (
    <div className="App">
      <button className={inputView?"button-active":"button"} onClick={ () => handleChangeView(true)}>ADD NEW</button>
      <button className={!inputView?"button-active":"button"} onClick={ () => handleChangeView(false)}>VIEW LIST</button>
      <h1>Media Stash</h1>
      {inputView && <InputView handleNewItem={handleNewItem} />}
      {!inputView && <ListView allItems={allItems} />}
    </div>
  );
}

export default App;

