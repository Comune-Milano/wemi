/** @format */

import React from 'react';
import Accordion from 'components/ui/Accordion';
import Button from 'components/ui/Button';
import { Row, Column } from 'components/ui/Grid';
import Tooltip from 'components/navigation/EntSchedaOp/partial/Tooltip';
import InputRangeDayPicker from 'components/navigation/EntSchedaOp/partial/InputRangeDayPicker';
import FaIcon from 'components/ui/FaIcon';
import Text from 'components/ui/Text';
import Switch from 'components/ui/Switch';
import { datiScheda } from 'mocks/DatiSchedaOp';
import styled from 'styled-components';
import Input from 'components/ui/Input';

const Container = styled.div`
  margin: 2em;
`;

const ButtonModifica = styled(Button)`
  padding: 10%;
`;

const AccordionSchedaOp = () => (
  <Container>
    <Row>
      <Column xs="12" md="2">
        <ButtonModifica value="Modifica" />
      </Column>
    </Row>

    &nbsp;
    <Accordion
      wemi
      AccordionHeader={() => (
        <Text
          weight="bold"
          value={datiScheda.accordion.ente.title[0].label}
          intlFormatter
          size="f4"
        />
      )}
      AccordionBody={() => (
        <div>
          <Row>
            <Column lg="6">
              <Input intlLabel="Ente ID" material intlPlaceholder="Ente ID"/>
            </Column>
            <Column lg="6">
              <Input intlLabel="Nome"  material intlPlaceholder="Nome" />
            </Column>
          </Row>
          <Row>
            <Column lg="6">
              <Input intlLabel="Componenti Rta"  material intlPlaceholder="Componenti Rta" />
            </Column>
            <Column lg="6">
              <Input intlLabel="Rta"  material intlPlaceholder="Rta"/>
            </Column>
          </Row>
          <Row>
            <Column lg="12">
              <Input intlLabel="Note"  material intlPlaceholder="Note" />
            </Column>
          </Row>
        </div>
      )}
    />
    <br />
    <Accordion
      wemi
      AccordionHeader={() => (
        <Text
          weight="bold"
          value={datiScheda.accordion.descrizione.title[0].label}
          intlFormatter
          size="f4"
        />
      )}
      AccordionBody={() => (
        <div>
          <Row>
            <Column lg="12">
              <Tooltip
                component={FaIcon}
                restComp={{ icon: '\f059', fontSize: 'f7' }}
                textTT={datiScheda.accordion.descrizione.tooltip[0].label}
                right
                color="white"
                bgcolor="primary"
                style={{ padding: '0', margin: '0' }}
              />
              <Input intlLabel="Descrizione"  material intlPlaceholder="Descrizione" />              
            </Column>
          </Row>
          <Row>
            <Column lg="12">
              <Input intlLabel="Note"  material intlPlaceholder="Note"/>
            </Column>
          </Row>
        </div>
      )}
    />
    <br />
    <br />
    <Accordion
      wemi
      AccordionHeader={() => (
        <Text
          weight="bold"
          value={datiScheda.accordion.condizioni.title[0].label}
          intlFormatter
          size="f4"
        />
      )}
      AccordionBody={() => (
        <div>
          <Row>
            <Column lg="12">
              <Input intlLabel="Logo"  material intlPlaceholder="Logo" />
            </Column>
          </Row>
          <Row>
            <Column lg="12">
              <Input intlLabel="Condizioni di utilizzo"  material intlPlaceholder="Condizioni di utilizzo" />
            </Column>
          </Row>
          <Row>
            <Column lg="12">
              <Input intlLabel="Note"  material intlPlaceholder="Note" />
            </Column>
          </Row>
        </div>
      )}
    />
    <br />
    <Accordion
      wemi
      AccordionHeader={() => (
        <div>
          <div>
            <Text
              weight="bold"
              value={datiScheda.accordion.indirizzoPrincipale.title[0].label}
              intlFormatter
              size="f4"
            />
          </div>
          <div>
            <Text
              value={datiScheda.accordion.indirizzoPrincipale.title[1].label}
              intlFormatter
              size="f8"
            />
          </div>
        </div>
      )}
      AccordionBody={() => (
        <div>
          <Row>
            <Column lg="12">
              <Input disabled intlLabel="Indirizzo Primario*"  material intlPlaceholder="Indirizzo Primario*" />
            </Column>
          </Row>
          <Row>
            <Column lg="2">
              <Input disabled intlLabel="Cap"  material intlPlaceholder="Cap" />
            </Column>
            <Column lg="7">
              <Input disabled intlLabel="Città*"  material intlPlaceholder="Città*" />
            </Column>
            <Column lg="3">
              <Input disabled intlLabel="Provincia*"  material intlPlaceholder="Provincia*" />
            </Column>
          </Row>
          <Row>
            <Column lg="12">
              <Input intlLabel="Note"  material intlPlaceholder="Note" />
            </Column>
          </Row>
        </div>
      )}
    />
    <br />
    <Accordion
      wemi
      AccordionHeader={() => (
        <div>
          <div>
            <Text
              weight="bold"
              value={datiScheda.accordion.indirizzoSecondario.title[0].label}
              intlFormatter
              size="f4"
            />
          </div>
          <div>
            <Text
              value={datiScheda.accordion.indirizzoSecondario.title[1].label}
              intlFormatter
              size="f8"
            />
          </div>
        </div>
      )}
      AccordionBody={() => (
        <div>
          <Row>
            <Column lg="12">
              <Input disabled intlLabel="Indirizzo Secondario*" material intlPlaceholder="Indirizzo Secondario*"/>
            </Column>
          </Row>
          <Row>
            <Column lg="2">
              <Input disabled intlLabel="Cap"  material intlPlaceholder="Cap" />
            </Column>
            <Column lg="7">
              <Input disabled intlLabel="Città*"  material intlPlaceholder="Città*" />
            </Column>
            <Column lg="3">
              <Input disabled intlLabel="Provincia*"  material intlPlaceholder="Provincia*" />
            </Column>
          </Row>
          <Row>
            <Column lg="12">
              <Input intlLabel="Note"  material intlPlaceholder="Note" />
            </Column>
          </Row>
        </div>
      )}
    />
    <br />
    <Accordion
      wemi
      AccordionHeader={() => (
        <div>
          <Text
            weight="bold"
            value={datiScheda.accordion.contattiReferente.title[0].label}
            intlFormatter
            size="f4"
          />
        </div>
      )}
      AccordionBody={() => (
        <div>
          <Row>
            <Column lg="4">
              <Tooltip
                component={FaIcon}
                restComp={{ icon: '\f059', fontSize: 'f7' }}
                textTT={datiScheda.accordion.contattiReferente.tooltip[0].label}
                right
                color="white"
                bgcolor="primary"
                style={{ padding: '0', margin: '0' }}
              />
              <Input disabled intlLabel="Referente"  material intlPlaceholder="Referente" />
            </Column>
            <Column lg="4">
              <Tooltip
                component={FaIcon}
                restComp={{ icon: '\f059', fontSize: 'f7' }}
                textTT={datiScheda.accordion.contattiReferente.tooltip[1].label}
                right
                color="white"
                bgcolor="primary"
                style={{ padding: '0', margin: '0' }}
              />
              <Input disabled intlLabel="Telefono"  material intlPlaceholder="Telefono" />
            </Column>
            <Column lg="4">
              <Tooltip
                component={FaIcon}
                restComp={{ icon: '\f059', fontSize: 'f7' }}
                textTT={datiScheda.accordion.contattiReferente.tooltip[2].label}
                right
                color="white"
                bgcolor="primary"
                style={{ padding: '0', margin: '0' }}
              />
              <Input disabled intlLabel="Telefono Secondario"  material intlPlaceholder="Telefono Secondario" />
            </Column>
          </Row>
          <Row>
            <Column lg="4">
              <Tooltip
                component={FaIcon}
                restComp={{ icon: '\f059', fontSize: 'f7' }}
                textTT={datiScheda.accordion.contattiReferente.tooltip[3].label}
                right
                color="white"
                bgcolor="primary"
                style={{ padding: '0', margin: '0' }}
              />
              <Input disabled intlLabel="Mail"  material intlPlaceholder="Mail" />
            </Column>
            <Column lg="4">
              <Tooltip
                component={FaIcon}
                restComp={{ icon: '\f059', fontSize: 'f7' }}
                textTT={datiScheda.accordion.contattiReferente.tooltip[4].label}
                right
                color="white"
                bgcolor="primary"
                style={{ padding: '0', margin: '0' }}
              />
              <Input disabled intlLabel="Mail Secondaria"  material intlPlaceholder="Mail Secondaria" />
            </Column>
            <Column lg="4">
              <Tooltip
                component={FaIcon}
                restComp={{ icon: '\f059', fontSize: 'f7' }}
                textTT={datiScheda.accordion.contattiReferente.tooltip[5].label}
                right
                color="white"
                bgcolor="primary"
                style={{ padding: '0', margin: '0' }}
              />
              <Input disabled intlLabel="Web*"  material intlPlaceholder="Web*" />
            </Column>
          </Row>
          <Row>
            <Column lg="4">
              <Tooltip
                component={FaIcon}
                restComp={{ icon: '\f059', fontSize: 'f7' }}
                textTT={datiScheda.accordion.contattiReferente.tooltip[6].label}
                right
                color="white"
                bgcolor="primary"
                style={{ padding: '0', margin: '0' }}
              />
              <Input disabled intlLabel="Facebook"  material intlPlaceholder="Facebook" />
            </Column>
            <Column lg="4">
              <Tooltip
                component={FaIcon}
                restComp={{ icon: '\f059', fontSize: 'f7' }}
                textTT={datiScheda.accordion.contattiReferente.tooltip[7].label}
                right
                color="white"
                bgcolor="primary"
                style={{ padding: '0', margin: '0' }}
              />
              <Input disabled intlLabel="Instagram"  material intlPlaceholder="Instagram" />
            </Column>
            <Column lg="4">
              <Tooltip
                component={FaIcon}
                restComp={{ icon: '\f059', fontSize: 'f7' }}
                textTT={datiScheda.accordion.contattiReferente.tooltip[8].label}
                right
                color="white"
                bgcolor="primary"
                style={{ padding: '0', margin: '0' }}
              />
              <Input disabled intlLabel="Twitter" material intlPlaceholder="Twitter"/>
            </Column>
          </Row>
          <Row>
            <Column lg="12">
              <Input intlLabel="Note" material intlPlaceholder="Note" />
            </Column>
          </Row>
        </div>
      )}
    />
    <br />
    <Accordion
      wemi
      AccordionHeader={() => (
        <div>
          <div>
            <Text
              weight="bold"
              value={datiScheda.accordion.primoContatto.title[0].label}
              intlFormatter
              size="f4"
            />
          </div>
          <div>
            <Text
              value={datiScheda.accordion.primoContatto.title[1].label}
              intlFormatter
              size="f8"
            />
          </div>
          <div>
            <Text
              value={datiScheda.accordion.primoContatto.title[2].label}
              intlFormatter
              size="f8"
            />
          </div>
        </div>
      )}
      AccordionBody={() => (
        <div>
          <Row>
            <Column lg="6">
              <Tooltip
                component={FaIcon}
                restComp={{ icon: '\f059', fontSize: 'f7' }}
                textTT={datiScheda.accordion.primoContatto.tooltip[0].label}
                right
                color="white"
                bgcolor="primary"
                style={{ padding: '0', margin: '0' }}
              />
              <Input disabled intlLabel="Telefono" />
            </Column>
            <Column lg="6">
              <Tooltip
                component={FaIcon}
                restComp={{ icon: '\f059', fontSize: 'f7' }}
                textTT={datiScheda.accordion.primoContatto.tooltip[1].label}
                right
                color="white"
                bgcolor="primary"
                style={{ padding: '0', margin: '0' }}
              />
              <Input disabled intlLabel="Mail" material intlPlaceholder="Mail" />
            </Column>
          </Row>
          <Row>
            <Column lg="12">
              <InputRangeDayPicker />
            </Column>
          </Row>
          <Row>
            <Column lg="12">
              <Input intlLabel="Note" material intlPlaceholder="Note" />
            </Column>
          </Row>
        </div>
      )}
    />
    <br />
    <Accordion
      wemi
      AccordionHeader={() => (
        <div>
          <Text
            weight="bold"
            value={datiScheda.accordion.altro.title[0].label}
            intlFormatter
            size="f4"
          />
        </div>
      )}
      AccordionBody={() => (
        <div>
          <Row style={{ marginLeft: '20em' }}>
            <Column lg="5" lgShift={1}>
              <Switch
              size="f7"
                label={datiScheda.accordion.altro.options[0].label}
                defaultvalue={false}
                color="darkGrey"
                coloractive="primary"
              />
            </Column>
            <Column lg="5" lgShift={1}>
              <Switch
                            size="f7"
                label={datiScheda.accordion.altro.options[1].label}
                defaultvalue={false}
                color="darkGrey"
                coloractive="primary"
              />
            </Column>
          </Row>
          <Row>
            <Column lg="12">
              <Input intlLabel="Note" material intlPlaceholder="Note" />
            </Column>
          </Row>
        </div>
      )}
    />
    <br />
    <Accordion
      wemi
      AccordionHeader={() => (
        <div>
          <Text
            weight="bold"
            value={datiScheda.accordion.pubblica.title[0].label}
            intlFormatter
            size="f4"
          />
        </div>
      )}
      AccordionBody={() => (
        <div>
          <Row>
            <Column lg="12" lgShift={1}>
              <Switch
                            size="f7"
                label={datiScheda.accordion.pubblica.options[0].label}
                defaultvalue={false}
                color="darkGrey"
                coloractive="primary"
              />
            </Column>
          </Row>
          <Row>
            <Column lg="12">
              <Input intlLabel="Note" material intlPlaceholder="Note" />
            </Column>
          </Row>
        </div>
      )}
    />
    <Row division={12}>
      <Column xs="3" md="2">
        <ButtonModifica value="Annulla" />
      </Column>
      <Column xs="3" md="2">
        <ButtonModifica value="Salva come Draft" />
      </Column>
      <Column xs="3" md="2">
        <ButtonModifica value="Inoltra Note ad Ente" />
      </Column>
      <Column xs="3" md="2">
        <ButtonModifica value="Valida Scheda" />
      </Column>
    </Row>
  </Container>
);

AccordionSchedaOp.displayName = 'AccordionSchedaOp';

export default AccordionSchedaOp;
