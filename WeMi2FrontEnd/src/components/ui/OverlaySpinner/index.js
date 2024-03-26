/** @format */

import React, { Fragment, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { connect } from 'react-redux';
import { overlaySpinner } from 'redux-modules/actions/authActions';
import media from "utils/media-queries";
import { colors } from "theme";
import { Row, Column } from "components/ui/Grid";
import {HandleScrollDown} from 'components/ui/HandleScroll';
import Text from "components/ui/Text";
import Loader from 'components/ui/Loader';
import {AddClientError} from 'redux-modules/actions/errorActions';


const OverlayContent = styled.div`
position: fixed;
top: 30%;
text-align: center;
width: 60%;
left: 20%;
display: flex;
flex-direction: column;
justify-content: space-between;
  align-items: center;
height: 40%;
padding: 3em;
background-color: rgba(255,255,255,.7);
`
const OverlayContentWrapper = styled.div`
position: relative;

`

const OverlayLoader = styled.div`
position: fixed; 


  ${props => props.visible ? css`
  z-index: 9;
  ${props => props.back ? css`
  background-color: black;
  opacity: 0.3;
  ` : css`
  opacity: 1
  `}
  height: 100%;
    width:100%;

    transition: all .2s ease-in-out
  `: css`
  position: absolute;
  height: 0;
  width: 0;
  opacity: 0;
  transition: all .2s ease-in-out;
  background-color: black;  
  `}

  ${props =>
    props.scrollDown === 1 || props.scrollDown === 2  ?
    css`
    padding-top: 8.1em;
  transition: padding .2s linear;
  
    ${media.md`
    @supports (-ms-ime-align:auto) {
      padding-top: 8.1em;
  }
  padding-top: 0;
  transition: padding .3s linear;
  `}
    ` : css`
    padding-top: 8.1em;
  transition: padding .2s linear;
  
    ${media.md`
  padding-top: 10.85em;
  transition: padding .3s linear;
  
  `}
  
  ${media.xxl`
  padding-top: 9.85em;
  transition: padding .3s linear;
  `}
   
    `}
    ` 


const OverlaySpinner = ({data}) => {

  const scrollDown = HandleScrollDown();

  
return(<Fragment>
    {data ? 
    <>
    <OverlayLoader back scrollDown={scrollDown} visible={data.flag} />
    <OverlayLoader front scrollDown={scrollDown} visible={data.flag} >
    <OverlayContentWrapper>
      <OverlayContent>
      <Text value={data.value} align="center" size="f1" tag="h1" color="primary" />
      <Loader size="3em" margin="auto" />
      </OverlayContent>
    </OverlayContentWrapper>
    </OverlayLoader>
    </>
    : null}
    </Fragment>
)
};

OverlaySpinner.displayName = "OverlaySpinner";


const mapDispatchToProps = {
    AddClientError,
    overlaySpinner,
  };
  const mapStoreToProps = store => ({
    locale: store.locale,
    data: store.user.overlaySpinner,
  });
  export default connect(
    mapStoreToProps,
    mapDispatchToProps,
  )(OverlaySpinner);
  