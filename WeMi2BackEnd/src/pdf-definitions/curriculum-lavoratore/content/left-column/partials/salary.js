import { stackedRow } from "../../shared/stacked-row";

/**
 * Retribuzione richiesta.
 */
export function salary(pdfData) {
  const { brandColor, retribuzioneRichiesta } = pdfData;

  const hasFasceRetributive = Object.keys(retribuzioneRichiesta)
    .some(fascia => fascia?.length > 0)

  if (!hasFasceRetributive) {
    return [];
  }

  const fasceRetribuzione = [
    ...(retribuzioneRichiesta.convivenza?.length ? [{
      label: 'Convivenza',
      fasciaPrezzo: retribuzioneRichiesta.convivenza?.join(',').toLowerCase(),
      frequenza: 'MESE',
    }] : []),
    ...(retribuzioneRichiesta.convivenzaRidotta?.length ? [{
      label: 'Convivenza ridotta',
      fasciaPrezzo: retribuzioneRichiesta.convivenzaRidotta?.join(',').toLowerCase(),
      frequenza: 'MESE',
    }] : []),
    ...(retribuzioneRichiesta.oraria?.length ? [{
      label: 'A ore',
      fasciaPrezzo: retribuzioneRichiesta.oraria?.join(',').toLowerCase(),
      frequenza: 'ORA',
    }] : []),
    ...(retribuzioneRichiesta.presenzaNotturna?.length ? [{
      label: 'Presenza notturna',
      fasciaPrezzo: retribuzioneRichiesta.presenzaNotturna?.join(',').toLowerCase(),
      frequenza: 'MESE',
    }] : []),
    ...(retribuzioneRichiesta.weekend?.length ? [{
      label: 'Weekend',
      fasciaPrezzo: retribuzioneRichiesta.weekend?.join(',').toLowerCase(),
      frequenza: 'ORA',
    }] : []),
    ...(retribuzioneRichiesta.assistenzaNotturna?.length ? [{
      label: 'Assistenza notturna',
      fasciaPrezzo: retribuzioneRichiesta.assistenzaNotturna?.join(',').toLowerCase(),
      frequenza: 'MESE',
    }] : []),
  ];

  const salaryEntries = fasceRetribuzione.map(
    requestedSalary => stackedRow({
      label: requestedSalary.label,
      labelValue: {
        text: [
          {
            text: requestedSalary.fasciaPrezzo,
            bold: true,
            fontSize: 9,
            color: brandColor,
          },
          {
            text: `/${requestedSalary.frequenza}`,
            fontSize: 6,
            bold: true,
            color: brandColor,
          }
        ],
      }
    })
  );

  return [
    {
      text: 'RETRIBUZIONE RICHIESTA',
      bold: true,
      fontSize: 9,
      color: brandColor,
      margin: [0, 20, 0, 3],
    },
    ...salaryEntries
  ];
}