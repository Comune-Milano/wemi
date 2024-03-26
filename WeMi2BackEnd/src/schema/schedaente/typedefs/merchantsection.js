export const MerchantSection = `
type TransactionInformation {
  id: String
  publicKey: String
  privateKey: String
  startDate: Timestamp
  endDate: Timestamp
}

type MerchantSection {
  merchant: TransactionInformation
  note10: String
}
`;