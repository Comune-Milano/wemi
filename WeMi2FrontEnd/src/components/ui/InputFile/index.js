/** @format */
import React, {useRef, useEffect, useState} from 'react';
import styled, { css } from 'styled-components';
import Text from 'components/ui/Text';
import { injectIntl } from 'react-intl';
import FaIcon from 'components/ui/FaIcon';
import Button from '../Button';

const Wrapper = styled.div`
height: ${props => props.height};
width: ${props => props.width};
${props => props.icon ? css`
position: relative;
cursor: ${props => props.disabled ? 'default' : 'pointer'};
box-shadow: none;
`: css`
position: relative;
cursor: pointer;
box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
transition: all .2s linear;
&:hover {
box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
 transition: all .2s linear;
}

`}

    `


const InputFile = ({ intl, stile, disabled, submit, reset, icon, textColor, value, type, 
    fontSize, autowidth, width, height, onDone, multiple, 
    accept, id, ...rest }) => {
const resetRef = useRef(null);
const [update, setUpdate] = useState(false)
useEffect(() => {
    if(resetRef&& resetRef.current !== null) 
    resetRef.current.value='';
}, [resetRef, update])



const sendFiles = (event) => {
    onDone.bind(this); 
    onDone(event);
}
    return (
        <Wrapper height={height} width={width} icon={icon} disabled={disabled} onClick={() => {setUpdate(!update);  resetRef.current.value='';} }>
           {!icon && <Button
                type={type}
                stile={stile}
                reset={reset}
                submit={submit}
                fontSize={fontSize}
                value={value}
                {...rest}
            />}
            {icon && <>
              <FaIcon icon="\f067"
              radius="50%"
              noShadow
              disabled={disabled}
              width="2em"
              height="2em"
              bgcolor="blue"
              fontSize="f6"
              padding="0.5em"
              color="white"
              display="inline-flex"
             />
             <Text value={value} size={fontSize} color={disabled ? 'darkGrey' : textColor} padding="0 0 0 1em" />
             </>}
            {!disabled && <input 
            ref={resetRef}
            type="file"
            id={id}
            accept={accept}
            multiple={multiple}
            onClick={() => {setUpdate(!update); resetRef.current.value='';} }
            onChange={(event) => sendFiles(event)} />}
        </Wrapper>
    );
};
InputFile.displayName = 'InputFile';

export default injectIntl(InputFile);
