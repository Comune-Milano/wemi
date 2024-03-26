import React from "react";
import styled from "styled-components";
import { Row, Column } from "components/ui/Grid";
import { colors } from "theme";
import Text from "components/ui/Text";
import media from "utils/media-queries";

const StyledHeader = styled.div`
  padding: 3em 3em;
  min-height: 7em;
  background-color: ${colors.greyInput};

  h2 {
    padding-right: 4em;
  }

  ${media.md`
    padding: 3em 6em;

    h2 {
      padding-right: 0;
    }
  `}
`;

const DrawerHeaderCandidatureTcb = ({ data }) => {
  return (
    <StyledHeader>
      {data ? (
        <>
          <Row fluid>
            <Text
              tag="h2"
              value={"Identificativo Offerta "}
              color="green"
              weight="bold"
              transform="uppercase"
              letterSpacing="0.05em"
              size="f5"
            />
          </Row>
          <Row fluid>
            <Text
              tag="h2"
              value={`Di ${data.nome || ''} ${data.cognome || ''} iscritto il ${data.dataIscrizione || ''}`}
              color="black"
              weight="bold"
              transform="uppercase"
              letterSpacing="0.05em"
              size="f6"
            />
          </Row>
          <Row fluid>
            <Text
              tag="h2"
              value={`La candidatura è in stato ${data.statoCandidatura}`}
              color="black"
              weight="bold"
              transform="uppercase"
              letterSpacing="0.05em"
              size="f6"
            />
          </Row>
        </>
      ) : null}
    </StyledHeader>
  );
};

DrawerHeaderCandidatureTcb.displayName = "DrawerHeaderCandidatureTcb";
export default DrawerHeaderCandidatureTcb;
