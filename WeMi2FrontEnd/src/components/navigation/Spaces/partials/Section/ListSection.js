/** @format */

import React, { useState } from 'react';
import List from './List';
import { Row } from 'components/ui/Grid';
import Modal from '../Modal';
import Text from 'components/ui/Text';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import styled from 'styled-components';
import { connect } from 'react-redux';


const DivWrapper = styled(Row)`
  position: relative;
  
`;

const ListSection = ({ contenuto1, locale }) => {
  const [modal, setModal] = useState(false);
  const [indice, setIndice] = useState(0);

  const arrowModal = (indice) => {
    setIndice(indice);
  };

  const contenuto = contenuto1 ? contenuto1.contenutoSpazioSingoloWemi : undefined;
  return (
      <DivWrapper fluid flex direction="column" >
              { contenuto ?        
                contenuto.map((ele,i)=> (
                      <List
                        key="list"
                        value={ele.tl_testo_1[locale]}
                        onClick={() => {
                          arrowModal(i);
                          setModal(!modal);
                        }}
                        color="darkGrey"
                        size="f7"
                      />
                    ))
                 : ' ' } 
                  
    
    
       
    { contenuto &&
        <Modal
        open={modal}
        openModal={setModal}
        iconcolor="white"
        iconRadius="50%"
        iconBgColor="purple"
        iconBgColor2="green"
       changeValue={setIndice}
       
      value={indice}
      valueMax={contenuto.length}
      >
    <Text value={contenuto[indice]? contenuto[indice].tl_testo_1[locale]: ' '} size="f4" tag="h1" color="purple" weight="bold" />
     <Row fluid flex direction="column" padding="0 0 0.5rem">

     <Text value='Indirizzo email'size="f8" color="purple" weight="bold" />
     <Text value={contenuto[indice]?  contenuto[indice].tl_testo_2[locale]: ' '} size="f7" color="darkgrey" />

     <Text value='Indirizzo'size="f8" color="purple" weight="bold" />
     <Text value={contenuto[indice]?  contenuto[indice].tl_testo_3[locale]: ' '} size="f7" color="darkgrey" />

     <Text value='Descrizione'size="f8" color="purple" weight="bold" />
     <Text value={contenuto[indice]? contenuto[indice].tl_testo_5[locale]: ' '} size="f7" color="darkgrey" />


     
   </Row>
  
    </Modal> 
   }
    </DivWrapper>
  );
};

ListSection.displayName = 'ListSection';

const mapDispatchToProps = {
  graphqlRequest,

};

const mapStoreToProps = store => ({
  loaded: store.graphql.loaded,
  locale: store.locale,
  errorGraphQL: store.graphql.error,  
});

export default connect(
  mapStoreToProps,
  mapDispatchToProps,

)(ListSection);
