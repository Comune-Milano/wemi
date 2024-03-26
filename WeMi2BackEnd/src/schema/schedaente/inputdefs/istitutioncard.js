export const institutionCard = `
input InputInstitutionCard { 
  id: Int 
  description: String
  othersInfo: InputOthersInfo
  merchant: InputTransactionInformation
  contactPerson: InputContactPerson
  paymentInfo: InputPaymentInfo
  citizenAvailability: InputCitizenAvailability
  primaryOffice: InputOffice
  secondaryOffices: [InputOffice]
  authorizedOperators: [InputOperator] 
  attachments: InputAttachments
}

`;