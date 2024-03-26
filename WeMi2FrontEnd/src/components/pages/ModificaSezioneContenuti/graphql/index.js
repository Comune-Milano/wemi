export const getContentSection = [
  '',
  `query getContentSection ($id:Int!) {
    getContentSection(id:$id){
      id
      title
      description
      image {
        id
        path
        name
        mime
      }
      version
      progressive
      link
      startDate
      endDate
      code
    }
}
`,
  'getContentSection'];
