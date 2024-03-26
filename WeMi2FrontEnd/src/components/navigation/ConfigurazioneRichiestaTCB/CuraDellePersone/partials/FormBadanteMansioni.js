/** @format */

import React from 'react';
import yup from 'libs/Form/validation/yup';
import { connect } from 'react-redux';
import { TCBConfig002 } from 'redux-modules/actions/authActions';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { Row } from 'components/ui/Grid';
import { Form } from 'libs/Form/components/Form';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';
import {
  estraiMansioniBadante as estraiMansioniBadanteQ,
} from '../estraiMansioniTcbGraphQL';
import BadanteAssociaMansioni from './BadanteAssociaMansioni';

const cdDominioTcbTerapie = 3;


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
    estraiMansioniBadanteQ,
    null,
    true,
  );
  const assistenza = [];
  const curaIgene = [];
  const alimentazione = [];
  const cureMediche = [];
  const disabilita = [];
  const accompagnamentoVacanza = [];
  const altreMansioni = [];


  if (mansioni.data) {
    mansioni.data.forEach((element) => {
      switch (element.pgVisualizzazione) {
        case 1:
          assistenza.push(element);
          break;
        case 2:
          curaIgene.push(element);
          break;
        case 3:
          alimentazione.push(element);
          break;
        case 4:
          cureMediche.push(element);
          break;
        case 5:
          disabilita.push(element);
          break;
        case 6:
          accompagnamentoVacanza.push(element);
          break;
        default:
          if (element.cdDominioTcb !== 0) {
            altreMansioni.push(element);
          }
      }
    });
  }

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
  const mansioniSelezionate = datiRichiesta003.data ?
    datiRichiesta003.data.mansioni?.filter(el => el.cdDominioTcb !== 0).map(el => el.cdDominioTcb) : [];
  const altraMansioneTextArea = datiRichiesta003.data && datiRichiesta003.data.mansioni?.find(el => el.cdDominioTcb === 0) ?
    datiRichiesta003.data.mansioni?.find(el => el.cdDominioTcb === 0).txNota : '';
  const TextAreaTerapie = datiRichiesta003.data && datiRichiesta003.data.mansioni?.find(el => el.cdDominioTcb === cdDominioTcbTerapie) ?
    datiRichiesta003.data.mansioni?.find(el => el.cdDominioTcb === cdDominioTcbTerapie).txNota : '';
  const assistenzaDisabilita = jsonAssistenzaDisabilita();
  const altraMansioneCheckbox = datiRichiesta003.data && datiRichiesta003.data.mansioni?.some(el => el.cdDominioTcb === 0);

  const initialFormDataset = {
    mansioniSelezionate,
    altraMansioneTextArea,
    assistenzaDisabilita,
    TextAreaTerapie,
    altraMansioneCheckbox,
  };

  const formValidationSchema = yup.object().shape({
    altraMansioneCheckbox: yup
    .boolean()
    .when('mansioniSelezionate', (mansioniSelezionate) => {
      if (!mansioniSelezionate.length) {
        return yup.boolean().oneOf([true]).required();
      }
      return yup.boolean();
    }),
    altraMansioneTextArea: yup
    .string()
    .max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message)
    .when('altraMansioneCheckbox', (altraMansioneCheckbox) => {
      if (altraMansioneCheckbox) {
        return yup.string().required();
      }
      return yup.string();
    }),
    mansioniSelezionate: yup
      .array().of(
        yup.number()
      ),
    TextAreaTerapie: yup
      .string()
      .max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message)
      .when('mansioniSelezionate', (item) => {
        if (item.includes(cdDominioTcbTerapie)) {
          return yup.string().required();
        }
        return yup.string();
      }),
  });


  return (
    <Row fluid margin="0">
      <Form
        initialDataset={initialFormDataset}
        validationSchema={formValidationSchema}
        validateOnChange
      >
        <BadanteAssociaMansioni
          servizioTCB={servizioTCB}
          idRichiestaTcb={idRichiestaTcb}
          beneficiari={beneficiari}
          datiRichiesta003={datiRichiesta003}
          assistenzaDisabilitaPg={assistenzaDisabilitaPg.data}
          locale={locale}
          moveNext={moveNext}
          moveBack={moveBack}
          changeStep={changeStep}
          stepDomanda={stepDomanda}
          mansioni={mansioni}
          stepCheckValidity={stepCheckValidity}
          onChangeValidation={onChangeValidation}
          sendRequestTCB={sendRequestTCB}
        />
      </Form>
    </Row>
  );
};

AssociaMansioni.displayName = 'AssociaMansioni';

const mapDispatchToProps = ({
  TCBConfig002,
});

const mapStoreToProps = store => ({
  config002: store.requestTCB.config002,
  EstraiDati: store.graphql.EstraiDatiConfigurazioneRichiesta002,
  locale: store.locale,
});
export default connect(mapStoreToProps, mapDispatchToProps)(AssociaMansioni);
