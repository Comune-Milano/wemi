/** @format */

import React, { useEffect, useState } from 'react';
import { Row, Column } from "components/ui/Grid";
import Accordion from "components/ui/Accordion";
import Text from "components/ui/Text";
import { connect } from "react-redux";
import { AccordionBodyWrapper } from '../partials';
import MultiSelect from 'components/ui/MultiSelect';
import Input from 'components/ui/Input';
import TextArea from 'components/ui/TextArea';
import withAuthentication from 'hoc/withAuthentication';

const Servizio = ({
  EstraiDettaglioAmministrativoServizioEnte,
  locale,
  DatiServizio1,
  setDatiServizio,
  userProfile
}) => {
  // const strDatiLogin = sessionStorage.getItem('DatiLogin');
  // const DatiLogin = strDatiLogin && JSON.parse(strDatiLogin);
  const DatiLogin = userProfile.datiLogin;

  const [municipidefault] = useState(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.listaMunicipiServiti?EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.listaMunicipiServiti.map((elemento) => ({
    id: elemento.idMunicipio,
    value: elemento.nmMunicipio[locale].charAt(0).toUpperCase() + elemento.nmMunicipio[locale].slice(1).toLowerCase()
  })):[]);

  const [mansionidefault] = useState(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.listaMansioniSvolte?EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.listaMansioniSvolte.map(elemento => ({
    id: elemento.idMansione,
    value: elemento.txTitoloMansione[locale].charAt(0).toUpperCase() + elemento.txTitoloMansione[locale].slice(1).toLowerCase()
  })):[]);

  const [erogazione] = useState(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.listaPeriodiErogazione?EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.listaPeriodiErogazione.map(elemento => ({
    id: elemento.id_periodo,
    value: elemento.tl_valore_testuale[locale].charAt(0).toUpperCase() + elemento.tl_valore_testuale[locale].slice(1).toLowerCase()
  })):[]);


  const idservizio = window.location.pathname.split('/')[5]

    const [serviziostt,setstt]=useState(EstraiDettaglioAmministrativoServizioEnte && EstraiDettaglioAmministrativoServizioEnte.EstraiServizioErogatoEnte004.filter(e=>{if(e.cd_stato_dati_servizio_ente===31 && e.id_servizio_ente==idservizio) return e}))


  useEffect(() => {
    setDatiServizio({
      data1: EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.dt_inizio_erog_serv ? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.dt_inizio_erog_serv : null,
      data2: EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.dt_fine_erog_serv ? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.dt_fine_erog_serv : null,
      municipio: {
        id: EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.listaMunicipiServiti? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.listaMunicipiServiti.map((municipio) => { return municipio.idMunicipio }):null,
        value: EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.listaMunicipiServiti? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.listaMunicipiServiti.map((municipio) => { return municipio.nmMunicipio[locale] }):null
      },
      mansioni: {
        id: EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.listaMansioniSvolte?EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.listaMansioniSvolte.map((mansione) => { return mansione.idMansione }):null,
        value: EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.listaMansioniSvolte?EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.listaMansioniSvolte.map((mansione) => { return mansione.txTitoloMansione[locale] }):null
      },
      altremansioni: EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.tx_altre_mansioni ?
        EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.tx_altre_mansioni : "",
      periodoerogazione: { id: EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.listaPeriodiErogazione?EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.listaPeriodiErogazione.map((periodo) => { return periodo.id_periodo }):null },
      tempomaxservizio: EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.
        qt_tempo_max_attivazione ? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.qt_tempo_max_attivazione : ""
    })
  }, []);
  return (
<Column sm="12" padding="20px">
    <Accordion
    headerBgColorOpen="blue"
    headerBgColor="grey"
    headerColorOpen="white"
    headerColor="blue"
    arrowOpenColor="white"
    arrowClosedColor="blue"
    arrowSize="f1"
    maxHeight="unset"
    headerPadding="0.75rem 1.25rem"
    aperto={false}
      AccordionHeader={() => (
        <Text weight="bold" size="f4" value="Servizio" intlFormatter />
      )}
      children={
        EstraiDettaglioAmministrativoServizioEnte ?
          <AccordionBodyWrapper>
            {(DatiLogin && DatiLogin.Ruolo === "Ente") || (DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi" && serviziostt.length>0) ?
            <Row>
            <Column md={6} lg={6}>
              <Input
                material
                intlFormatter
                color="blue"
                intlLabel="Data inizio validità"
                intlPlaceholder={DatiServizio1.data1}
                readonly="true"
              />
            </Column>
            <Column md={6} lg={6}>
              <Input
                material
                intlFormatter
                intlLabel="Data fine validità"
                color="blue"
                intlPlaceholder={DatiServizio1.data2}
                readonly="true"

              />
            </Column>
          </Row>
              : DatiLogin &&DatiLogin.Ruolo === "Amministratore WeMi" ?
                <Row>
                  <Column md={6} lg={6}>
                    <Input
                      material
                      intlFormatter
                      color="blue"
                      intlLabel="Data inizio validità"
                      intlPlaceholder={DatiServizio1.data1}
                      readonly="true"
                    />
                  </Column>
                  <Column md={6} lg={6}>
                    <Input
                      material
                      intlFormatter
                      intlLabel="Data fine validità"
                      color="blue"
                      intlPlaceholder={DatiServizio1.data2}
                      readonly="true"

                    />
                  </Column>
                </Row>
                : null}



            {(DatiLogin && DatiLogin.Ruolo === "Ente") || (DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi" && serviziostt.length>0) ?
              <Row padding="0" division={12}>
                <Column md={12} lg={12}>
                  <MultiSelect
                    material
                    name="Municipi Serviti"
                    selectedArrDefault={municipidefault}
                    items={[]}
                    intlFormatter
                    disabilitaEliminazione
                    color="blue"
                    intlPlaceholder="Municipi Serviti"
                    getValue={() => {}}
                  />
                </Column>
              </Row>
              : DatiLogin && DatiLogin.Ruolo === "Amministratore WeMi" ?
                <Row padding="0" division={12}>
                  <Column md={12} lg={12}>
                    <MultiSelect
                      material
                      name="Municipi Serviti"
                      selectedArrDefault={municipidefault}
                      disabilitaEliminazione
                      items={[]}
                      intlFormatter
                      color="blue"
                      intlPlaceholder="Municipi Serviti"
                      getValue={() => {}}
                    />
                  </Column>
                </Row>
                : null}
                {(DatiLogin && DatiLogin.Ruolo==="Ente") || (DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi" && serviziostt.length>0)?
            <Row padding="0" division={12}>
              <Column md={12} lg={12}>
                <MultiSelect
                  material
                  name="Mansioni"
                  disabilitaEliminazione
                  selectedArrDefault={mansionidefault}
                  items={[]}
                  intlFormatter
                  color="blue"
                  intlPlaceholder="Mansioni"
                  getValue={() =>  {}}
                />
              </Column>
            </Row>
            :DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi"?
            <Row padding="0" division={12}>
            <Column md={12} lg={12}>
              <MultiSelect
                material
                name="Mansioni"
                disabilitaEliminazione
                selectedArrDefault={mansionidefault}
                items={[]}
                intlFormatter
                color="blue"
                intlPlaceholder="Mansioni"
                getValue={() => {}}
              />
            </Column>
          </Row>
          :null}
            {(DatiLogin && DatiLogin.Ruolo === "Ente") || (DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi" && serviziostt.length>0) ?
              <Row padding="0" division={12}>
                <Column md={12} lg={12}>
                  <Input
                    material
                    name="Mansioni"
                    intlFormatter
                    color="blue"
                    readonly="true"
                    intlPlaceholder={EstraiDettaglioAmministrativoServizioEnte && EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte
                      && EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.tx_altre_mansioni ? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.tx_altre_mansioni : ""}
                    intlLabel="Altre mansioni non specificate"
                    getValue={() => {}}
                  />
                </Column>
              </Row>
              : <Row padding="0" division={12}>
                <Column md={12} lg={12}>
                  <Input
                    material
                    name="Mansioni"
                    intlLabel="Altre mansioni non specificate"
                    intlFormatter
                    readonly="true"
                    color="blue"
                    intlPlaceholder={DatiServizio1 && DatiServizio1.altremansioni? DatiServizio1.altremansioni:""} />
                </Column>
              </Row>
            }
            <Row padding="0" division={12}>
              <Column md={12} lg={12}>
                <Input
                  material
                  name="Procedura di Attivazione"
                  intlFormatter
                  color="blue"
                  intlLabel="Procedura di Attivazione"
                  readonly="true"
                />
              </Column>
            </Row>

{(DatiLogin && DatiLogin.Ruolo==="Ente") || (DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi" && serviziostt.length>0)?
            <Row padding="0" division={12}>
              <Column xs="12">
                <MultiSelect
                  material
                  name="Periodo erogazione"
                  selectedArrDefault={erogazione}
                  disabilitaEliminazione
                  items={[]}
                  intlFormatter
                  color="blue"
                  intlPlaceholder="Periodo erogazione"
                  getValue={() => {}}
                />
              </Column>
            </Row>
            :DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi"?
            <Row padding="0" division={12}>
              <Column xs="12">
                <MultiSelect
                  material
                  name="Periodo erogazione"
                  disabilitaEliminazione
                  selectedArrDefault={erogazione}
                  items={[]}
                  intlFormatter
                  color="blue"
                  intlPlaceholder="Periodo erogazione"
                  getValue={() => {}}
                />
              </Column>
            </Row>
            :null}
            {(DatiLogin && DatiLogin.Ruolo === "Ente") || (DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi" && serviziostt.length>0) ?
              <Row>
                <Column md={5} lg={5}>
                  <Input
                    material
                    color="blue"
                    intlFormatter
                    readonly="true"
                    intlPlaceholder={EstraiDettaglioAmministrativoServizioEnte && EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte &&
                      EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.qt_tempo_max_attivazione ? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.qt_tempo_max_attivazione : ""}
                    intlLabel="Tempo massimo di attivazione dalla conferma del servizio"
                    getValue={() => {}}
                  />
                </Column>
              </Row>
              : DatiLogin && DatiLogin.Ruolo === "Amministratore WeMi" ?
                <Row>
                  <Column md={5} lg={5}>
                    <Input
                      material
                      color="blue"
                      intlFormatter
                      intlPlaceholder={EstraiDettaglioAmministrativoServizioEnte && EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte &&
                        EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.qt_tempo_max_attivazione ? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.qt_tempo_max_attivazione : ""}
                      intlLabel="Tempo massimo di attivazione dalla conferma del servizio"
                      readonly="true"
                    />
                  </Column></Row>
                : null}
            {DatiLogin && DatiLogin.Ruolo === "Ente" ?
              <Row padding="0" division={12}>
                <Column md={12} lg={12}>
                  <TextArea
                    material
                    color="blue"
                    readOnly="true"
                    initialValue={EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio?
                      EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.noteserv?
                      EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.noteserv:"":""}
                    name="Note amministrative"
                    intlFormatter
                    getValue={() => {}}
                  />
                </Column>
              </Row>
              : DatiLogin && DatiLogin.Ruolo === "Amministratore WeMi" ?
                <Row padding="0" division={12}>
                  <Column md={12} lg={12}>
                    <TextArea
                      material
                      color="blue"
                      readOnly="true"
                      initialValue={EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio?
                        EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.noteserv?
                        EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.noteserv:"":""}
                      name="Note amministrative"
                      intlFormatter
                      getValue={() => {}}
                    />
                  </Column>
                </Row>
                : null}
          </AccordionBodyWrapper>
          : null

      }
    />

</Column>
  );
};


const mapStoreToProps = store => ({
  locale: store.locale,
  EstraiDettaglioAmministrativoServizioEnte: store.graphql.EstraiDettaglioAmministrativoServizioEnte
})


Servizio.displayName = 'Servizio';

export default connect(
  mapStoreToProps
)(withAuthentication(Servizio));
