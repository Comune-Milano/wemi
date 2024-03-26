export const forwardNotesInstitutionCard = [
  '',
  `mutation forwardNotesInstitutionCard ($input: InputForwardNotes!, $others: InputInstitutionCard!) {
    forwardNotesInstitutionCard (input: $input, others: $others) {
      notes {
        note2
        note3
        note4
        note5
        note6
        note7
        note8
        note9
        note10
        note11
      }
      institutionId
    }
  }`,
  'forwardNotesInstitutionCard',
];
