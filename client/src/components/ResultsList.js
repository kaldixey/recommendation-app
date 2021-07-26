import React from 'react';
import './ResultsList.css';
import {Alert, ListGroup} from 'react-bootstrap'; 

function ResultsList(props) {
    let items = props.searchResults;

    return (
        <div>
        <h2>Results:</h2>
            <ListGroup>
                {
                    items && items.map(it => <ListGroup.Item key={it.id} onClick={(e) => props.handleClick(it)}>{it.original_title} ({it.release_date.substring(0,4)})</ListGroup.Item>)
                }
            </ListGroup>
            <Alert variant="warning">Can't find what you're looking for? Enter manually</Alert>
        </div>
    )
}

export default ResultsList;