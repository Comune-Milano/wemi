
import React, { memo } from 'react';
import { Column, Row } from 'components/ui/Grid';
import styled from 'styled-components';
import { colors } from 'theme';
import Text from 'components/ui/Text';
import media from 'utils/media-queries';
import { Link } from 'react-router-dom';
import { getMunicipioBrandColor } from '../utils/utils';

const StyledWrapperRow = styled(Row)`
  background-color: ${colors.greyInput}

  ${media.sm`
    justify-content: flex-start;
  `}
  ${media.md`
    padding-left: 80px;
    padding-right: 80px;
  `};
`;

const StyledCircle = styled.div`
  border: 4px solid ${({ color }) => colors[color]};
  border-radius: 50%;
  background-color: transparent;
  display: inline-block;
  margin: 0.1rem 0.5rem 0 0;
  height: 14px;
  width: 14px;
`;

const StyledBoxSpazioWeMi = styled.div`
  display: inline-flex;
  align-items: stretch;
  justify-content: center;
  cursor: pointer;
  color: ${colors.black};

  ${media.sm`
    justify-content: flex-start;
  `}
`;

const ElencoSpaziWeMi = ({ spaziWeMi }) => {
  /**
   * Spazi wemi ordinati per municipio => è una sorta di
   * grouping nel senso che due o più spazi wemi afferenti
   * allo stesso municipio risulteranno adiacenti.
   */
  const sortedSpaziWeMi = spaziWeMi.sort(
    (spazioA, spazioB) => spazioA.nome.localeCompare(spazioB.nome)
  );

  return (
    <StyledWrapperRow padding="3rem 2.8rem 3em 2.8rem">
      <Column padding="0" margin="0">
        <Row padding="0" margin="0" maxWidth="86.25rem">
          {
            sortedSpaziWeMi.map(spazioWeMi => (
              <Column
                xs="12"
                sm="6"
                md="4"
                lg="3"
                key={spazioWeMi.idContenuto}
              >
                <Link to={`/pinfsw/${spazioWeMi.idContenuto}`}>
                  <StyledBoxSpazioWeMi>
                    <StyledCircle color={getMunicipioBrandColor(spazioWeMi.municipio.id)} />
                    <div>
                      <div>
                        <Text
                          tag="span"
                          weight="bold"
                          value="WeMi "
                        />
                        <Text
                          tag="span"
                          weight="bold"
                          transform="uppercase"
                          value={spazioWeMi.nome}
                          letterSpacing="0.05em"
                        />
                      </div>
                      <Text
                        tag="div"
                        value={`Municipio ${spazioWeMi.municipio.value}`}
                      />
                      <Text
                        tag="div"
                        value={`
                          ${spazioWeMi.indirizzo.specie} 
                          ${spazioWeMi.indirizzo.denominazione}, 
                          ${spazioWeMi.indirizzo.nrCivico}
                        `}
                      />
                      <Text
                        tag="div"
                        value={spazioWeMi.email}
                        transform="lowercase"
                      />
                    </div>
                  </StyledBoxSpazioWeMi>
                </Link>
              </Column>
            ))
          }
        </Row>
      </Column>
    </StyledWrapperRow>
  );
};

ElencoSpaziWeMi.displayName = 'ElencoSpaziWeMi';

const memoizedComponent = memo(ElencoSpaziWeMi);
export { memoizedComponent as ElencoSpaziWeMi };
