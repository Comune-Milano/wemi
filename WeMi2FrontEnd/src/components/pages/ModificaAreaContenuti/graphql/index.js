export const getContentArea = [
  '',
  `query getContentArea ($id:Int!) {
    getContentArea(id:$id){
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
      associates {
        id
        title
      }
    }
}
`,
  'getContentArea'];
