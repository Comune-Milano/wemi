import React from 'react';
import { BackgroundTitle } from 'components/ui2/BackgroundTitle';
import ButtonIconBox from 'components/ui2/ButtonIconBox';
import Grid from 'components/ui2/Grid';

const GridComponent = ({
  title = '',
  color = 'purple',
  contents = [],
  letterSpacing,
  maxWidthButton = {
    xs: '11.67rem',
    sm: '11.67rem',
    md: '8rem',
    lg: '9.85rem',
  },
}) => (
  <>
    <BackgroundTitle
      bgColor={color}
      size="small"
      label={title}
    />
    <Grid
      columns={{
        md: 4,
        xs: 2,
      }}
      margin="2.5rem 0 0 0"
    >
      {contents.map((content, index) => (
        <ButtonIconBox
          key={`GridComponent-Button-${content.title}-${index.toString()}`}
          title={content.title}
          media={content.img}
          maxWidth={maxWidthButton}
          link={content.link || ''}
          letterSpacing={letterSpacing}
        />
      ))}
    </Grid>
  </>
);
GridComponent.displayName = 'GridComponent';
export default GridComponent;
