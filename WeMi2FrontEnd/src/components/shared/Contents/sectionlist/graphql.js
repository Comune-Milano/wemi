export const getAllSections = [
  '',
  `query getAllSections {
  getAllSections {
    list {
      id
      title
      version
      state {
        id
        description
      }
      progressive
    }
  }
}
`,
  'getAllSections',
];
