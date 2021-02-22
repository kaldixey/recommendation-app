import React from "react";

function ListView (props) {
    let items = props.allItems;

    return (
        <div>
        <h2>Hi I'm the list view</h2>
        {
            items.map(it => <div key={it.id}>
                <p>{it.title}</p>
                <p>{it.overview}</p>
                <p>Genres: {it.genres}</p>
                </div>)
        }
        </div>
    )

}

export default ListView;

