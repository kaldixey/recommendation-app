import React, { useState } from "react";
import {Card,ToggleButton,Button} from 'react-bootstrap';
import DataTable from 'react-data-table-component';

function ListView (props) {
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    let items = props.allItems;

    const columns = [
        {
            name: 'Type',
            selector: 'media_type',
            sortable: true,
            maxWidth: '30px'
        },
        {
            name: 'Title',
            selector: 'title',
            sortable: true,
            maxWidth: '300px'
        },
        {
            name: 'Genres',
            cell: row => <div>{row.genres.split(',').join(', ')}</div>
        },
        // {
        //     name: 'Complete',
        //     cell: () => <Button variant="outline-success">Complete!</Button>
        // },
        {
            name: 'Delete',
            button: true,
            cell: row => <Button variant="outline-danger" onClick={(e) => props.onDelete(row.id)}>Delete</Button>
        }
    ]


    return (
        <div>
            <DataTable title="My Items" columns={columns} data={items}></DataTable>
        </div>
    )

}

export default ListView;

