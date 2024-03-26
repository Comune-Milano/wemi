/** @format */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Column } from 'components/ui/Grid';
import { ResetEnti, AddFilter } from 'redux-modules/actions/authActions';
import FaIcon from 'components/ui2/FaIcon';
import Tooltip from 'components/ui2/Tooltip';
import InputMatch from 'components/ui2/InputMatch';
import { resetField, graphqlRequest } from 'redux-modules/actions/authActions';
import { isNullOrUndefined, isString } from 'util';
import { fonts } from 'theme';
import {
  getInputAddress as getInputAddressQ,
  getMunicipio as getMunicipioQ
} from './filterPartials/municipioGraphQL';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { useLogger } from 'services/Logger';

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
  ResetEnti,
  filtri,
  AddFilter,
  addressInputRef
}) => {

  /**
   * The logger to log what's happening in the filter by municipality
   */
  const logger = useLogger();
  
  const [selectedAddress, setSelectedAddress] = useState();
  const [indirizzoValue, setIndirizzoValue] = useState("");
  const [tooltipVisibility, setTooltipVisibility] = useState(false);

  /**
   * Hook to read the address to find the coordinates  
   */
  const [coordinates, getCoordinates] = useGraphQLRequest(
    undefined,
    getInputAddressQ
  );

  const matchAddress = !coordinates.isLoading && !coordinates.errored? coordinates.data : undefined;
  

  /**
   * Hook to read the address to find the coordinates  
   */
  const [municipality, getMunicipality] = useGraphQLRequest(
    undefined,
    getMunicipioQ
  );

  const municipio = !municipality.isLoading && !municipality.errored? municipality.data : undefined;
  


  const municipioFilter = value => {
    if (!isNullOrUndefined(value.cercaMunicipio)) {
      logger.log('Applico il filtro per municipio.')
      const municipioValore = filtri && filtri.municipio ? filtri.municipio :
        !isNullOrUndefined(value.cercaMunicipio) ?
          value.cercaMunicipio.idMunicipio : undefined;
      ResetEnti([]);
      if (municipioValore)
        AddFilter({
          ...filtri,
          municipio: municipioValore,
        });
    }
  };

  const findCoordinates = async (value) => {
    logger.log('Cerco indirizzo... (API)', value);
    await getCoordinates({address: value});
  };

  const findMunicipio = (value) => {
   getMunicipality({
        pointX: value.pointX,
        pointY: value.pointY
    });
    logger.log(`Cerco il municipio per questo: ${JSON.stringify(value)}`)
  };

  useEffect(() => {
    /**
     * Va in errore, per ora gestita con mock
     *  */
    if (selectedAddress) {
      findMunicipio(selectedAddress);
    };
  }, [selectedAddress]);

  useEffect(() => {
    if (municipio) {
      municipioFilter(municipio);
    };
  }, [municipio])

  const getSelectedAddress = (address) => {
    logger.log('Setto il valore di quello che hai selezionato per ricercare i municipi.', address,
      matchAddress.cercaVia.find((el, index) => {
        if (address.id === el.pointX + el.pointY)
          return {
            name: el.name.trim(),
            pointX: el.pointX,
            pointY: el.pointY
          }
      }));
    setIndirizzoValue(address.value);
    setSelectedAddress(matchAddress.cercaVia.find((el, index) => {
      if (address.id === el.pointX + el.pointY)
        return {
          name: el.name.trim(),
          pointX: el.pointX,
          pointY: el.pointY
        }
    }));
  };

  /**
   * Rende nuovamente modificabile l'input.
   */
  const resetAssocia = () => {
    setSelectedAddress(undefined);
  };

  return (
    <Column xs="12" md="6" padding="1em .5em 1em 0" sizepadding={{ lg: "1em 2em 1em 0" }}>
      <RelativeDiv>
        <form>
          <Tooltip
            position="bottom"
            fontSize="f8"
            color="white"
            bgcolor="blue"
            posAdjustment="10%"
            preventOnHover={tooltipVisibility}
            value="Per i servizi a domicilio, inserisci la via presso cui vuoi ricevere la prestazione e seleziona il numero civico dal menù a tendina">
            <InputMatch
              forwardRef={addressInputRef}
              minChar={3}
              color="primary"
              onChange={(value) => { setIndirizzoValue(value); }}
              clickedItem={(value) => { getSelectedAddress(value); }}
              clickedSelectedItem={() => { resetAssocia() }}
              removedItem={() => { resetAssocia(); }}
              matches={matchAddress &&
                matchAddress.cercaVia &&
                matchAddress.cercaVia.length > 0 ?
                matchAddress.cercaVia.map((el) => {
                  return {
                    id: el.pointX + el.pointY,
                    value: el.name,
                  }
                }) : undefined}
              label="Indirizzo"
              placeholder="Es.: via Sarpi Paolo"
              inputValue={indirizzoValue}
              onFocus={() => { 
                setSelectedAddress();
                setIndirizzoValue();
                AddFilter({
                  ...filtri,
                  municipio: undefined
                });
                setTooltipVisibility(true);
                coordinates.data = null;
              }}
              onBlur={() => setTooltipVisibility(false)}
            />
          </Tooltip>
          <button
            type="submit"
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              padding: 0,
            }}
            onClick={(event) => {
              event.preventDefault();
              if(isString(indirizzoValue) && indirizzoValue !== ''){
                findCoordinates(indirizzoValue.toLowerCase());
              }
              else{
                /**
                 * TODO dare errore frontend 
                 */
              }
            }
            }
          >
            <FaIcon
              fontSize="f7"
              icon="arrow-right"
              color="primary"
            />
          </button>
        </form>
      </RelativeDiv>
    </Column>
  );
};

AddressInput.displayName = 'AddressInput';

function mapStateToProps(state) {
  const { user } = state;
  const { array } = user;
  return {
    array,
    enti: state.graphql.array,
    filtri: state.user.filtri,
    loaded: state.graphql.loaded,
    MunicipioSelezionato: state.graphql.MunicipioSelezionato,
    matchAddress: state.graphql.InputAddress,
  };
}
const mapDispatchToProps = {
  ResetEnti,
  AddFilter,
  graphqlRequest,
  resetField
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddressInput);
