/** @format */

import React from 'react';
import { connect } from 'react-redux';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import Switch from 'components/ui/Switch';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
// import Carousel from 'components/ui/Carousel';
import Accordion from 'components/ui/Accordion';
import { CarouselJson } from 'mocks/CarouselJson';
import TablePagination from 'components/ui/TablePagination';
import Pagination from 'components/ui/Pagination';
import Label from 'components/ui/Label/';
import Badge from 'components/ui/Badge';
import Hr from 'components/ui/Hr';
import Tabs from 'components/ui/Tabs';
import Checkbox from 'components/ui/Checkbox';
import Tooltip from 'components/ui/Tooltip';
import { tablePagination, tabs } from 'mocks/UiKitJson';
import DatePicker from 'components/ui/InputDayPicker';
import InputRangeDayPicker from 'components/ui/InputRangeDayPicker';
import MultiSelect from 'components/ui/MultiSelect';
import FaIcon from 'components/ui/FaIcon';
import HeaderTitle from 'components/ui/Header';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import Breadcrumbs from '../../navigation/Breadcrumbs';
import {
  carrelloAll as carrelloAllQ,
  carrelloPK as carrelloPKQ,
  carrelloAdd as carrelloAddM,
  carrelloUpd as carrelloUpdM,
  carrelloDel as carrelloDelM,
} from './CarrelloGraphQL';

const items = [
  { value: 'Prezzo crescente', label: 'Prezzo crescente', id: 1 },
  { value: 'Prezzo decrescente', label: 'Prezzo decrescente', id: 2 },
  { value: 'Distanza', label: 'Distanza', id: 3 },
  { value: 'Rating', label: 'Rating', id: 2 },
  { value: 'Ciao', label: 'Prezzo crescente', id: 1 },
  { value: 'ciao2', label: 'Prezzo decrescente', id: 2 },
  { value: 'ciao3', label: 'Distanza', id: 3 },
  { value: 'ciao4', label: 'Rating', id: 2 },
  { value: 'Ciao5', label: 'Prezzo crescente', id: 1 },
  { value: 'ciao6', label: 'Prezzo decrescente', id: 2 },
  { value: 'ciao7', label: 'Distanza', id: 3 },
  { value: 'ciao8', label: 'Rating', id: 2 },
];
const HomePage = ({ carrelloAll, carrelloPK, error, graphqlRequest }) => (
  <div>
    {/* GRAPHQL REQUEST AND RESULT */}
    <Row>
      <Column md="12">
        <Label
          weight="bold"
          value="GraphQL Request e Result da tabella Carrello"
          intlFormatter
          color="black"
          bgcolor="yellow"
          size="f4"
        />
      </Column>
    </Row>
    <Row>
      <Column xs="12" md="3">
        <Button
          onClick={() => graphqlRequest(carrelloAllQ())}
          value="Tutti elementi carrello"
          fontSize="f8"
        />
      </Column>
      <Column xs="12" md="3">
        <Button
          onClick={() => graphqlRequest(carrelloPKQ('a5c1bd7c-6bf7-474b-8e87-9106056283e9'))}
          value="Elemento del carrello"
          fontSize="f8"
        />
      </Column>
      <Column xs="12" md="3">
        <Button
          onClick={() =>
            graphqlRequest(
              carrelloAddM({
                js_dati_fatturazione: '{a:[1,2,3],b:[4,5,6]}',
                js_dati_pagamento: '{a:[1,2,3],b:[4,5,6]}',
              }),
            )
          }
          value="Aggiungi elemento al carrello"
          fontSize="f8"
        />
      </Column>
      <Column xs="12" md="3">
        <Button
          onClick={() =>
            graphqlRequest(
              carrelloUpdM({
                id_carrello: '69cd7e3e-a3c8-4c3e-b24f-0e0e662c5320',
                js_dati_fatturazione: '{}',
                js_dati_pagamento: '{}',
              }),
            )
          }
          value="Aggiorna elemento nel carrello"
          fontSize="f8"
        />
      </Column>
      <Column xs="12" md="3">
        <Button
          onClick={() => graphqlRequest(carrelloDelM('69cd7e3e-a3c8-4c3e-b24f-0e0e662c5320'))}
          value="Elimina elemento dal carrello"
          fontSize="f8"
        />
      </Column>
    </Row>
    {carrelloPK && (
      <Row>
        <Column md="12">
          <Label
            weight="bold"
            value="Query_Con_Parametri"
            intlFormatter
            color="white"
            bgcolor="purple"
            size="f4"
          />
        </Column>
        <Column md="6">
          <Text value="ID Carrello" color="primary" />
        </Column>
        <Column md="6">
          <Text value={carrelloPK.carrelloPK.id_carrello} color="black" />
        </Column>
        <Column md="6">
          <Text value="TimeStamp Creazione" color="primary" />
        </Column>
        <Column md="6">
          <Text value={carrelloPK.carrelloPK.ts_creazione} color="black" />
        </Column>
        <Column md="6">
          <Text value="Dati Fatturazione" color="primary" />
        </Column>
        <Column md="6">
          <Text value={carrelloPK.carrelloPK.js_dati_fatturazione.toString()} color="black" />
        </Column>
        <Column md="6">
          <Text value="Dati Pagamento" color="primary" />
        </Column>
        <Column md="6">
          <Text
            value={'a5c1bd7c-6bf7-474b-8e87-9106056283e9'.js_dati_pagamento.toString()}
            color="black"
          />
        </Column>
      </Row>
    )}
    {carrelloAll && (
      <Row>
        <Column md="12">
          <Label
            weight="bold"
            value="Query_Senza_Parametri"
            intlFormatter
            color="white"
            bgcolor="purple"
            size="f4"
          />
        </Column>

        {carrelloAll.map(contenuto => (
          <Row>
            <Column md="6">
              <Text value="ID Carrello" color="primary" />
            </Column>
            <Column md="6">
              <Text value={contenuto.id_carrello} color="black" />
            </Column>
            <Column md="6">
              <Text value="TimeStamp Creazione" color="primary" />
            </Column>
            <Column md="6">
              <Text value={contenuto.ts_creazione} color="black" />
            </Column>
            <Column md="6">
              <Text value="Dati Fatturazione" color="primary" />
            </Column>
            <Column md="6">
              <Text value={contenuto.js_dati_fatturazione.toString()} color="black" />
            </Column>
            <Column md="6">
              <Text value="Dati Pagamento" color="primary" />
            </Column>
            <Column md="6">
              <Text value={contenuto.js_dati_pagamento.toString()} color="black" />
            </Column>
            <Column md="12">
              <Hr height="1px" width="100%" color="primary" type="solid" top="2px" bottom="5px" />
            </Column>
          </Row>
        ))}
      </Row>
    )}
    {error && (
      <Row>
        <Column md="12">
          <Label
            weight="bold"
            value={`Errore: ${error}`}
            intlFormatter
            color="white"
            bgcolor="purple"
            size="f4"
          />
        </Column>
      </Row>
    )}
    <Row>
      <Column xs="12">
        <Text weight="bold" value="Buttons" intlFormatter color="darkGrey" size="f4" />
      </Column>
      <Column xs="12" md="2">
        <Button value="Buttons" />
      </Column>
      <Column xs="12" md="5">
        <MultiSelect material name="Hey" items={items} intlFormatter intlPlaceholder="Yeah" />
      </Column>
      <Column xs="12" md="2">
        <Button primary value="primary" />
      </Column>
      <Column xs="12" md="2">
        <Button secondary value="secondary" />
      </Column>
      <Column xs="12" md="2">
        <Button link value="link" />
      </Column>
      <Column xs="12" md="2">
        <Button disabled value="disabled" />
      </Column>
      <Column xs="12" md="2">
        <Button accept value="accept" />
      </Column>
      <Column xs="12" md="2">
        <Button cancel value="cancel" />
      </Column>
    </Row>

    <Row>
      <Column xs="12">
        <Accordion
          wemi
          AccordionHeader={() => (
            <Text weight="bold" value="Accordion WeMi" intlFormatter size="f4" />
          )}
          AccordionBody={() => (
            <Row>
              <Column xs="2">
                <Button accept value="accept" />
              </Column>
              <Column xs="2">
                <Button cancel value="cancel" />
              </Column>
            </Row>
          )}
        />
      </Column>

      <Column xs="12">
        <Accordion
          wemi
          AccordionHeader={() => (
            <Row fluid justifycontent="space-bewteen">
              <Column xs="11">
                <Text weight="bold" value="Funziono bene" intlFormatter size="f4" />
              </Column>
              <Column xs="1">
                <Badge
                  bgcolor="red"
                  color="white"
                  value="2/3"
                  width="auto"
                  height="auto"
                  padding="p2"
                  radius="25px"
                  fontsize="f8"
                />
              </Column>
            </Row>
          )}
          AccordionBody={() => (
            <Row justifycontent="center">
              <Column xs="4">
                <Button value="Default Button" />
              </Column>
            </Row>
          )}
        />
      </Column>
      <Column xs="2" />
    </Row>

    <Row>
      <Column xs="12" md="2">
        <Input material intlPlaceholder="material" />
      </Column>
      <Column xs="12" md="2">
        <Input noLabel intlPlaceholder="noLabel" />
      </Column>
      <Column xs="12" md="2">
        <Input disabled intlPlaceholder="disabled" />
      </Column>
      <Column xs="12" md="3">
        <DatePicker placeholder="placeholder (props: noLabel)" noLabel />
      </Column>
      <Column xs="12">
        <InputRangeDayPicker />
      </Column>
      <Column xs="12">
        <Switch label="Switchami" defaultvalue={false} color="darkGrey" coloractive="primary" />
      </Column>
    </Row>
    <Row>
      <Column xs="12">
        <Label
          weight="bold"
          value="Label con bgcolor='purple' "
          intlFormatter
          color="white"
          bgcolor="purple"
          size="f4"
        />
      </Column>
      <Column xs="12">
        <Label
          weight="bold"
          value="Carousel"
          intlFormatter
          color="white"
          bgcolor="blue"
          size="f4"
        />
      </Column>
      {/* <Carousel
        carouselItem={CarouselJson.carouselItem}
        height="60vh"
        dots="default"
        arrowbgcolor="primary"
        arrowcolor="white"
      /> */}
    </Row>
    <Row fluid>
      <Hr height="1px" widht="100%" color="primary" type="dotted" top="2px" bottom="5px" />
      <Badge
        radius="50%"
        size="20px"
        width="50px"
        height="50px"
        value="5"
        bgcolor="primary"
        color="white"
      />
      <Tabs defaultelement={2} colors={tabs.color} transform="uppercase" json={tabs.tab} />
      <Checkbox
        boxWidth="2rem"
        boxHeight="2rem"
        fontSize="f4"
        type="checkbox"
        defaultvalue={false}
        checkcolor="primary"
        label="cats"
        bordercolor="primary"
      />

      <Checkbox
        boxWidth="2rem"
        boxHeight="2rem"
        fontSize="f4"
        type="checkbox"
        defaultvalue={false}
        checkcolor="blue"
        label="dogs"
        bordercolor="primary"
      />

      <Switch label="ciao" defaultvalue={false} color="darkGrey" coloractive="primary" />
      <TablePagination
        pagenumber={1}
        numberitem={5}
        colonne={tablePagination.colonne}
        json={tablePagination.righe}
      />
      <Pagination currentPage={1} numberitem={5} json={tablePagination.righe} />
      {/* <Carousel carouselItem={CarouselJson.carouselItem} height="60vh" dots="default" /> */}
    </Row>
    <Row fluid>
      <div style={{width:"100%", textAlign: 'center', justifycontent:"center"}}>
        <Tooltip
          text="Hello Tool"
          textTT="Hi!"
          right
          color="white"
          bgcolor="primary" >
          <FaIcon icon='\f2fe' fontSize='f2' />
          </Tooltip>
  
        <Hr height="1px" widht="100%" color="primary" type="dotted" top="2px" bottom="5px" />
        <Badge
          radius="50%"
          size="20px"
          width="50px"
          height="50px"
          value="5"
          bgcolor="primary"
          color="white"
        />
        <Tabs defaultelement={2} colors={tabs.color} transform="uppercase" json={tabs.tab} />

        <Switch label="ciao" defaultvalue={false} color="darkGrey" coloractive="primary" />
        <TablePagination
          pagenumber={1}
          numberitem={5}
          colonne={tablePagination.colonne}
          json={tablePagination.righe}
        />
        <Pagination currentPage={1} numberitem={5} json={tablePagination.righe} />
        <HeaderTitle title="Breadcrumb.page" fontSize="f1" titleBold="Breadcrumb.page" />

        <Breadcrumbs value="Breadcrumb.page" />
      </div>
    </Row>
  </div>
);

const mapDispatchToProps = {
  graphqlRequest,
};
function mapStateToProps(state) {
  const { graphql } = state;
  const { contenutoPK, carrelloAll, carrelloPK, contenutoAll, dominioPK, error } = graphql;
  return {
    dominioPK,
    carrelloAll,
    carrelloPK,
    contenutoPK,
    contenutoAll,
    error,
  };
}
HomePage.displayName = 'HomePage';

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
