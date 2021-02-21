import React, {useState} from 'react';
import Autosuggest from 'react-autosuggest';
import "./AutoSuggest.css";

function AutoSuggest() {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const DBKey = "9d78113e827667b65962602869de3b76";

    const getSuggestions = async(value) => {
        const inputValue = value.split(' ').join('+');
        let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${DBKey}&query=${inputValue}`);
        let movieData = await response.json();
        return movieData;
    };

    const getSuggestionValue = suggestion => suggestion.Title;

    const renderSuggest = suggestion => (
        <span className="sugg-option">
            <span className="icon-wrap"><img src="https://upload.wikimedia.org/wikipedia/commons/e/e2/LG_smart_TV.jpg" /></span>
            <span className="name">
                {suggestion.Title}
            </span>
        </span>
    )

    const onChange = (event) => {
        //if (event.target.value.split(' ').length > 2) {
        setValue(event.target.value)
    }

    const onSuggestionRequest = ({value}) => {
        getSuggestions(value)
            .then(movieData => {
                if (movieData.Error) {
                    setSuggestions([])
                } else {
                    setSuggestions(movieData.Search)
                }
            })
    }

    const onSuggestionClear = () => {
        setSuggestions([]);
    };

    return (

        <Autosuggest suggestions={suggestions} onSuggestionsFetchRequested={onSuggestionRequest} onSuggestionsClearRequested={onSuggestionClear} getSuggestionValue={getSuggestionValue} renderSuggestion={renderSuggest} inputProps={{placeholder: 'Type movie name', value, onChange: onChange}} />
    );

    
}

export default AutoSuggest;