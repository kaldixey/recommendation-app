import React, { useState, useEffect } from "react";
import './App.css';
import InputView from "./components/InputView";
import ListView from "./components/ListView";
import {Col, Container, Row} from 'react-bootstrap';
import {Navbar, Nav, Alert} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
//import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
//import './custom-theme.scss';

function App() {
  const [inputView, setInputView] = useState(true);
  const [allItems, setAllItems] = useState([]);
  const [alert, setShowAlert] = useState(false);

  //move this

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    fetch("/items")
      .then(response => response.json())
      .then(items => {
        setAllItems(items);
      })
      .catch(error => {
        console.log(error);
      });
  };


  const handleChangeView = (inputView) => {
    setInputView(inputView)
    setShowAlert(false)
  }

  function handleNewItem(item, type) {
	
    let itemDetails = {item, type}
    
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(itemDetails)
    }
    
    fetch("/items", options)
      .then(result => result.json())
      .then(fetchedItems => setAllItems(fetchedItems))
      .then(setShowAlert(true))
      .catch(err => console.log("error:", err.message)
      );
      
  }

  async function deleteItem(id) {
    let options = {
      method: 'DELETE'
    }

    try {
      let response = await fetch(`/items/${id}`, options);
      if(response.ok) {
        let items = await response.json();
        setAllItems(items);
      } else {
        console.log(`Server error:, ${response.status} ${response.statusText}`)
      }
    } catch(err) {
      console.log('Network error:', err.message);
    }
  }

  async function completeItem(row) {

    let data = row;
    //console.log(data);

    data.completed === 0 ? data.completed = 1 : data.completed = 0;

    console.log(data);
    let options = {
      method: 'PUT',
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(data)
    }

    try {
      let response = await fetch(`items/${data.id}`, options);
      if(response.ok) {
        let items = await response.json();
        setAllItems(items);
      } else {
        console.log(`Server error:, ${response.status} ${response.statusText}`)
      }
    } catch(err) {
      console.log('Network error:', err.message);
    }
  }

  return (
    <Container style={{textAlign: "center"}} className="homeView">
      <Row>
      <Col>
        <Navbar bg="light">
          <Nav>
          <Button variant="outline-info" className={inputView?"button-active":"button"} onClick={ () => handleChangeView(true)}>ADD NEW</Button>
          <Button variant="outline-info" className={!inputView?"button-active":"button"} onClick={ () => handleChangeView(false)}>VIEW LIST</Button>
          </Nav>
        </Navbar>
      </Col>
      </Row>
      <Row>
      <Col>
        {/* <h1>ReMedia</h1> */}
      </Col>
      </Row>
      <Row>
      <Col>
        {inputView && <InputView handleNewItem={handleNewItem} />} {alert && <Alert variant="success">Item added!</Alert>}
        {!inputView && <ListView allItems={allItems} onDelete={id => deleteItem(id)} onComplete={(id, completeness) => completeItem(id, completeness)}/>}
      </Col>
      </Row>
    </Container>
  );
}

export default App;

