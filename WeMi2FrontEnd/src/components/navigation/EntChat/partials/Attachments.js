/** @format */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import { Row, Column } from 'components/ui/Grid';
import styled from 'styled-components';
import { colors } from 'theme';
import Text from 'components/ui/Text';
import AnchorLink from 'components/ui/AnchorLink';
import InputFile from 'components/ui/InputFile';
import Button from 'components/ui/Button';






const ChatSectionRow = styled(Row)`
  border-top: ${props => props.e ? `2px solid ${colors.blue}` : `2px solid ${colors.primary}`};
  border-bottom: ${props => props.e ? `0.5px solid ${colors.blue}` : `0.5px solid ${colors.primary}`};;
  margin-top: 1em;
 
`;

const Attachments = ({ getFiles, attached, admin, c, e, statoChat }) => {
  return (
    <ChatSectionRow fluid justifycontent="space-between" e={e} flex>
      <Column xs="12" md="7" padding="1em 0">
        <Row fluid >
          <Column xs="12" padding="0">
            <Text value="File allegati: " size="f7" padding="0 0.5em 0 0" color="blue" />
          </Column>
          {attached && attached.filename &&
            <Column xs="12" md="12" padding="0">

              <AnchorLink download={`${attached.base64}`} downloadName={attached.filename} >
                <Text weight="bold" value={`${attached.filename}`} size="f7" padding="0 0.5em 0 0" color="darkGrey" tag="p" />
              </AnchorLink>
            </Column>
          }
        </Row>
      </Column>
        <Column xs="6" xsShift="6" md="3" mdShift="1" flex alignitems="flex-end" direction="column"
          justifycontent="flex-end"
          padding="1em 0">

          {!admin && !c && e && <InputFile disabled={!statoChat} icon height="auto" width="100%" value="Allega File" onDone={getFiles.bind(this)}
            accept="application/pdf" fontSize="f7" />


          }
        </Column>
    </ChatSectionRow>
  );

}

Attachments.displayName = 'Attachments';
export default Attachments;
