import React, { Component } from "react";
import { nanoid } from "nanoid";

import ContactsList from "./ContactsList";
import { Forms } from "./Contacts/ContactsForm";
import Filter from "./Filter";
import Section from "./Section/Section";

import { Container } from "./App.styled";
import { GlobalStyles } from "./GlobabalStyles";


export class App extends Component {
  state = {
    contacts: [],
    filter: ''
  };

  componentDidMount() {
    const contact = localStorage.getItem('Contact info');
    const parseContacts = JSON.parse(contact);

    if (parseContacts) {
      this.setState({ contacts: parseContacts })
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('Contact info', JSON.stringify(this.state.contacts))

    }
  }

  onChangeFilter = (input) => {
    this.setState({ filter: input })
  }

  onFormSubmit = data => {
    const personalData = {
      name: data.name,
      id: nanoid(),
      number: data.number
    }

    this.isIncludeName(personalData.name) ?
      alert(`${data.name} is alredy in your contacts`) :
      this.setState(({ contacts }) => ({ contacts: [...contacts, personalData] }))

  }

  deleteContact = (contactId) => {
    this.setState(prevsState => ({
      contacts: prevsState.contacts.filter(contact => contact.id !== contactId)
    }
    ))
  }

  isIncludeName = (inputName) => {
    return this.state.contacts.find(
      contact => contact.name.toLowerCase() === inputName.toLowerCase()
    )
  }

  render() {
    const { contacts, filter } = this.state;
    const { onFormSubmit, onChangeFilter, deleteContact } = this;

    const normalizeFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter(contact => contact.name.toLowerCase().includes(normalizeFilter));
    return (
      <>
        <Container>
          <Section title='Phonebook' >
            <Forms onSubmit={onFormSubmit} />
          </Section>
        </Container>
        <Container>
          <Section title='Contacts' >
            <Filter onChangeFilter={onChangeFilter} filter={filter} />
            {contacts.length > 0 ? <ContactsList contacts={visibleContacts} onDelete={deleteContact} /> : <p>Your phone book is empty</p>}

          </Section>
        </Container>
        <GlobalStyles />
      </>
    )
  }
}