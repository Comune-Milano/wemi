
export function getInitialDataset(flags) {
  return {
    candTata: {
      label: 'Vuoi candidarti come baby-sitter?',
      checked: flags.tata,
    },
    candColf: {
      label: 'Vuoi candidarti come colf?',
      checked: flags.colf,
    },
    candBadante: {
      label: 'Vuoi candidarti come badante?',
      checked: flags.badante,
    },
  };
}
