import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';
import PrintArea from 'components/ui2/PrintArea';
import { PriceBanner, BodyRow } from './Common.Styled';
import { ipotesiRows, prospettoRows } from './constants';
import { cdAttributo } from 'components/navigation/ConfigurazioneRichiestaTCB/CodiciAttributi';
import { moneyFormat } from 'utils/formatters/moneyFormat';

const BodySection = ({
  simulatore,
  active,
  filtri,
  callback,
}) => {
  return (
    <PrintArea title="Simula i costi">
      <Row fluid justifycontent="space-between" flex margin="0 0 2.5rem 0">
        <Column padding="0" xs="12" md="7" padding="0" sizepadding={{md: "0 0.5em 0 0"}}>
          <PriceBanner>
            <div>
              <Text
                tag="h3"
                value="totale annuo"
                transform="uppercase"
                letterSpacing="0.05em"
                weight="bold"
                size="f7"
                color="primary"
              />
              <Text
                tag="div"
                value={`${simulatore.prospettoSpesaAnnuale ? moneyFormat(simulatore.prospettoSpesaAnnuale, true) : '--€'}`}
                transform="uppercase"
                letterSpacing="0.05em"
                weight="bold"
                size="f5"
                color="darkGrey"
              />
            </div>
            <div>
              <Text
                tag="h3"
                value="totale mensile"
                transform="uppercase"
                letterSpacing="0.05em"
                weight="bold"
                size="f7"
                color="primary"
              />
              <Text
                tag="div"
                value={simulatore.retribuzioneMediaMensile ? moneyFormat(simulatore.retribuzioneMediaMensile, true) : '--€'}
                transform="uppercase"
                letterSpacing="0.05em"
                weight="bold"
                size="f5"
                color="darkGrey"
              />
            </div>
          </PriceBanner>
        </Column>
        <Column className="noPrint" xs="12" md="5" padding="1em 0 0 0" sizepadding={{md: "0 0 0 0.5em"}}>
          <Row fluid alignitems="flex-start" justifycontent="space-between">
            {
              callback ?
                (
                  <Column xs="12" padding="0 0 1em 0">
                    <Button
                      label="Procedi con la richiesta"
                      color="blue"
                      onClick={() => {
                        callback([{
                          cd_attributo: cdAttributo.CD_LIVELLO_CONTRATTUALE,
                          cd_val_attributo: filtri.livelloContrattuale.id,
                        },
                        {
                          cd_attributo: cdAttributo.CD_ORARIO_LAVORO,
                          cd_val_attributo: filtri.tipologiaOrario.id,
                        }
                        ])
                      }}
                    />
                  </Column>
                )
                : null
            }
            <Column xs="12" padding="0">
              <Button
                label="Stampa"
                disabled={!active}
                color="primary"
                onClick={() => window.print()}
              />
            </Column>
          </Row>
        </Column>
      </Row>
      <Text
        tag="h3"
        value="ipotesi di preventivo spesa per assistenza familiare"
        transform="uppercase"
        letterSpacing="0.05em"
        weight="bold"
        size="f7"
        color="primary"
        margin="0 0 1.5rem 0"
      />
      {
        ipotesiRows(simulatore).map((el) => (
          <BodyRow
            key={el.title}
            title={el.title}
            description={el.description}
            detail={el.detail}
          />))
      }
      <Text
        tag="h3"
        value="prospetto di spesa annuale"
        transform="uppercase"
        letterSpacing="0.05em"
        weight="bold"
        size="f7"
        color="primary"
        margin="3rem 0 1.5rem 0"
      />
      {
        prospettoRows(simulatore).map((el) => (
          <BodyRow
            key={el.title}
            title={el.title}
            description={el.description}
            detail={el.detail}
          />))
      }
    </PrintArea>
  )
};

BodySection.displayName = "Body preventivo";

export default BodySection;