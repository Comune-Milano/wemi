
const searchCategoryQueryName = 'category';

export const getCategory = [
  '',
  `query($idCategoria: Int) {
    ${searchCategoryQueryName}(
      idCategoria: $idCategoria
    ) {
      name
    }
  }`,
  searchCategoryQueryName,
];

const verifyTokenServiceName = 'verifyTokenService';

export const verifyTokenService = [
  '',
  `query ${verifyTokenServiceName} ($token: String!) {
      ${verifyTokenServiceName}(token: $token)
    }
  `,
  verifyTokenServiceName];


const getTokenServiceName = 'getTokenService';
export const getTokenService = [
  '',
  `query ${getTokenServiceName} ($input: GetTokenType!) {
      ${getTokenServiceName}(input: $input)
    }
  `,
  getTokenServiceName,
];
