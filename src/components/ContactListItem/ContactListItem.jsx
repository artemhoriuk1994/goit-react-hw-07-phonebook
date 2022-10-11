import { useDeleteContactMutation } from 'redux/contactSlice';
import { Loader } from 'components/Loader/Loader'
import PropTypes from 'prop-types'
import { ContactItem } from './ContactListItem.styled';
import Btn from 'components/Button/Button';

export const ContactListItem = ({ contact }) => {
    const [deleteContact, { isLoading }] = useDeleteContactMutation();
    return (
        (
            <ContactItem><p>{contact.name}: {contact.phone}</p>
                <Btn name='DeleteBTN' onClick={() => { deleteContact(contact.id) }} disabled={isLoading}>
                    {isLoading ? <Loader size={35} /> : "Delete"}
                </Btn>
            </ContactItem>
        ))
}

ContactListItem.propTypes = {
    contact: PropTypes.shape({
        createdAt: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired
    }),
}
