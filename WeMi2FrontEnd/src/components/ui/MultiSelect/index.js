/** @format */

import React, { useState, Fragment, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { injectIntl } from 'react-intl';
import FaIcon from 'components/ui/FaIcon';
import { colors } from 'theme';
import Scrollbar from 'components/ui/Scrollbar';

import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';

const StyledSelect = styled.div`
position: relative;
cursor: pointer;
min-height: 3em!important;
width: 100%;
max-height:'none';
* {
max-height: inherit;
}


${props =>
  props.open &&
  css`
z-index: 7;
`}
`;

const StyledLabel = styled.label`
position: absolute;
cursor: pointer;
z-index: 1;
top: -10px;
left: 0.8rem;
padding: 0 0.45rem;
font-size: ${({ theme }) => theme.fonts.size.f8};
color:  ${props => props.color ? colors[props.color] :  colors.primary};
background-color: ${({ theme }) => theme.colors.white};
&:first-letter {
text-transform: capitalize;
}
`;


const StyledSelectBox = styled.div`
width: 100%;
height: 100%;
cursor: pointer;

> div {
&:first-child {
padding: ${props => props.notEmpty ? '0' : '1.45rem'};
font-size: ${({ theme }) => theme.fonts.size.f7};
width: initial;
cursor: pointer;
}
}
left: 0;
`;
const StyledBoxContainer = styled.div`
  border: 1px solid ${props => props.color ? colors[props.color] :  colors.primary};
  border-radius: 0;
cursor: pointer;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  margin: 0px;
  padding: 0;
  height: 100%;
  &:focus {
    border: 1px solid  ${props => props.color ? colors[props.color] :  colors.primary};
  }
`;


const StyledOptionGroup = styled.div`
background-color: ${colors.white};
${props => props.showItems ? css`
max-height: 12rem;
border: 01px solid  ${props => props.color ? colors[props.color] :  colors.primary};
border-top: none;
overflow: hidden;
padding-right: 0.5em;
height: auto;
maxHeight: 12rem;
position: absolute;
width: 100%;
z-index: 7;
div {
z-index: 4;
visibility: visible;
}
`
      : css`
max-height: 0;
div {
visibility: hidden;
}
`}
`;

const StyledOption = styled.div`
width: 100%;
position: relative;
cursor: pointer;
transition: all 0.2s linear;
background-color: ${({ theme }) => theme.colors.white};
color: ${({ theme }) => theme.colors.inherit};
border-left: 1px solid ${({ theme }) => theme.colors.grey};
font-size: ${({ theme }) => theme.fonts.size.f7};
border-right: 1px solid ${({ theme }) => theme.colors.grey};
padding: 0.65rem 1.25rem;
padding-right: 4em;
&:last-child {
border-radius: 0 0 5px 5px;
border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
}

${props => props.selected ? css`
color: ${props => props.color ? colors[props.color] :  colors.primary};
background-color: ${({ theme }) => theme.colors.grey};
transition: all 0.2s linear;
cursor: pointer;
&:hover {
  color: ${props => props.color ? colors['red'] :  colors.primary};
  font-size: calc(${({ theme }) => theme.fonts.size.f7}*1.02);
background-color: ${({ theme }) => theme.colors.grey};
transition: all 0.2s linear;
cursor: pointer;
i {
&:before {
color: ${({ theme }) => theme.colors.red};
}
}
}
` : css`
&:hover {
  color: ${props => props.color ? colors[props.color] :  colors.primary};
font-size: calc(${({ theme }) => theme.fonts.size.f7}*1.02);
background-color: ${({ theme }) => theme.colors.grey};
transition: all 0.2s linear;
cursor: pointer;
i {
&:before {
color: ${({ theme }) => theme.colors.red};
}
}
}
`}

i {
width: 2em;
position: absolute;
right: 1.5em;
top: 0.4em;
height: 2em
}
`;

const StyledSelectedItemBox = styled.label`
height: 100%;
z-index: 7;
cursor: pointer;
font-size: ${({ theme }) => theme.fonts.size.f7};
margin-bottom: 0;
display: flex;
align-items: center;

`;
const StyledSelectArrowBox = styled.div`
width: 50px;
height: 100%;
cursor: pointer;
position: absolute;
display: flex;
align-items: center;
justify-content: center;
right: 0;
top: 0;
`;
const StyledSelectArrow = styled.span`
height: 0;
cursor: pointer;
margin: 0;
border-left: 8px solid transparent;
border-right: 8px solid transparent;
border-top: 10px solid  ${props => props.color ? colors[props.color] :  colors.primary};
transition: all 0.2s linear;

${props =>
    props.up &&
    css`
transform: rotate(180deg);
top: 9px;
transition: all 0.2s linear;
`}
`;

const StyledChip = styled.div`
padding: 5px 10px;
cursor: pointer;
margin: 10px 5px;
border-radius: 15px;
background-color: ${colors.grey};
display: inline-flex;
font-size: ${({ theme })=> theme.fonts.size.f8};
align-items: center;
// z-index:7;
max-width: 80%;
width: auto;
i {
margin-left: 10px
};

&:hover {
i {
&:before {
color: ${colors.red};

}
}
}

`;

const StyledBackdrop = styled.div`
display: none;
opacity: 0.5;
height: 100%;
width: 100%;
visibility: hidden;
top: 0;
left: 0;
position: fixed;
z-index: 0;

${props =>
    props.open &&
    css`
display: block;
background-color: none;
opacity: 0;
height: 100%;
width: 100%;
top: 0;
cursor: pointer;
left: 0;
visibility: visible;
position: fixed;
z-index: 6;
`}
`;




// var selectedArr = [];

const MultiSelect = ({ intl, items, required, getValue, noIntl, 
  maxLengthChip,
  material, selectedArrDefault,activeIntl,  maxHeight, group, color, maxLength, name, disabled, ...rest }) => {
  const [selectedArr, setSelectedArr] = useState([]);
  const [showItems, setShowItems] = useState(false);
  const [update, setUpdate] = useState(false);



  
  const scrollbarStyle2 = {
    height: maxHeight ? selectedArr.length > 0 ? maxHeight : '12rem' : 'auto',
    minHeight: '12rem', 
    padding: '0 1em',
    overflowY: 'hidden',
    overflowX: 'hidden',
    justifyContent: 'space-between',
    width: '100%',
  };


  const label = activeIntl? !noIntl && intl.formatMessage({ id: name }):  name;

  useEffect(() => {
    if((selectedArr.length <= 0 || (selectedArr !== selectedArrDefault)) && selectedArrDefault)
    {
     setSelectedArr(selectedArrDefault)
    }
  }, [selectedArrDefault, items])


  const AddSelection = value => {
    let found = selectedArr.findIndex(e => e.value === value.value)
    if (found === -1)
      selectedArr.push(value);
    else
      selectedArr.splice(found, 1);
    getValue.bind(this);
     group ? getValue(selectedArr, group) :  getValue(selectedArr) 
    // let arraySelected = selectedArr;
    // let found = -1;
    // for(let i = 0; i < selectedArr.length; i+=1)
    // if(selectedArr[i].id === value.id)
    // found= i;
    // if(found===-1)
    // arraySelected.push(value);
    // else 
    // arraySelected.splice(found,1);
    // selectedArr = arraySelected;
  };

  const RemoveSelection = value => {
    const index = selectedArr.indexOf(value);
    selectedArr.splice(index, 1);
     if(group)getValue(selectedArr, group)
     else  getValue(selectedArr) 
  };
  
  return (
    <Fragment>
      <StyledBackdrop open={showItems} onClick={() => setShowItems(!showItems)} />
      <StyledSelect open={showItems} color={color} maxHeight={maxHeight} {...rest}>
        <StyledSelectBox color={color} notEmpty={selectedArr.length > 0} >
          <StyledBoxContainer color={color} onClick={() => setShowItems(!showItems)}>
          {material ? <StyledLabel   color={color} >{label}{required ? 
          <Text  weight="bold" color="red" size="f8" value=" *" />: null}  </StyledLabel> : null}
            <StyledSelectedItemBox color={color}>
              <Row fluid justifycontent="flex-start"  padding="0.5em 3em .5em .5em">
                {selectedArr && Array.isArray(selectedArr) && selectedArr.map((selected,index) => (
                  <StyledChip
                  key={index.toString()}
                    onClick={disabled?
                      ()=>{}
                      :
                      (event) => {
                        RemoveSelection(selected);
                        setUpdate(!update);
                        event.stopPropagation();
                    }}
                  >
                    {selected.value.length > maxLengthChip && maxLengthChip ? 
            selected.value.substring(0, maxLengthChip).concat('...') : selected.value }
                    {disabled?'': 
                    <FaIcon noShadow icon="\f00d" color={color ? color : "primary"} fontSize="f7" /> }
                  </StyledChip>
                ))}
              </Row>
            </StyledSelectedItemBox>
            <StyledSelectArrowBox onClick={() => setShowItems(!showItems)} up={showItems}>
              <StyledSelectArrow color={color} up={showItems} />
            </StyledSelectArrowBox>
          </StyledBoxContainer>
          { items && items.length > 0 ?
          <StyledOptionGroup color={color}
            showItems={showItems}
          >
          {items && items.length > 4 ?
  <Scrollbar horizontal={true.toString()} style={scrollbarStyle2}>
            {Array.isArray(selectedArr) && items.map((item,indice) => (
              <StyledOption
              key={indice.toString()}
              selected={selectedArr.find(selected => { return (selected.id === item.value && showItems)})}
              color={color}
                id={item.value}
                onClick={() => {
                  AddSelection( { id: item.value, value: item.textValue });
                  setUpdate(!update)
                }}
              >
            {item && item.textValue }
                {selectedArr.map(selected => {
                  if (selected.id === item.value && showItems) {
                    return (<FaIcon noShadow icon="\f00c" color={color ? color : "primary"} fontSize="f7" />)
                  }
                })}
              </StyledOption>
            ))}
            </Scrollbar>
            : <>
             { items && items.map((item,index) => (
              <StyledOption 
              key={index}
              selected={selectedArr.find(selected => { return (selected.id === item.value && showItems)})}
              color={color}
                id={item.value}
                onClick={() => {
                  AddSelection( { id: item.value, value: item.textValue });
                  setUpdate(!update)
                }}
              >
            {item && item.textValue }
                {selectedArr.map((selected,index) => {
                  if (selected.id === item.value && showItems) {
                    return (<FaIcon key={index} noShadow icon="\f00c" color={color ? color : "primary"} fontSize="f7" />)
                  }
                })}
              </StyledOption>
            ))}
          </>}
          </StyledOptionGroup> 
          : null }
        </StyledSelectBox>
      </StyledSelect>
    </Fragment>
  );
};
MultiSelect.displayName = 'MultiSelect';
export default injectIntl(MultiSelect);