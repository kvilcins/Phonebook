const getStorage = (key) => {
  const data = localStorage.getItem(key);

  return data ? JSON.parse(data) : [];
};

const setStorage = (key, obj) => {
  const data = getStorage(key);
  data.push(obj);
  localStorage.setItem(key, JSON.stringify(data));
};

const removeStorage = (phone) => {
  const key = 'data';
  const data = getStorage(key);
  const newData = data.filter(contact => contact.phone !== phone);
  localStorage.setItem(key, JSON.stringify(newData));
};

const data = getStorage('data');

export {
  getStorage,
  setStorage,
  removeStorage,
  data,
};
