export const getSpazioWeMiData = [
  '',
  `
    query ($idServizio: Int!) {
      getSpaziTCBData(
        idTCB: $idServizio
      ) {
        services {
          idHourType 
          idService
          prezzoMinimo
          idTechnicalService
        }
      }
    }
  `,
  'getSpaziTCBData',
];
