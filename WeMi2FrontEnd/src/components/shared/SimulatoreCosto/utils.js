import React from 'react';
import Text from 'components/ui/Text';
import * as tipologiaOrarioCostanti from 'types/tipologiaOrario';
import styled from "styled-components";
import media from 'utils/media-queries';
import { TIPOLOGIA_ORARIO } from 'components/pages/MatchingDomandaLavoratore/constants/tipologiaorario';

const ListUnordered = styled.ul`
 list-style-type: disc;
 box-sizing: border-box;
 outline: none;
 -webkit-margin-before: 0;
 -webkit-margin-after: 0;
 -webkit-margin-start: 1em;
 -webkit-margin-end: 0;
 -webkit-padding-start: 0;
`;

const ContentList = styled.span`
  box-sizing: border-box;
  display: inline-block;
  width: 100%;

  @media (min-width: 480px) {
    width: 50%;
  }

  ${media.lg`
    width: 45%;
  `};
`;

const PREZZO_DEFAULT = "--";
const TEXT_DEFAULT = "N/D";
const TEXT_RIPOSO_1 = "24 ore di domenica";
const TEXT_RIPOSO_2 = "36 ore di cui 24 la domenica";
const TEXT_FERIE_1 = "26 giorni lavorativi all'anno";
//const TEXT_FERIE_2 = "un mese";
const weeklyToMonthlyConversionFactor = Number.parseFloat((52 / 12).toFixed(7));
//Coefficiente di conversione dei valori settimanali in mensili

export const simulatoreDefault = {
  pagaOrariaProposta: PREZZO_DEFAULT,
  stipendioMensileProposto: PREZZO_DEFAULT,
  superminimo: PREZZO_DEFAULT,
  indennitaTataBadante: PREZZO_DEFAULT,
  minimoContrattuale: PREZZO_DEFAULT,
  indennitaConvenzionale: PREZZO_DEFAULT,
  stipendioMensileMedio: PREZZO_DEFAULT,
  riposi: TEXT_DEFAULT,
  ferie: TEXT_DEFAULT,
  stipendioAnnuale: PREZZO_DEFAULT,
  cassaAnnuo: PREZZO_DEFAULT,
  contributiAnnuo: PREZZO_DEFAULT,
  contributiDatoreLavoro: PREZZO_DEFAULT,
  cassaDatore: PREZZO_DEFAULT,
  cassaLavoratore: PREZZO_DEFAULT,
  tredicesima: PREZZO_DEFAULT,
  tfr: PREZZO_DEFAULT,
  stipendioMensilita: PREZZO_DEFAULT,
  stipendioFerie: PREZZO_DEFAULT,
  retribuzioneOrariaEffettiva: PREZZO_DEFAULT,
  contributiLavoratore: PREZZO_DEFAULT,
  spesaAnnuale: PREZZO_DEFAULT,
  spesaMediaMensile: PREZZO_DEFAULT
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
export const calcola = async (
  tipologiaOrario,
  tariffaBase,
  pagaProposta,
  oreSettimanali,
  pranzo,
  cena,
  alloggio,
  indennita,
  getContributi,
  tipologiaContratto,
  indennitaTataBadante
) => {
  pagaProposta = parseFloat(pagaProposta);
  oreSettimanali = parseInt(oreSettimanali);

  const simulatore = { ...simulatoreDefault }
  simulatore.superminimo = indennitaTataBadante ? parseFloat(pagaProposta - (tariffaBase + indennitaTataBadante)).toFixed(2) : parseFloat(pagaProposta - tariffaBase).toFixed(2);
  simulatore.minimoContrattuale = tariffaBase;
  simulatore.indennitaTataBadante = indennitaTataBadante;
  simulatore.ferie = TEXT_FERIE_1;

  const sommaIndennitaSelezionate = phpRound((pranzo * indennita.indennitaPranzo) + (cena * indennita.indennitaCena) + (alloggio * indennita.indennitaAlloggio));
  simulatore.indennitaConvenzionale = phpRound(sommaIndennitaSelezionate * weeklyToMonthlyConversionFactor);

  if ([tipologiaOrarioCostanti.NON_CONVIVENTI, tipologiaOrarioCostanti.WEEKEND].indexOf(tipologiaOrario) >= 0) {
    //non conviventi e weekend
    simulatore.pagaOrariaProposta = pagaProposta;
    simulatore.riposi = tipologiaOrario === tipologiaOrarioCostanti.NON_CONVIVENTI ? TEXT_RIPOSO_1 : undefined;
    const stipendioMensileMedio = phpRound(oreSettimanali * pagaProposta * weeklyToMonthlyConversionFactor);
    simulatore.stipendioMensileMedio = stipendioMensileMedio;

    simulatore.stipendioMensilita = phpRound(stipendioMensileMedio * 11);
    simulatore.stipendioFerie = phpRound(stipendioMensileMedio + simulatore.indennitaConvenzionale);
    simulatore.tredicesima = phpRound(simulatore.stipendioMensileMedio + simulatore.indennitaConvenzionale);
    simulatore.tfr = phpRound((simulatore.stipendioMensileMedio + simulatore.indennitaConvenzionale) / 13.5 * 13);

    const sommaRetOrariaEff = phpRound((simulatore.tredicesima / 12) + simulatore.indennitaConvenzionale);
    simulatore.retribuzioneOrariaEffettiva = phpRound(pagaProposta + (sommaRetOrariaEff / weeklyToMonthlyConversionFactor / oreSettimanali));
    // prima versione comune di milano per calcolare retribuzioneOrariaEffettiva
    // const indennitaOraria= phpRound(simulatore.indennitaConvenzionale / 4.33 / oreSettimanali );
    // simulatore.retribuzioneOrariaEffettiva= phpRound(pagaProposta + (pagaProposta / 12) + indennitaOraria);

    //se non hanno un valore non vanno visualizzati
    simulatore.stipendioMensileProposto = undefined;
  } else {
    simulatore.riposi = tipologiaOrario === tipologiaOrarioCostanti.CONVIVENZA ? TEXT_RIPOSO_2 : TEXT_RIPOSO_1;
    simulatore.stipendioMensileProposto = pagaProposta;

    simulatore.stipendioMensilita = phpRound(pagaProposta * 11);
    simulatore.stipendioFerie = phpRound(pagaProposta + simulatore.indennitaConvenzionale);
    simulatore.tredicesima = phpRound(pagaProposta + simulatore.indennitaConvenzionale);
    simulatore.tfr = phpRound((pagaProposta + simulatore.indennitaConvenzionale) / 13.5 * 13);

    const sommaRetOrariaEff = phpRound(pagaProposta + (simulatore.tredicesima / 12) + simulatore.indennitaConvenzionale);
    simulatore.retribuzioneOrariaEffettiva = phpRound(sommaRetOrariaEff / weeklyToMonthlyConversionFactor / oreSettimanali);

    //se non hanno un valore non vanno visualizzati
    simulatore.pagaOrariaProposta = undefined;
    simulatore.stipendioMensileMedio = undefined;
  };

  const queryResult = await getContributi({
    input: {
      retribuzioneOrariaEffettiva: parseFloat(simulatore.retribuzioneOrariaEffettiva),
      oreSettimanali: oreSettimanali,
      tyContributo: [tipologiaContratto.id, tipologiaContratto.id + 2],
    }
    //+2 perchè tyContributo per cassa colf è tyContributo(per contributi) + 2
  });

  let contributoSicuafContributi, contributoOrarioDipendenteContributi;
  let contributoSicuafCassa, contributoOrarioDipendenteCassa;

  queryResult.forEach(element => {
    if (element.tyContributoTcb > 2) {
      contributoSicuafCassa = element.contributoSicuaf;
      contributoOrarioDipendenteCassa = element.contributoOrarioDipendente;
    } else {
      contributoSicuafContributi = element.contributoSicuaf;
      contributoOrarioDipendenteContributi = element.contributoOrarioDipendente;
    };
  });
  // dati che vanno mostrati nelle descrizioni
  simulatore.totaleCassaCuaf= contributoSicuafCassa;
  simulatore.lavoratoreCuaf = contributoOrarioDipendenteCassa;
  simulatore.datoreDiLavoroCuaf= phpRound(contributoSicuafCassa - contributoOrarioDipendenteCassa);

  //calcolo contributi
  simulatore.contributiAnnuo = phpRound(contributoSicuafContributi * oreSettimanali * 52);
  simulatore.contributiLavoratore = phpRound(contributoOrarioDipendenteContributi * oreSettimanali * 52);
  simulatore.contributiDatoreLavoro = phpRound(simulatore.contributiAnnuo - simulatore.contributiLavoratore);
  //calcolo cassa Colf
  simulatore.cassaAnnuo = phpRound(contributoSicuafCassa * oreSettimanali * 52);
  simulatore.cassaLavoratore = phpRound(contributoOrarioDipendenteCassa * oreSettimanali * 52);
  simulatore.cassaDatore = phpRound(simulatore.cassaAnnuo - simulatore.cassaLavoratore);

  simulatore.stipendioAnnuale = phpRound(simulatore.stipendioMensilita + simulatore.stipendioFerie);

  const pagaMensile = simulatore.stipendioMensileMedio || pagaProposta;
  simulatore.spesaAnnuale = phpRound((pagaMensile * 13) + (simulatore.indennitaConvenzionale * 2) + simulatore.contributiDatoreLavoro + simulatore.cassaDatore + simulatore.tfr);
  simulatore.spesaMediaMensile = phpRound(simulatore.spesaAnnuale / 12);

  return simulatore;
};

function phpRound(value, precision = 2) {
  // const factor = Math.pow(10, precision);
  // const tempNumber = value * factor;
  // const [integer, decimals] = `${Math.abs(tempNumber)}`.split('.');
  // if (!!decimals && Number.parseFloat(`0.${decimals}`).toFixed(1) === '0.5') {
  //   return (Number.parseInt(integer, 10) + (value < 0 ? -1 : 1)) / factor;
  // }
  // const roundedTempNumber = Math.round(tempNumber);
  // return roundedTempNumber / factor;

  return Number.parseFloat(value.toFixed(precision));
}

export const getMassimoOre = (maxOre, tipologiaOrario) => {

  const maxOra= maxOre?.find(el => el.cd_dominio_tcb === tipologiaOrario)?.nr_valore_max_rif;

  return maxOra || 0;

};

export const BodyModalInfo = {
  personeAutoSufficienti: (
    <Text
      tag="p"
      value="Indennità mensile spettante ai lavoratori inquadrati nei livelli Cs e Ds che assistono più di una persona non autosufficiente. L’indennità è pari a € 0,60 orari in caso di contratto di lavoro con una retribuzione oraria e € 102,88 mensili in caso di convivenza, presenza notturna e assistenza notturna. La paga oraria del lavoratore sarà quindi composta dal minimo retributivo + l’indennità + l’eventuale superminimo (ossia la quota aggiuntiva di retribuzione concessa dal Datore di lavoro oltre il minimo previsto dal Contratto Collettivo di Lavoro). Se il superminimo è superiore al valore dell’indennità, questa viene assorbita nella retribuzione."
      align="left"
      size="f7"
    />
  ),
  etaBambini: (
    <Text
      value="Indennità mensile che la baby sitter ha diritto di percepire fino al compimento del sesto anno di età di ogni bambino assistito. L’indennità è pari a € 0,72 orari in caso di contratto di lavoro con una retribuzione oraria e € 119,09 mensili in caso di convivenza, presenza notturna e assistenza notturna. La paga oraria del lavoratore sarà quindi composta dal minimo retributivo + l’indennità + l’eventuale superminimo (ossia la quota aggiuntiva di retribuzione concessa dal Datore di lavoro oltre il minimo previsto dal Contratto Collettivo di Lavoro). Se il superminimo è superiore al valore dell’indennità, questa viene assorbita nella retribuzione."
      tag="p"
      align="left"
      size="f7"
    />
  ),
  tipologiaContratto: (
    <Text
      intlFormatter
      value="Le aliquote dei contributi sono differenti a seconda della tipologia di contratto scelta."
      size="f7"
      padding="0 0.2rem 0 0"
      tag="p"
      align="center"
    />
  ),
  tipologiaOrario: (maxOre) =>(
    <>
      <Text
        intlFormatter
        value="Convivenza"
        size="f7"
        padding="0 0 0.5em 0"
        tag="p"
        align="start"
        weight="bold"
      />
      <Text
        intlFormatter
        value={`Prevede un orario di lavoro giornaliero di 10 ore, intervallate da 2 ore di riposo, per un massimo di ${getMassimoOre(maxOre, TIPOLOGIA_ORARIO.CONVIVENZA)} ore settimanali (solitamente 5 giorni di 10 ore e un giorno di 4 ore). L’assistente familiare ha diritto ad undici ore consecutive di riposo nell’arco della giornata e a trentasei ore di riposo settimanali: 24 devono essere godute la domenica e le restanti 12 in qualsiasi altro giorno della settimana concordato tar le parti. Occorre fornire al lavoratore l’indennità di vitto e alloggio.`}
        size="f7"
        tag="p"
      />
      <Text
        intlFormatter
        value="Convivenza ridotta"
        size="f7"
        padding="1em 0 0.5em 0"
        tag="p"
        align="start"
        weight="bold"
      />
      <Text
        intlFormatter
        value={`Prevede un orario di lavoro che non può superare le ${getMassimoOre(maxOre, TIPOLOGIA_ORARIO.CONVIVENZA_RIDOTTA)} ore settimanali e deve essere interamente collocato tra le ore 6.00 e le ore 14.00 oppure tra le ore 14.00 e le ore 22.00 per cinque o sei giorni alla settimana o, in alternativa, collocato in non più di tre giorni settimanali, nel limite massimo di 10 ore al giorno non consecutive. Il riposo settimanale è di 24 ore e dev’essere goduto la domenica. Occorre fornire al lavoratore l’indennità di vitto e alloggio. Possono essere assunti con tale orario i lavoratori inquadrati nei livelli C, B e BS e gli studenti di età compresa fra i 16 e i 40 anni frequentanti corsi di studio al termine dei quali viene conseguito un titolo riconosciuto dallo Stato o da Enti pubblici.`}
        size="f7"
        tag="p"
      />
      <Text
        intlFormatter
        value="Full time / part-time / a ore (non convivenza)"
        size="f7"
        padding="1em 0 0.5em 0"
        tag="p"
        align="start"
        weight="bold"
      />
      <Text
        intlFormatter
        value={`Prevede un orario di lavoro fino a otto ore giornaliere, non consecutive, per un massimo di ${getMassimoOre(maxOre, TIPOLOGIA_ORARIO.NON_CONVIVENTE)} ore settimanali che possono essere distribuite su cinque o su sei giorni. Il riposo settimanale è di 24 ore e dev’essere goduto la domenica.`}
        size="f7"
        tag="p"
      />
      <Text
        intlFormatter
        value="Presenza notturna"
        size="f7"
        padding="1em 0 0.5em 0"
        tag="p"
        align="start"
        weight="bold"
      />
      <Text
        intlFormatter
        value="Prevede un orario di lavoro compresa tra le 21.00 e le 8.00, fermo restando l’obbligo di consentire al lavoratore il completo riposo notturno. È prevista l’indennità di vitto e alloggio che comprende solo il pernottamento e la prima colazione. Possono essere assunti con tale orario i lavoratori che svolgono prestazioni di sola attesa e sono inquadrati in un Livello Unico. Ai soli fini dell’assolvimento dell’obbligo contributivo di cui all’art.53 (Contributi di assistenza contrattuale), l’orario convenzionale di lavoro è pari a cinque ore giornaliere."
        size="f7"
        tag="p"
      />
      <Text
        intlFormatter
        value="Weekend"
        size="f7"
        padding="1em 0 0.5em 0"
        tag="p"
        align="start"
        weight="bold"
      />
      <Text
        intlFormatter
        value="Prevede un orario di lavoro distribuito tra sabato e domenica con o senza convivenza. È prevista l’indennità di vitto e alloggio in relazione all’orario svolto dal lavoratore. Non è contemplato il riposo settimanale. Questa tipologia contrattuale serve in genere per assumere un lavoratore che copra le ore di riposo dell’assistente familiare nel week-end. Il lavoratore può essere inquadrato nei livelli CS e DS."
        size="f7"
        tag="p"
      />
      <Text
        intlFormatter
        value="Assistenza notturna"
        size="f7"
        padding="1em 0 0.5em 0"
        tag="p"
        align="start"
        weight="bold"
      />
      <Text
        intlFormatter
        value="Prevede un orario di lavoro compreso tra le 20.00 e le 8.00. È prevista l’indennità di vitto e alloggio. Possono essere assunti con tale orario i lavoratori inquadrati nei livelli BS, CS e DS, che svolgono discontinue prestazioni di assistenza notturna. Ai soli fini dell’assolvimento dell’obbligo contributivo di cui all’art.53 (Contributi di assistenza contrattuale), l’orario convenzionale di lavoro è pari a otto ore giornaliere."
        size="f7"
        tag="p"
      />
    </>
  ),
  livelloInquadramento: (
    <>
      <Text
        value="Il nuovo Contratto collettivo del Lavoro domestico in vigore dal 1 ottobre 2020 introduce una nuova figura professionale: l’assistente educatore formato."
      />
      <div style={{ padding: '1em 0 0 0' }}>
        <Text
          value="Si tratta di un/una assistente familiare che, nell’ambito di progetti educativi e riabilitativi elaborati da professionisti individuati dalla famiglia, attua interventi rivolti a persone in condizioni di difficoltà, perché affetti da disabilità psichica oppure da disturbi dell’apprendimento o relazionali."
        />
      </div>
      <div style={{ margin: '1em 0 0 0' }}>
        <Text
          value="Nei prossimi mesi il servizio WeMi Tate Colf e Badanti consentirà di fare richiesta anche di questo profilo."
        />
      </div>
    </>
  ),
  oreSettimanali: (maxOre) => (
    <>
      <Text
        intlFormatter
        value="Sono le ore in cui l’assistente familiare lavora nell’arco di una settimana, che può essere di cinque o sei giorni lavorativi. Variano a seconda della tipologia contrattuale:"
        size="f7"
        tag="p"
        padding="0 0 1em 0"
      />
      <ListUnordered>
        <li>
          <ContentList>
            <Text
              intlFormatter
              value="Convivenza:"
              size="f7"
            />
          </ContentList>
          <ContentList>
            <Text
              intlFormatter
              value="massimo"
              size="f7"
            />
          &nbsp;
          <Text
              intlFormatter
              value={getMassimoOre(maxOre, TIPOLOGIA_ORARIO.CONVIVENZA)}
              size="f7"
              weight="bold"
            />
          &nbsp;
          <Text
              intlFormatter
              value="ore settimanali"
              size="f7"
            />
          </ContentList>
        </li>
        <li>
          <ContentList>
            <Text
              intlFormatter
              value="Convivenza ridotta:"
              size="f7"
            />
          </ContentList>
          <ContentList>
            <Text
              intlFormatter
              value="massimo"
              size="f7"
            />
          &nbsp;
          <Text
              intlFormatter
              value={getMassimoOre(maxOre, TIPOLOGIA_ORARIO.CONVIVENZA_RIDOTTA)}
              size="f7"
              weight="bold"
            />
          &nbsp;
          <Text
              intlFormatter
              value="ore settimanali"
              size="f7"
            />
          </ContentList>
        </li>
        <li>
          <ContentList>
            <Text
              intlFormatter
              value="Full time / part-time / a ore:"
              size="f7"
            />
          </ContentList>
          <ContentList>
            <Text
              intlFormatter
              value="massimo"
              size="f7"
            />
          &nbsp;
          <Text
              intlFormatter
              value={getMassimoOre(maxOre, TIPOLOGIA_ORARIO.NON_CONVIVENTE)}
              size="f7"
              weight="bold"
            />
          &nbsp;
          <Text
              intlFormatter
              value="ore settimanali"
              size="f7"
            />
          </ContentList>
        </li>
        <li>
          <ContentList>
            <Text
              intlFormatter
              value="Presenza notturna:"
              size="f7"
            />
          </ContentList>
          <ContentList>
            <Text
              intlFormatter
              value="massimo"
              size="f7"
            />
          &nbsp;
          <Text
              intlFormatter
              value={getMassimoOre(maxOre, TIPOLOGIA_ORARIO.PRESENZA_NOTTURNA)}
              size="f7"
              weight="bold"
            />
          &nbsp;
          <Text
              intlFormatter
              value="ore settimanali"
              size="f7"
            />
          </ContentList>
        </li>
        <li>
          <ContentList>
            <Text
              intlFormatter
              value="Weekend:"
              size="f7"
            />
          </ContentList>
          <ContentList>
            <Text
              intlFormatter
              value="massimo"
              size="f7"
            />
          &nbsp;
          <Text
              intlFormatter
              value={getMassimoOre(maxOre, TIPOLOGIA_ORARIO.WEEKEND)}
              size="f7"
              weight="bold"
            />
          &nbsp;
          <Text
              intlFormatter
              value="ore settimanali"
              size="f7"
            />
          </ContentList>
        </li>
        <li>
          <ContentList>
            <Text
              intlFormatter
              value="Assistenza notturna:"
              size="f7"
            />
          </ContentList>
          <ContentList>
            <Text
              intlFormatter
              value="massimo"
              size="f7"
            />
          &nbsp;
          <Text
              intlFormatter
              value={getMassimoOre(maxOre, TIPOLOGIA_ORARIO.ASSISTENZA_NOTTURNA)}
              size="f7"
              weight="bold"
            />
          &nbsp;
          <Text
              intlFormatter
              value="ore settimanali"
              size="f7"
            />
          </ContentList>
        </li>
      </ListUnordered>
      <Text
        intlFormatter
        size="f7"
        tag="p"
        value="Se la giornata lavorativa è superiore alle sei ore, occorre aggiungere la pausa pranzo. Il tempo per la fruizione del pasto infatti, se trascorso senza effettuare prestazioni lavorative, non sarà retribuito."
        padding="1em 0 0 0"
      />
    </>
  ),
  indennitaVittoAlloggio: (
    <>
      <Text
        intlFmatter
        value="L’indennità di vitto (colazione, pranzo e cena) e alloggio è corrisposta in natura nei mesi in cui la persona lavora e fruisce di vitto e alloggio. Se il vitto e l'alloggio non vengono fruiti in natura il lavoratore ha diritto a un'indennità sostitutiva. L’indennità è monetizzata nelle ferie, nella tredicesima, nel TFR, in malattia o infortunio e in caso di congedo matrimoniale."
        size="f7"
        tag="p"
        padding="0 0 1em 0"
      />
      <Text
        intlFormatter
        value="Il lavoratore ha diritto al pranzo e/o alla cena solo in caso di orario di lavoro superiore a sei ore continuative giornaliere. Il tempo per la fruizione del pasto, se trascorso senza effettuare prestazioni lavorative, non sarà retribuito. "
        size="f7"
        tag="p"
        padding="0 0 1em 0"
      />
      <Text
        intlFormatter
        value="Nel simulatore va inserito il numero di indennità di cui il lavoratore fruisce settimanalmente"
        size="f7"
        weight="bold"
        tag="span"
      />
      &nbsp;
      <Text
        intlFormatter
        value="(esempi: se il lavoratore convivente fruisce di colazione/pranzo, cena e alloggio per 6 giorni alla settimana inserire 6 indennità di colazione/pranzo, 6 indennità di cena, 6 indennità di alloggio; se il lavoratore full-time fruisce di pranzo per 5 giorni alla settimana inserire 5 indennità di pranzo)."
        size="f7"
        tag="span"
      />
    </>
  ),
};

export const textToModalLivelloContrattuale = (arr) => {
  return arr.map(ele => {
    return (
      <>
        <Text
          intlFormatter
          value={ele.title}
          size="f7"
          padding="1em 0 0.5em 0"
          tag="p"
          align="start"
          weight="bold"
        />
        <Text
          intlFormatter
          value={ele.value}
          size="f7"
          tag="p"
        />
      </>
    )
  });
};

export const retribuzioneProposta = (annoRif) =>
  <>
    <Text
      intlFormatter
      value={`La retribuzione di un lavoratore domestico varia a seconda del livello di inquadramento e della tipologia di orario.  Gli importi minimi sono stabiliti dal CCNL e vengono aggiornati annualmente in base alla variazione del costo della vita.  Gli importi visualizzati sono quelli delle tabelle previste dal CCNL attualmente in vigore, aggiornate all’anno ${annoRif}.`}
      size="f7"
      tag="p"
      padding="0 0 1em 0"
    />
    <Text
      intlFormatter
      value="La retribuzione proposta non può essere inferiore al minimo contrattuale. I lavoratori con più esperienza spesso chiedono uno stipendio che è superiore al minimo contrattuale. La differenza tra la paga proposta (oraria o mensile) e il minimo è indicata nella tabella alla voce “Superminimo”. Fa parte a tutti gli effetti dello stipendio ed incide sulla tredicesima, sul TFR, sugli straordinari e sui contributi."
      size="f7"
      tag="p"
      padding="0 0 1em 0"
    />
    <Text
      intlFormatter
      value="Il superminimo può essere sia assorbibile che non assorbibile. La differenza consiste nel fatto che in presenza di aumenti delle retribuzioni tabellari nazionali l’importo del superminimo assorbibile rimarrà invariato, quello del superminimo non assorbibile si ridurrà di un importo pari all’aumento tabellare."
      size="f7"
      tag="p"
    />
  </>
