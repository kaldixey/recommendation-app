import React from 'react';
import './ResultsList.css';

function ResultsList(props) {
    let items = props.movieResults;

    return (
        <div>
        <h2>Hi I'm the results list</h2>
            <ul>
                {
                    items && items.map(it => <li key={it.id} onClick={(e) => props.handleClick(it)}>{it.original_title}</li>)
                }
            </ul>
        </div>
    )
}

export default ResultsList;