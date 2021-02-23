import React from "react";
import {Card,ToggleButton} from 'react-bootstrap';

function ListView (props) {
    let items = props.allItems;


    return (
        <div>
        <h2>My Items</h2>
        {
            items.map(it => 
            <Card border="info" /*style={{width: '60%'}}*/ key={it.id}>
                <Card.Body>
                <Card.Title>[{it.media_type}] {it.title}</Card.Title>
                <Card.Subtitle>{it.genres.split(',').join(', ')}</Card.Subtitle>
                <Card.Text>{`${it.overview.slice(0,150)}[...]`}</Card.Text>
                <Card.Text>Length: {it.item_length} minutes</Card.Text>
                <ToggleButton type="checkbox" variant="secondary">Complete</ToggleButton>
                <Card.Link href="#" onClick={(e) => props.onDelete(it.id)}>Delete</Card.Link>
                </Card.Body>
            </Card>)
        }
        </div>
    )

}

export default ListView;

