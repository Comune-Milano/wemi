export const saveArea = [
  '',
  `mutation saveArea($input: AreaInput!) {
    saveArea(area:$input) {
      id
    }
  }`,
  'saveArea',
];
