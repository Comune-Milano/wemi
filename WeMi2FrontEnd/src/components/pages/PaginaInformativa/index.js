import React from 'react';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import { connect } from 'react-redux';
import Wrapper from 'components/navigation/NavigationWrapper';
import Text from 'components/ui/Text';
import media from 'utils/media-queries';
import { colors, fonts } from 'theme';
import { Row, Column } from 'components/ui/Grid';
import styled from 'styled-components';
import { convertFromRaw, EditorState } from 'draft-js';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { TextEditor } from 'components/ui2/TextEditor';
import AnchorLink from 'components/ui/AnchorLink';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { contenutoPK as contenutoPKQ } from './menu2livelloGraphQL';

const ImgWrapper = styled.div`
  height: 30.85vw;
  box-sizing: border-box;
`;

const ImgBackgroundContainer = styled.div`
  background-image: url(${props => props.src});
  background-size: contain;
  height: 100%;
  width: 100%;
  backface-visibility: hidden;
  background-position: top center;
  background-repeat: no-repeat;
  flex-direction: column;
  flex-flow: column;
  min-width: 100%;
  margin: 0;
  position: relative;
  padding: 0;
  display: flex;
  justify-content: flex-end;

  padding-bottom: 1em;
  padding-left: 2rem;

  ${media.sm`
    padding-bottom: 3em;
  `};

  ${media.md`
    background-size: cover;
    padding-left: 3.5vw;
    padding-bottom: 6em;
  `};

  ${media.lg`
    padding-left: 6vw;
  `};

  ${media.xxxxl`
    padding-left: 15vw;
  `};
`;

const StyledImageTitle = styled.div`
  > span {
    -webkit-box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
    display: inline-block;
    padding: 3px 10px;
    background-color: white;
    font-weight: 600;
    margin-top: 6px;
    letter-spacing: 7%;
    line-height: 1.9;
    font-size: ${fonts.size.f4};
    color: ${colors.orange};
  }
`;

const StyledImageSubtitle = styled.div`
  > span {
    -webkit-box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
    display: inline-block;
    padding: 6px 20px;
    font-weight: 600;
    background-color: grey;
    font-weight: semi-bold;
    letter-spacing: 7%;
    line-height: 1.9;
    font-size: ${fonts.size.f7};
    color: ${colors.white};
  }
`;


const PaginaInformativa = ({ match }) => {
  const { idCnt } = match.params;
 // Dati dello spazio WeMi derivante dalla remote call.
  const [contenuto] = useGraphQLRequest(
  undefined,
  contenutoPKQ(idCnt),
  {},
  true,
  res => res.contenutoMediaPK,
);

  const creaInnerHtml = (html) =>
     ({ __html: html }); // qui legge i dati dal db


  const sottotitolo = creaInnerHtml(contenuto.data?.tl_testo_3?.it);
  const titolo = creaInnerHtml(contenuto.data?.tl_testo_2?.it);
  const testoLiberoHTML = creaInnerHtml(contenuto.data?.tl_testo_5?.it);

  const textEditorContent = getObjectValue(contenuto.data, 'js_dati_contenuto.textEditorContent');

  const textEditorState = textEditorContent ? EditorState.createWithContent(convertFromRaw(textEditorContent)) : undefined;

  const renderTestoLibero = () => {
    if (textEditorContent) {
      return (
        <Column padding="0" margin="0">
          <TextEditor readOnly initialEditorState={textEditorState} />
        </Column>
      );
    }
    if (getObjectValue(testoLiberoHTML, '__html', undefined)) {
      return (
        <Text
          lg="6"
          xs="12"
          size="f6"
          width="100%"
          dangerouslySetInnerHTML={testoLiberoHTML}
        />
      );
    }
    return null;
  };
  renderTestoLibero.displayName = 'PaginaInformativa - renderTestoLibero';

  return (
    <>
      <ImgWrapper>
        <ImgBackgroundContainer src={contenuto.data?.oj_media1}>
          {
            getObjectValue(sottotitolo, '__html', undefined) ? (
              <StyledImageSubtitle>
                <span dangerouslySetInnerHTML={sottotitolo} />
              </StyledImageSubtitle>
            ) : null
          }
          {
            getObjectValue(titolo, '__html', undefined) ?
            (
              <StyledImageTitle>
                <span dangerouslySetInnerHTML={titolo} />
              </StyledImageTitle>
            ) :
            null
          }
        </ImgBackgroundContainer>
      </ImgWrapper>
      <Wrapper>
        <Row>
          {renderTestoLibero()}
        </Row>
        {contenuto.data?.id_media3 ?
          (
            <Row>
              <AnchorLink
                download={`${contenuto.data?.oj_media3}`}
                downloadName={contenuto.data?.nm_nome_media3}
              >
                <Text
                  value={contenuto.data?.nm_nome_media3}
                  size="f6"
                  color="blue"
                  padding="0.3rem 0"
                />
              </AnchorLink>
            </Row>
          )
          : null
        }
      </Wrapper>

    </>
  );
};

const mapDispatchToProps = {
  graphqlRequest,
};

function mapStateToProps(state) {
  const { graphql } = state;
  const { contenuto, error } = graphql;
  return {
    contenuto,
    error,
  };
}

PaginaInformativa.displayName = 'PaginaInformativa';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  PaginaInformativa
);
