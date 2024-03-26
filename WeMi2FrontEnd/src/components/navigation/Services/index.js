/** @format */

import React, {useRef, useEffect} from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import styled from 'styled-components';
import { ListaServizi } from 'mocks/ListaServizi';
import ServiceList from './ServiceList';
import media from 'utils/media-queries';

const MyColumn = styled(Column)`
  padding: 20px 0;
`;

const LeftSectionColumn = styled(Column)`
    padding: 1rem 0 0 0;
    ${media.md`
    padding: 0 1.5rem 1rem 0;
    
    `}
    ${media.lg`
    padding: 0 4rem 1rem 0;
    
    `}
`

const RightSectionColumn = styled(Column)`
    padding: 0;
    ${media.md`
    padding="1rem 0 0 1rem"
    
    `}
`




const Services = ({categorie, getRef}) => {

  
  const goToServices = useRef(null)

  useEffect(() => {
    getRef.bind(this)
    getRef(goToServices)
  }, [goToServices])

  return(
    <>
    <div ref={goToServices} className="scrollRef"  >
      <Row margin="1em 0">
  <LeftSectionColumn sm={12} md={4} lg={3} >
      <Text
        tag="h1"
        value={ListaServizi.TitoloServizi.label}
        weight={ListaServizi.TitoloServizi.weight}
        size="f3"
        intlFormatter
        padding="0 0.6rem 0 0"
      />
      <Text
        value={ListaServizi.TitoloBoldServizi.label}
        weight={ListaServizi.TitoloBoldServizi.weight}
        size="f3"
        color="primary"
        intlFormatter
        padding="0 0.6rem 0 0"
      />
      <Row fluid margin="1rem 0 0">
        <Text
          value={ListaServizi.SottotitoloServizi.label}
          weight={ListaServizi.SottotitoloServizi.weight}
          size="f7"
          intlFormatter
        />
      </Row>
      {/* <Sottotitolo>
        Qui puoi accedere con semplicità e rapidità a una grande quantità di servizi che ti
        permetteranno di trovare l&rsquo;aiuto che cerchi.
      </Sottotitolo> */}
    </LeftSectionColumn>
    <RightSectionColumn sm={12} md={8} lg="9"  >
      <ServiceList categorie={categorie} />
    </RightSectionColumn>
    
  </Row>
</div>
  </>
)
};

Services.displayName = 'Services';

export default Services;
