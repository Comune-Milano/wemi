/** @format */

import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import styled from 'styled-components';
import Text from 'components/ui/Text';
import media from 'utils/media-queries';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import { connect } from 'react-redux';

const LeftSectionColumn = styled(Column)`
    padding: 1rem 0 0 0;
    ${media.md`
    padding: 1rem 1.5rem 1rem 0;
    
    `}
    ${media.lg`
    padding: 1rem 4rem 1rem 0;
    
    `}
`


const LeftSection = ({ contenuto, locale }) => {
  
return (
  <>
  {contenuto && contenuto.contenutoTestoSchedaIntrod && contenuto.contenutoTestoSchedaIntrod.map((item,index)=>(
  <LeftSectionColumn sm={12} md={4} lg={3} key={index.toString()}>
    <Row fluid>
    {item.tl_testo_1 &&<Text value={item.tl_testo_1[locale]} intlFormatter size="f2" weight="bold" padding="0 0.6rem 0 0" />}
       { item.tl_testo_2 && <Text value={item.tl_testo_2[locale]} intlFormatter size="f2" padding="0 0.6rem 0 0" />}
       
    </Row>
    <Row fluid margin="1rem 0 0">
    {item.tl_testo_3 && <Text
          value={item.tl_testo_3[locale]}
          intlFormatter
          size="f7"
        />}
    </Row>
  </LeftSectionColumn>
  ))}
  </>
)};

LeftSection.displayName = 'LeftSection';


const mapDispatchToProps = {
  graphqlRequest,
};

const mapStoreToProps = store => ({
  locale: store.locale,
  errorGraphQL: store.graphql.error,
});


export default connect(
mapStoreToProps,
mapDispatchToProps
)(
  LeftSection
);
