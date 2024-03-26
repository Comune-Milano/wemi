/** @format */

import React from 'react';
import Title from '../partials/Title';
import { ID_SERVIZIO_COLF, ID_SERVIZIO_TATA, ID_SERVIZIO_BADANTE } from 'types/tcbConstants';
import { estraiDatiOperatore as estraiDatiOperatoreQ, EstraiFileLavoratore as EstraiFileLavoratoreQ } from '../summaryGraphQL';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import FieldText from '../partials/FieldText';
import FieldCheck from '../partials/FieldCheck';
import moment from 'moment';
import Text from 'components/ui/Text';
import styled from 'styled-components';
import TriggerDownload from 'components/shared/TriggerDownload';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { keyCodes } from 'components/ui2/utils/constants/keyCodes';
import { withRouter } from 'react-router-dom';

const StyledText = styled(Text)`
  cursor: pointer;
  &:hover {
    color: 'inherit';
  }
    text-decoration: underline !important;
`;

const DatiOperatore = ({
  badante,
  colf,
  tata,
  idLavoratore,
  location,
  history,
  isModifica
}) => {
  //per download inizio
  const [preventDownload, setPreventDownload] = React.useState(false);
  const performEstraiAllegatoLavoratore = useStatelessGraphQLRequest(EstraiFileLavoratoreQ);

  const handleFileDownload = (file) => {
    return performEstraiAllegatoLavoratore(
      {
        idUtenteLav: parseInt(idLavoratore),
        idAllegato: parseInt(file.id)
      }
    );
  };
  const handleKeyDown = (event, triggerDownload) => {
    if (event.keyCode === keyCodes.ENTER) {
      triggerDownload();
    }
  };
  //per download fine
  const [datiOperatore, estraiDatiOperatore] = useGraphQLRequest(
    undefined,
    estraiDatiOperatoreQ,
    undefined,
    false
  );

  React.useEffect(() => {
    const arrayIdServizi = [];
    if (badante) {
      arrayIdServizi.push(ID_SERVIZIO_BADANTE)
    }
    if (colf) {
      arrayIdServizi.push(ID_SERVIZIO_COLF)
    }
    if (tata) {
      arrayIdServizi.push(ID_SERVIZIO_TATA)
    }
    estraiDatiOperatore({
      idUtenteLav: idLavoratore,
      arrayIdServizi: arrayIdServizi
    })
  }, []);
  const dati = datiOperatore.data || {};

  const anniEsperienza = [{ label: 'Badante', nota: dati.anniEspBadante }, { label: 'Colf', nota: dati.anniEspColf }, { label: 'Baby-sitter', nota: dati.anniEspTata }];
  const valutazione = [{ label: 'Voto Badante', nota: dati.votoEspBadante }, { label: 'Voto Colf', nota: dati.votoEspColf }, { label: 'Voto Baby-sitter', nota: dati.votoEspTata }];
  const radioStatoCandidatura = [
    {
      label: 'Validata idonea',
      id: 2
    },
    {
      label: 'Validata non idonea',
      id: 3
    },
    {
      label: 'Sospesa',
      id: 4
    },
  ];
  const statoCandidatura = radioStatoCandidatura.find(el => el.id === dati.statoCandidatura)

  return (
    <>
      <Title
        title="Dati operatore"
        onPatchStep={isModifica ? () => { history.push({ pathname: `/admin/finalizzaCandidaturaLavoratoreTCB/${idLavoratore}`, state: location.state }) } : null}
      />
      <FieldText
        title="In Italia dal"
        value={dati.dtItaliaDal ? moment(dati.dtItaliaDal).format('DD/MM/YYYY') : null}
      />
      <FieldText
        title="Anni esperienza"
        array={anniEsperienza}
      />
      <FieldCheck
        title="Iscritto INPS"
        checked={dati.iscrittoInps}
      />
      <FieldCheck
        title="Iscritto regione Lombardia"
        checked={dati.iscrittoRegioneLombardia}
      />
      <FieldText
        title="Valutazione operatore esperienza"
        array={valutazione}
      />
      <FieldText
        title="Stato candidatura"
        value={statoCandidatura && statoCandidatura.label}
      />
      <FieldText
        title="Eventuali vincoli sulla candidatura"
        value={dati.vincoliCandidatura}
        textarea
      />
      <FieldText
        title="Nota operatore"
        value={dati.notaOperatore}
        textarea
      />
      <FieldText
        title="Documenti lavoratore"
        value={dati.documentiLavoratore && dati.documentiLavoratore.map((file, index) => (
          <TriggerDownload
            dataCallback={() => handleFileDownload(file)}
            onDownloadStart={() => setPreventDownload(true)}
            onDownloadDone={() => setPreventDownload(false)}
            fileName={file.fileName}
          >
            {({ triggerClick }) => (
              <div>
                <StyledText
                  weight="bold"
                  value={file.fileName}
                  size="f7"
                  tag="span"
                  onClick={() => { !preventDownload ? triggerClick() : Promise.resolve() }}
                  onKeyDown={(event) => { !preventDownload ? handleKeyDown(event, triggerClick) : Promise.resolve() }}
                />
              </div>
            )}
          </TriggerDownload>
        ))}
      />
    </>
  );
};

DatiOperatore.displayName = 'DatiOperatore';

export default withRouter(DatiOperatore);
