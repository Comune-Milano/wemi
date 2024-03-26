export const checkInsertOperatorCard = [
  '',
  `
  query checkInsertOperatorCard ($users: [InputUser]!, $institutionId: Int) {
    checkInsertOperatorCard(users: $users, institutionId: $institutionId){
      id
      email
    }
  }
  `,
  'checkInsertOperatorCard',
];
