import React from "react";

function ListView (props) {
    let f = props.item;

    return (
        <div>
        <h2>Hi I'm the list view</h2>
        <p>Movie ID: {f.results[0].id}<br />Full Title: {f.results[0].original_title}</p>
        <p>{f.results[0].overview}</p>
        </div>
    )

}

export default ListView;