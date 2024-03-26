/** @format */

import React, { useState, useEffect } from 'react';
import { Row, Column } from 'components/ui/Grid';
import moment from 'moment';
import Button from 'components/ui2/Button';
import FaIcon from 'components/ui2/FaIcon';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { codiciAttributo } from 'components/navigation/CandidaturaLavoratoreTCB/constants/CodiciAttributo';
import { useBusSubscribe } from 'hooks/eventBus/useBusSubscribe';
import { withRouter } from 'react-router-dom';

const BottoneSalva = ({
  idOperatore,
  idLavoratore,
  estraiDocLavoratore,
  response,
  saveData,
  history,
}) => {
  const { dataset, isFormDirty, setFormField } = useFormContext();
  const [datiSalvati, setDatiSalvati] = useState(false);

  const triggerDataSavage = async (navigate) => {
    if (isFormDirty) {
      await saveData({
        idLavoratore,
        anniEsp: [parseInt(dataset.anniEspTata, 10), parseInt(dataset.anniEspColf, 10), parseInt(dataset.anniEspBadante, 10)],
        votoEsp: [parseInt(dataset.votoEspTata, 10), parseInt(dataset.votoEspColf, 10), parseInt(dataset.votoEspBadante, 10)],
        statoCandidatura: dataset.statoCandidatura,
        notaOperatore: dataset.notaOperatore,
        attributiUtenteLav: [
          {
            cd_attributo: codiciAttributo.FG_ISCRITTO_INPS,
            cd_val_attributo: 1,
            fg_val: dataset.iscrittoInps ? '1' : '0',
          },
          {
            cd_attributo: codiciAttributo.DT_ITALIA_DAL,
            cd_val_attributo: 1,
            dt_val: dataset.dtItaliaDal ? moment(dataset.dtItaliaDal, 'DD/MM/YYYY').format('YYYY-MM-DD') : undefined,
          },
          {
            cd_attributo: codiciAttributo.FG_ISCRITTO_REGIONE_LOMB,
            cd_val_attributo: 1,
            fg_val: dataset.iscrittoRegioneLombardia ? '1' : '0',
          },
          {
            cd_attributo: codiciAttributo.TX_EVENTUALI_VINCOLI,
            cd_val_attributo: 1,
            tx_val: dataset.vincoliCandidatura,
          },
        ],
        documentiLavoratore: dataset.documentiLavoratore.slice().filter(el => typeof el.id === 'string'),
        documentiDaEliminare: dataset.documentiDaEliminare,
      });
      await estraiDocLavoratore({ idUtenteLav: idLavoratore });
    }
    if (navigate) {
      history.push(navigate);
    }
  };

  useBusSubscribe(
    'SALVA_E_REDIREZIONA',
    (redirect) => triggerDataSavage(redirect)
  );

  useEffect(() => {
    if (response) {
      const newDocumentiLavoratore = dataset.documentiLavoratore.slice();
      for (let i = 0; i < newDocumentiLavoratore.length; i += 1) {
        for (let j = 0; j < response.length; j += 1) {
          if (typeof newDocumentiLavoratore[i].id === 'string'
            && newDocumentiLavoratore[i].fileName === response[j].fileName) {
            newDocumentiLavoratore[i].id = response[j].id;
          }
        }
      }
      setFormField('documentiLavoratore', newDocumentiLavoratore);
      setDatiSalvati(true);
      setTimeout(() => setDatiSalvati(false), 2000);
    }
  }, [response]);

  return (
    <Row fluid margin="3em 0 2em">
      <Column xs="5" flex justifycontent="flex-end" alignitems="center" padding="0">
        {datiSalvati ? (
          <div style={{ padding: '0 1em 0 0' }}>
            <FaIcon
              icon="check"
              color="primary"
              fontSize="f5"
            />
          </div>
        )
          : null}
      </Column>
      <Column xs="7" flex justifycontent="flex-start" alignitems="center" padding="0">
        <Button
          type="submit"
          autowidth
          color="primary"
          label="Salva modifiche"
          onClick={() => triggerDataSavage()}
        />
      </Column>
    </Row>
  );
};

BottoneSalva.displayName = 'BottoneSalva';

export default withRouter(BottoneSalva);
