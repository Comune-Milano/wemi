export const SchedaEnte = `
type User {
  id: Int
  email: String
}
type SchedaEnte {
  institutionInformationSection: InformationSection
  authorizedOperatorsSection: AuthorizedOperatorsSection
  descriptionSection: DescriptionSection
  attachmentsSection: AttachmentsSection
  principalLocationSection: PrincipalLocationSection
  secondaryLocationSection: SecondaryLocationSection
  contactPersonSection: ContactPersonSection 
  citizenAvailabilitySection: CitizenAvailabilitySection
  othersInfoSection: OthersInfoSection
  merchantSection: MerchantSection
  paymentInfoSection: PaymentInfoSection
}
`;