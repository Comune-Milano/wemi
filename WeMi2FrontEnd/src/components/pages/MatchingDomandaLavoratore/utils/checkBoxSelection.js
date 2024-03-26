export const checkBoxSelection = (arrayOfContents, newValue, id) => {
  let array = arrayOfContents || [];
  array = array.slice();

  if (newValue) {
    array.push(id);
  } else {
    array = array.filter((ele) => !(ele === id));
  }

  return array;
};
