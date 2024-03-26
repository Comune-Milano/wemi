export const getInputAddress = [
  '',
  `
  query (
    $address: String!,
    $resultLimit: Int!
  ) {
      cercaVia(via: $address, resultLimit: $resultLimit) {
          pointX
          pointY
          name
      }
  }`,
  'cercaVia',
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
  'cercaMunicipio',
];