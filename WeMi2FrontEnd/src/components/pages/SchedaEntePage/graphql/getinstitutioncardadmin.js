export const getInstitutionCardAdmin = [
  '',
  `query getInstitutionCardAdmin ($institutionId: Int!) {
    getInstitutionCardAdmin (institutionId: $institutionId)  {
      institutionInformationSection {
        stateDescription
        id
        fullname
        name
        vatNumber
        weMiSpaces
        administratorEmail
        accreditationCategories
        stateCode
        operatorsWeMI
      }
      authorizedOperatorsSection{
        authorizedOperators{
          id
          email
        }
        note2
      }
      descriptionSection {
        description
        note3
      }
      attachmentsSection {
        socials
        logo {
          id
          name
          blob
          type
          storagePath
        }
        documents {
          id
          fieldName
          name
          blob
          type
          storagePath
          domain
        }
        note4
      }
      principalLocationSection {
        principalLocation{
          name
          address {
            txCAP
            txCitta
            txIndirizzo
            txProvincia
          }
        }
        note5
      }
      secondaryLocationSection {
        secondaryLocations {
          id
          name
          address {
            txCAP
            txCitta
            txIndirizzo
            txProvincia
          }
        }
        note6
      }
      contactPersonSection {
        contactPerson 
        note7
      }
      citizenAvailabilitySection{
        citizenAvailability
        firstContactNote
        note8
      }
      othersInfoSection {
        othersInfo
        note9
      }
      merchantSection{
        merchant {
          id
          publicKey
          privateKey
          startDate
          endDate
        }
        note10
      }
      paymentInfoSection{
        paymentInfo
        note11
      }
    }
  }`,
  'getInstitutionCardAdmin',
];
