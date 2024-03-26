export const checkDeleteSecondaryOffice = [
  '',
  `
  query checkDeleteSecondaryOfficeCard($offices: [InputOffice]!, $institutionId: Int) {
    checkDeleteSecondaryOfficeCard(offices: $offices, institutionId: $institutionId){
      id
      name
    }
  }
  `,
  'checkDeleteSecondaryOfficeCard',
];
