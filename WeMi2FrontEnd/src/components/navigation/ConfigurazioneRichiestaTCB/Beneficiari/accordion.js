import React, { useEffect, useRef } from 'react';
import { TextAccordionControllable } from 'components/ui2/TextAccordion';
import {
  TataFormBeneficiario,
  BadanteFormBeneficiario,
} from './partials';

export const AccordionBeneficiario = ({
  index,
  beneficiari,
  cdServizioTCB,
  updateValidBeneficiari,
  el,
  idRichiestaTcb,
  formFieldValues002,
  getDatiRichiesta002,
  locale,
  changeAccordionVisibility,
  visibility,
  onRemoveChangeVisibility,
  onSaveChangeVisibility,
}) => {
  const ref = useRef();

  useEffect(() => {
    if (visibility) {
      ref.current.focus();
      window.scrollTo(0, ref.current.offsetTop);
    }
  }, [beneficiari]);


  return (
    <TextAccordionControllable
      forwardRef={ref}
      key={el.pgBen}
      label={el.nomeBen.txVal}
      size="f7"
      color="primary"
      visibility={visibility}
      labelTransform="capitalize"
      margin={index !== 0 ? '2em 0 0 0' : ''}
      onVisible={(visible) => {
        changeAccordionVisibility(index, visible);
      }}
    >
      {cdServizioTCB === 1 ? (
        <TataFormBeneficiario
          idRichiestaTcb={idRichiestaTcb}
          infoBen={el}
          setValidBeneficiario={(boolean) => { updateValidBeneficiari(el.pgBen, boolean); }}
          formFieldValues002={formFieldValues002}
          getDatiRichiesta002={getDatiRichiesta002}
          locale={locale}
          onRemoveAccordion={onRemoveChangeVisibility}
          onSaveAccordion={onSaveChangeVisibility}

        />
      )
        : (
          <BadanteFormBeneficiario
            idRichiestaTcb={idRichiestaTcb}
            infoBen={el}
            setValidBeneficiario={(boolean) => { updateValidBeneficiari(el.pgBen, boolean); }}
            formFieldValues002={formFieldValues002}
            getDatiRichiesta002={getDatiRichiesta002}
            locale={locale}
            onRemoveAccordion={onRemoveChangeVisibility}
            onSaveAccordion={onSaveChangeVisibility}
          />
        )}
    </TextAccordionControllable>
  );
};
AccordionBeneficiario.displayName = 'Accordion beneficiaro';
