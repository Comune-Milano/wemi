export const AuthorizedOperatorsSection = `
type AuthorizedOperators {
  id: Int
  email: String
}
type AuthorizedOperatorsSection {
  authorizedOperators: [AuthorizedOperators]
  note2: String
}
`;