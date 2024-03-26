const PREZZO_DEFAULT = '--';
const TEXT_DEFAULT = 'N/D';

export const simulatoreDefault = {
  tariffaOraria: PREZZO_DEFAULT,
  tariffaMensile: PREZZO_DEFAULT,
  superminimo: PREZZO_DEFAULT,
  indennitaConvenzionale: PREZZO_DEFAULT,
  retribuzioneMediaMensile: PREZZO_DEFAULT,
  riposi: TEXT_DEFAULT,
  ferie: TEXT_DEFAULT,
  prospettoSpesaAnnuale: PREZZO_DEFAULT,
  stipendioNettoAnnuale: PREZZO_DEFAULT,
  indennitaFerie: PREZZO_DEFAULT,
  contributi: PREZZO_DEFAULT,
  contributiDatoreLavoro: PREZZO_DEFAULT,
  cassaDatore: PREZZO_DEFAULT,
  cassaLavoratore: PREZZO_DEFAULT,
  tredicesima: PREZZO_DEFAULT,
  tfr: PREZZO_DEFAULT,
};

/*
  tipologia orario
  1 => "Convivenza"
  2 => "Convivenza Ridotta"
  3 => "Non Conviventi (Full time, part time, a ore)"
  4 => "Presenza notturna"
  5 => "WeekEnd"
  6 => "Assistenza Notturna"
*/
export const calcola = (
  tipologiaOrario,
  tariffaBase,
  pagaProposta,
  oreSettimanali,
  indennitaPranzo,
  indennitaCena,
  indennitaAlloggio,
  tariffaContributi=1,
  indennitaDDS = 0,
) => {
  const simulatore = {...simulatoreDefault}
  simulatore.superminimo = parseFloat(pagaProposta - tariffaBase).toFixed(2);
  simulatore.contributi = phpRound(tariffaContributi * oreSettimanali * 52);
  simulatore.contributiDatoreLavoro = phpRound(tariffaContributi * oreSettimanali * 52);
  const contributiLavoratore = phpRound(tariffaContributi * oreSettimanali * 52);
  const cacodl = phpRound( 0.02 * oreSettimanali * 52);
  const cacola = phpRound(0.01 * oreSettimanali * 52);
  if ([3, 5].indexOf(tipologiaOrario) >= 0) {
    //non conviventi e weekend
    simulatore.tariffaOraria = pagaProposta;
    simulatore.riposi = tipologiaOrario === 3 ? '24 ore di domenica' : TEXT_DEFAULT;
    const retribuzioneMediaMensile = phpRound(oreSettimanali * pagaProposta * 52 / 12);
    simulatore.retribuzioneMediaMensile = retribuzioneMediaMensile;
    let ivaf = 0;
    if (tipologiaOrario === 5) {
      simulatore.indennitaConvenzionale = phpRound((indennitaPranzo + indennitaCena + indennitaAlloggio) * 52 / 12);
      ivaf = simulatore.indennitaConvenzionale;
      simulatore.indennitaFerie = simulatore.indennitaConvenzionale;
    }
    const stipendioNettoAnnuale = phpRound(retribuzioneMediaMensile * 12);
    simulatore.tredicesima = simulatore.retribuzioneMediaMensile;
    simulatore.tfr = phpRound(retribuzioneMediaMensile * 13 / 13.5);
    simulatore.prospettoSpesaAnnuale = phpRound(simulatore.tfr + simulatore.tredicesima 
      + simulatore.contributi + stipendioNettoAnnuale + cacola + cacodl + ivaf);
    simulatore.stipendioNettoAnnuale = phpRound(simulatore.stipendioNettoAnnuale + simulatore.contributiDatoreLavoro
      + simulatore.tredicesima + simulatore.tfr + cacodl + ivaf);
    } else {
      simulatore.riposi = '36 ore di cui 24 la domenica';
      simulatore.tariffaMensile = pagaProposta;
      simulatore.indennitaConvenzionale = phpRound((indennitaAlloggio + indennitaCena + indennitaPranzo) * 26);
      simulatore.retribuzioneMediaMensile = phpRound(parseFloat(pagaProposta) + simulatore.indennitaConvenzionale);
      simulatore.tredicesima = simulatore.retribuzioneMediaMensile;
      simulatore.tfr = phpRound(simulatore.retribuzioneMediaMensile * 13 / 13.5);
      simulatore.indennitaFerie = simulatore.indennitaConvenzionale;
      const stipendioNettoAnnuale = simulatore.retribuzioneMediaMensile * 12;
      simulatore.prospettoSpesaAnnuale = phpRound(simulatore.tfr + simulatore.tredicesima 
        + simulatore.contributi + stipendioNettoAnnuale + cacola + cacodl + simulatore.indennitaFerie);
      simulatore.stipendioNettoAnnuale = phpRound(simulatore.prospettoSpesaAnnuale - simulatore.contributi);
    }
  return simulatore;
};

function phpRound(value, precision=2) {
  const factor = Math.pow(10, precision);
  const tempNumber = value * factor;
  const [ integer, decimals ] = `${Math.abs(tempNumber)}`.split('.');
  if (!!decimals && Number.parseFloat(`0.${decimals}`).toFixed(1) === '0.5') {
    return (Number.parseInt(integer, 10) + (value < 0 ? -1 : 1)) / factor;
  }
  const roundedTempNumber = Math.round(tempNumber);
  return roundedTempNumber / factor;
}