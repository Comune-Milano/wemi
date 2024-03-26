
import React, { useState, useRef } from 'react';
import { HeaderImage } from 'components/ui2/HeaderImage';
import Loader from 'components/ui2/Loader';
import headerImage from 'images2/spazi-wemi/header-homepage-spazi-wemi.jpg';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { imageTitle, imageDescription } from './constants';
import {
  ElencoSpaziWeMi,
  AddressInput,
  SearchSpaziWeMi,
  MunicipalitiesMap,
} from './partials';

export const HomeSpaziWeMi = ({
  spaziWeMi,
  listaMunicipi,
}) => {
  // Keep track of selected municipality id.
  const [selectedMunicipalityID, setSelectedMunicipalityID] = useState();

  // The address typed by the user.
  const [address, setAddress] = useState('');
  // Keep track of last searched address.
  const lastSearchedAddress = useRef('');

  // Tells if the loading of data needed to bootstrap the component
  // is in progress or not.
  const isLoadingData = spaziWeMi.isLoading || listaMunicipi.isLoading;
  const isDataPristine = spaziWeMi.pristine || listaMunicipi.pristine;

  /**
   * Handles the click on a municipality point of the map.
   */
  const handleMunicipalityMapClick = municipalityID => {
    setSelectedMunicipalityID(municipalityID);

    // Resets the address typed by the user.
    setAddress('');
    lastSearchedAddress.current = '';
  };

  return (
    <>
      <HeaderImage
        imageSrc={headerImage}
        title={imageTitle}
        description={imageDescription}
        titleTransform="none"
      />
      { /** Body */ }
      <Row>
        <Column
          xs="12"
          md="7"
          padding="3rem 1rem 1rem"
          sizepadding={{ md: '4em 2em 4em 100px',
            xxl: '5.5em 0em 0em 7.5em',
            // xxxl: '18.5em 0em 0em 7.5em'
          }}
        >
          <MunicipalitiesMap
            municipalitiesList={listaMunicipi.data}
            onMunicipalityClick={handleMunicipalityMapClick}
            onSelectedMunicipalityClick={() => handleMunicipalityMapClick(undefined)}
            selectedMunicipalityID={selectedMunicipalityID}
          />
        </Column>
        <Column
          xs="12"
          md="5"
          padding="1rem 1rem 3rem"
          sizepadding={{ md: '4rem 80px 4em 0;' }}
        >
          <Row padding="0" margin="0">
            <Column
              xs="12"
              margin="0"
              padding="0 0 2rem 0"
              sizepadding={{
                md: '0 0 8rem 0',
                xxl: '1em 0em 5em 0em',
                // xxxl: '14em 0em 5em 0em',
              }}
            >
              <AddressInput
                onMunicipalityChange={setSelectedMunicipalityID}
                onAddressChange={setAddress}
                onSelectedAddress={value => { lastSearchedAddress.current = value; }}
                onClickOutside={() => setAddress(lastSearchedAddress.current)}
                address={address}
              />
            </Column>
            <Column
              padding="0"
              margin="0"
              xs="12"
            >
              <SearchSpaziWeMi
                spaziWeMi={spaziWeMi.data}
                municipalitiesList={listaMunicipi.data}
                selectedMunicipalityID={selectedMunicipalityID}
              />
            </Column>
          </Row>
        </Column>
      </Row>
      {
        (() => {
          if (isDataPristine) {
            return null;
          }

          if (isLoadingData) {
            return <Loader />;
          }

          if (!Array.isArray(spaziWeMi.data) || spaziWeMi.data.length === 0) {
            return (
              <Row padding="4rem 0">
                <Column xs="12">
                  <Text
                    tag="div"
                    align="center"
                    fontStyle="italic"
                    size="f5"
                    value="Non sono disponibili spazi WeMi."
                  />
                </Column>
              </Row>
            );
          }

          return (
            <>
              <ElencoSpaziWeMi spaziWeMi={spaziWeMi.data} />
            </>
          );
        })()
      }
    </>
  );
};

HomeSpaziWeMi.displayName = 'HomeSpaziWeMi';
