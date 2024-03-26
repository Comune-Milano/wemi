/**
 *
 * @param {Object} typology formed as {id: Int, value: String}
 */

export const hourTypology = (typology) => {
  if (!typology) {
    return;
  }

  switch (typology.id) {
    case 1:
      return 'convivenza';
    case 2:
      return 'convivenzaRidotta';
    case 3:
      return 'fullTimePartTimeAdOre';
    case 4:
      return 'presenzaNotturna';
    case 5:
      return 'weekend';
    case 6:
      return 'assistenzaNotturna';
    default:
  }
};
