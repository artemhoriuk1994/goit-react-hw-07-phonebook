import Btn from 'components/Button/Button';
import PropTypes from 'prop-types'
import { ContactItem } from './ContactsList.styled';
import { Box } from 'components/box';


const ContactsList = ({ contacts, onDelete }) => {
    return (
        <Box as="ul" display="flex" flexDirection="column" gridGap={4}>{contacts.map(contact => (
            <ContactItem key={contact.id}>{contact.name}: {contact.number}
                <Btn name='DeleteBTN' onClick={() => onDelete(contact.id)}>
                    Delete
                </Btn>
            </ContactItem>
        ))}</Box>
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