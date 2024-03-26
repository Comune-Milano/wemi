import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import withRouter from 'react-router/withRouter';
import { ColumnBorder } from 'components/shared/ColumnBorder';
import { PAGE_QUERY_SERVICES } from 'types/url';
import ButtonIconBox from 'components/ui2/ButtonIconBox';
import CardLoader from 'components/shared/CardLoader';
import { SEZIONI } from 'types/sezioni';
import useWindowSize from 'hooks/useWindowSize';

const ServicesButton = ({ loading, data = [] }) => {
  const windowSize = useWindowSize();
  const isMobileScreen = ['xs', 'sm', 'xxl'].indexOf(windowSize) > -1;
  return (
    <>
      {!loading ? (
      data.map((area) => {
        if (area.categorie) {
          return (
            area.categorie.map((categoria, index) => (
              <React.Fragment key={categoria.id}>
                <Column xs="12" md="4" lg="4" justifycontent="center" sizepadding={{ xs: '0 1rem', md: '0 1.5rem', lg: '0 4.68rem', xl: '0 4.68rem' }}>
                  <Row fluid justifycontent="center" padding={index > 2 || isMobileScreen ? '4.17rem 0 0 0' : '0'}>
                    <ButtonIconBox
                      marginBottom="1.95rem"
                      isOnly018
                      maxWidth={{
                        lg: '10.94rem',
                        md: '11.20rem',
                        sm: '11.20rem',
                        xs: '11.67rem',
                      }}
                      alt={categoria.title}
                      link={`${PAGE_QUERY_SERVICES}?idCategoria=${categoria.id}&codSezione=${SEZIONI.ANNI_0_18}`}
                      media={categoria.image.path}
                    />
                  </Row>
                  <Row fluid justifycontent="center">
                    <Text
                      size="f7"
                      value={categoria.title}
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
                      margin={`${categoria.marginTop || '0.86rem'} 0 ${categoria.marginBottom || '0'} 0`}
                      color="greyFooter"
                      top
                    />
                  </Row>
                  <Row fluid justifycontent="center" margin="0.86rem 0 0 0" sizemargin={{ xs: '0.92rem 0 0 0' }}>
                    <Text
                      size="f6"
                      value={categoria.description}
                      align="center"
                      color="darkGrey"
                    />
                  </Row>
                </Column>
              </React.Fragment>
            )));
        }
        return null;
      }))
      :
         (
           <>
             <React.Fragment>
               <Column xs="12" md="4" lg="4" flex justifycontent="center" sizepadding={{ xs: '1rem', md: '1rem', lg: '1rem', xl: '1rem' }}>
                 <CardLoader
                   margin="2em 0"
                   description
                   width="55%"
                   padding="0 2em 0 2em"
                 />
               </Column>
             </React.Fragment>
             <React.Fragment>
               <Column xs="12" md="4" lg="4" flex justifycontent="center" sizepadding={{ xs: '1rem', md: '1rem', lg: '1rem', xl: '1rem' }}>
                 <CardLoader
                   margin="2em 0"
                   description
                   width="55%"
                   padding="0 2em 0 2em"
                 />
               </Column>
             </React.Fragment>
             <React.Fragment>
               <Column xs="12" md="4" lg="4" flex justifycontent="center" sizepadding={{ xs: '1rem', md: '1rem', lg: '1rem', xl: '1rem' }}>
                 <CardLoader
                   margin="2em 0"
                   description
                   width="55%"
                   padding="0 2em 0 2em"
                 />
               </Column>
             </React.Fragment>
           </>
           )}
    </>
  );
};

ServicesButton.displayName = 'ServicesButton';
export default withRouter(ServicesButton);
