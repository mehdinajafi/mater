const getContacts = async () => {
  const res = await fetch("/api/user/contacts");
  return res.json();
};

export default getContacts;
