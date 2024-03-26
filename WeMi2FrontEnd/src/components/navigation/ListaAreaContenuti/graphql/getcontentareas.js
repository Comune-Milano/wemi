export const getContentAreas = [
  '',
  `query getContentAreas ($input:ContentArea!) {
  getContentAreas(params:$input) {
    list {
      id
      title
      version
      code
      state {
        id
        description
      }
      progressive
    }
    total
  }
}
`,
  'getContentAreas'];
