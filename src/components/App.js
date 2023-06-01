import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { uuid } from "uuidv4";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";

// The App function component is defined. It uses React hooks, such as useState and useEffect, to manage the component's state
function App() {

  //LOCAL_STORAGE_KEY is a constant that represents the key used to store and retrieve contact data from the browser's local storage
  const LOCAL_STORAGE_KEY = "contacts";

  //The contacts state variable holds an array of contacts, and setContacts is a function to update the contacts state
  const [contacts, setContacts] = useState([]);

  //The searchTerm state variable is used to store the current search term entered by the user. The setSearchTerm function is used to update the searchTerm state
  const [searchTerm, setSearchTerm] = useState("");
  
  //The searchResults state variable holds an array of contacts that match the search term, and setSearchResults is a function to update the searchResults state
  const [searchResults, setSearchResults] = useState([]);

  //addContactHandler is a function that takes a contact object as an argument.It logs the contact object to the console.It adds a new contact to the contacts state array by creating a new object with a generated id using uuidv4() and spreading the properties of the contact object passed as an argument.The new contact is added to the contacts state using the setContacts function
  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts([...contacts, { id: uuid(), ...contact }]);
  };

 //removeContactHandler is a function that takes an id as an argument.It filters the contacts state array to remove the contact with the matching id.The filtered array is then set as the new value of the contacts state using the setContacts function
  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

//searchHandler is a function that takes a searchTerm as an argument.It updates the searchTerm state with the new value.If the searchTerm is not empty, it filters the contacts state array based on whether any of the contact's properties (converted to lowercase strings) contain the searchTerm.The filtered array is set as the new value of the `search
  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== ""){
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    }else {
      setSearchResults(contacts);
    }
  }

  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveContacts) setContacts(retriveContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <ContactList
                {...props}
                contacts={searchTerm.length < 1 ? contacts : searchResults}
                getContactId={removeContactHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            )}
          />
          <Route
            path="/add"
            render={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler} />
            )}
          />

          <Route path="/contact/:id" component={ContactDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
