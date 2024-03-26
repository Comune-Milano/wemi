/** @format */

import React, { useEffect, useState } from 'react';
import { Row, Column } from "components/ui/Grid";
import Accordion from "components/ui/Accordion";
import Text from "components/ui/Text";
import { connect } from "react-redux";
import Calendario from "components/ui/Calendario";
import FaIcon from "components/ui/FaIcon";
import Tooltip from "components/ui/Tooltip";
import Input from "components/ui/Input";
import SubTitle from 'components/ui/SubTitle';
import { AccordionBodyWrapper } from '../partials';
import withAuthentication from 'hoc/withAuthentication';

const PrimoContatto = ({
  EstraiDettaglioAmministrativoServizioEnte,
  primocont1,
  setprimocont1,
  userProfile
}) => {
  // const strDatiLogin = sessionStorage.getItem('DatiLogin');
  // const DatiLogin = strDatiLogin && JSON.parse(strDatiLogin);
  const DatiLogin = userProfile.datiLogin;

  const [telefono, settelefono] = useState(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.ente.datiEnte.js_primo_contatto ?
    EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.ente.datiEnte.js_primo_contatto.txTelefono?
    EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.ente.datiEnte.js_primo_contatto.txTelefono:"" : "")
  const [email, setemail] = useState(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.ente.datiEnte.js_primo_contatto ?
    EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.ente.datiEnte.js_primo_contatto.txEmail?
    EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.ente.datiEnte.js_primo_contatto.txEmail :"" : "")

    const idservizio = window.location.pathname.split('/')[5]

    const [serviziostt,setstt]=useState(EstraiDettaglioAmministrativoServizioEnte && EstraiDettaglioAmministrativoServizioEnte.EstraiServizioErogatoEnte004.filter(e=>{if(e.cd_stato_dati_servizio_ente===31 && e.id_servizio_ente==idservizio) return e}))


  useEffect(() => {

    setprimocont1({
      numerotelefono: EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.ente.datiEnte.js_primo_contatto ?
        EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.ente.datiEnte.js_primo_contatto.txTelefono?
        EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.ente.datiEnte.js_primo_contatto.txTelefono:"" : "",
      email:
        EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.ente.datiEnte.js_primo_contatto ?
          EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.ente.datiEnte.js_primo_contatto.txEmail?
          EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.ente.datiEnte.js_primo_contatto.txEmail :"" : ""
    })
  }, []);

  if (DatiLogin && DatiLogin.Ruolo === "Ente") {

    return (
      <Column sm="12" padding="20px">
        <Accordion
          headerBgColorOpen="blue"
          headerBgColor="grey"
          maxHeight="none"
          headerColorOpen="white"
          headerColor="blue"
          arrowOpenColor="white"
          arrowClosedColor="blue"
          arrowSize="f1"
          headerPadding="0.75rem 1.25rem"
          aperto={false}
          AccordionHeader={() => (
            <>
              <Text weight="bold" size="f4" value="Primo contatto" intlFormatter />

            </>
          )}
          children={<AccordionBodyWrapper>
            <Row padding="0" division={12}>
              <Column xs="6">
                <Tooltip
                  textTT="Inserire il contatto telefonico/email del centralino o di un referente per quel servizio solo se diverso da quello inserito nella scheda ente"
                  right
                  noShadow
                  color="white"
                  width="12em"
                  padding="1em 0"
                  fontSize="f8"
                  alignitems="center"
                  bgcolor="blue">
                  <FaIcon
                    radius="50%"
                    icon="\f128"
                    bgcolor="blue"
                    color="white"
                    fontSize="f9"
                    height="2em"
                    width="2em"
                  />

                </Tooltip>
                {serviziostt.length===0?
                <Input material color="blue" initialValue={
                  EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.ente.datiEnte.js_primo_contatto ?
                    EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.ente.datiEnte.js_primo_contatto.txTelefono ?
                    EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.ente.datiEnte.js_primo_contatto.txTelefono:"": ""}
                  onChange={(event) => {
                    settelefono(event.target.value); setprimocont1({
                      numerotelefono: event.target.value, email:
                        email
                    })
                  }}
                  readonly="true"
                  intlLabel="Telefono" />
                  :
                  <Input material color="blue" initialValue={
                    EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.ente.datiEnte.js_primo_contatto ?
                      EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.ente.datiEnte.js_primo_contatto.txTelefono ?
                      EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.ente.datiEnte.js_primo_contatto.txTelefono:"": ""}
                    onChange={(event) => {
                      settelefono(event.target.value); setprimocont1({
                        numerotelefono: event.target.value, email:
                          email
                      })
                    }}
                    readonly="true"
                    intlLabel="Telefono" />}
              </Column>
              <Column xs="6">
                <Tooltip
                  textTT="Inserire il contatto telefonico/email del centralino o di un referente per quel servizio solo se diverso da quello inserito nella scheda ente"
                  right
                  noShadow
                  color="white"
                  width="12em"
                  padding="1em 0"
                  fontSize="f8"
                  alignitems="center"
                  bgcolor="blue">
                  <FaIcon
                    radius="50%"
                    icon="\f128"
                    bgcolor="blue"
                    color="white"
                    fontSize="f9"
                    height="2em"
                    width="2em"
                  />
                </Tooltip>
                {serviziostt.length===0?
                <Input material color="blue" initialValue={
                  EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.ente.datiEnte.js_primo_contatto ?
                    EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.ente.datiEnte.js_primo_contatto.txEmail ?
                    EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.ente.datiEnte.js_primo_contatto.txEmail:"": ""}
                  intlLabel="Mail"
                  readonly="true"
                  onChange={(event) => { setemail(event.target.value); setprimocont1({ numerotelefono: telefono, email: event.target.value }) }} />
                  :
                  <Input material color="blue" initialValue={
                    EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.ente.datiEnte.js_primo_contatto ?
                      EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.ente.datiEnte.js_primo_contatto.txEmail ?
                      EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.ente.datiEnte.js_primo_contatto.txEmail:"": ""}
                    intlLabel="Mail"
  readonly="true"
                    onChange={(event) => { setemail(event.target.value); setprimocont1({ numerotelefono: telefono, email: event.target.value }) }} />}
              </Column>
            </Row>

            <Row padding="0" division={12}>
              <Column xs={12}>
                <Row fluid display="flex" alignitems="center">
                  <SubTitle title="Calendario " secondtitle="Disponibilità" />
                  <Tooltip
                    textTT="Indicare l'inizio e la fine dell'orario mattutino/pomeridiano o continuato in cui è disponibile una persona per il primo contatto"
                    right
                    noShadow
                    color="white"
                    width="12em"
                    padding="0 1em"
                    fontSize="f8"
                    alignitems="center"
                    bgcolor="blue">
                    <FaIcon
                      radius="50%"
                      icon="\f128"
                      bgcolor="blue"
                      color="white"
                      fontSize="f9"
                      height="2em"
                      width="2em"
                    />
                  </Tooltip>
                </Row>
                {serviziostt.length===0?
                <Calendario   getValue={()=>{}} ValoriDaAttivare={EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.ente.datiEnte.js_primo_contatto ?
                  EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.ente.datiEnte.js_primo_contatto.disponibilitaDiContatto?
                  EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.ente.datiEnte.js_primo_contatto.disponibilitaDiContatto:null : null} />
                  :
                  <Calendario   getValue={()=>{}}  ValoriDaAttivare={EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.ente.datiEnte.js_primo_contatto ?
                    EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.ente.datiEnte.js_primo_contatto.disponibilitaDiContatto?
                    EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.ente.datiEnte.js_primo_contatto.disponibilitaDiContatto:null : null} />}
              </Column>
            </Row>
          </AccordionBodyWrapper>}
        />
      </Column>

    )
  } else return null;
};


const mapStoreToProps = store => ({
  locale: store.locale,
  EstraiDettaglioAmministrativoServizioEnte: store.graphql.EstraiDettaglioAmministrativoServizioEnte
})


PrimoContatto.displayName = 'PrimoContatto';

export default connect(
  mapStoreToProps
)(withAuthentication(PrimoContatto));