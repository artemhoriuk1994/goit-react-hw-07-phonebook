import Btn from 'components/Button/Button';
import PropTypes from 'prop-types'
import { ContactItem } from './ContactsList.styled';
import { Box } from 'components/box';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from "redux/reducer";
import { getContacts, getFilter } from 'redux/selectors';

const ContactsList = () => {
    const dispatch = useDispatch();
    const filter = useSelector(getFilter)
    const contacts = useSelector(getContacts);

    const visibleContacts = () => {
        const normalize = filter.toLowerCase();
        const filtred = contacts.filter(contact => contact.name.toLowerCase().includes(normalize));
        return filtred
    }
    const filtredContact = visibleContacts();

    const delContact = contacts => {
        dispatch(deleteContact(contacts))
    }

    return (
        <Box as="ul" display="flex" flexDirection="column" gridGap={4}>
            {contacts.length > 0 ? (
                filtredContact.map(contact => (
                    <ContactItem key={contact.id}>{contact.name}: {contact.number}
                        <Btn name='DeleteBTN' onClick={() => delContact(contact.id)}>
                            Delete
                        </Btn>
                    </ContactItem>
                ))
            ) : (<p>Your phone book is empty</p>)}</Box>
    )
}

ContactsList.propTypes = {
    contact: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            contact: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired
        })
    )
}
export default ContactsList;