/** @format */

import React, { useState, useEffect } from 'react';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Label from 'components/ui/Label';
import Tooltip from 'components/ui/Tooltip';
import FaIcon from 'components/ui/FaIcon';
import Wrapper from 'components/navigation/NavigationWrapper';
import TextArea from 'components/ui/TextArea';
import Text from 'components/ui/Text';
import styled from 'styled-components';
import Button from 'components/ui/Button';
import { Row, Column } from 'components/ui/Grid';
import media from 'utils/media-queries';

import { graphqlRequest } from 'redux-modules/actions/authActions';
import { connect } from 'react-redux';
import {
  // estraiDatiRichiestaVoceMenu2 as estraiDatiRichiestaVoceMenu2Q,
  // InserisciDatiRichiestaVoceMenu2 as InserisciDatiRichiestaVoceMenu2Q,
} from 'components/navigation/ConfigurazioneRichiestaTCB/CuraDegliAnimali/curaAnimaliGraphql';

const MediaBtn = styled.div`
  max-width: 100%;

  ${media.md`
  max-width: 50%;
  ;
`}
  ${media.lg`
  max-width: 50%;
  ;
`}
`;

const RowCenter = styled(Row)`
  justify-content: center;
`;

const Container = styled.div`
  margin-left: 5em;
  margin-right: 20em;
`;

const DatiChiusura = ({estraiDatiRichiestaVoceMenu2, InserisciDatiRichiestaVoceMenu2, graphqlRequest, error, match}) => {
    
const [motivationNote, setNote] = useState({
    tx_motivo_chiusura_domanda: false,
  }); 

const aggiornaDati= dati => {
  let newNote = { ...motivationNote, [dati.target.id]: dati.target.value };
  setNote(newNote);
}

const buttonConferma = () => {
  let finalOBJ = {}
  
  finalOBJ['tx_motivo_chiusura_domanda'] = motivationNote['tx_motivo_chiusura_domanda']
}

useEffect(() => {}, []);


const BreadcrumbPath = [
  {
    slash: 'Home',
    url: 'homepage',
  },
  {
    slash: 'Dati operatore',
    url: '',
  },
  {
    slash: 'Dati di chiusura',
    url: '',
  },
]


  return (
    <div>
  <Wrapper>
    <Row>
        <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
    </Row>
    <Row fluid padding="20px">
        <Text size="f1" value="Chiusura" color="darkGrey" transform="uppercase" letterSpacing="0.05em" padding="0 0.5em 0 0" />
        <Text size="f1" value="domanda" color="darkGrey" transform="uppercase" letterSpacing="0.05em" weight="bold" padding="0 0.5em 0 0" />
    </Row>
    
    <Column xs="12" padding="1em 2em 0em 2em" >
      <Text value="In questa sezione ti chiediamo di indicarci le motivazioni per la chiusura della domanda." 
      size="f7" />   
    </Column>
    <Column xs="12" padding="1em 2em 0em 2em" >
      <Label
        value={"Per quali motivi vuole chiudere la domanda?"}
        width="auto"
        weight="bold"
        display="inline-flex"
        transform="uppercase"
        intlFormatter
        color="primary"
        bgcolor="grey"
        margin="0"
        size="f8"
      />
      <Tooltip
        right
        display="inline-flex"
        alignitems="center"
        padding="0 0 0 1em"
        width="12em"
        fontSize="f8"
        textTT={`Il lorem ipsum dolor sit amet dolor sit amet lorem.`}
        color="white"
        bgcolor="primary">
        <FaIcon
          radius="50%"
          icon="\f128"
          bgcolor="primary"
          color="white"
          fontSize="f7"
          height="2em"
          width="2em"
        />
      </Tooltip>
    </Column>
  </Wrapper>

  <Container>
      <Row divisions={12}>
        <Column lg={12} md={12} sm={12}>  
         <TextArea material width="100%"
           name="Note"
           id={'tx_motivo_chiusura_domanda'} onChange={aggiornaDati}
           value={estraiDatiRichiestaVoceMenu2 && estraiDatiRichiestaVoceMenu2.tx_nota} />
        </Column>
      </Row>

      <RowCenter divisions={12}>
        <MediaBtn>
          <Column xs="12" md="12" lg="12">
            <Button value="Conferma" onClick={buttonConferma} />
          </Column>
        </MediaBtn>
      </RowCenter>
      </Container>
    </div>
)};
 
const mapDispatchToProps = {
  graphqlRequest
};

function mapStateToProps(state) {
  const { graphql } = state;
  const { estraiDatiRichiestaVoceMenu2, InserisciDatiRichiestaVoceMenu2, error } = graphql;
  return {
    estraiDatiRichiestaVoceMenu2,
    InserisciDatiRichiestaVoceMenu2,
    error
  };
}

DatiChiusura.displayName = 'DatiChiusura';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatiChiusura);