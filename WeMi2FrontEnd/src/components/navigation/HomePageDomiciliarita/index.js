import { HeaderImage } from 'components/ui2/HeaderImage';
import React, { useEffect, useRef } from 'react';
import headerImage from 'images2/slider1-02.jpg';
import { useNavHeight } from 'hooks/useNavHeight';
import withRouter from 'react-router/withRouter';
import { SEZIONI } from 'types/sezioni';
import { imageTitle, imageDescription } from './constants';
import ComeFunziona from './partials/comefunziona';
import Servizi018 from './partials/servizi018';
import { PageContainer } from './components.styled';
import ServicesDom from './partials/servicesDom';

const DomiciliaritaNavigation = ({ location }) => {
  const [hasRenderedAreas, setHasRenderedAreas] = React.useState(false);
  const [hasRenderedAreas018, setHasRenderedAreas018] = React.useState(false);

  const lastScrolledAnchor = useRef({ search: '', hash: '' });

  const navbarHeight = useNavHeight();

  useEffect(() => {
    const { hash, search } = location;

    if (
      !hash ||
      (lastScrolledAnchor.current.hash === hash && lastScrolledAnchor.current.search === search) ||
      !hasRenderedAreas || !hasRenderedAreas018
    ) {
      return;
    }
    const element = document.querySelector(hash);
    if (element) {
      const elPosition = element.offsetTop;
      window.scrollTo({
        top: elPosition - navbarHeight,
        behavior: 'smooth',
      });
      lastScrolledAnchor.current = { hash, search };
    }
  }, [location.hash, location.search, navbarHeight, hasRenderedAreas, hasRenderedAreas018]);

  return (
    <>
      <HeaderImage
        imageSrc={headerImage}
        title={imageTitle}
        descriptionSize="f6"
        titleBgColor="primary"
        margin={{
          xs: '0 2.8rem',
          md: '0 7.81rem',
        }}
        captionPadding={{
          xs: '27vw 0 0 0',
          md: '5rem 0',
          lg: '5rem 0',
          xxxxl: '5rem 0',
        }}
        description={imageDescription}
        letterSpacingDescription="0"
        titleTransform="none"
      />
      <PageContainer>
        <ComeFunziona />
        <ServicesDom
          paddingBottom="2rem"
          onHasRenderedAreas={() => setHasRenderedAreas(true)}
          codSezione={SEZIONI.DOMICILIARITA}
        />
        <Servizi018
          onHasRenderedAreas={() => setHasRenderedAreas018(true)}
        />
      </PageContainer>
    </>
  );
};

DomiciliaritaNavigation.displayName = 'DomiciliaritaNavigation';
export default withRouter(DomiciliaritaNavigation);
