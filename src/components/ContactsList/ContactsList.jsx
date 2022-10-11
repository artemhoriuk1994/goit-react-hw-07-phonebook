import { Box } from 'components/box';
import { Loader } from 'components/Loader/Loader'
import { useGetContactsQuery } from 'redux/contactSlice';
import { useSelector } from 'react-redux';
import { getFilter } from 'redux/selectors';
import { ContactListItem } from 'components/ContactListItem/ContactListItem';

const ContactsList = () => {
    const { data: contacts, error, isFetching, isError, isLoading } = useGetContactsQuery();
    const contactInfo = contacts?.length > 0 && !isFetching && !isLoading;
    const filter = useSelector(getFilter)

    const visibleContacts = () => {
        const normalize = filter.toLowerCase();
        const filtred = contacts?.filter(contact => contact.name.toLowerCase().includes(normalize));
        return filtred
    }
    const filtredContacts = visibleContacts();
    return (
        <Box as="ul" display="flex" flexDirection="column" gridGap={4}>
            {isError && (error.data)}
            {isFetching && (<Loader />)}
            {contactInfo ? (filtredContacts.map(contact => <ContactListItem contact={contact} key={contact.id} />))
                : (!isFetching && (<><p>Your phonebook is empty</p></>))}
        </Box>
    )
}

export default ContactsList;