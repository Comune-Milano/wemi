/** @format */

import React from 'react';
import yup from 'libs/Form/validation/yup';
import { connect } from 'react-redux';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { Row } from 'components/ui/Grid';
import { Form } from 'libs/Form/components/Form';
import {
  estraiMansioniTata as estraiMansioniTataQ, estraiFasciaEta as estraiFasciaEtaQ,
} from '../estraiMansioniTcbGraphQL';
import TataAssociaMansioni from './TataAssociaMansioni';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';

const AssociaMansioni = ({
  beneficiari,
  idRichiestaTcb,
  datiRichiesta003,
  locale,
  assistenzaDisabilitaPg,
  servizioTCB,
  moveNext,
  moveBack,
  changeStep,
  stepDomanda,
  stepCheckValidity,
  onChangeValidation,
  sendRequestTCB,
}) => {
  const [mansioni] = useGraphQLRequest(
    undefined,
    estraiMansioniTataQ,
    null,
    true,
  );

  const [fasceEta] = useGraphQLRequest(
    undefined,
    estraiFasciaEtaQ,
    null,
    true
  );

  const jsonAssistenzaDisabilita = () => {
    const json = {};
    if (assistenzaDisabilitaPg) {
      assistenzaDisabilitaPg.forEach(assist => {
        json[assist.pgBen] = assist.txVal;
      });
      return json;
    }
    beneficiari.filter(el => el.patologieBambino && el.patologieBambino.length)
      .map(ben => {
        if (ben.infoPatologie) {
          json[ben.pgBen] = ben.infoPatologie;
        }
      });
    return json;
  };
  const mansioniAssociate = datiRichiesta003.data ?
    datiRichiesta003.data.mansioni.slice().filter(filtMans => filtMans.cdDominioTcb !== 12 && filtMans.cdDominioTcb !== 13).map(el => ({
      id: el.cdDominioTcb,
      beneficiariSelezionati: el.arrayBen,
    })) : [];
  const altraMansione = datiRichiesta003.data && datiRichiesta003.data.mansioni.find(el => el.cdDominioTcb === 0) ?
    datiRichiesta003.data.mansioni.find(el => el.cdDominioTcb === 0).txNota : '';
  const disponibilitaVacanzeFamiglia = datiRichiesta003.data && datiRichiesta003.data.mansioni.find(el => el.cdDominioTcb === 12);
  const disponibilitaVacanzeBambini = datiRichiesta003.data && datiRichiesta003.data.mansioni.find(el => el.cdDominioTcb === 13);
  const assistenzaDisabilita = jsonAssistenzaDisabilita();

  const initialFormDataset = {
    mansioniAssociate,
    altraMansione,
    assistenzaDisabilita,
    disponibilitaVacanzeFamiglia,
    disponibilitaVacanzeBambini,
  };

  const formValidationSchema = yup.object().shape({
    altraMansione: yup
      .string()
      .when('mansioniAssociate', (item) => {
        if (item.find(el => el.id === 0)) {
          return yup.string().nullable().required().max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message);
        }
        return yup.string().nullable().max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message);
      }),
    assistenzaDisabilita: yup.object().shape(
      (() => {
        const benefic = beneficiari || [];
        const jsonBeneficiari = {};
        benefic.forEach(ben => {
          jsonBeneficiari[ben.pgBen] = yup.string().nullable().max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message);
        });
        return jsonBeneficiari;
      })()
    ),
    mansioniAssociate: yup.array().of(
        yup.object().shape({
          beneficiariSelezionati: yup.array().required(),
        })
      )
      .required(),
  });

  return (
    <Row fluid margin="0">
      <Form
        initialDataset={initialFormDataset}
        validationSchema={formValidationSchema}
        validateOnChange
      >
        <TataAssociaMansioni
          servizioTCB={servizioTCB}
          idRichiestaTcb={idRichiestaTcb}
          beneficiari={beneficiari}
          datiRichiesta003={datiRichiesta003}
          assistenzaDisabilitaPg={assistenzaDisabilitaPg.data}
          locale={locale}
          moveNext={moveNext}
          moveBack={moveBack}
          changeStep={changeStep}
          mansioni={mansioni}
          fasceEta={fasceEta}
          stepDomanda={stepDomanda}
          stepCheckValidity={stepCheckValidity}
          onChangeValidation={onChangeValidation}
          sendRequestTCB={sendRequestTCB}
        />
      </Form>
    </Row>
  );
};

AssociaMansioni.displayName = 'AssociaMansioni';


const mapStoreToProps = store => ({
  locale: store.locale,
});
export default connect(mapStoreToProps)(AssociaMansioni);
