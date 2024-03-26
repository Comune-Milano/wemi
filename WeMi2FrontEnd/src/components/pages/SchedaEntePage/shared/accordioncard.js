import React from 'react';
import Accordion from 'components/ui/Accordion/accessibleAccordion';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import styled from 'styled-components';
import { colors, fonts } from 'theme';

const Header = styled.div`
  width: 100%;
  padding: 0 1rem;
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const StyledTitleP = styled.p`
  font-weight: bold;
  font-size: ${fonts.size.f4};
  text-align: left;
  i {
    color: ${colors.red};
    font-size: ${fonts.size.f4};
    font-style: normal;
  }
`;

const TitleP = ({
  required,
  title,
}) => (
  <StyledTitleP>
    {title}
    {' '}
    {required ? <i>*</i> : null}
  </StyledTitleP>
);

TitleP.displayName = 'Title p';

const AccordionCardComponent = ({
  children,
  title,
  subtitle = '',
  description = '',
  required,
  labelAria,
}) => (
  <Row fluid>
    <Accordion
      tabIndex="0"
      headerBgColorOpen="blue"
      headerBgColor="grey"
      maxHeight="none"
      headerColorOpen="white"
      headerColor="blue"
      arrowOpenColor="white"
      arrowClosedColor="blue"
      arrowSize="f1"
      headerPadding="0.75rem 1.25rem"
      aria-label={labelAria}
      aperto={false}
      AccordionHeader={(props) => (
        <Header>
          <TitleDiv>
            <TitleP
              required={required}
              title={title}
              {...props}
            />
          </TitleDiv>
          <Text value={subtitle} size="f8" tag="p" {...props} align="left" />
          <Text value={description} size="f8" tag="p" {...props} align="left" />
        </Header>
      )}
    >
      <Row fluid padding="1rem">
        {children}
      </Row>
    </Accordion>
  </Row>
);

AccordionCardComponent.displayName = 'Accordion card';

export const AccordionCard = AccordionCardComponent;
