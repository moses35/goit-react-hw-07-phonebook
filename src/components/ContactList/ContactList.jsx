import PropTypes from 'prop-types';
import { List, ListItem } from 'components/ContactList/ContactList.styled';
import { deleteContact } from 'contacts/thunk';
import { useDispatch } from 'react-redux';

export const ContactList = ({ contacts }) => {
  const dispatch = useDispatch();

  return (
    <List>
      {contacts.map(({ id, name, phone }) => (
        <ListItem key={id}>
          <span>
            {name}: {phone}
          </span>
          <button onClick={() => dispatch(deleteContact(id))}>Delete</button>
        </ListItem>
      ))}
    </List>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      createdAt: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ),
};
