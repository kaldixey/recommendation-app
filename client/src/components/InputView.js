import React, { useState } from "react";
import "./InputView.css"
import ResultsList from './ResultsList'


function InputView (props) {
    let [type, setType] = useState('');
    let [title, setTitle] = useState('');
    let [movieResults, setMovieResults] = useState(null);
    let [showResultsList, setShowResultsList] = useState(false);

    const movieDBKey = "9d78113e827667b65962602869de3b76"

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
        setMovieResults(null);
        let query = { type, title };
        //search the API here
        let titleQuery = `https://api.themoviedb.org/3/search/movie?api_key=${movieDBKey}&query=${query.title.split(' ').join('+')}`

        fetch(titleQuery)
            .then(response => response.json())
            .then(data => setMovieResults(data.results.slice(0,10)))
            .catch(error => console.log(error));

        setShowResultsList(true);

        setTitle('');
        setType('');
    }

    const selectItem = (item) => {
        props.handleNewItem(item)
        setShowResultsList(false);
    }
    
    return (
        <div className="input-form">
        <h2>Hi I'm the input view</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="type">Select media type:</label>
                <select name="type" id="type" value={type} onChange={handleChange}>
                    <option selected value=" ">Please Select</option>
                    <option value="film">Film</option>
                    <option value="book">Book</option>
                    <option value="tvShow">TV Show</option>
                    <option value="podcast">Podcast</option>
                </select>
                <label htmlFor="title">Title:</label>
                <input type="text" name="title" id="title" value={title} onChange={handleChange}></input>
                <button type="submit">Submit</button>
            </form>
        {showResultsList && <ResultsList movieResults={movieResults} handleClick={item => selectItem(item)}/>}
        </div>
    )
}

export default InputView;

