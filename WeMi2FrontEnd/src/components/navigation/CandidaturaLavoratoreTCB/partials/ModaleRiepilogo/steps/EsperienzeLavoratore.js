/** @format */

import React from 'react';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import moment from 'moment';
import Title from '../partials/Title';
import FieldText from '../partials/FieldText';
import FieldList from '../partials/FieldList';
import FieldCheck from '../partials/FieldCheck';
import { codiciAttributo } from '../../../constants/CodiciAttributo';
import { estraiEsperienzeLavoratore as estraiEsperienzeLavoratoreQ } from '../summaryGraphQL';
import * as tcbConstants from 'types/tcbConstants';
import { isNullOrUndefined } from 'components/navigation/AccordionServAccr/accordionPartials/common/utils';
import { Row } from 'components/ui/Grid';

const EsperienzeLavoratore = ({
  onPatchStep,
  idUtente,
  Dati
}) => {

  const [esperienzeLavoratore] = useGraphQLRequest(
    undefined,
    estraiEsperienzeLavoratoreQ,
    { idUtenteLav: idUtente },
    true
  );
  const trovaNomeServizio = (arrCdTipologia) => {
    const arrNomiServizio = [];
    arrCdTipologia.forEach(element => {
      switch (element) {
        case tcbConstants.CD_TIPOLOGICA_TATA:
          arrNomiServizio.push({ label: 'Baby-sitter' });
          break;
        case tcbConstants.CD_TIPOLOGICA_COLF:
          arrNomiServizio.push({ label: 'Colf' });
          break;
        case tcbConstants.CD_TIPOLOGICA_BADANTE:
          arrNomiServizio.push({ label: 'Badante' });
          break;
        default:
        // code block
      }
    });
    return arrNomiServizio;
  }

  const famiglie = React.useMemo(
    () => esperienzeLavoratore.data && esperienzeLavoratore.data.map((ele, indice) => {
      let resultReduce = ele.attributi.reduce((accumulator, attributo) => {
        switch (attributo.cd_attributo) {
          case codiciAttributo.TX_COGNOME_CONTATTO:
            accumulator.cognome = attributo.tx_val;
            accumulator.servizioPrestato = trovaNomeServizio(ele.serviziPrestati);
            if (!accumulator.servizioPrestato.length && ele.nomeServizioAltro) {
              //se presente altro non sono presenti TCB
              accumulator.servizioPrestato = [{ label: ele.nomeServizioAltro }];
            };
            break;
          case codiciAttributo.TX_COMUNE_SEDE_DI_LAVORO:
            accumulator.comune = attributo.tx_val;
            break;
          case codiciAttributo.TX_PROVINCIA_SEDE_DI_LAVORO:
            accumulator.provincia = attributo.tx_val;
            break;
          case codiciAttributo.TX_EMAIL_CONTATTO:
            accumulator.email = attributo.tx_val;
            break;
          case codiciAttributo.TX_TELEFONO_CONTATTO:
            accumulator.telefono = attributo.tx_val;
            break;
          default:
          // code block
        }
        return accumulator;
      }, {})

      resultReduce = { ...resultReduce, 'inizioPeriodo': ele.inizioPeriodo ? moment(ele.inizioPeriodo).format('DD/MM/YYYY') : null };
      resultReduce = { ...resultReduce, 'finePeriodo': moment(moment(ele.finePeriodo).format('YYYY-MM-DD')).isSame('9999-12-31') ? false : ele.finePeriodo ? moment(ele.finePeriodo).format('DD/MM/YYYY') : null };
      resultReduce = { ...resultReduce, 'descrizioneEsp': ele.descrizioneEsp };

      return resultReduce;
    }), [esperienzeLavoratore.data]
  );

  const altreEsperienze = React.useMemo(
    () => Dati && Dati.find(ele =>
      ele.cd_attributo === codiciAttributo.TX_ESPERIENZE_ALTRE
    ), [Dati]
  );

  return (
    <>
      <Title
        title="Esperienze lavorative"
        onPatchStep={onPatchStep}
        index={3}
      />
      {
        famiglie?.length ?
          famiglie.map((espLav, index) => {
            return (
              <Row key={index} margin="1.5em 0 0 0">
                <FieldText
                  title="Nome famiglia o azienda"
                  value={espLav.cognome}
                  required
                />
                <FieldList
                  title="Posizione lavorativa"
                  array={espLav.servizioPrestato}
                  required
                />
                <FieldText
                  title="Inizio periodo"
                  value={espLav.inizioPeriodo}
                  required
                />
                {
                  espLav.finePeriodo ?
                    <FieldText
                      title="Fine periodo"
                      value={espLav.finePeriodo}
                      required
                    />

                    :
                    <FieldCheck
                      title='Attualmente in corso'
                      checked={true}
                    />
                }
                <FieldText
                  title="Comune"
                  value={espLav.comune}
                  required
                />
                <FieldText
                  title="Provincia"
                  value={espLav.provincia}
                />
                <FieldText
                  title="E-mail per referenze"
                  value={espLav.email}
                />
                <FieldText
                  title="Telefono per referenze"
                  value={espLav.telefono}
                />

                <FieldText
                  title="Descrizione esperienza"
                  value={espLav.descrizioneEsp}
                  required
                  textarea
                />
              </Row>
            )
          })
          :
          <FieldText
            title="Nome famiglia"
            value="Nessuna"
          />
      }
    </>
  );
};

EsperienzeLavoratore.displayName = 'EsperienzeLavoratore';

export default EsperienzeLavoratore;