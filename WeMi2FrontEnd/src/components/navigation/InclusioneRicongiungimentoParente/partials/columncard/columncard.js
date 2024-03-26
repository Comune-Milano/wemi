import { HashLink as Link } from 'react-router-hash-link';
import Text from 'components/ui/Text';
import React from 'react';
import { Column } from 'components/ui/Grid';
import { StyledBox, Img } from '../components.style';

export const ColumnCard = ({ img, title, link }) => {

  return (

    <StyledBox
      role="group"
      aria-roledescription="slide"
    >
      <Link
        elementid="true"
        to={link}
        scroll={el => {
          window.scrollTo({ behavior: 'smooth', top: el.offsetTop });
        }}
      >
        <Img
          src={img}
          alt={title}
          width="auto"
        />
        <Column padding="0.5em 0 0 0">
          <Text
            size="f7"
            color="darkGrey"
            letterSpacing="0.05em"
            value={title}
            weight="normal"
            letterSpacing="0.05em"
          />
        </Column>
      </Link>
    </StyledBox>
  );
};

ColumnCard.displayName = 'HowItWorks - ColumnCard';
