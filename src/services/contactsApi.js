const BASE_URL = 'https://64b3c9530efb99d862685f21.mockapi.io/api/v1';

export const getContacts = async () => {
  const data = await fetch(`${BASE_URL}/contacts`);
  return await data.json();
};

export const createContact = async data => {
  const res = await fetch(`${BASE_URL}/contacts`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
  return await res.json();
};

export const deleteContacts = async id => {
  const res = await fetch(`${BASE_URL}/contacts/${id}`, { method: 'DELETE' });
  return await res.json();
};
