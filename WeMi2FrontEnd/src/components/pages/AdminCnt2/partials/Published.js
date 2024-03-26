import React from 'react';
import { Column, Row } from 'components/ui/Grid';
import { withRouter } from 'react-router';
import withAuthentication from 'hoc/withAuthentication';
import { Disable } from './buttons/Disable';
import { Modify } from './buttons/Modify';

const PublishedRow = ({
  typeContenuto,
  content,
  userProfile,
  getContenutoTyData,
}) => (
    <Row fluid padding="0" justifycontent="center" key={content.id_contenuto}>
      <Column xs="2" flex justifycontent="center" padding="1em 0" margin="0">
        <Disable
          content={content}
          userProfile={userProfile}
          typeContenuto={typeContenuto}
          getContenutoTyData={getContenutoTyData}
        />
      </Column>
      <Column xs="2" flex justifycontent="center" padding="1em 0" margin="0" >
        <Modify
          content={content}
          userProfile={userProfile}
          typeContenuto={typeContenuto}
        />
      </Column>
    </Row>
  );

export const Published = withRouter(withAuthentication(PublishedRow));