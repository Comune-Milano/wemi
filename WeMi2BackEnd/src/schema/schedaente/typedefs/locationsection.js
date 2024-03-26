export const LocationSection = `
type Address {
  txCAP: String 
  txCitta: String 
  txIndirizzo: String
  txProvincia: String
}
type Location {
  id: Int
  name: String
  address: Address
}
type PrincipalLocationSection {
  principalLocation: Location
  note5: String
}
type SecondaryLocationSection {
  secondaryLocations: [Location]
  note6: String
}
`;