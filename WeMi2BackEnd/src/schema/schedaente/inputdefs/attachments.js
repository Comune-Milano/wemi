export const attachments = `

input InputAttachment {
  blob: String
  name: String
  mime: String
  fieldName: String
  domain: String
  id: Int
}

input InputAttachments {
  logo: InputAttachment
  documents: [InputAttachment]
}

`;