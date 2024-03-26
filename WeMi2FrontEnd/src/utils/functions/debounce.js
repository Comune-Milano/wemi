
const debounce = (callback, delay) => {
  let timeoutID;
  return (...args) => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(callback, delay, ...args);
  };
};

export default debounce;
