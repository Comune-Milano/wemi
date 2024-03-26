/** @format */
import React, { useState } from 'react';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { isNullOrUndefined } from 'components/navigation/AccordionServAccr/accordionPartials/common/utils';
import { 
  estraiDati as estraiDatiQ, 
  estraiFlagsCandidaturaQuery as estraiFlagsCandidaturaQueryQ,
  estraiDatiPartials as estraiDatiPartialsQ 
} from './summaryGraphQL';
import { Row, Column } from 'components/ui/Grid';
import PrintArea, { generateRandomLogoSrc } from 'components/ui2/PrintArea';
import styled from "styled-components";
import media from 'utils/media-queries';
import { colors } from 'theme';
import Left from './steps/Left';
import Candidatura from './steps/Candidatura';
import EsperienzeLavoratore from './steps/EsperienzeLavoratore';
import DisponibilitaTata from './steps/DisponibilitaTata';
import DisponibilitaBadante from './steps/DisponibilitaBadante';
import DisponibilitaColf from './steps/DisponibilitaColf';
import TCBICL001 from './steps/TCBICL001';
import TCBICL002 from './steps/TCBICL002';
import TCBICL003 from './steps/TCBICL003';
import TCBICL005 from './steps/TCBICL005';
import TCBICL006 from './steps/TCBICL006';
import TCBICL009 from './steps/TCBICL009';
import TCBICL0012 from './steps/TCBICL0012';
import DatiOperatore from './steps/DatiOperatore'; 

const BorderLeft = styled(Column)`

border-bottom:  2px solid ${colors.grey};

  ${media.md`
    border-bottom: none;
    border-right: 2px solid ${colors.grey};
  `}
`;

const Body = ({
  idLavoratore,
  locale,
  onPatchStep,
  isAdminWemi,
  isModifica
}) => {
  const [logoSrc, setLogoSrc] = useState(generateRandomLogoSrc());

  const [Dati] = useGraphQLRequest(
    undefined,
    estraiDatiQ,
    { idUtente: idLavoratore },
    true
  );
  const [DatiPartials] = useGraphQLRequest(
    undefined,
    estraiDatiPartialsQ,
    undefined,
    true
  );
  const [Flags] = useGraphQLRequest(
    undefined,
    estraiFlagsCandidaturaQueryQ,
    { idUtente: idLavoratore },
    true
  );
  const print = () => {
    setLogoSrc(generateRandomLogoSrc());
    window.print();
  };

  return (
    !isNullOrUndefined(Dati.data) && (
      <PrintArea
        title={"Candidati come lavoratore – Riepilogo"}
        logoSrc={logoSrc}
      >
        <Row fluid >
          <BorderLeft xs='12' md='3' padding="0 0 3em 0" sizepadding={{ md: '0 3em 0 0' }}
            tagName="aside">
            <Left
              Dati={Dati.data.estraiDatiSummary}
              print={print}
            />
          </BorderLeft>
          <Column xs='12' md='9' padding='3em 0 0 0' sizepadding={{ md: '0 0 0 3em' }}
            tagName="section">
            <TCBICL001
              Dati={Dati.data.estraiDatiSummary}
              locale={locale}
              onPatchStep={onPatchStep}
            />
            <TCBICL002
              Dati={Dati.data.estraiDatiSummary}
              locale={locale}
              onPatchStep={onPatchStep}
              statoOccupazionale={ DatiPartials.data && DatiPartials.data.estraiDatiPartials.statoOccupazionale}
            />
            <TCBICL003
              Dati={Dati.data.estraiDatiSummary}
              locale={locale}
              onPatchStep={onPatchStep}
              corsiTata={DatiPartials.data && DatiPartials.data.estraiDatiPartials.corsiTata}
              corsiBadante={DatiPartials.data && DatiPartials.data.estraiDatiPartials.corsiBadante}
              lingueParlate={DatiPartials.data && DatiPartials.data.estraiDatiPartials.lingueParlate}
            />
            <EsperienzeLavoratore
              Dati={Dati.data.estraiDatiSummary}
              onPatchStep={onPatchStep}
              idUtente={idLavoratore}
            />
            <TCBICL005
              Dati={Dati.data.estraiDatiSummary}
              locale={locale}
              onPatchStep={onPatchStep}
              estraiInteressi={DatiPartials.data && DatiPartials.data.estraiDatiPartials.interessi}
              estraiCarattereLavoratore={DatiPartials.data && DatiPartials.data.estraiDatiPartials.carattereLavoratore}
              estraiAltezza={DatiPartials.data && DatiPartials.data.estraiDatiPartials.altezza}
              estraiCorporatura={DatiPartials.data && DatiPartials.data.estraiDatiPartials.corporatura}
            />
            <Candidatura
              onPatchStep={onPatchStep}
              Flags={Flags.data}
            />
            {
              Flags.data && Flags.data.tata &&
              <>
                <TCBICL006
                  Dati={Dati.data.estraiDatiSummary}
                  idUtente={idLavoratore}
                  locale={locale}
                  onPatchStep={onPatchStep}
                  estraiMansioniTata={DatiPartials.data && DatiPartials.data.estraiDatiPartials.mansioniTata}
                  estraiMansioniColf={DatiPartials.data && DatiPartials.data.estraiDatiPartials.mansioniColf}
                  estraiFasciaEta={DatiPartials.data && DatiPartials.data.estraiDatiPartials.fasciaEta}
                />
                <DisponibilitaTata
                  locale={locale}
                  onPatchStep={onPatchStep}
                  idUtente={idLavoratore}
                />
              </>
            }
            {
              Flags.data && Flags.data.colf &&
              <>
                <TCBICL009
                  Dati={Dati.data.estraiDatiSummary}
                  locale={locale}
                  onPatchStep={onPatchStep}
                  Mansioni={DatiPartials.data && DatiPartials.data.estraiDatiPartials.mansioniColf}
                />
                <DisponibilitaColf
                  locale={locale}
                  onPatchStep={onPatchStep}
                  idUtente={idLavoratore}
                />
              </>
            }
            {
              Flags.data && Flags.data.badante &&
              <>
                <TCBICL0012
                  Dati={Dati.data.estraiDatiSummary}
                  locale={locale}
                  onPatchStep={onPatchStep}
                  estraiMansioniBadanti={DatiPartials.data && DatiPartials.data.estraiDatiPartials.mansioniBadante}
                  estraiMansioniColf={DatiPartials.data && DatiPartials.data.estraiDatiPartials.mansioniColf}
                  estraiPatologieGeneriche={DatiPartials.data && DatiPartials.data.estraiDatiPartials.patologieGeneriche}
                  estraiPatologie={DatiPartials.data && DatiPartials.data.estraiDatiPartials.patologie}
                />
                 <DisponibilitaBadante
                  locale={locale}
                  onPatchStep={onPatchStep}
                  idUtente={idLavoratore}
                />
              </>
            }
            {isAdminWemi && Flags.data ?
            <DatiOperatore
              badante={Flags.data.badante}
              colf={Flags.data.colf}
              tata={Flags.data.tata}
              idLavoratore={idLavoratore}
              isModifica={isModifica}
            />
          : null}
          </Column>
        </Row>
      </PrintArea>
    )
  );
};

Body.displayName = 'Body';

export default Body;
