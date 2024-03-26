import React from 'react';
import styled from 'styled-components';
import media from 'utils/media-queries';

const GridTemplate = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-gap: ${props => props.spacing.xs};
  width: 100%;
  grid-template-columns: repeat(${props => props.columns.xs}, minmax(0, 1fr));
  ${media.md`
    grid-template-columns: repeat(${props => props.columns.md}, minmax(0, 1fr));
    grid-gap: ${props => props.spacing.md};
  `};
  ${media.lg`
    grid-template-columns: repeat(${props => props.columns.md}, minmax(0, 1fr));
    grid-gap: ${props => props.spacing.lg};
  `}
  margin: ${props => props.margin};
`;

const Grid = ({
    columns = {
      md: 5,
      xs: 2,
    },
    spacing = {
      lg: '3em',
      md: '3em',
      xs: '2em',
    },
    children,
    margin,
 }) => (
   <GridTemplate columns={columns} spacing={spacing} margin={margin}>
     {children}
   </GridTemplate>
  );

Grid.displayName = 'Grid';

export default Grid;
