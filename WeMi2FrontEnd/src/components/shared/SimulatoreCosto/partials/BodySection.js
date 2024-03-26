import React, { useState } from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';
import PrintArea, { generateRandomLogoSrc } from 'components/ui2/PrintArea';
import { PriceBanner, BodyRow } from './Common.Styled';
import { ipotesiRows, prospettoRows, totalRows } from './constants';
import { cdAttributo } from 'components/navigation/ConfigurazioneRichiestaTCB/CodiciAttributi';
import { moneyFormat } from 'utils/formatters/moneyFormat';
import * as tipologiaOrarioCostanti from 'types/tipologiaOrario';
import { getNomeServizioTCB } from 'types/tcbConstants';
import { CD_ORIGINE_RICHIESTA } from 'types/cdOrigineRichiesta';

const BodySection = ({
  simulatore,
  active,
  filtri,
  callback,
  userProfile,
  idServizio,
  locale,
  orarioName,
  livelloName,
  tipologiaContratto,
  isMinoreDiSeiAnni,
  isPiuDiUnaPersonaNonAutosufficiente
}) => {
  const [logoSrc, setlogoSrc] = useState(generateRandomLogoSrc());

  const creaTestoIndennita = () => {
    const arr = [];

    if (parseInt(filtri.pranzo) !== 0 && filtri.pranzo) {
      arr.push(`${filtri.pranzo} ${parseInt(filtri.pranzo) > 1 ? " Pranzi/Colazioni" : " Pranzo/Colazione"}`);
    };
    if (parseInt(filtri.cena) !== 0 && filtri.cena) {
      arr.push(`${filtri.cena} ${parseInt(filtri.cena) > 1 ? " Cene" : " Cena"}`);
    };
    if (parseInt(filtri.alloggio) !== 0 && filtri.alloggio) {
      arr.push(`${filtri.alloggio} ${parseInt(filtri.alloggio) > 1 ? " Alloggi" : " Alloggio"}`);
    };

    return arr.join(", ");
  };

  const testoIndennita = creaTestoIndennita();
  const printSummary = [
    {
      title: "Tipologia di orario",
      value: (filtri.tipologiaOrario && filtri.tipologiaOrario.label) || orarioName
    },
    {
      title: "Livello di inquadramento",
      value: (filtri.livelloContrattuale && filtri.livelloContrattuale.label) || livelloName
    },
    ...(filtri.tipologiaContratto.id ? [{
      title: "Tipologia contratto",
      value: tipologiaContratto.find(el => (el.id === (filtri.tipologiaContratto && filtri.tipologiaContratto.id))).label
    }]
      : []),
     ...(filtri.etaBambini.filter(el => el.checked).length ? [{
        title: "Età dei bambini da accudire",
        value: filtri.etaBambini.filter(el => el.checked ).map(el => el.label).join(', ')
      }] 
      : []),
    ...(filtri.personeAutoSufficienti?.label ? [{
        title: "Persone non autosufficienti da assistere",
        value: filtri.personeAutoSufficienti?.label
      }] 
      : []),
    {
      title: "Retribuzione proposta",
      value: ((filtri.retribuzione) ? moneyFormat(filtri.retribuzione, true) : 0) + ((filtri.tipologiaOrario && (filtri.tipologiaOrario.id === tipologiaOrarioCostanti.NON_CONVIVENTI || filtri.tipologiaOrario.id === tipologiaOrarioCostanti.WEEKEND)) ? "/ora" : "/mese")
    },
    {
      title: "Ore settimanali",
      value: (filtri.oreSettimanali) ? filtri.oreSettimanali : 0
    },
    ...(testoIndennita ?
      [{
        title: "Indennità di vitto e alloggio spettanti nella settimana",
        value: testoIndennita
      }]
      : []),
  ];

  const print = () => {
    setlogoSrc(generateRandomLogoSrc());
    window.print();
  };

  const rowsMese = ipotesiRows(simulatore, filtri.tipologiaOrario.id, isMinoreDiSeiAnni, isPiuDiUnaPersonaNonAutosufficiente);
  const rowsAnno = prospettoRows(simulatore);

  return (
    <PrintArea
      title={"Simulazione costi " + getNomeServizioTCB(idServizio)}
      userProfile={userProfile}
      logoSrc={logoSrc}
    >
      <Row fluid justifycontent="space-between" flex margin="0 0 2.5rem 0">
        {/* ONLYPRINT SUMMARY */}
        <Column className="onlyPrint" xs="12" md="5" padding="0 0 1em 0" sizepadding={{ md: "0 1em 0 0" }}>
          {printSummary.map((el, j) => (
            <Row fluid alignitems="center" justifycontent="space-between" key={"printSum_" + j}>
              <Column xs="7" padding="0 1em 0 0">
                <Text
                  tag="span"
                  value={el.title}
                  size="f7"
                  color="black"
                />
              </Column>
              <Column xs="5" padding="0">
                <Text
                  tag="span"
                  value={el.value}
                  weight="bold"
                  size="f7"
                  color="black"
                />
              </Column>
            </Row>
          ))}
        </Column>
        <Column padding="0" xs="12" md="7" padding="0" sizepadding={{ md: "0 0.5em 0 0" }}>
          <PriceBanner>
            <div>
              <Text
                tag="h3"
                value="spesa annuale"
                transform="uppercase"
                letterSpacing="0.05em"
                weight="bold"
                size="f7"
                color="primary"
              />
              <Text
                tag="div"
                value={`${moneyFormat(simulatore.spesaAnnuale, true) || '-- €'}`}
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
                value="spesa mensile"
                transform="uppercase"
                letterSpacing="0.05em"
                weight="bold"
                size="f7"
                color="primary"
              />
              <Text
                tag="div"
                value={(moneyFormat(simulatore.spesaMediaMensile, true) || '-- €')}
                transform="uppercase"
                letterSpacing="0.05em"
                weight="bold"
                size="f5"
                color="darkGrey"
              />
            </div>
          </PriceBanner>
        </Column>
        <Column className="noPrint" xs="12" md="5" padding="1em 0 0 0" sizepadding={{ md: "0 0 0 0.5em" }}>
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
                        },
                        {
                          cd_attributo: cdAttributo.CD_TIPOLOGIA_ASSUNZIONE,
                          cd_val_attributo: CD_ORIGINE_RICHIESTA.assunzioneDiretta,
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
                onClick={() => print()}
              />
            </Column>
          </Row>
        </Column>
      </Row>
      <Text
        tag="h3"
        value="DETTAGLIO COSTI PER ASSISTENZA FAMILIARE"
        transform="uppercase"
        letterSpacing="0.05em"
        weight="bold"
        size="f7"
        color="primary"
        margin="0 0 1.5rem 0"
      />
      {
        rowsMese.map((el, index) => (
          <BodyRow
            key={el.title}
            title={el.title}
            description={el.description}
            detail={el.detail}
            borderSolid={rowsMese.length === (index + 1)}
          />))
      }
      {
        rowsAnno.map((el, index) => (
          <BodyRow
            key={el.title}
            title={el.title}
            description={el.description}
            detail={el.detail}
            borderSolid={rowsAnno.length === (index + 1)}
          />))
      }
      {
        totalRows(simulatore).map((el) => (
          <BodyRow
            key={el.title}
            title={el.title}
            description={el.description}
            detail={el.detail}
            colorText={"primary"}
          />))
      }
    </PrintArea>
  )
};

BodySection.displayName = "Body preventivo";

export default BodySection;