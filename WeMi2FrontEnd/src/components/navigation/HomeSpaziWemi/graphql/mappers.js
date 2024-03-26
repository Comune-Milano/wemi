
export const mapAddressCordinatesResponse = response =>
  response.map(el => ({
    id: `${el.pointX}-${el.pointY}`,
    value: el.name,
    coordinates: {
      pointX: el.pointX,
      pointY: el.pointY,
    },
  }));
