export const addOffice = (name, officeArray = []) => {
  const offices = officeArray.slice();
  if (!name) {
    return null;
  }
  const findNameOffice = offices.find(office => office.name === name);

  if (!findNameOffice) {
    const newOffice = { name, address: {} };
    offices.push(newOffice);
  }
  return offices;
};

export const modifyOffice = (field, officeArray = []) => {
  const offices = officeArray.slice();
  if (!field.name) {
    return null;
  }
  const officeFound = offices.findIndex(office => office.name === field.name);
  if (officeFound > -1) {
    const office = offices[officeFound];
    offices[officeFound] = {
      name: field.name,
      id: field.id,
      address: {
        ...office.address,
        ...field.value,
      },
    };
  }
  return offices;
};


export const removeOffice = (officeToRemove, officeArray = []) => {
  const offices = officeArray.slice();
  const filteredOffices = offices.filter((office) =>
  office.name !== officeToRemove);
  return filteredOffices;
};
