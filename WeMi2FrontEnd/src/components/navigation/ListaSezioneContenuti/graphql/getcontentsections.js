export const getContentSections = [
  '',
  `query getContentSections ($input:ContentSection!) {
  getContentSections(params:$input) {
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
  'getContentSections'];
