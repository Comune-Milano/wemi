/** @format */
export const getInputAddress = [
    '',
    `
    query InputAddressQuery(
      $address: String!,
    ) {
        cercaVia(via: $address) {
            pointX
            pointY
            name
        }
    }`,
    '',
  ];

  export const getMunicipio = [
    '',
    `
    query getMunicipio(
      $pointX: Float!,
      $pointY: Float!
    ) {
        cercaMunicipio(coordinate:{pointX: $pointX, pointY: $pointY}) {
            idMunicipio
            nmMunicipio
        }
    }`,
    '',
  ];
  
