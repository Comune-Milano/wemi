import React, { useState, useEffect } from "react";
import { useGraphQLRequest } from "hooks/graphQLRequest/useGraphQLRequest";
import ModaleRiepilogo from "components/navigation/ConfigurazioneRichiestaTCB/ModaleRiepilogo";
import withAuthentication from "hoc/withAuthentication";
import {
  serviziTCB as serviziTCBQ,
  datiStepTCB as datiStepTCBQ,
  getRiepilogoData as getRiepilogoDataQ
} from "./ModaleRiepilogoRichiestaGraphql";
import { cdAttributo } from 'components/navigation/ConfigurazioneRichiestaTCB/CodiciAttributi';
import minPrice from "components/navigation/RichiestaServizioTCB/partials/utils/minPrice";
import { getObjectValue } from "utils/extensions/objectExtensions";
import { getNomeServizioTCB } from "utils/functions";
import moment from 'moment';

const ModaleRiepilogoRichiesta = ({
  openModal,
  setOpenModal,
  idRichiestaTcb,
  idServizio,
  locale,
  userProfile
}) => {
  const [navigationTabs, setNavigationTabs] = useState(null);

  const [servizioTCB, getServiziTCBQ] = useGraphQLRequest(
    [],
    serviziTCBQ,
    null,
    true,
    data => {
      return data.filter(el => {
        if (getNomeServizioTCB(el.cd_dominio_tcb) === getNomeServizioTCB(parseInt(idServizio)))
          return el;
      })[0];
    });

  const [datiStepTCB, getDatiStepTCB] = useGraphQLRequest(
    [],
    datiStepTCBQ,
    {
      idRichiestaTcb: idRichiestaTcb
    },
    true
  );

  const [riepilogoData, getRiepilogoData] = useGraphQLRequest(
    {
      livelliContrattuali: [],
      attributes: [],
    },
    getRiepilogoDataQ
  );

  useEffect(() => {
    if (!datiStepTCB.pristine && !datiStepTCB.isLoading &&
      !servizioTCB.pristine && !servizioTCB.isLoading) {
      getRiepilogoData({
        idServizio: idServizio,
        idRichiestaTcb: idRichiestaTcb,
        arrayConfig: [
          cdAttributo.CD_ORARIO_LAVORO,
          cdAttributo.CD_LIVELLO_CONTRATTUALE,
          cdAttributo.CD_TIPOLOGIA_ASSUNZIONE
        ],
        annoRiferimento: moment().year()
      });
      setNavigationTabs(readStepsData(datiStepTCB.data, servizioTCB.data));
    }
  }, [servizioTCB, datiStepTCB]);

  const readStepsData = (datiStep, servizio) => {
    const defaultSteps = [
      {
        title: servizio.cd_dominio_tcb === 3 ? "Persone da assistere" : "Bambini da accudire",
        hide: !(servizio.cd_dominio_tcb === 3 || servizio.cd_dominio_tcb === 1),
      },
      {
        title: servizio.cd_dominio_tcb === 3 ? "Cura della persona" : "Cura dei bambini",
        hide: !(servizio.cd_dominio_tcb === 3 || servizio.cd_dominio_tcb === 1),
      },
      {
        title: 'Cura della casa',
      },
      {
        title: 'Cura degli animali',
      },
      {
        title: "Disponibilità richiesta",
      },
      {
        title: "Preferenze sul lavoratore",
      },
      {
        title: "Sede di lavoro e contatti",
      }
    ];

    const outputSteps = [];

    defaultSteps.forEach(step => {
      switch (parseInt(datiStep["cd_stato_pag_" + step.code])) {
        case 1:
          outputSteps.push({
            ...step,
            valid: false,
            visited: true,
            active: false
          });
          break;
        case 2:
          outputSteps.push({
            ...step,
            valid: true,
            visited: true,
            active: false
          });
          break;
        case 3:
          outputSteps.push({
            ...step,
            visited: true,
            active: true
          });
          break;
        default:
          outputSteps.push(step);
          break;
      }
    });

    return outputSteps;
  };

  const dataRiepilogoLoaded = !riepilogoData.pristine && !riepilogoData.isLoading;

  const attributes = dataRiepilogoLoaded ? {
    orario: {
      id: riepilogoData.data.attributes.find(el => el.cd_attributo === cdAttributo.CD_ORARIO_LAVORO) ?
        getObjectValue(riepilogoData.data.attributes.find(el => el.cd_attributo === cdAttributo.CD_ORARIO_LAVORO), 'cd_val_attributo', null)
        : null,
      label: riepilogoData.data.attributes.find(el => el.cd_attributo === cdAttributo.CD_ORARIO_LAVORO) ?
        getObjectValue(riepilogoData.data.attributes.find(el => el.cd_attributo === cdAttributo.CD_ORARIO_LAVORO), 'tl_valore_testuale.' + locale, null)
        : null,
    },
    contratto: {
      id: riepilogoData.data.attributes.find(el => el.cd_attributo === cdAttributo.CD_LIVELLO_CONTRATTUALE) ?
        getObjectValue(riepilogoData.data.attributes.find(el => el.cd_attributo === cdAttributo.CD_LIVELLO_CONTRATTUALE), 'cd_val_attributo', null)
        : null,
    },
    tipologiaAssunzione: {
      id: riepilogoData.data.attributes.find(el => el.cd_attributo === cdAttributo.CD_TIPOLOGIA_ASSUNZIONE) ?
        getObjectValue(riepilogoData.data.attributes.find(el => el.cd_attributo === cdAttributo.CD_TIPOLOGIA_ASSUNZIONE), 'cd_val_attributo', null)
        : 1,
      label: riepilogoData.data.attributes.find(el => el.cd_attributo === cdAttributo.CD_TIPOLOGIA_ASSUNZIONE) ?
        getObjectValue(riepilogoData.data.attributes.find(el => el.cd_attributo === cdAttributo.CD_TIPOLOGIA_ASSUNZIONE), 'tl_valore_testuale.' + locale, null)
        : null,
    },
  } : null;

  const price = dataRiepilogoLoaded ? minPrice(attributes.tipologiaAssunzione.id, riepilogoData.data.livelliContrattuali, attributes.orario.id, attributes.contratto.id) : null;

  return (
    <>
      {dataRiepilogoLoaded ? (
        <ModaleRiepilogo
          userProfile={userProfile}
          locale={locale}
          open={openModal}
          setOpen={setOpenModal}
          servizioTCB={servizioTCB.data}
          idRichiestaTcb={idRichiestaTcb}
          navigationTabs={navigationTabs}
          livelliContrattuali={riepilogoData.data.livelliContrattuali}
          attributes={attributes}
          price={price}
        />
      ) : null}
    </>
  );
};

ModaleRiepilogoRichiesta.displayName = "ModaleRiepilogoRichiesta";
export default withAuthentication(ModaleRiepilogoRichiesta);
