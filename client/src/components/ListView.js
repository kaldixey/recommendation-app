import React, { useState } from "react";
import {Button} from 'react-bootstrap';
import DataTable from 'react-data-table-component';

function ListView (props) {
    //const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    let items = props.allItems;

    const conditionalRowStyles = [
        {
            when: row => row.completed == 1,
            style: {
                backgroundColor: 'gray'
            }
        }
    ]

    const filteredItems = items.filter(item => item.completed == 0);

    const columns = [
        {
            name: 'Type',
            selector: row => row['media_type'],
            sortable: true,
            maxWidth: '30px'
        },
        {
            name: 'Title',
            selector: row => row['title'],
            sortable: true,
            maxWidth: '300px'
        },
        {
            name: 'Genres',
            cell: row => <div style={{textAlign: "left"}}>{row.genres.split(',').join(', ')}</div>
        },
        {
            name: 'Complete',
            cell: row => <Button variant="outline-success" onClick={(e) => props.onComplete(row)}>{row.completed == 0 ? "Complete!" : "Undo"}</Button>
        },
        {
            name: 'Delete',
            button: true,
            cell: row => <Button variant="outline-danger" onClick={(e) => props.onDelete(row.id)}>Delete</Button>
        }
    ]


    return (
        <div>
            <DataTable 
                title="My Items" 
                columns={columns} 
                data={items}
                expandableRows
                expandableRowsComponent={({data}) => <div>{data.overview}</div>}
                conditionalRowStyles={conditionalRowStyles} 
            />                
        </div>
    )

}

export default ListView;

