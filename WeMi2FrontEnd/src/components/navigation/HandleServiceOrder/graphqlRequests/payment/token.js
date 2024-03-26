
const getTokenQueryName = 'paymentAuthorizationToken';

export const getToken = [
  '',
  `
    query ${getTokenQueryName}($idRichiestaEnte: Int!) {
      ${getTokenQueryName} (idRichiestaEnte: $idRichiestaEnte)
    }
  `,
  getTokenQueryName,
];
