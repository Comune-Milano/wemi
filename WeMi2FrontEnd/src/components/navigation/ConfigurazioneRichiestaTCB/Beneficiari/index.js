/** @format */

import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Row } from 'components/ui/Grid';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { isNullOrUndefined } from 'components/navigation/AccordionServAccr/accordionPartials/common/utils';
import FadeInWrapper from '../partials/FadeInWrapper';
import StepTitle from '../partials/StepTitle';
import GroupFieldTitle from '../partials/GroupFieldTitle';
import {
  AggiungiPersone,
  AltrePersone,
} from './partials';
import {
  estraiFormFieldValues002 as estraiFormFieldValues002Q,
  estraiDatiConfigurazioneRichiesta002 as estraiDatiConfigurazioneRichiesta002Q,
} from './partials/graphQLTCBIRI002';
import { AccordionBeneficiario } from './accordion';

const Beneficiari = ({
  idRichiestaTcb,
  servizioTCB,
  locale,
  moveNext,
  moveBack,
  changeStep,
  stepDomanda,
  onChangeValidation,
  stepCheckValidity,
  sendRequestTCB,
}) => {
  const cdServizioTCB = servizioTCB.cd_dominio_tcb;
  const [accordionsVisibility, setAccordionsVisibility] = useState([]);
  const [datiRichiesta002, getDatiRichiesta002] = useGraphQLRequest(
    undefined,
    estraiDatiConfigurazioneRichiesta002Q,
    {
      idRichiestaTcb,
      idServizio: servizioTCB.cd_dominio_tcb,
    },
    true
  );

  const [formFieldValues002] = useGraphQLRequest(
    undefined,
    estraiFormFieldValues002Q,
    { idServizio: servizioTCB.cd_dominio_tcb },
    true
  );


  const beneficiari = datiRichiesta002.data && datiRichiesta002.data.beneficiari ?
    datiRichiesta002.data.beneficiari.sort((a, b) => { if (a.pgBen < b.pgBen) return -1; }) : [];

  const [validBeneficiari, setValidBeneficiari] = useState({}); // oggetto contenente chiave-Beneficiario: validità
  const updateValidBeneficiari = (pgBen, boolean) => {
    const updKey = `pgBen_${pgBen}`;
    setValidBeneficiari(prevState => ({
      ...prevState,
      [updKey]: boolean,
    }));
  };

  const [isBenStepValid, setIsBenStepValid] = useState({ 
    hasValidBeneficiario: false,
    hasEmptyBeneficiario: false
  });
  
  useEffect(() => {
    let hasValidBeneficiario = false;
    let hasEmptyBeneficiario = true;

    beneficiari.forEach(el => {
      if (validBeneficiari[`pgBen_${el.pgBen}`]) {
        // se almeno uno è valido si abilita il bottone di avanzamento
        hasValidBeneficiario = true;
      }else{
        // se almeno uno non è valido lo step non è valido
        hasEmptyBeneficiario = false;
      }
    });

    setIsBenStepValid({
      hasValidBeneficiario,
      hasEmptyBeneficiario
    });

  }, [validBeneficiari, beneficiari]);

  useLayoutEffect(() => {
    if (beneficiari.length > accordionsVisibility.length) {
      const arrayOfVisibility = Array(beneficiari.length).fill(false).map((el, index) => {
        if (index === beneficiari.length - 1) {
          return {
            id: index,
            visibility: true,
          };
        }
        return {
          id: index,
          visibility: false,
        };
      });
      setAccordionsVisibility(arrayOfVisibility);
    }
  }, [beneficiari]);

  const changeAccordionVisibility = (idAccordion, newVisibility) => {
    const slicedAccordionVisibility = accordionsVisibility.slice();

    const newArrayOfVisibility = slicedAccordionVisibility.map((el, index) => {
      if (index === idAccordion) {
        return {
          id: idAccordion,
          visibility: newVisibility,
        };
      }
      return el;
    });

    setAccordionsVisibility(newArrayOfVisibility);
  };

  const onSaveChangeVisibility = (idAccordion) => {
    const slicedAccordionVisibility = accordionsVisibility.slice();

    const newArrayOfVisibility = slicedAccordionVisibility.map((el, index) => {
      if (index === idAccordion) {
        return {
          ...el,
          visibility: true,
        };
      }
      return { ...el, visibility: false };
    });

    setAccordionsVisibility(newArrayOfVisibility);
  };

  const onAddChangeVisibility = () => {
    const slicedAccordionVisibility = accordionsVisibility.slice();
    const lastIndex = slicedAccordionVisibility.length - 1;
    slicedAccordionVisibility.push({
      id: lastIndex + 1,
      visibility: true,
    });
    const newArrayOfVisibility = slicedAccordionVisibility.map((el, index) => {
      if (index === slicedAccordionVisibility.length - 1) {
        return {
          ...el,
          visibility: true,
        };
      }
      return { ...el, visibility: false };
    });
    setAccordionsVisibility(newArrayOfVisibility);
  };

  const onRemoveChangeVisibility = (idAccordion) => {
    const slicedAccordionVisibility = accordionsVisibility.slice();
    const filteredAccordionVisibility = slicedAccordionVisibility.filter((el) => el.id !== idAccordion);

    const newArrayOfVisibility = filteredAccordionVisibility.map((el, index) => {
      if (index === filteredAccordionVisibility.length - 1) {
        return {
          ...el,
          visibility: true,
        };
      }
      return { ...el, visibility: false };
    });
    setAccordionsVisibility(newArrayOfVisibility);
  };

  return (
    !isNullOrUndefined(formFieldValues002.data) && (
      <FadeInWrapper fluid>
        <StepTitle
          title={cdServizioTCB === 1 ? 'Bambini da accudire' : 'Persone da assistere'}
          description="In questa sezione ti chiediamo di indicare la persona o le persone per cui stai richiedendo il servizio."
        />
        <GroupFieldTitle
          title={`Chi sono ${cdServizioTCB === 1 ? 'i bambini da accudire' : 'le persone da assistere'}?`}
          marginTop="0"
          required
        />
        <Row fluid direction="column">
          {
            !formFieldValues002.pristine &&
              !formFieldValues002.isLoading &&
              !datiRichiesta002.pristine &&
              !datiRichiesta002.isLoading &&
              beneficiari &&
              beneficiari.length > 0
              && accordionsVisibility.length > 0 ?
              beneficiari.map((el, index) => (
                <AccordionBeneficiario
                  key={el.pgBen}
                  index={index}
                  visibility={accordionsVisibility[index].visibility}
                  accordionsVisibility={accordionsVisibility}
                  changeAccordionVisibility={changeAccordionVisibility}
                  beneficiari={beneficiari}
                  cdServizioTCB={cdServizioTCB}
                  updateValidBeneficiari={updateValidBeneficiari}
                  el={el}
                  idRichiestaTcb={idRichiestaTcb}
                  formFieldValues002={formFieldValues002}
                  getDatiRichiesta002={getDatiRichiesta002}
                  locale={locale}
                  isBenStepValid={isBenStepValid}
                  onRemoveChangeVisibility={onRemoveChangeVisibility}
                  onSaveChangeVisibility={onSaveChangeVisibility}
                />
              ))
              : null
          }
        </Row>
        <AggiungiPersone
          idRichiestaTcb={idRichiestaTcb}
          cdServizioTCB={cdServizioTCB}
          datiRichiesta002={datiRichiesta002.data}
          getDatiRichiesta002={getDatiRichiesta002}
          onAddChangeVisibility={onAddChangeVisibility}
        />

        <GroupFieldTitle
          title="Ci sono altre persone in casa?"
        />
        <AltrePersone
          idRichiestaTcb={idRichiestaTcb}
          servizioTCB={servizioTCB}
          cdServizioTCB={cdServizioTCB}
          datiRichiesta002={datiRichiesta002.data}
          getDatiRichiesta002={getDatiRichiesta002}
          isStepValidToNext={isBenStepValid.hasValidBeneficiario}
          hasEmptyBeneficiario={isBenStepValid.hasEmptyBeneficiario}
          moveNext={moveNext}
          moveBack={moveBack}
          changeStep={changeStep}
          stepDomanda={stepDomanda}
          onChangeValidation={onChangeValidation}
          stepCheckValidity={stepCheckValidity}
          sendRequestTCB={sendRequestTCB}
        />
      </FadeInWrapper>
    )
  );
};

Beneficiari.displayName = 'Beneficiari';

export default Beneficiari;
