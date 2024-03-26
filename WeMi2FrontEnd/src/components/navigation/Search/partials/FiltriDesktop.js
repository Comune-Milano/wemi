/** @format */

import React from 'react';
import styled from 'styled-components';
import media from 'utils/media-queries';
import { colors } from 'theme';
import { connect } from 'react-redux';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';
import { openLoginModal, resetField } from 'redux-modules/actions/authActions';
import SortResults from './SortResults';
import AddressInput from './AddressInput';

const SectionTitle = styled(Row)`
  min-height: 3em;
  border-bottom: 2px solid ${colors.darkGrey};
  margin-bottom: 1.1rem;
  padding-bottom: 1.1rem;

  a {
    margin-top: 1em;
    display: block;
  }
  ${media.md`
    a {
      margin: 0;
    display: inline;
    }
  `}
`;

const FiltriDesktop = ({ enti, loaded, datiLogin, resetField, entiSelezionati, filtri, props }) => {

    const {
        redirect,
        setRedirect,
        checkValidity,
        addressInputRef,
        openCheckAddress,
        setOpenCheckAddress,
        SearchResultsJson,
        pathname
    } = props;

    return (
        <>
            <SectionTitle fluid justifycontent="space-between" alignitems="center">
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
                    size="f6"
                />
                <Button
                    autowidth
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
                        resetField('ServizioBaseAdd');
                    }}
                    label="Richiedi informazioni e disponibilità"
                    color="blue"
                />
            </SectionTitle>
            <Row fluid justifycontent="space-between">
                <AddressInput
                    addressInputRef={addressInputRef}
                    openAddressModal={openCheckAddress}
                    setOpenAddressModal={setOpenCheckAddress}
                />
                <SortResults
                    props={SearchResultsJson.sort}
                />
            </Row>
        </>
    )
};

FiltriDesktop.displayName = 'FiltriDesktop';
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
    resetField
};

export default connect(mapStateToProps, mapDispatchToProps)(FiltriDesktop);