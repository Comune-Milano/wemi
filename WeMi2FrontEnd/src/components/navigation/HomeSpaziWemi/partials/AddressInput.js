import React, { useState, useRef, memo } from 'react';
import styled from 'styled-components';
import FaIcon from 'components/ui2/FaIcon';
import InputMatch from 'components/ui2/InputMatch';
import { fonts } from 'theme';
import { noop } from 'utils/functions/noop';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import Tooltip from 'components/ui2/Tooltip';
import { useClickOutside } from 'hooks/useClickOutside';
import Text from 'components/ui/Text';
import {
  getInputAddress as getInputAddressQ,
  getMunicipio as getMunicipioQ,
} from '../graphql/requests';
import { MIN_ADDRESS_CHARS, RESULT_LIMIT_MUNICIPALITY } from '../constants';
import { mapAddressCordinatesResponse } from '../graphql/mappers';

const RelativeDiv = styled.div`
  position: relative;
  width: 100%;
  max-width: 26.875rem;

  form {
    > div {
      &:first-child {
        width: 100%;
      }
    }
  };

  i {
    position: absolute;
    right: 1em;
    top: calc((100% - ${fonts.size.f7}) / 1.9);
  }
`;

const AddressInput = ({
  onMunicipalityChange,
  onAddressChange,
  onSelectedAddress,
  address,
  onClickOutside,
}) => {
  const [dataLoading, setDataLoading] = useState(false);
  const [matchedAddress, setMatchedAddress] = useState([]);
  const [limitError, setLimitError] = useState('');
  const inputRef = useRef();

  /**
   * Hook to read the address to find the coordinates.
   */
  const getCoordinates = useStatelessGraphQLRequest(
    getInputAddressQ,
    null,
    mapAddressCordinatesResponse,
    undefined,
    true
  );

  /**
   * Hook to read the address to find the coordinates.
   */
  const getMunicipality = useStatelessGraphQLRequest(getMunicipioQ);

  /**
   * Handles the address search by finding the coordinates
   * bound to the selected address.
   */
  const handleSearch = event => {
    event.preventDefault();
    event.stopPropagation();

    if (address) {
      setDataLoading(true);
      getCoordinates({ address, resultLimit: RESULT_LIMIT_MUNICIPALITY })
        .then(res => {
          if (res) {
            setMatchedAddress(res);
          }
        })
        .catch(() => setLimitError('Testo troppo generico, affina la ricerca'))
        .finally(() => {
          setDataLoading(false);
          inputRef.current.focus();
        });
    } else {
      onMunicipalityChange(undefined);
      inputRef.current.focus();
    }
  };

  /**
   * Handles the click on an address item.
   */
  const handleItemClick = async (item) => {
    onAddressChange(item.value);
    setMatchedAddress([]);
    setDataLoading(true);

    getMunicipality({
      ...item.coordinates,
    })
      .then(res => {
        onMunicipalityChange(res.idMunicipio);
        onSelectedAddress(item.value);
      })
      .finally(() => setDataLoading(false));
  };

  /**
   * Handles changes to the input field.
   */
  const onInputChange = value => {
    setLimitError('');
    setMatchedAddress([]);
    onAddressChange(value);
    //Se abbiamo selezinato un indirizzo e cancelliamo il campo il filtro municipio viene resettato
    if(!value){
      onMunicipalityChange(null);
    }
  };

  /**
   * Handles the click outside of the input match element.
   */
  const handleClickOutside = () => {
    setLimitError('');
    setMatchedAddress([]);
    onClickOutside();
  };

  const checkDisabled = () => {
    if (!address) {
      return true;
    }
    if (!address.trim()) {
      return true;
    }
    if (address.trim().length < MIN_ADDRESS_CHARS) {
      return true;
    }
    return false;
  };


  return (
    <>
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
            position="bottom"
            fontSize="f8"
            color="white"
            bgcolor="blue"
            posAdjustment="10%"
            value="Inserisci il nome della tua via e seleziona il numero civico dal menù a tendina."
          >
            <InputMatch
              minChar={MIN_ADDRESS_CHARS}
              forwardRef={inputRef}
              color={limitError ? 'red' : 'primary'}
              onChange={onInputChange}
              clickedItem={handleItemClick}
              clickedSelectedItem={noop}
              removedItem={noop}
              matches={matchedAddress}
              loadingMatches={dataLoading}
              label="Scopri gli spazi attivi nel tuo municipio"
              placeholder="Es.: via Sarpi Paolo"
              inputValue={address}
              disabled={dataLoading}
              bgHoverColor="none"
            />
          </Tooltip>
          <button
            type="submit"
            disabled={checkDisabled()}
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
    </>
  );
};

AddressInput.displayName = 'AddressInput';

const memoizedComponent = memo(AddressInput);
export { memoizedComponent as AddressInput };
