/** @format */
import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import FaIcon from 'components/ui2/FaIcon';
import InputMatch from 'components/ui2/InputMatch';
import { Row, Column } from 'components/ui/Grid';
import { colors } from 'theme';
import media from 'utils/media-queries';
import { PAGE_QUERY_SERVICES } from 'types/url';
import { noop } from 'utils/functions/noop';
import { BackgroundTitle, bgTitleSizes } from 'components/ui2/BackgroundTitle';
import Wrapper from './Wrapper';

const StyledWrapper = styled(Wrapper)`
  background-color: ${colors.greyInput};
  margin-top: 5rem;
  margin-bottom: 0;
  padding-top: 2.5rem;
  padding-bottom: 2.5rem !important;
  min-height: 3rem;
  overflow: visible;

  form label {
    padding-top: 0px;
  }

  ${media.md`
    margin-top: 0;
  `};

  input {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const StyledButtonIcon = styled.button`
  border: none;
  background-color: transparent;
  padding: 0;
  position: absolute;
  right: 1em;
  top: 1.4em;
  outline: none;

  div.fa-3x {
    display: flex;
  }
`;

const Searchbox = ({
  input,
  onInputChange,
  onInputReset,
  minSearchChars = 3,
  data,
  dataLoading,
  history,
}) => {
  const path = `${PAGE_QUERY_SERVICES}?`;
  const handleInputChange = React.useCallback(
    (value) => {
      if (value.length >= minSearchChars) {
        onInputChange(value);
      } else {
        onInputReset(value);
      }
    }
  );

  return (
    <StyledWrapper paddingTop="2.5rem">
      <Row margin="0" alignitems="flex-start">
        <Column xs="12" md="4" padding="0">
          <BackgroundTitle
            label="Cosa stai cercando?"
            bgColor="red"
            size={bgTitleSizes.small}
          />
        </Column>
        <Column xs="12" md="8" padding="1em 0 0 0" sizepadding={{ md: '0 0 0 3em' }}>
          <form style={{ position: 'relative' }} onSubmit={(event) => event.preventDefault()}>
            <InputMatch
              id="searchbox"
              minChar={1}
              color="darkGrey"
              hoverColor=""
              onChange={handleInputChange}
              matches={data.map((value, index) => ({
                id: index,
                value,
              }))}
              clickedItem={(el) => {
                history.push(
                `${path}tag=${el.value}`,
                  {
                    isFromHomeSearch: true,
                  }
);
              }}
              label={null}
              placeholder="Inserisci una parola e seleziona il servizio dalla tendina"
              inputValue={input}
              bgColor="white"
              onFocus={noop}
              padding="10px 30px 10px 13px"
            />
            <StyledButtonIcon
              type="submit"
              aria-hidden="true"
              tabIndex="-1"
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                padding: 0,
                position: 'absolute',
                right: '1em',
                top: '1em',
                outline: 'none',
              }}
            >
              {
                dataLoading ?
                  (
                    <div className="fa-3x">
                      <FaIcon
                        fontSize="f5"
                        icon="spinner"
                        customClasses="fa-pulse"
                        color="darkGrey"
                      />
                    </div>
                  ) :
                  (
                    <FaIcon
                      fontSize="f5"
                      icon="search fa-flip-horizontal"
                      color="darkGrey"
                    />
                  )
              }
            </StyledButtonIcon>
          </form>
        </Column>
      </Row>
    </StyledWrapper>
  );
};

Searchbox.displayName = 'Searchbox';

export default withRouter(Searchbox);
