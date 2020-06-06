import React, { Component } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListContacts from './ListContacts.js';
import {generate} from 'randomstring';

class App extends Component {
  state = {
    "contacts": [
      {
        "key": generate(10),
        "firstName": "Cathy" ,
        "lastName": "Pierce",
        "birthday": "9/14/1996",
        "telephone": "200-910-8132"
      },
      {
        "key": generate(10),
        "firstName": "Alfonso",
        "lastName": "Cooley",
        "telephone": "200-657-9362"
      },
      {
        "key": generate(10),
        "firstName": "Sham",
        "lastName": "Aggarwal",
        "telephone": "200-661-9407"
      },
      {
        "key": generate(10),
        "firstName": "Ram",
        "lastName": "Sharma",
        "telephone": "998877665544"
      },
      {
        "key": generate(10),
        "firstName": "James",
        "lastName": "Anderson",
        "telephone": "9876543210"
      },
      {
        "key": generate(10),
        "firstName": "Matt",
        "lastName": "Henry",
        "telephone": "1234567890"
      }
    ],
    "formFirstName": '',
    "formLastName": '',
    "formTelephone": '',
    "searchPhrase": ''
  }

  addContactHandler = (event) => {
    event.preventDefault();
    let newContact = {
      key: generate(10),
      firstName: this.state.formFirstName,
      lastName: this.state.formLastName,
      telephone: this.state.formTelephone
    };
    this.setState({contacts: [...this.state.contacts, newContact]});
    this.setState({
      "formFirstName": '',
      "formLastName": '',
      "formTelephone": ''  
    });
  }

  deleteContactHandler = (key, event) => {
    let contacts = [...this.state.contacts];
    let deleteIndex = contacts.findIndex((item)=>item.key===key);
    contacts.splice(deleteIndex, 1);
    this.setState({"contacts": contacts});
  }

  handleSearchChange = (event) => {
    this.setState({searchPhrase: event.target.value});
  };

  render() {
    return (
      <div className="App">
        <Container>
          <div className="form-inline d-flex flex-row-reverse">
            <input className="form-control"
              type="text"
              placeholder="Search"
              value={this.state.searchPhrase}
              onChange={this.handleSearchChange} />
          </div>
          <header className="App-header text-center">
            <h1>Contact-Book</h1>
          </header>
          <ListContacts
            contacts={this.state.contacts}
            filterPhrase={this.state.searchPhrase}
            closer={(key, e) =>
              window.confirm("Are you sure you want to delete this contact?") && this.deleteContactHandler(key, e)}>
          </ListContacts>
          <div style={{"marginTop": 20}} className="p-4 border border-dark">
            <h2 className="text-left">Add a Contact</h2>
            <Form className="text-left" onSubmit={this.addContactHandler}>
              <Form.Group controlId="formContact">
              <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter First Name"
                  value={this.state.formFirstName}
                  onChange={(e) => this.setState({formFirstName: e.target.value})} />
                  <Form.Label>Last Name</Form.Label>
               
                <Form.Control
                  type="text"
                  placeholder="Enter Birthday"
                  value={this.state.formBirthday}
                  onChange={(e) => this.setState({formBirthday: e.target.value})} />
                  <Form.Label>Telephone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Telephone"
                  value={this.state.formTelephone}
                  onChange={(e) => this.setState({formTelephone: e.target.value})} />
              </Form.Group>
              <Button variant="primary" type="submit"><i className="fa fa-plus"></i> Add Contact</Button>
            </Form>
          </div>
        </Container>
      </div>
    );
  }
};

export default App;
