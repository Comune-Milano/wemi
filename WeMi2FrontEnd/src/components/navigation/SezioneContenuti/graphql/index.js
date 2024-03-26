export const saveSection = [
  '',
  `mutation saveSection($input: SectionInput!) {
    saveSection(section:$input) {
      id
    }
  }`,
  'saveSection',
];
