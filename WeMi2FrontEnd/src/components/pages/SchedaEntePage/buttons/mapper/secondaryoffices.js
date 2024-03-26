export const mapSecondaryOffice = (secondaryLocations) => {
  if (!secondaryLocations) {
    return [];
  }
  const secondaryOffices = secondaryLocations.map((location) => {
    if (!location.address) {
      return location;
    }
    const mappedLocation = location;
    const { address } = location;
    mappedLocation.address = {
      cap: address.txCAP,
      citta: address.txCitta,
      provincia: address.txProvincia,
      indirizzo: address.txIndirizzo,
    };
    return mappedLocation;
  });
  return secondaryOffices;
};
