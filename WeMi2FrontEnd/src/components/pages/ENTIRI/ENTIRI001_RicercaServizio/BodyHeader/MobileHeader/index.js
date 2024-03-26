import React from 'react';
import styled from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';
import SortResults from '../SortResults';
import { colors } from 'theme';
import AnchorLink from 'components/ui/AnchorLink';
import FaIcon from 'components/ui2/FaIcon';
import { useNavHeight } from 'hooks/useNavHeight';

const SectionTitle = styled(Row)`
  min-height: 2.5em;
  a {
      display: flex;
      align-items: center;
  }
  > div {
      display: flex;
      align-items: center;
      justify-content: center;
    border-right: 2px solid ${colors.grey};
    &:first-child {
      justify-content: space-between;
    }
      &:last-child {
      justify-content: flex-end;
          border-right: none;
      }
  }
`;

const StyleRequestAvailabilityRow = styled(Row)`
  margin-bottom: 1em;
  padding-bottom: 1.5em;
  border-bottom: 2px solid ${colors.darkGrey};
  background-color: white;
  position: sticky;
  z-index: 1;
  top: ${({ top }) => top}px;
`;

const MobileHeader = ({
  numeroEntiSelezionati,
  filtri,
  filtriHeader,
  handleSingleFilter,
  indirizzo,
  setIndirizzo,
  openModal,
  handleForward,
}) => {
  const [showOrderBy, setShowOrderBy] = React.useState(false);
  const [showFilters, setShowFilters] = React.useState(false);

  const navHeight = useNavHeight();

  return (
    <>
      <SectionTitle fluid justifycontent="space-between" margin="0 0 2em">
        <Column
          xs="5"
          padding="0"
        >
          <Text
            weight="bold"
            tag="h2"
            value={`${numeroEntiSelezionati} ${numeroEntiSelezionati === 1 ? 'ente selezionato' : 'enti selezionati'}`}
            transform="uppercase"
            letterSpacing="0.05em"
            color="black"
            size="f7"
          />
        </Column>
        <Column xs="4" padding="0">
          <AnchorLink
            to={null}
            aria-label="Clicca per modificare l'ordine degli enti che soddisfano la richiesta"
            tabIndex="0"
            onClick={() => { setShowOrderBy(!showOrderBy); setShowFilters(false); }}
          >
            <Text
              size="f7"
              value="Ordina per"
              weight="bold"
              transform="uppercase"
              letterSpacing="0.05em"
              padding="0 .5em 0 0"
            />
            <FaIcon
              icon="angle-down"
              fontSize="f6"
              title="Espandi 'Ordina i risultati'"
              color="primary"
            />
          </AnchorLink>
        </Column>
        <Column xs="3" padding="0">
          <AnchorLink
            to={null}
            aria-label="Clicca per personalizzare la richiesta"
            tabIndex="0"
            onClick={() => { setShowFilters(!showFilters); setShowOrderBy(false); }}
          >
            <Text
              size="f7"
              value="Filtra"
              weight="bold"
              transform="uppercase"
              letterSpacing="0.05em"
              padding="0 .5em 0 0"
            />
            <FaIcon
              icon="angle-down"
              fontSize="f6"
              title="Espandi i filtri"
              color="primary"
            />
          </AnchorLink>
        </Column>
      </SectionTitle>
      <>
        {
          showFilters ? filtri : null
        }
      </>
      <>
        {
          showOrderBy ?
            (
              <SortResults
                handleValue={(value) => handleSingleFilter('orderBy', value)}
                value={filtriHeader.orderBy}
              />
            )
            : null
        }
      </>
      <StyleRequestAvailabilityRow fluid margin="1em 0" top={navHeight || 0}>
        <Button
          disabled={numeroEntiSelezionati === 0}
          fontSize="f6"
          onClick={() => {
            if (!indirizzo) {
              openModal();
            } else {
              handleForward();
            }
          }}
          label="Richiedi informazioni e disponibilità"
          color="blue"
        />
      </StyleRequestAvailabilityRow>
    </>
  )
};

MobileHeader.displayName = 'Mobile header';

export default MobileHeader;