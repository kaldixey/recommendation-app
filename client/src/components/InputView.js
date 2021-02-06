import React, { useState } from "react";
import "./InputView.css"

function InputView (props) {
    let [type, setType] = useState('');
    let [title, setTitle] = useState('');

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
        const item = { type, title };
        props.onSubmit(item);

        setTitle('');
        setType('');
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
        </div>
    )

}

export default InputView;

//TMDB API Key = "9d78113e827667b65962602869de3b76"
//TMDB example request = "https://api.themoviedb.org/3/movie/550?api_key=9d78113e827667b65962602869de3b76"