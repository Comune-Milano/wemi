/** @format */

import React from 'react';
import styled, { css } from 'styled-components';
import {  Column } from 'components/ui/Grid';
import { colors } from 'theme';

const Results = styled(Column)`
${props => props.upward && css`
bottom: calc( 100% - 39px);
`}
    transition: all .2s ease-in-out;
    position:absolute;
    z-index:4;
    width: 100%;
`;
const StyledOption = styled.div`
width: 100%;
background-color: ${({ theme }) => theme.colors.white};
color: ${({ theme }) => theme.colors.inherit};
border-left: 0.5px solid ${({ theme }) => theme.colors.grey};
border-right: 0.5px solid ${({ theme }) => theme.colors.grey};
padding: 0.65rem 1.25rem;
font-size: ${({ theme }) => theme.fonts.size.f8};
&:first-letter {
  text-transform: capitalize;
}
&:last-child {
  border-radius: 0;
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.grey};
}
&:selected {
  background-image: url('/check.png');
  background-size: 16px;
  background-repeat: no-repeat;
  background-position: 2px 8px;
}
&:hover {
  color: ${props => props.color ? colors[props.color] :  colors.primary};
  background-color: ${({ theme }) => theme.colors.grey};
  font-size: calc(${({ theme }) => theme.fonts.size.f7}*0.8);
  transition: all 0.2s linear;
  cursor: pointer;
}
${props => props.upward && css`
  border-radius: 0;
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.grey};
`}
`;

const StyledOptionGroup = styled.div`

  ${props =>
    props.show
      ? css`
        transition: all .2s ease-in-out;
            opacity: 1;
            border: 1 px solid ${({ theme }) => theme.colors.primary};
          border-top: none;
          max-height: 12.2rem;
          overflow: auto;
          height: auto;
          width: 100%;
          div {
            z-index: 4;
            visibility: visible;
          }
      
          width: 100%;
          z-index: 7;
          div {
            z-index: 4;
            visibility: visible;
          }
        `
     
      : css`
      opaicty: 0;
          transition: all .2s ease-in-out;
          max-height: 0;
          div {
            visibility: hidden;
          }
            `}
`;




const SearchBoxHints = ({searchResults, setShowHints,showHints, locale,setSelected ,upward}) =>{
  return(
    <Results xs={12}  padding="0 40px 0 0" justify-content="center"  upward={upward} >
{searchResults && searchResults.length > 0?
    <StyledOptionGroup show={showHints} upward={upward}>
      
        { searchResults.map((item,index) => ( 
        <StyledOption size="f6"
        key={index.toString()}
        onClick = {() => {
         
          setSelected.bind(this);
          setShowHints.bind(this);
          setShowHints(false)
          setSelected(item);
        }}>
         
        {item.txTitoloCategoria[locale].toLowerCase()} 
        </StyledOption>))}        
  </StyledOptionGroup>  
  : null}
   </Results>
)
};

export default SearchBoxHints;
