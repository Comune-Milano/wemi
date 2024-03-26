import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Hr from 'components/ui/Hr';
import withRouter from 'react-router/withRouter';
import { WrapperImmagineCategoria, ImmagineCategoria } from './categoriabutton.styled';
import { ColumnBorder } from 'components/shared/ColumnBorder';

const CategoriaButton = ({ element = {} }) => (
  <Column xs="12" md="6" lg="6" justifycontent="center" sizepadding={{ md: '1rem 1.5rem', lg: '1rem 2rem' }}>
    <Row fluid justifycontent="center">
      <WrapperImmagineCategoria
        to={element.link}
        aria-label={element.title}
      >
        <ImmagineCategoria
          alt={element.title}
          src={element.image}
          width="60%"
          height="60%"
        />
      </WrapperImmagineCategoria>
    </Row>
    <Row fluid justifycontent="center">
      <Text
        size="f7"
        value={element.title}
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
        margin={`${element.marginTop || '1em'} 0 ${element.marginBottom || '0'} 0`}
        color="greyFooter"
        top
      />
    </Row>
    <Row fluid justifycontent="center" margin="3em 0 0 0">
      <Text
        size="f6"
        value={element.description}
        align="center"
        color="darkGrey"
      />
    </Row>
  </Column>
);

CategoriaButton.displayName = 'CategoriaButton';
export default withRouter(CategoriaButton);
