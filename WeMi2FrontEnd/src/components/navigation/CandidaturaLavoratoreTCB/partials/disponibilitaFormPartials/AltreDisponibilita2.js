/** @format */

import React, { useState, useEffect } from 'react';
import { GroupFieldTitle } from "components/navigation/ConfigurazioneRichiestaTCB/partials";
import { Row, Column } from 'components/ui/Grid';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { ID_SERVIZIO_TATA, ID_SERVIZIO_COLF, ID_SERVIZIO_BADANTE } from "types/tcbConstants";
import {
  PreferenzeGenere,
  DisponibilitaGeneriche,
  DimensioniCasa,
  PreferenzaFasceEta,
  PersonePatologie
} from './altreDisponibilitaPartials';

const AltreDisponibilita = ({
  handleChangeMultiSelect,
  idServizioRiferimento
}) => {

  const { dataset, setFormField, errors, isFormValid, touched, handleFieldBlur, isFormDirty } = useFormContext();


  return (
    <Row fluid>
      <GroupFieldTitle
        title="Altre disponibilità e preferenze"
        marginTop="3em"
      />
      {idServizioRiferimento !== ID_SERVIZIO_COLF ?
        <Row margin="0 0 2em">
          <PreferenzeGenere
            tata={idServizioRiferimento === ID_SERVIZIO_TATA}
          />
          {idServizioRiferimento === ID_SERVIZIO_TATA ?
            <PreferenzaFasceEta />
            : null}
          <PersonePatologie
            tata={idServizioRiferimento === ID_SERVIZIO_TATA}
          />
        </Row>
        : null}
      <DisponibilitaGeneriche
        tata={idServizioRiferimento === ID_SERVIZIO_TATA}
        colf={idServizioRiferimento === ID_SERVIZIO_COLF}
        badante={idServizioRiferimento === ID_SERVIZIO_BADANTE}
      />
      <DimensioniCasa
        handleChangeMultiSelect={handleChangeMultiSelect}
      />
    </Row>
  )
};

AltreDisponibilita.displayName = 'AltreDisponibilita';
export default AltreDisponibilita;