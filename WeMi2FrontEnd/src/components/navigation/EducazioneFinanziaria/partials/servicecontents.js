import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import withRouter from 'react-router/withRouter';
import { ColumnBorder } from 'components/shared/ColumnBorder';
import ButtonIconBox from 'components/ui2/ButtonIconBox';
import useWindowSize from 'hooks/useWindowSize';
import { BackgroundTitle } from 'components/ui2/BackgroundTitle';
import { serviceContents } from '../constants';

const ServiceContents = () => {
  const windowSize = useWindowSize();
  const isMobile = React.useMemo(() => ['xs', 'sm'].indexOf(windowSize) > -1, [windowSize]);

  return (
    <>
      <Row fluid sizepadding={{ xs: '3rem 0 0 0', md: '5rem 0 2rem 0' }}>
        <BackgroundTitle
          label="CONTENUTI DEL SERVIZIO"
          color="white"
          bgColor="purple"
          size="small"
        />
      </Row>
      <Row fluid justifycontent="center">
        {serviceContents.map((content, index) => (
          <Column xs="12" md="4" lg="4" key={content.title} justifycontent="center" sizepadding={{ xs: '0 1rem', md: '0 1.5rem', lg: '0 4.68rem', xl: '0 4.68rem' }}>
            <Row fluid justifycontent="center" padding={index > 2 || isMobile ? '4.17rem 0 0 0' : '0'}>
              <ButtonIconBox marginBottom="1.95rem" alt={content.title} link={content.link} media={content.image} />
            </Row>
            <Row fluid justifycontent="center">
              <Text
                size="f7"
                value={content.title}
                transform="uppercase"
                whitespace="pre-line"
                letterSpacing="0.05em"
                weight="normal"
                align="center"
                color="darkGrey"
              />
            </Row>
            <Row fluid flex alignitems="center" justifycontent="center">
              <ColumnBorder
                width="25%"
                margin={`${content.marginTop || '0.86rem'} 0 ${content.marginBottom || '0'} 0`}
                color="greyFooter"
                top
              />
            </Row>
            <Row fluid justifycontent="center" margin="0.86rem 0 0 0" sizemargin={{ xs: '0.92rem 0 0 0' }}>
              <Text
                size="f6"
                value={content.description}
                align="center"
                lineHeight="1.5"
                color="darkGrey"
              />
            </Row>
          </Column>
      ))}
      </Row>
    </>
  );
};

ServiceContents.displayName = 'ServiceContents';
export default withRouter(ServiceContents);
