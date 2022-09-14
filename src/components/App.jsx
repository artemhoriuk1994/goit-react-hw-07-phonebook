import ContactsList from "./ContactsList";
import { Forms } from "./Contacts/ContactsForm";
import Filter from "./Filter";
import Section from "./Section/Section";

import { Container } from "./App.styled";
import { GlobalStyles } from "./GlobabalStyles";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";


export function App() {
  const [contacts, setContacts] = useState(() => {
    const data = window.localStorage.getItem('Contact info');
    const parseData = JSON.parse(data);
    return (parseData ?? []);
  });
  const [filtr, setFiltr] = useState('')


  useEffect(() => {
    window.localStorage.setItem('Contact info', JSON.stringify(contacts))
  }, [contacts])


  const onFormSubmit = data => {
    const personalData = {
      name: data.name,
      id: nanoid(),
      number: data.tel
    }

    isIncludeName(data.name) ?
      alert(`${data.name} is alredy in your contacts`) :
      setContacts(state => [...state, personalData]);
  };

  const deleteContact = (contactId) => {
    setContacts(contacts => (
      contacts.filter(contact => contact.id !== contactId)
    ))
  }

  const visibleContacts = () => {
    const normalize = filtr.toLowerCase();
    const filtred = contacts.filter(contact => contact.name.toLowerCase().includes(normalize));
    return filtred
  }
  const isIncludeName = (inputName) => {
    return contacts.find(
      contact => contact.name.toLowerCase() === inputName.toLowerCase()
    )
  }
  return (
    <>
      <Container>
        <Section title='Phonebook' >
          <Forms onSubmit={onFormSubmit} />
        </Section>
      </Container>
      <Container>
        <Section title='Contacts' >
          <Filter onChangeFilter={(input) => setFiltr(input)} filter={filtr} />
          {contacts.length > 0 ? <ContactsList onDelete={deleteContact} contacts={visibleContacts()} /> : <p>Your phone book is empty</p>}

        </Section>
      </Container>
      <GlobalStyles />
    </>
  )
};