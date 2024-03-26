export const checkDeleteOperatorCard = [
  '',
  `
  query checkDeleteOperatorCard($users: [InputUser]!, $institutionId: Int) {
    checkDeleteOperatorCard(users: $users, institutionId: $institutionId){
      id
      email
    }
  }
  `,
  'checkDeleteOperatorCard',
];
