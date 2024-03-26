import React from 'react';
import { Row } from 'components/ui/Grid';
import withRouter from 'react-router/withRouter';
import { PAGE_QUERY_SERVICES } from 'types/url';
import Grid from 'components/ui2/Grid';
import ButtonIconBox from 'components/ui2/ButtonIconBox';
import CardLoader from 'components/shared/CardLoader';
import { SEZIONI } from 'types/sezioni';

const OtherServicesButton = ({ data = {}, loading }) => (
  <>
    {loading ? (
      <Row fluid margin="0 0 2em 0">
        <Grid>
          <CardLoader margin="2em 0" />
          <CardLoader margin="2em 0" />
          <CardLoader margin="2em 0" />
          <CardLoader margin="2em 0" />
          <CardLoader margin="2em 0" />
        </Grid>
      </Row>
)
  : (
    <Row fluid margin="0 0 2em 0">
      <Grid
        spacing={{
          lg: '3em',
          md: '2em',
          xs: '2em',
        }}
      >
        {data.map((area) => {
          if (area.categorie) {
            return (
            area.categorie.map((el) => (
              <React.Fragment key={el.id}>
                <ButtonIconBox
                  alt={el.title}
                  maxWidth={{
                    xs: '11.66rem',
                    sm: '11.20rem',
                    md: '9rem',
                    lg: '10.94rem',
                  }}
                  title={el.title}
                  media={el.image.path}
                  link={`${PAGE_QUERY_SERVICES}?idCategoria=${el.id}&codSezione=${SEZIONI.ANNI_0_18}`}
                />
              </React.Fragment>
            )));
          }
          return null;
        })}
      </Grid>
    </Row>
  )}
  </>
);

OtherServicesButton.displayName = 'OtherServicesButton';
export default withRouter(OtherServicesButton);
