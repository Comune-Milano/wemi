/** @format */

import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import media from 'utils/media-queries';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { colors } from 'theme';
import { Row, Column } from 'components/ui/Grid';
import PrintArea, { generateRandomLogoSrc } from 'components/ui2/PrintArea';
import { TCBGraphQLRequests } from './requestsGraphql';
import Left from './Left';
import DatiPreliminari from './steps/DatiPreliminari';
import Beneficiari from './steps/Beneficiari';
import Mansioni from './steps/Mansioni';
import CuraDellaCasa from './steps/CuraDellaCasa';
import CuraDegliAnimali from './steps/CuraDegliAnimali';
import DisponibilitaRichiesta from './steps/DisponibilitaRichiesta';
import Preferenze from './steps/Preferenze';
import Contatti from './steps/Contatti';


const BorderLeft = styled(Column)`
  border-bottom:  2px solid ${colors.grey};

  ${media.md`
    border-bottom: none;
    border-right: 2px solid ${colors.grey};
  `}
`;

const Body = ({
  open,
  setOpen,
  servizioTCB,
  locale,
  userProfile,
  idRichiestaTcb,
  navigationTabs,
  moveToStep,
  livelliContrattuali,
  attributes,
  price,
}) => {
  const [logoSrc, setLogoSrc] = useState(generateRandomLogoSrc());

  const gqlReq = TCBGraphQLRequests(idRichiestaTcb, servizioTCB, locale);

  useEffect(() => {
    if (open) {
      if (navigationTabs[0] && !navigationTabs[0].hide) { gqlReq.gql002[1](); }
      if (navigationTabs[1] && !navigationTabs[1].hide) { gqlReq.gql003[1](); gqlReq.gql003_attr[1](); }
      if (navigationTabs[2] && !navigationTabs[2].hide) { gqlReq.gql004[1](); }
      if (navigationTabs[3] && !navigationTabs[3].hide) { gqlReq.gql005[1](); }
      if (navigationTabs[4] && !navigationTabs[4].hide) { gqlReq.gql006[1](); }
      if (navigationTabs[5] && !navigationTabs[5].hide) { gqlReq.gql007[1](); }
      if (navigationTabs[6] && !navigationTabs[6].hide) { gqlReq.gql008[1](); }
    }
  }, [open]);

  const handleMoveTo = stepNumber => (
    moveToStep ? () => { setOpen(false); moveToStep(stepNumber); } : null
  );

  const print = () => {
    setLogoSrc(generateRandomLogoSrc());
    window.print();
  };

  return (
    <PrintArea
      title={`Richiedi il servizio ${getObjectValue(servizioTCB, `tl_valore_testuale.${locale}`, '')} – Riepilogo`}
      userProfile={userProfile}
      logoSrc={logoSrc}
    >
      <Row fluid>

        <BorderLeft
          xs="12"
          md="3"
          padding="0 0 3em 0"
          sizepadding={{ md: '0 3em 0 0' }}
          tagName="aside"
        >
          <Left
            servizioTCB={servizioTCB}
            locale={locale}
            attributes={attributes}
            price={price}
            onPrint={print}
            datiPrezzo={gqlReq.gql006[0].data}
          />
        </BorderLeft>

        <Column
          xs="12"
          md="9"
          padding="3em 0 0 0"
          sizepadding={{ md: '0 0 0 3em' }}
          tagName="section"
        >

          <DatiPreliminari
            title="Dati preliminari"
            servizioTCB={servizioTCB}
            loading={!(attributes && livelliContrattuali)}
            errored={false}
            data={attributes}
            livelliContrattuali={livelliContrattuali}
            locale={locale}
          />

          {navigationTabs[0] && !navigationTabs[0].hide && (
            <Beneficiari
              title={navigationTabs[0].title}
              moveTo={handleMoveTo(0)}
              loading={gqlReq.gql002[0].pristine || gqlReq.gql002[0].isLoading}
              errored={gqlReq.gql002[0].errored}
              data={gqlReq.gql002[0].data}
              servizioTCB={servizioTCB}
              locale={locale}
            />
          )}

          {navigationTabs[1] && !navigationTabs[1].hide && (
            <Mansioni
              title={navigationTabs[1].title}
              moveTo={handleMoveTo(1)}
              loading={gqlReq.gql003[0].pristine || gqlReq.gql003[0].isLoading || gqlReq.gql003_attr[0].pristine || gqlReq.gql003_attr[0].isLoading || gqlReq.gql002[0].pristine || gqlReq.gql002[0].isLoading}
              errored={gqlReq.gql003[0].errored || gqlReq.gql003_attr[0].errored || gqlReq.gql002[0].errored}
              data={gqlReq.gql003[0].data}
              dataPatologie={gqlReq.gql003_attr[0].data}
              dataBeneficiari={gqlReq.gql002[0].data}
              servizioTCB={servizioTCB}
              locale={locale}
            />
          )}
          {navigationTabs[2] && !navigationTabs[2].hide && (
            <CuraDellaCasa
              title={navigationTabs[2].title}
              moveTo={handleMoveTo(2)}
              loading={gqlReq.gql004[0].pristine || gqlReq.gql004[0].isLoading}
              errored={gqlReq.gql004[0].errored}
              data={gqlReq.gql004[0].data}
              servizioTCB={servizioTCB}
              locale={locale}
            />
          )}
          {navigationTabs[3] && !navigationTabs[3].hide && (
            <CuraDegliAnimali
              title={navigationTabs[3].title}
              moveTo={handleMoveTo(3)}
              loading={gqlReq.gql005[0].pristine || gqlReq.gql005[0].isLoading}
              errored={gqlReq.gql005[0].errored}
              data={gqlReq.gql005[0].data && gqlReq.gql005[0].data.EstraiDatiConfigurazioneRichiesta005}
              servizioTCB={servizioTCB}
              locale={locale}
            />
          )}
          {navigationTabs[4] && !navigationTabs[4].hide && (
            <DisponibilitaRichiesta
              title={navigationTabs[4].title}
              moveTo={handleMoveTo(4)}
              loading={gqlReq.gql006[0].pristine || gqlReq.gql006[0].isLoading}
              errored={gqlReq.gql006[0].errored}
              data={gqlReq.gql006[0].data}
              benficiariData={gqlReq.gql002[0].data}
              servizioTCB={servizioTCB}
              tipologiaAssunzione={attributes?.tipologiaAssunzione}
              locale={locale}
            />
          )}
          {navigationTabs[5] && !navigationTabs[5].hide && (
            <Preferenze
              title={navigationTabs[5].title}
              moveTo={handleMoveTo(5)}
              loading={gqlReq.gql007[0].pristine || gqlReq.gql007[0].isLoading}
              errored={gqlReq.gql007[0].errored}
              data={gqlReq.gql007[0].data}
              servizioTCB={servizioTCB}
              locale={locale}
            />
          )}
          {navigationTabs[6] && !navigationTabs[6].hide && (
            <Contatti
              title={navigationTabs[6].title}
              moveTo={handleMoveTo(6)}
              loading={gqlReq.gql008[0].pristine || gqlReq.gql008[0].isLoading}
              errored={gqlReq.gql008[0].errored}
              data={gqlReq.gql008[0].data}
              servizioTCB={servizioTCB}
              locale={locale}
            />
          )}

        </Column>
      </Row>
    </PrintArea>
  );
};

Body.displayName = 'Body';

export default Body;
