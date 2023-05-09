import { useState, useEffect } from 'react';
import { Form, Title, Contacts, Filter } from './index';

const phoneBook = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? phoneBook;
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onAddContact = (name, number, id) => {
    const isExistContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isExistContact) {
      alert(`${name} is already in contacts`);
      return;
    }
    const contact = {
      id: id,
      name: name,
      number: number,
    };
    setContacts(prevState => [...prevState, contact]);
  };

  const onFilterChange = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const onDeleteContact = id => {
    setContacts(prevState => {
      return prevState.filter(contact => contact.id !== id);
    });
  };
  return (
    <div>
      <Title title="PhoneBook" />
      <Form onSubmit={onAddContact} />
      <Title title="Contacts" />
      <Filter
        onFilterChange={onFilterChange}
        filter={filter}
        filterContacts={filterContacts}
      />
      <Contacts
        filterContacts={filterContacts}
        contacts={contacts}
        onDeleteContact={onDeleteContact}
      />
    </div>
  );
};

export default App;
