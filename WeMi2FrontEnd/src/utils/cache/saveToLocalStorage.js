/** @format */

const saveToLocalStorage = (ref, data) => localStorage.setItem(ref, JSON.stringify(data));

export default saveToLocalStorage;
