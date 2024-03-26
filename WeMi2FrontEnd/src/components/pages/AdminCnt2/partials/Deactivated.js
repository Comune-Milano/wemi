import React from 'react';
import { Column, Row } from 'components/ui/Grid';
import { withRouter } from 'react-router';
import withAuthentication from 'hoc/withAuthentication';
import { Publish } from './buttons/Publish';
import { Modify } from './buttons/Modify';

const DeactivatedRow = ({
  contents,
  typeContenuto,
  content,
  userProfile,
  getContenutoTyData,
}) => (
    <Row fluid padding="0" justifycontent="center" key={content.id_contenuto}>
      <Publish
        content={content}
        userProfile={userProfile}
        typeContenuto={typeContenuto}
        contents={contents}
        getContenutoTyData={getContenutoTyData}
      />
      <Column xs="2" flex justifycontent="center" padding="1em 0" margin="0" >
        <Modify
          content={content}
          userProfile={userProfile}
          typeContenuto={typeContenuto}
        />
      </Column>
    </Row>
  );

export const Deactivated = withRouter(withAuthentication(DeactivatedRow));