import React, { useState, useEffect } from "react";
import './App.css';
import InputView from "./components/InputView";
import ListView from "./components/ListView";

function App() {
  const [inputView, setInputView] = useState(true);
  const [allItems, setAllItems] = useState([]);

  const movieDBKey = "9d78113e827667b65962602869de3b76"

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    fetch("/items")
      .then(response => response.json())
      .then(items => {
        setAllItems(items);
      })
      .catch(error => {
        console.log(error);
      });
  };


  const handleChangeView = (inputView) => {
    setInputView(inputView)
  }

  const handleNewItem = (item, type) => { 

    let idurl = `https://api.themoviedb.org/3/movie/${item.id}?api_key=${movieDBKey}`


    fetch(idurl)
      .then(response => response.json())
      .then(data => {
        data.type=type
        //console.log(data);
        let options = {
          method: "POST",
          headers: { "Content-Type" : "application/json" },
          body: JSON.stringify(data)
        };
        fetch("/items", options)
          .then(result => result.json())
          .then(items => setAllItems(items))
          .catch(err => console.log("error:", err.message)
          )
      }
      ).catch(error => console.log(error))
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

