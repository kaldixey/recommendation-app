import React, { useState } from "react";
//import "./InputView.css";
import ResultsList from './ResultsList';
import Button from 'react-bootstrap/Button';
//import Form from 'react-bootstrap/Form';


function InputView (props) {
    let [type, setType] = useState('');
    let [title, setTitle] = useState('');
    let [searchResults, setSearchResults] = useState(null);
    let [showResultsList, setShowResultsList] = useState(false);

    //move
    const movieDBKey = process.env.REACT_APP_MOVIEDB_KEY

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        switch (name) {
            case 'type':
                setType(value);
                break;
            case 'title':
                setTitle(value);
            //no default
        }
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setSearchResults(null);
        let query = { type, title };

        //do a case switch with titleQuery and amend url accordingly
        let titleQuery = `https://api.themoviedb.org/3/search/movie?api_key=${movieDBKey}&query=${query.title.split(' ').join('+')}`

        fetch(titleQuery)
            .then(response => response.json())
            .then(data => setSearchResults(data.results.slice(0,10)))
            .catch(error => console.log(error));

        setShowResultsList(true);

        setTitle('');
    }

    const selectItem = (item) => {
        let objType = type;
        props.handleNewItem(item, objType) // add type
        setShowResultsList(false);
        setSearchResults(null);
        //reset type here instead so it can be passed to App.js
        setType('');
    }
    
    return (
        <div className="input-form">
        <h3>Store a new item</h3>
            <form onSubmit={handleSubmit}>
                <p>
                <label htmlFor="type">Choose type:</label><br/>
                <select name="type" id="type" value={type} onChange={handleChange}>
                    <option value="DEFAULT">Please Select</option>
                    <option value="Film">Film</option>
                    <option value="Book">Book</option>
                    <option value="TVShow">TV Show</option>
                    <option value="Podcast">Podcast</option>
                </select>
                </p>
                <p>
                <label htmlFor="title">Enter Title:</label><br/>
                <input type="text" name="title" id="title" value={title} onChange={handleChange}></input>
                </p>
                <p>
                <Button variant="secondary" size="lg" type="submit">Submit</Button>
                </p>
            </form>
        {showResultsList && <ResultsList searchResults={searchResults} handleClick={item => selectItem(item)}/>}
        </div>
    )
}

export default InputView;

