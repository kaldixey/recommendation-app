import React from "react";

function ListView (props) {
    let items = props.allItems;

    return (
        <div>
        <h2>Hi I'm the list view</h2>
        {
            items.map(it => <div key={it.id}>
                <p>{it.original_title}</p>
                <p>{it.overview}</p>
                <p>Genres: {it.genres.map(g => <p key={g.id}>{g.name}</p>)}</p>
                </div>)
        }
        </div>
    )

}

export default ListView;

