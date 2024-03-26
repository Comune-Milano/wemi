/** @format */

import React, { useState } from 'react';
import styled from 'styled-components';
import media from 'utils/media-queries';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Hr from 'components/ui/Hr';
import Button from 'components/ui2/Button';
import NavLink from 'components/router/NavLink';
import { openLoginModal, resetField } from 'redux-modules/actions/authActions';
import SortResults from './SortResults';
import { colors } from 'theme';
import Filtri from './Filtri';
import { connect } from 'react-redux';
import AddressInput from './AddressInput';
import AnchorLink from 'components/ui/AnchorLink';
import FaIcon from 'components/ui2/FaIcon';

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
`;

const FiltriMobile = ({ enti, entiFiltrati, loaded, resetField, entiSelezionati, filtri, props }) => {
    const [showFilters, setShowFilters] = useState(false);
    const [showSortResults, setShowSortResults] = useState(false);

    const {
        checkValidity,
        setRedirect,
        addressInputRef,
        openCheckAddress,
        setOpenCheckAddress,
        SearchResultsJson,
        pathname
    } = props;

    return (
        <>
            <AddressInput
                addressInputRef={addressInputRef}
                openAddressModal={openCheckAddress}
                setOpenAddressModal={setOpenCheckAddress}
            />
            <SectionTitle fluid justifycontent="space-between" margin="0 0 2em">
                <Column
                    xs="5"
                    padding="0"
                >
                    <Text
                        weight="bold"
                        tag="h2"
                        value={entiSelezionati ? `${entiSelezionati.length === 1 ?
                            `${entiSelezionati.length} ente selezionato` :
                            `${entiSelezionati.length} enti selezionati`
                            }` : ''}
                        transform="uppercase"
                        letterSpacing="0.05em"
                        color="black"
                        size="f7"
                    />
                </Column>
                <Column
                    xs="4"
                    padding="0"
                >
                    <AnchorLink
                        to={null}
                        aria-label="Ordina i risultati"
                        tabIndex="0"
                        onClick={() => { setShowSortResults(!showSortResults); setShowFilters(false); }}
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
                            title={"Espandi 'Ordina i risultati'"}
                            color="primary"
                        />
                    </AnchorLink>
                </Column>
                <Column
                    xs="3"
                    padding="0"
                >
                    <AnchorLink
                        to={null}
                        aria-label="Filtra"
                        tabIndex="0"
                        onClick={() => { setShowFilters(!showFilters); setShowSortResults(false); }}
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
                            title={"Espandi i filtri"}
                            color="primary"
                        />
                    </AnchorLink>
                </Column>
            </SectionTitle>
            <>
                {
                    showFilters && entiFiltrati ?
                        <Filtri enti={enti} entiFiltrati={entiFiltrati} loaded={loaded} />
                        : null
                }
            </>
            <>
                {
                    showSortResults ?
                        <SortResults
                            props={SearchResultsJson.sort}
                        />
                        : null
                }
            </>
            <StyleRequestAvailabilityRow fluid margin="1em 0">
                    <Button
                        disabled={!entiSelezionati.length > 0}
                        fontSize="f6"
                        onClick={() => {
                            if (!filtri ||
                                (filtri && !filtri.municipio)) {
                                addressInputRef.current.focus();
                                setOpenCheckAddress(true);
                            };
                            if (checkValidity()) {
                                setRedirect(true);
                            }
                            resetField('ServizioBaseAdd')
                        }}
                        label="Richiedi informazioni e disponibilità"
                        color="blue"
                    />
            </StyleRequestAvailabilityRow>
        </>
    )
};

FiltriMobile.displayName = 'FiltriMobile';
function mapStateToProps(state) {
    const { user, datiLogin, graphql } = state;
    const { enti, filtri } = user;
    return {
        datiLogin: datiLogin,
        entiSelezionati: enti,
        filtri: filtri,
    };
};

const mapDispatchToProps = {
    openLoginModal,
    resetField,
};

export default connect(mapStateToProps, mapDispatchToProps)(FiltriMobile);