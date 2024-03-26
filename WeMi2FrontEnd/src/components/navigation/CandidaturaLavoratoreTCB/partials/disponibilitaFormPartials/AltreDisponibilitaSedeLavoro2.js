/** @format */

import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { ID_SERVIZIO_TATA, ID_SERVIZIO_COLF, ID_SERVIZIO_BADANTE } from "types/tcbConstants";
import TextArea from 'components/ui2/TextArea';
import Text from 'components/ui/Text';
import Checkbox from 'components/ui2/Checkbox';

const AltreDisponibilitaSedeLavoro = ({
  handleChangeMultiSelect,
  idServizioRiferimento
}) => {

  const { dataset, setFormField, errors, isFormValid, touched, handleFieldBlur, isFormDirty } = useFormContext();

  return (
    <Row fluid>
      <Text 
        value="Indica le tue disponibilità" 
        weight="bold"
        padding="2em 0 1em"  
      />
      {dataset.lavoroFuoriMilano ? (
        <Row fluid>
          <Checkbox
            fontSize="f7"
            width="fit-content"
            checkcolor="primary"
            label={"Sono disponibile a lavorare fuori Milano"}
            value={dataset.lavoroFuoriMilano.checked}
            onChange={isChecked => {
              const dataCopy = { ...dataset.lavoroFuoriMilano };
              dataCopy.checked = isChecked;
              setFormField("lavoroFuoriMilano", dataCopy);
            }}
          />
        </Row>
      ) : null}
      {dataset.breviTrasferte ? (
        <Row fluid>
          <Checkbox
            fontSize="f7"
            checkcolor="primary"
            width="fit-content"
            label={"Sono disponibile a fare brevi trasferte"}
            value={dataset.breviTrasferte.checked}
            onChange={isChecked => {
              const dataCopy = { ...dataset.breviTrasferte };
              dataCopy.checked = isChecked;
              setFormField("breviTrasferte", dataCopy);
            }}
          />
        </Row>
      ) : null}
      {dataset.lungheTrasferte ? (
        <Row fluid >
          <Checkbox
            fontSize="f7"
            checkcolor="primary"
            width="fit-content"
            label={"Sono disponibile a fare lunghe trasferte"}
            value={dataset.lungheTrasferte.checked}
            onChange={isChecked => {
              const dataCopy = { ...dataset.lungheTrasferte };
              dataCopy.checked = isChecked;
              setFormField("lungheTrasferte", dataCopy);
            }}
          />
        </Row>
      ) : null}
      {dataset.vacanzaConLaFamiglia && (idServizioRiferimento !== ID_SERVIZIO_COLF) ? (
        <Row fluid >
          <Checkbox
            fontSize="f7"
            width="fit-content"
            checkcolor="primary"
            label={"Sono disponibile ad andare in vacanza con la famiglia"}
            value={dataset.vacanzaConLaFamiglia.checked}
            onChange={isChecked => {
              const dataCopy = { ...dataset.vacanzaConLaFamiglia };
              dataCopy.checked = isChecked;
              setFormField("vacanzaConLaFamiglia", dataCopy);
            }}
          />
        </Row>
      ) : null}
      {dataset.vacanzaConAssistito && (idServizioRiferimento !== ID_SERVIZIO_COLF) ? (
        <Row fluid>
          <Checkbox
            fontSize="f7"
            checkcolor="primary"
            width="fit-content"
            label={idServizioRiferimento !== ID_SERVIZIO_BADANTE?"Sono disponibile ad andare in vacanza solo con il/la bambino/a":
            "Sono disponibile ad andare in vacanza solo con con l’assistito/a"}
            value={dataset.vacanzaConAssistito.checked}
            onChange={isChecked => {
              const dataCopy = { ...dataset.vacanzaConAssistito };
              dataCopy.checked = isChecked;
              setFormField("vacanzaConAssistito", dataCopy);
            }}
          />
        </Row>
      ) : null}
    </Row>
  )
};

AltreDisponibilitaSedeLavoro.displayName = 'AltreDisponibilitaSedeLavoro';
export default AltreDisponibilitaSedeLavoro;