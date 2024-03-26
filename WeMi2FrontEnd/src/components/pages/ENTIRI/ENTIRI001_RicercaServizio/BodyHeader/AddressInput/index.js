import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Column } from 'components/ui/Grid';
import FaIcon from 'components/ui2/FaIcon';
import Tooltip from 'components/ui2/Tooltip';
import InputMatch from 'components/ui2/InputMatch';
import { fonts } from 'theme';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import Text from 'components/ui/Text';
import { noop } from 'utils/functions/noop';
import { useClickOutside } from 'hooks/useClickOutside';
import {
  getInputAddress as getInputAddressQ,
  getMunicipio as getMunicipioQ,
} from './AddressInputGraphQL';
import { RESULT_LIMIT_MUNICIPALITY, MIN_LENGTH_SEARCH } from './constants';

const RelativeDiv = styled.div`
position: relative;
form {
> div {
  &:first-child {
    width: 100%;
  }
}
};
width: 100%;
i {
  position: absolute;
  right: 1em;
  top: calc((100% - ${fonts.size.f7}) / 1.9);
}
`;

const AddressInput = ({
  handleValue,
  indirizzoValue,
  setIndirizzoValue,
  addressInputRef,
}) => {
  const [indirizzo, setIndirizzo] = useState(indirizzoValue);
  const [limitError, setLimitError] = useState('');
  const lastFilteredAddress = useRef(indirizzoValue);

  const [dataLoading, setDataLoading] = useState(false);
  const [matchedAddress, setMatchedAddress] = useState([]);

  /**
   * Hook to read the address to find the coordinates.
   */
  const getCoordinates = useStatelessGraphQLRequest(
    getInputAddressQ,
    {},
    response => response.map(el => ({
      id: `${el.pointX}-${el.pointY}`,
      value: el.name,
      coordinates: {
        pointX: el.pointX,
        pointY: el.pointY,
      },
    })),
    undefined,
    true
  );

  /**
   * Hook to read the address to find the coordinates.
   */
  const getMunicipality = useStatelessGraphQLRequest(
    getMunicipioQ
  );

  const handleSearch = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (indirizzo) {
      setDataLoading(true);
      getCoordinates({ address: indirizzo, resultLimit: RESULT_LIMIT_MUNICIPALITY })
        .then(res => {
          if (res) {
            setMatchedAddress(res);
            addressInputRef.current.focus();
          }
        })
        .catch(() => setLimitError('Testo troppo generico, affina la ricerca'))
        .finally(() => {
          setDataLoading(false);
        });
    } else {
      setIndirizzoValue('');
      setIndirizzo('');
      handleValue(null);
    }
  };

  const onInputChange = value => {
    setLimitError('');
    setMatchedAddress([]);
    setIndirizzo(value);
    // Se abbiamo selezinato un indirizzo e cancelliamo il campo il filtro municipio viene resettato
    if (!value && lastFilteredAddress.current) {
      handleValue(null);
    }
  };

  const handleItemClick = async(item) => {
    setIndirizzoValue(item.value);
    setIndirizzo(item.value);

    getMunicipality({ ...item.coordinates })
      .then(result => {
        lastFilteredAddress.current = item.value;
        handleValue(result ? result.idMunicipio : undefined);
      });
  };

  const checkDisabled = () => {
    if (!indirizzo) {
      return true;
    }
    if (!indirizzo.trim()) {
      return true;
    }
    if (indirizzo.trim().length < MIN_LENGTH_SEARCH) {
      return true;
    }
    return false;
  };

  return (
    <>
      <Column xs="12" padding="0">
        <Text
          tag="h3"
          transform="uppercase"
          letterSpacing="0.05em"
          value="indirizzo"
        />
      </Column>
      <Column
        xs="12"
        padding="0.5em 0 1em"
      >
        {limitError ? (
          <Text
            fontSize="f7"
            color="red"
            tag="p"
            value={limitError}
          />
        )
          : null}
        <RelativeDiv >

          <form onSubmit={handleSearch}>
            <Tooltip
              id="address-label"
              position="bottom"
              fontSize="f8"
              color="white"
              bgcolor="blue"
              posAdjustment="10%"
              preventOnHover={matchedAddress.length > 0}
              value="Per i servizi a domicilio, inserisci la via presso cui vuoi ricevere la prestazione e seleziona il numero civico dal menù a tendina"
            >
              <InputMatch
                aria-labelledby="address-label"
                forwardRef={addressInputRef}
                minChar={MIN_LENGTH_SEARCH}
                color={limitError ? 'red' : 'primary'}
                onChange={onInputChange}
                clickedItem={handleItemClick}
                clickedSelectedItem={noop}
                removedItem={noop}
                matches={matchedAddress}
                loadingMatches={dataLoading}
                placeholder="Es.: via Sarpi Paolo"
                inputValue={indirizzo}
                disabled={dataLoading}
                bgHoverColor="none"
              />
            </Tooltip>
            <button
              disabled={checkDisabled()}
              type="submit"
              aria-label="Pulsante cerca indirizzo"
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                padding: 0,
              }}
              onMouseDown={event => event.preventDefault()}
            >
              {
                dataLoading ?
                  (
                    <div className="fa-3x">
                      <FaIcon
                        fontSize="f7"
                        icon="spinner"
                        customClasses="fa-pulse"
                        color="primary"
                      />
                    </div>
                  ) :
                  (
                    <FaIcon
                      fontSize="f7"
                      icon="arrow-right"
                      color={limitError ? 'red' : 'primary'}
                    />
                  )
              }
            </button>
          </form>
        </RelativeDiv>
      </Column>
    </>
  );
};

AddressInput.displayName = 'AddressInput';

export default React.memo(AddressInput);
