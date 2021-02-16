import React, {useState} from 'react';
import Autosuggest from 'react-autosuggest';
import "./AutoSuggest.css";

function AutoSuggest() {
    const [value, setValue] = '';
    const [suggestions, setSuggestions] = '';

    const DBKey = "9d78113e827667b65962602869de3b76";

    getSuggestions = async(value) => {
        const inputValue = value.split(' ').join('+');
        let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${DBKey}&query=${inputValue}`);
        let movieData = await response.json();
        return movieData;
    };

    getSuggestionValue = suggestion => suggestion.Title;

    renderSuggest = suggestion => (
        <span className="sugg-option">
            <span className="icon-wrap"><img src="https://upload.wikimedia.org/wikipedia/commons/e/e2/LG_smart_TV.jpg" /></span>
            <span className="name">
                {suggestion.Title}
            </span>
        </span>
    )

    onChange = (event, {newValue}) => {
        setValue(newValue)
    }

    onSuggestionRequest = ({value}) => {
        getSuggestions(value)
            .then(data => {
                if (data.Error) {
                    setSuggestions([])
                } else {
                    setSuggestions(data.Search)
                }
            })
    }

    onSuggestionClear = () => {
        setSuggestions([]);
    };

    //const { value, suggestions } = useState;

    const inputProps = {
        placeholder: 'Type movie name',
        value,
        onChange: this.onChange
    };

    return (
        <Autosuggest 
            suggestions={suggestions}
            onSuggestionRequest={onSuggestionRequest}
            onSuggestionClear={onSuggestionClear}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}/>
    );


}

export default AutoSuggest;