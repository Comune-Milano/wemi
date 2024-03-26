
import React, { useMemo, memo, useEffect, useState } from 'react';
import { Column, Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';
import { withRouter } from 'react-router';
import { TextAccordionControllable } from 'components/ui2/TextAccordion';

const SearchSpaziWeMi = withRouter(({
  selectedMunicipalityID,
  municipalitiesList,
  spaziWeMi,
  history,
}) => {
  // Redirects to the page of the provided wemi space.
  const redirectToSpazioWeMi = spazioWeMi => {
    history.push(`pinfsw/${spazioWeMi.idContenuto}`);
  };

  const [filteredSpaziWemi, setFilteredSpaziWemi] = useState([]);

  useEffect(
    () => {
      const newFilteredSpaziWeMi = spaziWeMi
        .filter(
          spazio => spazio.municipio.id === selectedMunicipalityID
        )
        .map((spazio, index) => ({
          spazio,
          visible: index === 0
        }));
      setFilteredSpaziWemi(newFilteredSpaziWeMi);
    },
    [spaziWeMi.data, selectedMunicipalityID]
  );

  // The name of selected municipality.
  const selectedMunicipalityName = useMemo(
    () => {
      const municipality = municipalitiesList.get(selectedMunicipalityID);
      return `Municipio ${municipality ? municipality.nome : ''}`;
    },
    [municipalitiesList, selectedMunicipalityID]
  );
  

  /**
   * Handles changes to the visibility of a wemi space.
   */
  const onChangeSpazioWeMiVisibility = (clikedSpaceVisibility, clickedIndex) => {
    const newFilteredSpaziWeMi = filteredSpaziWemi
      .map(({ spazio }, index) => ({
        spazio,
        visible: index === clickedIndex ? clikedSpaceVisibility : false,
      }));
    setFilteredSpaziWemi(newFilteredSpaziWeMi);
  };

  return (
    <Row>
      <Column xs="12" padding="0 0 1.4rem 0">
        <div style={{ letterSpacing: '0.05em' }}>
          <Text
            value="WeMi IN CITTÀ"
            color="blue"
            size="f3"
            weight="bold"
          />
        </div>
      </Column>
      <Column xs="12" padding="0">
        {
          filteredSpaziWemi.length > 0 ?
            (
              <>
                <Text
                  tag="div"
                  margin="0 auto 1.7rem 0"
                  padding="0 0 0.2rem 0"
                  borderBottom="1px solid"
                  lineHeight="1"
                  display="inline-block"
                  transform="uppercase"
                  letterSpacing="0.05em"
                  weight="bold"
                  value={selectedMunicipalityName}
                />
                {
                  filteredSpaziWemi.map(
                    ({spazio, visible}, index) => (
                      <TextAccordionControllable
                        color="blue"
                        labelTransform="uppercase"
                        key={spazio.idContenuto}
                        style={{ paddingBottom: '0.8rem' }}
                        label={`${spazio.indirizzo.specie} ${spazio.indirizzo.denominazione}`}
                        visibility={visible}
                        onVisible={(visible) => {
                          onChangeSpazioWeMiVisibility(visible, index);
                        }}
                      >
                        <Text
                          tag="span"
                          size="f3"
                          value="We"
                          lineHeight="1.2"
                        />
                        <Text
                          tag="span"
                          size="f3"
                          weight="bold"
                          value="Mi"
                          lineHeight="1.2"
                        />
                        <Text
                          tag="div"
                          size="f3"
                          padding="0 0 1rem 0"
                          lineHeight="1"
                          transform="uppercase"
                          letterSpacing="0.05em"
                          value={spazio.nome}
                        />
                        <Text
                          tag="div"
                          value={`
                            ${spazio.indirizzo.specie} 
                            ${spazio.indirizzo.denominazione}, 
                            ${spazio.indirizzo.nrCivico}
                          `}
                        />
                        <Text
                          tag="div"
                          value={spazio.descrizione}
                          whitespace="pre-line"
                        />
                        <Text
                          tag="div"
                          padding="0 0 1.4rem 0"
                          value={spazio.email}
                          transform="lowercase"
                        />
                        <Button
                          color="blue"
                          width="auto"
                          transform="initial"
                          padding="0.3rem 2.8rem 0.3rem 2rem"
                          margin="0 0 1.8rem 0"
                          label={`SCOPRI DI PIÙ SU WeMi ${spazio.nome.toUpperCase()}`}
                          onClick={() => redirectToSpazioWeMi(spazio)}
                        />
                      </TextAccordionControllable>
                    )
                  )
                }
              </>
            ) :
            (
              <Row maxWidth="23.75rem">
                <Text
                  tag="div"
                  value="spazi distribuiti in tutti i municipi"
                  transform="uppercase"
                  letterSpacing="0.05em"
                  display="inline-block"
                  weight="bold"
                  margin="0 auto 1.7rem 0"
                  padding="0 0 0.2rem 0"
                  borderBottom="1px solid"
                  lineHeight="1"
                />
                <Text
                  tag="div"
                  value={`
                    Gli Spazi WeMi sono gestiti da associazioni
                    e cooperative che collaborano con il Comune
                    di Milano e si trovano all'interno di luoghi
                    molto diversi tra loro.
                  `}
                />
                <Text
                  tag="div"
                  weight="semiBold"
                  value={`
                    Scopri dove sono navigando la mappa e visita
                    le pagine dedicate a ciascuno spazio.
                  `}
                />
              </Row>
            )
        }
      </Column>
    </Row>
  );
});

SearchSpaziWeMi.displayName = 'SearchSpaziWeMi';

const memoizedComponent = memo(SearchSpaziWeMi);
export { memoizedComponent as SearchSpaziWeMi };
