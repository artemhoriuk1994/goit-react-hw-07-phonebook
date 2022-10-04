import ContactsList from "./ContactsList";
import { Forms } from "./Contacts/ContactsForm";
import Filter from "./Filter";
import Section from "./Section/Section";

import { Container } from "./App.styled";
import { GlobalStyles } from "./GlobabalStyles";


export function App() {
  return (
    <>
      <Container>
        <Section title='Phonebook' >
          <Forms />
        </Section>
      </Container>
      <Container>
        <Section title='Contacts' >
          <Filter />
          <ContactsList />
        </Section>
      </Container>
      <GlobalStyles />
    </>
  )
};