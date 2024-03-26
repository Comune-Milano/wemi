
const InserisciDatiServizioEnteMutationName = 'InserisciDatiServizioEnte';

export const InserisciDatiServizioEnte = [
  '',
  `mutation ${InserisciDatiServizioEnteMutationName} (
  $input: InserisciDatiServizioEnteInput
){  ${InserisciDatiServizioEnteMutationName}(input: $input) } `,
  InserisciDatiServizioEnteMutationName,
];


const setDatiPrezzoMutationName = 'setDatiPrezzo';

export const setDatiPrezzo = [
  '',
  `
      mutation ${setDatiPrezzoMutationName}($input: DatiPrezzo!) {
        ${setDatiPrezzoMutationName}(input: $input)
      }
    `,
];
