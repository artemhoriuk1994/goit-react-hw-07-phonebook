import ContactsList from "./ContactsList";
import { Forms } from "./Contacts/ContactsForm";
import Filter from "./Filter";
import Section from "./Section/Section";

import { Container } from "./App.styled";
import { GlobalStyles } from "./GlobabalStyles";
import { useDispatch, useSelector } from "react-redux";
import { getContacts, getFilter } from "redux/selectors";
import { addContact, deleteContact } from "redux/reducer";

export function App() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();


  const onFormSubmit = data => {
    isIncludeName(data.name) ?
      alert(`${data.name} is alredy in your contacts`) :
      dispatch(addContact(data));
  };



  const isIncludeName = (inputName) => {
    return contacts.find(
      contact => contact.name.toLowerCase() === inputName.toLowerCase()
    )
  }

  const delContact = contacts => {
    dispatch(deleteContact(contacts))
  }

  const visibleContacts = () => {
    const normalize = filter.toLowerCase();
    const filtred = contacts.filter(contact => contact.name.toLowerCase().includes(normalize));
    return filtred
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
          <Filter filter={filter} />
          {contacts.length > 0 ? <ContactsList onDelete={delContact} contacts={visibleContacts()} /> : <p>Your phone book is empty</p>}
        </Section>
      </Container>
      <GlobalStyles />
    </>
  )
};