import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import {
  Container,
  LoadingContainer,
  RequestError,
} from 'components/App/App.styled';
import { useSelector, useDispatch } from 'react-redux';
import { getFilter, setFilter } from 'redux/filterSlice';
import { getContacts } from 'redux/contactsSlice';
import { useEffect, useRef } from 'react';
import { addContact, fetchContacts } from 'contacts/thunk';
import { Loader } from 'components/Loader/Loader';

export const App = () => {
  const { items, isLoading, error } = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const valueRef = useRef(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (valueRef.current) {
      valueRef.current = false;
      dispatch(fetchContacts());
    }
  }, [dispatch]);

  const formSubmitHandler = data => {
    duplicatedContact(data);
  };

  const changeFilter = e => {
    dispatch(setFilter(e.currentTarget.value));
  };

  const getVisibleContacts = () => {
    if (items) {
      const normalizaFilter = filter.toLowerCase();
      return items.filter(item =>
        item.name.toLocaleLowerCase().includes(normalizaFilter)
      );
    }
  };

  const duplicatedContact = data => {
    const normalizaName = data.name.toLocaleLowerCase();

    //check for duplicate name
    const result = items.find(
      item => normalizaName === item.name.toLocaleLowerCase()
    );

    //checking if find() return 'object'
    if (typeof result === 'object') {
      window.alert(result.name + ' is already in contacts');
    } else {
      dispatch(addContact(data));
    }
  };

  const visibleContacts = getVisibleContacts();

  return (
    <Container>
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={formSubmitHandler} />
        <h2>Contacts</h2>
        <LoadingContainer>
          <Filter onChange={changeFilter} />
          {isLoading && <Loader />}
        </LoadingContainer>
        {items.length > 0 ? (
          <ContactList contacts={visibleContacts} />
        ) : (
          !isLoading && <p>No contacts</p>
        )}
        {error && <RequestError>{error}</RequestError>}
      </div>
    </Container>
  );
};
