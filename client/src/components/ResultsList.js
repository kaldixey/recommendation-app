import React from 'react';
import './ResultsList.css';
import {Alert, ListGroup, ListGroupItem} from 'react-bootstrap'; 

function ResultsList(props) {
    let items = props.searchResults;

    return (
        <div>
        <h2>Results:</h2>
            <ListGroup>
                {
                    items && items.map(it => <ListGroup.Item key={it.id} onClick={(e) => props.handleClick(it)}>{it.original_title}</ListGroup.Item>)
                }
            </ListGroup>
            <Alert variant="warning">Can't find what you're looking for? <a href="#">Enter manually</a></Alert>
        </div>
    )
}

export default ResultsList;