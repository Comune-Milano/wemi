import React from 'react';
import styled from 'styled-components';
import { Column } from 'components/ui/Grid';
import media from 'utils/media-queries';
import { colors } from 'theme';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { getIdServizio } from 'utils/functions/getIdServizio';
import { isNullOrUndefined } from 'components/navigation/AccordionServAccr/accordionPartials/common/utils';
import { NON_CONVIVENTI } from 'types/tipologiaOrario';
import CardQTC from './CardQTC';
import { getSpazioWeMiData as getSpazioWeMiDataQ } from './CardQTCGraphQL';
import { HIRING_TYPE_TCB } from '../constants';


const StyledColumn = styled(Column)`

padding: 2em 0;
${media.md`
  padding: 0 0 0 3em;
  border-left: 2px solid ${colors.grey};
`}
`;

const Risultati = ({
  selectedValue,
  setOpenInfo,
  setOpenSimulatore,
  modalitaAssunzioneTCB,
  livelliContrattuali,
  servizioTCB,
  locale,
  loaded,
}) => {
  const [spaziWeMiData] = useGraphQLRequest(
    {},
    getSpazioWeMiDataQ,
    { idServizio: getIdServizio(servizioTCB.cd_dominio_tcb) },
    true
  );

  const getValTestuale = (obj, locale) => getObjectValue(obj, `tl_valore_testuale.${locale}`, '').toLowerCase();

  const CardQTCArray = [
    {
      domain: HIRING_TYPE_TCB.DIRECT,
      title: getValTestuale(modalitaAssunzioneTCB.find(el => el.cd_dominio_tcb === HIRING_TYPE_TCB.DIRECT), locale),
      text: `Diventa il datore di lavoro del/la ${getValTestuale(servizioTCB, locale)}`,
    },
    {
      domain: HIRING_TYPE_TCB.INSTITUTION,
      title: getValTestuale(modalitaAssunzioneTCB.find(el => el.cd_dominio_tcb === HIRING_TYPE_TCB.INSTITUTION), locale),
      text: `Assumi il/la ${getValTestuale(servizioTCB, locale)} tramite un ente del terzo settore`,
    },
    {
      domain: HIRING_TYPE_TCB.FAMILY_BOOKLET,
      title: getValTestuale(modalitaAssunzioneTCB.find(el => el.cd_dominio_tcb === HIRING_TYPE_TCB.FAMILY_BOOKLET), locale),
      text: `Assumi il/la ${getValTestuale(servizioTCB, locale)} utilizzando il libretto famiglia`,
    },
  ];
  const checkDomain = (card) => {
    const servicesTCB = getObjectValue(spaziWeMiData, 'data.services', []);

    const idService = getIdServizio(servizioTCB.cd_dominio_tcb);
    const { orario = {} } = selectedValue;
    const hasFound = servicesTCB.find(service => {
      const minPrice = getObjectValue(service, 'prezzoMinimo', null);
      if (service.idTechnicalService !== idService) {
        return false;
      }
      if (service.idHourType !== selectedValue.orario?.id) {
        return false;
      }
      if (isNullOrUndefined(minPrice)) {
        return false;
      }
      return true;
    });
    if (card.domain === HIRING_TYPE_TCB.DIRECT) {
      return true;
    }
    if (card.domain === HIRING_TYPE_TCB.INSTITUTION && hasFound) {
      return true;
    }
    if (card.domain === HIRING_TYPE_TCB.FAMILY_BOOKLET && orario.id === NON_CONVIVENTI) {
      return true;
    }
    return false;
  };
  const { isLoading, pristine, errored } = spaziWeMiData;
  const hasEndedLoading = !isLoading && !pristine && !errored;

  if (!hasEndedLoading) {
    return null;
  }

  return (
    <StyledColumn
      xs="12"
      md="4"
      padding="0"
      tagName="aside"
    >
      {hasEndedLoading ?
       CardQTCArray.map((card) => {
         const isValidDomain = checkDomain(card);
         const service = spaziWeMiData.data?.services?.find((service) => {
           if (service.idHourType !== selectedValue.orario?.id) {
             return false;
           }
           return true;
         });
         if (isValidDomain) {
           return (
             <CardQTC
               key={`domain_${card.domain.toString()}`}
               label={card.title}
               description={card.text}
               modalitaAssunzione={card.domain}
               services={getObjectValue(spaziWeMiData, 'data.services', [])}
               setOpenInfo={setOpenInfo}
               setOpenSimulatore={setOpenSimulatore}
               tcbFilters={{
                 orario: selectedValue.orario,
                 contract: selectedValue.livello,
               }}
               livelliContrattuali={livelliContrattuali}
               servizioTCB={servizioTCB}
               locale={locale}
               loaded={loaded}
               domain={card.domain}
               price={service?.prezzoMinimo}
             />
           );
         }
         return <React.Fragment key={`domain_${card.domain.toString()}`} />;
       })
      :
       null

      }

    </StyledColumn>
  );
};

Risultati.displayName = ' Risultati';


export default Risultati;
