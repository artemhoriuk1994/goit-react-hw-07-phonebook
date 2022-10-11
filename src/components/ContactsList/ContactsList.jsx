import Btn from 'components/Button/Button';
import { ContactItem } from './ContactsList.styled';
import { Box } from 'components/box';
import { Loader } from 'components/Loader/Loader'
import { useDeleteContactMutation, useGetContactsQuery } from 'redux/contactSlice';
import { useSelector } from 'react-redux';
import { getFilter } from 'redux/selectors';



const ContactsList = () => {
    const filter = useSelector(getFilter)
    const { data: contacts, error, isFetching, isError } = useGetContactsQuery();
    const [deleteContact] = useDeleteContactMutation();

    const visibleContacts = () => {
        const normalize = filter.toLowerCase();
        const filtred = contacts?.filter(contact => contact.name.toLowerCase().includes(normalize));
        return filtred
    }
    const filtredContacts = visibleContacts();
    const contactInfo = contacts.length > 0 && !isFetching;

    return (
        <Box as="ul" display="flex" flexDirection="column" gridGap={4}>
            {isError && (error.data)}
            {isFetching && (<Loader />)}
            {contactInfo ? (filtredContacts.map(contact => (
                <ContactItem key={contact.id}><p>{contact.name}: {contact.phone}</p>
                    <Btn name='DeleteBTN' onClick={() => {
                        deleteContact(contact.id)
                    }} disabled={isFetching}>
                        Delete
                    </Btn>
                </ContactItem>))) : (<><p>Your phonebook is empty</p></>)}
        </Box>
    )
}

export default ContactsList;