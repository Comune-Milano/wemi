/** @format */

const getFromLocalStorage = ref => JSON.parse(localStorage.getItem(ref));

export default getFromLocalStorage;
