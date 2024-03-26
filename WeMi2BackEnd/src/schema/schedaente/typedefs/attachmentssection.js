export const AttachmentsSection = `
type Attachment {
  id: Int
  name: String
  blob: String
  type: String
  storagePath: String
  fieldName: String
  domain: String
}
type AttachmentsSection {
  socials: JSON
  logo: Attachment
  documents: [Attachment]
  note4: String
}

`;