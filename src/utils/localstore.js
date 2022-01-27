/* Set items in localstorage*/
export const saveToStore = (key, value) => {
  window.localStorage.setItem(key, value);
};

/* Get items from localstorage*/
export const getFromStore = (key) => {
  return window.localStorage.getItem(key);
};

export const removeFromStore = (key) => {
  window.localStorage.removeItem(key);
};
