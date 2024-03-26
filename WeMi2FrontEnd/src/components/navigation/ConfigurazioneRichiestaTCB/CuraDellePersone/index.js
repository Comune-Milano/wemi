/** @format */

import React from 'react';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { isNullOrUndefined } from 'components/navigation/AccordionServAccr/accordionPartials/common/utils';
import FadeInWrapper from '../partials/FadeInWrapper';
import StepTitle from '../partials/StepTitle';
import GroupFieldTitle from '../partials/GroupFieldTitle';
import { getTCBServiceName } from '../utils';
import { FormTataMansioni, FormBadanteMansioni } from './partials';
import {
  estraiDatiConfigurazioneRichiesta003 as estraiDatiConfigurazioneRichiesta003Q,
  estraiAttributoBeneficiarioTCB as estraiAttributoBeneficiarioTCBQ,
} from './estraiMansioniTcbGraphQL';
import {
  estraiDatiConfigurazioneRichiesta002 as estraiDatiConfigurazioneRichiesta002Q,
} from '../Beneficiari/partials/graphQLTCBIRI002';


const CuraDellePersone = ({
  idRichiestaTcb,
  servizioTCB,
  locale,
  moveNext,
  moveBack,
  changeStep,
  stepDomanda,
  stepCheckValidity,
  onChangeValidation,
  sendRequestTCB,
}) => {
  const [datiRichiesta003] = useGraphQLRequest(
    undefined,
    estraiDatiConfigurazioneRichiesta003Q,
    {
      input: {
        idRichiestaTcb,
        cdServizioTcb: servizioTCB.cd_dominio_tcb,
        locale,
      },
    },
    true
  );

  const [datiRichiesta002] = useGraphQLRequest(
    undefined,
    estraiDatiConfigurazioneRichiesta002Q,
    {
      idRichiestaTcb,
      idServizio: servizioTCB.cd_dominio_tcb,
    },
    true
  );

  const [assistenzaDisabilitaPg] = useGraphQLRequest(
    undefined,
    estraiAttributoBeneficiarioTCBQ,
    {
      idRichiestaTcb,
      cdAttributo: 95,
    },
    true
  );
  const beneficiari = datiRichiesta002.data && datiRichiesta002.data.beneficiari ?
    datiRichiesta002.data.beneficiari.sort((a, b) => { if (a.pgBen < b.pgBen) return -1; }) : [];

  return (
    !isNullOrUndefined(assistenzaDisabilitaPg.data) && (
      <FadeInWrapper fluid>
        <StepTitle
          title={servizioTCB.cd_dominio_tcb === 1 ? 'Cura dei bambini' : 'Cura della persona'}
          description={`In questa sezione ti chiediamo di indicare le mansioni richieste 
        al/la ${getTCBServiceName(servizioTCB, locale)} per le persone da assistere.`}
        />
        {beneficiari.length > 0 &&
          !assistenzaDisabilitaPg.isLoading &&
          !assistenzaDisabilitaPg.pristine ? (
            <>
              <GroupFieldTitle
                title={`Quali mansioni deve svolgere il/la ${getTCBServiceName(servizioTCB, locale)}?`}
                marginTop="0"
                marginBottom="2em"
                required
              />
              {servizioTCB.cd_dominio_tcb === 1 ? (
                <FormTataMansioni
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
                  stepCheckValidity={stepCheckValidity}
                  onChangeValidation={onChangeValidation}
                  sendRequestTCB={sendRequestTCB}
                />
              ) : (
                <FormBadanteMansioni
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
                  stepCheckValidity={stepCheckValidity}
                  onChangeValidation={onChangeValidation}
                  sendRequestTCB={sendRequestTCB}
                />
                )}
            </>
          )
          : null}

      </FadeInWrapper>
    )
  );
};

CuraDellePersone.displayName = 'Cura Delle Persone';

export default CuraDellePersone;
