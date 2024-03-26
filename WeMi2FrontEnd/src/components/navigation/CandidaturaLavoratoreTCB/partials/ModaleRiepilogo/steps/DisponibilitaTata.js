/** @format */

import React from 'react';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import Title from '../partials/Title';
import Subtitle from '../partials/Subtitle';
import FieldList from '../partials/FieldList';
import FieldText from '../partials/FieldText';
import { ID_SERVIZIO_TATA } from "types/tcbConstants";
import { estraiDatiDisponibilitaCandidaturaLavoratore as estraiDatiDisponibilitaCandidaturaLavoratoreQ } from '../summaryGraphQL';
import { binToString } from 'components/ui2/WeekCalendarTimePicker/utils/converter';
import { colors } from 'theme';
import { sortOrder } from '../functions/sortOrder';

const DisponibilitaTata = ({
  locale,
  onPatchStep,
  idUtente
}) => {

  const tuttiMunicipi= 9;

  const [Dati] = useGraphQLRequest(
    undefined,
    estraiDatiDisponibilitaCandidaturaLavoratoreQ,
    {
      input: {
        idLavoratore: idUtente,
        idServizioRiferimento: ID_SERVIZIO_TATA,
        locale: `{${locale}}`
      }
    },
    true,
  );

  const orarioDisponibilita = [];
  const oreMassimeFullTime = [];
  const altreDisponibilita = [];
  const patologieDisponibilita = [];
  let municipioDisponibilita = [];
  const fasciaEta = [];
  const grandezzaCasa = [];
  let preferenzaGenere;
  const preferenzaTipologiaContratto = [];
  const mezzeGiornate = [];
  const tipologieStipendioProposto = [];
  const tipologieSpaziAccettabili = [];
  const tipologieStipendioPropostoFullTime = [];
  const calendarioFullTime = [];
  let totaleOreFullTime = 0;
  const tipologieStipendioPropostoNotturna = [];
  const calendarioNotturna = [];
  let totaleOreNotturna = 0;
  const tipologieStipendioPropostoConvivenzaRidotta = [];
  const calendarioConvivenzaRidotta = [];
  let totaleOreConvivenzaRidotta = 0;
  const tipologieSpaziAccettabiliConvivenzaRidotta = [];
  const tipologieStipendioPropostoWeekend = [];
  const calendarioWeekend = [];
  let totaleOreWeekend = 0;
  const disponibileFare = [];
  const calendarioPresenzaNotturna = [];
  const tipologieStipendioPropostoPresenzaNotturna = [];

  if (Dati.data) {
    Dati.data.tipologieOrario.forEach(element => {
      if (element.checked) {
        orarioDisponibilita.push({ label: element.value });
      }
    });
    Dati.data.nrOreSettminali.forEach(element => {
      if (element.checked) {
        oreMassimeFullTime.push({ label: element.value });
      }
    });
    if (Dati.data && Dati.data.lavoroFuoriMilano && Dati.data.lavoroFuoriMilano.checked) {
      altreDisponibilita.push({ label: "Disponibilità a lavorare fuori Milano" });
    }
    if (Dati.data.breviTrasferte && Dati.data.breviTrasferte.checked) {
      altreDisponibilita.push({ label: "Disponibile a brevi trasferte" });
    }
    if (Dati.data.lungheTrasferte && Dati.data.lungheTrasferte.checked) {
      altreDisponibilita.push({ label: "Disponibile a lunghe trasferte" });
    }
    if (Dati.data.vacanzaConLaFamiglia && Dati.data.vacanzaConLaFamiglia.checked) {
      altreDisponibilita.push({ label: "Disponibilità ad andare in vacanza con la famiglia" });
    }
    if (Dati.data.vacanzaConAssistito && Dati.data.vacanzaConAssistito.checked) {
      altreDisponibilita.push({ label: "Disponibilità ad andare in vacanza solo con il/la bambino/a" });
    }

    Dati.data.grandezzaDellaCasa.forEach(element => {
      if (element.checked) {
        grandezzaCasa.push({ label: element.value });
      }
    });
    Dati.data.accudirePersoneConPatologie.forEach(element => {
      if (element.checked) {
        patologieDisponibilita.push({ label: element.value });
      }
    });
    Dati.data.sedeDiLavoro.forEach(element => {
      if (element.checked) {
        municipioDisponibilita.push({ label: element.value });
      }
    });
    if(municipioDisponibilita.length >= tuttiMunicipi){
      municipioDisponibilita= [{label: "TUTTI I MUNICIPI"}];
    };
    Dati.data.fasceEtaBambini.forEach(element => {
      if (element.checked) {
        fasciaEta.push({ label: element.value });
      }
    });
    Dati.data.preferenzeGenereAssistito.forEach(element => {
      if (element.checked) {
        preferenzaGenere = element.label;
      }
    });
    Dati.data.tipologiaContratto.forEach(element => {
      if (element.checked) {
        preferenzaTipologiaContratto.push({ label: element.value });
      }
    });
    if (Dati.data.convivenza) {
      Dati.data.convivenza.tipologieMezzaGiornataDiRiposo && Dati.data.convivenza.tipologieMezzaGiornataDiRiposo.forEach(element => {
        if (element.checked) {
          mezzeGiornate.push({ label: element.value });
        }
      })
      Dati.data.convivenza.tipologieStipendioProposto && Dati.data.convivenza.tipologieStipendioProposto.forEach(element => {
        if (element.checked) {
          tipologieStipendioProposto.push({ label: element.value });
        }
      })
      Dati.data.convivenza.tipologieSpaziAccettabili && Dati.data.convivenza.tipologieSpaziAccettabili.forEach(element => {
        if (element.checked) {
          if (element.id === 0) {
            tipologieSpaziAccettabili.push({ label: "Altro", nota: Dati.data.convivenza.testoSpazioAccettabileAltro, error: !Dati.data.convivenza.testoSpazioAccettabileAltro, pgVisualizzazione: element.pg_visualizzazione  });
          } else {
            tipologieSpaziAccettabili.push({ label: element.value, pgVisualizzazione: element.pg_visualizzazione  });
          }
        }
      })
    }
    if (Dati.data.fullTimePartTimeAdOre) {
      Dati.data.fullTimePartTimeAdOre.tipologieStipendioProposto && Dati.data.fullTimePartTimeAdOre.tipologieStipendioProposto.forEach(element => {
        if (element.checked) {
          tipologieStipendioPropostoFullTime.push({ label: element.value });
        }
      })
      Dati.data.fullTimePartTimeAdOre.calendario && Dati.data.fullTimePartTimeAdOre.calendario.forEach(element => {
        if (element.count !== 0) {
          calendarioFullTime.push({ label: element.txValue, nota: binToString(element.hoursBin) });
          totaleOreFullTime = totaleOreFullTime + element.count;
        }
      })
    }
    if (Dati.data.presenzaNotturna) {
      Dati.data.presenzaNotturna.tipologieStipendioProposto && Dati.data.presenzaNotturna.tipologieStipendioProposto.forEach(element => {
        if (element.checked) {
          tipologieStipendioPropostoPresenzaNotturna.push({ label: element.value });
        }
      })
      Dati.data.presenzaNotturna.calendario && Dati.data.presenzaNotturna.calendario.forEach(element => {
        if (element.count !== 0) {
          calendarioPresenzaNotturna.push({ label: element.txValue, nota: binToString(element.hoursBin) });
        }
      })
    }
    if (Dati.data.assistenzaNotturna) {
      Dati.data.assistenzaNotturna.tipologieStipendioProposto && Dati.data.assistenzaNotturna.tipologieStipendioProposto.forEach(element => {
        if (element.checked) {
          tipologieStipendioPropostoNotturna.push({ label: element.value });
        }
      })
      Dati.data.assistenzaNotturna.calendario && Dati.data.assistenzaNotturna.calendario.forEach(element => {
        if (element.count !== 0) {
          calendarioNotturna.push({ label: element.txValue, nota: binToString(element.hoursBin) });
          totaleOreNotturna = totaleOreNotturna + element.count;
        }
      })
    }
    if (Dati.data.convivenzaRidotta) {
      Dati.data.convivenzaRidotta.tipologieStipendioProposto && Dati.data.convivenzaRidotta.tipologieStipendioProposto.forEach(element => {
        if (element.checked) {
          tipologieStipendioPropostoConvivenzaRidotta.push({ label: element.value });
        }
      })
      Dati.data.convivenzaRidotta.calendario && Dati.data.convivenzaRidotta.calendario.forEach(element => {
        if (element.count !== 0) {
          calendarioConvivenzaRidotta.push({ label: element.txValue, nota: binToString(element.hoursBin) });
          totaleOreConvivenzaRidotta = totaleOreConvivenzaRidotta + element.count;
        }
      })
      Dati.data.convivenzaRidotta.tipologieSpaziAccettabili && Dati.data.convivenzaRidotta.tipologieSpaziAccettabili.forEach(element => {
        if (element.checked) {
          if (element.id === 0) {
            tipologieSpaziAccettabiliConvivenzaRidotta.push({ label: "Altro", nota: Dati.data.convivenzaRidotta.testoSpazioAccettabileAltro, error: !Dati.data.convivenzaRidotta.testoSpazioAccettabileAltro, pgVisualizzazione: element.pg_visualizzazione  });
          } else {
            tipologieSpaziAccettabiliConvivenzaRidotta.push({ label: element.value, pgVisualizzazione: element.pg_visualizzazione  });
          }
        }
      })
    }
    if (Dati.data.weekend) {
      Dati.data.weekend.tipologieStipendioProposto && Dati.data.weekend.tipologieStipendioProposto.forEach(element => {
        if (element.checked) {
          tipologieStipendioPropostoWeekend.push({ label: element.value });
        }
      })
      Dati.data.weekend.calendario && Dati.data.weekend.calendario.forEach(element => {
        if (element.count !== 0) {
          calendarioWeekend.push({ label: element.txValue, nota: binToString(element.hoursBin) });
          totaleOreWeekend = totaleOreConvivenzaRidotta + element.count;
        }
      })
    }

    if (Dati.data && Dati.data.svegliarsiDiNotte && Dati.data.svegliarsiDiNotte.checked) {
      disponibileFare.push({ label: 'Svegliarsi di notte' });
    }
    if (Dati.data && Dati.data.lavorareInCasaDiFamiglieNumerose && Dati.data.lavorareInCasaDiFamiglieNumerose.checked) {
      disponibileFare.push({ label: 'Lavorare in casa di famiglie numerose' });
    }
    if (Dati.data && Dati.data.lavorareACasaConAnimali && Dati.data.lavorareACasaConAnimali.checked) {
      disponibileFare.push({ label: 'Lavorare in ambienti con animali domestici' });
    }
    if (Dati.data && Dati.data.prendereCuraAnimali && Dati.data.prendereCuraAnimali.checked) {
      disponibileFare.push({ label: 'Prendersi cura degli animali domestici' });
    }
    if (Dati.data && Dati.data.straordinari && Dati.data.straordinari.checked) {
      disponibileFare.push({ label: 'Fare straordinari' });
    }
    if (Dati.data && Dati.data.sostituzioniBrevi && Dati.data.sostituzioniBrevi.checked) {
      disponibileFare.push({ label: 'Effettuare sostituzioni brevi' });
    }
    if (Dati.data && Dati.data.sostituzioniLunghe && Dati.data.sostituzioniLunghe.checked) {
      disponibileFare.push({ label: 'Effettuare sostituzioni lunghe' });
    }
  }

  return (
    <>
      <Title
        title="Disponibilità baby-sitter"
        onPatchStep={onPatchStep}
        index={6}
      />
      <FieldList
        title='Disponibilità per orario di lavoro'
        array={orarioDisponibilita}
        colorBorder={orarioDisponibilita.length ? colors.black : colors.grey}
      />
      {/* dati convivenza */}
      {
        (mezzeGiornate.length > 0 || tipologieStipendioProposto.length > 0 || tipologieSpaziAccettabili.length > 0) ?
          <>
            <Subtitle
              subtitle="Disponibilità per orario di lavoro Convivenza"
            />
            <FieldList
              title='Preferenze sulla mezza giornata di riposo'
              array={mezzeGiornate}
            />
            <FieldList
              title='Stipendio proposto'
              array={tipologieStipendioProposto}
            />
            <FieldList
              title='Spazi per te accettabili'
              array={sortOrder(tipologieSpaziAccettabili, "pgVisualizzazione")}
              colorBorder={colors.black}
            />
          </>
          : null
      }
      {/* dati convivenza ridotta */}
      {
        (tipologieStipendioPropostoConvivenzaRidotta.length > 0 || tipologieSpaziAccettabiliConvivenzaRidotta.length > 0 || calendarioConvivenzaRidotta.length > 0) ?
          <>
            <Subtitle
              subtitle="Disponibilità per orario di lavoro Convivenza ridotta"
            />
            <FieldList
              title='Stipendio proposto'
              array={tipologieStipendioPropostoConvivenzaRidotta}
            />
            <FieldList
              title='Spazi per te accettabili'
              array={sortOrder(tipologieSpaziAccettabiliConvivenzaRidotta, "pgVisualizzazione")}
            />
            <FieldList
              title='Disponibilità settimanale proposta'
              array={calendarioConvivenzaRidotta}
              colorBorder={colors.black}
            />
          </>
          : null
      }
      {/* dati Full-time / part-time / a ore */}
      {
        (oreMassimeFullTime.length > 0 || tipologieStipendioPropostoFullTime.length > 0 || calendarioFullTime.length > 0) ?
          <>
            <Subtitle
              subtitle="Disponibilità per orario di lavoro Full-time / part-time / a ore"
            />
            <FieldList
              title='Ore massime'
              array={oreMassimeFullTime}
            />
            <FieldList
              title='Stipendio proposto'
              array={tipologieStipendioPropostoFullTime}
            />
            <FieldList
              title='Disponibilità settimanale proposta'
              array={calendarioFullTime}
              colorBorder={colors.black}
            />
          </>
          : null
      }
      {/* dati presenza notturna*/}
      {
        (tipologieStipendioPropostoPresenzaNotturna.length > 0 || calendarioPresenzaNotturna.length > 0) ?
          <>
            <Subtitle
              subtitle="Disponibilità per orario di lavoro Presenza notturna"
            />
            <FieldList
              title='Stipendio proposto'
              array={tipologieStipendioPropostoPresenzaNotturna}
            />
            <FieldList
              title='Disponibilità settimanale proposta'
              array={calendarioPresenzaNotturna}
              colorBorder={colors.black}
            />
          </>
          : null
      }
      {/* dati assistenza notturna*/}
      {
        (tipologieStipendioPropostoNotturna.length > 0 || calendarioNotturna.length > 0) ?
          <>
            <Subtitle
              subtitle="Disponibilità per orario di lavoro Assistenza notturna"
            />
            <FieldList
              title='Stipendio proposto'
              array={tipologieStipendioPropostoNotturna}
            />
            <FieldList
              title='Disponibilità settimanale proposta'
              array={calendarioNotturna}
              colorBorder={colors.black}
            />
          </>
          : null
      }
      {/* dati weekend*/}
      {
        (tipologieStipendioPropostoWeekend.length > 0 || calendarioWeekend.length > 0) ?
          <>
            <Subtitle
              subtitle="Disponibilità per orario di lavoro Weekend"
            />
            <FieldList
              title='Stipendio proposto'
              array={tipologieStipendioPropostoWeekend}
            />
            <FieldList
              title='Disponibilità'
              array={calendarioWeekend}
              colorBorder={colors.black}
            />
          </>
          : null
      }

      <FieldText
        title='Preferenza tipologia contratto'
        array={preferenzaTipologiaContratto}
      />
      <FieldText
        title='Preferenza genere assistito'
        value={preferenzaGenere}
      />
      <FieldText
        title='Numero massimo di bambini da accudire'
        value={(Dati.data && Dati.data.nrMaxBambiniDaAccudire) || 0}
      />
      <FieldList
        title='Preferenze fascia di età dei bambini'
        array={fasciaEta}
      />
      <FieldList
        title='Disponibilità ad accudire persone con patologie'
        array={patologieDisponibilita}
      />
      <FieldList
        title='Disponibilità in relazione alla grandezza della casa'
        array={grandezzaCasa}
      />
      <FieldList
        title='Municipi in cui si è diponibili '
        array={municipioDisponibilita}
      />
      <FieldList
        title='Le tue disponibilità'
        array={disponibileFare.concat(altreDisponibilita)}
      />
    </>
  );
};

DisponibilitaTata.displayName = 'DisponibilitaTata';

export default DisponibilitaTata;