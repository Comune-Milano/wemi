
/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FaIcon from "components/ui/FaIcon";
import { colors } from "theme";
import media from "utils/media-queries";
import { Row } from "components/ui/Grid";
import { isNullOrUndefined } from "util";

const Wrapper = styled(Row)`

  width: auto;
  justify-content: center;
  margin: 2em 0;
  display: flex;
  align-items: center;
  ${media.md`
  i {
    margin: 0 0.2em;
  }`}
  i {
    margin: 0 0.1em;
  }
`
const PageNav = styled.a`
  transition: all 0.5s ease-in-out * {
    transition: all 0.5s ease-in-out;
  }
  &.activePage {
    color: ${props => props.color ? colors[props.color] : colors.white} !important;
    background-color: ${props => props.bgcolor ? colors[props.bgcolor] : colors.darkPrimary} !important;
    margin: 0.2em;
    font-size: 10px;
    width: 3em !important;
    display: flex !important;
    height: 3em !important;
    justify-content: center !important;
    align-items: center !important;
    text-align: center !important;
    font-size: 11px !important;
    border-radius: 50% !important;
  }
  &.notActivePage {
    color: #707070 !important;
    background-color: #f0f0f0 !important;
    margin: 0.5em;
    font-size: 10px;
    width: 3em !important;
    display: flex !important;
    height: 3em !important;
    justify-content: center !important;
    align-items: center !important;
    text-align: center !important;
    border-radius: 50% !important;
  }
`;
const PageItem = styled.li`
display: inline-flex;
align-items: center;
transition: all .4s ease-in-out;

* {
  transition: all .4s ease-in-out
}

 &:hover > .notActivePage { &:hover{
    cursor: pointer;
color: #ffffff !important;
  font-size: 12px!important;
  background-color: #707070  !important;
  border-radius:50%;
  width: 3em !important;
  font-size: 11px!important;
  margin: 1.5px;
  display: flex !important;
  height: 3em !important;
  justify-content: center !important;
  align-items: center !important;
  text-align: center !important;
}}}

i {
  margin: 0 1em;
  &:hover {
    &:before {

      
    }
  }
  &:active {
    background-color: ${colors.darkPrimary}
    &:before {
    color: ${colors.white}
    font-size: 0.9em
    }
  }
}`;

const PaginationStyled = styled.ul`
  display: flex!important;
  justify-content: center !important;
  position: relative;
  width: auto;
  margin-right: 1.2em;
  margin-left: 1.2em;
  padding: 0;
  overflow: hidden;
  width: ${props => props.calcWidth !== 0 ? '20em' : 'auto'};
  max-width: ${props => props.pageNumbers > 5 ? '10em' : 'none'}
  ${media.md`
  width: ${props => props.calcWidth !== 0 ? '20em' : 'auto'};
  max-width: ${props => props.pageNumbers > 10 ? '20em' : 'none'}
  `}
`;

const AbsoluteContainer = styled.div`
  display: block!important;
  justify-content: center !important;
  width: 100%;
  margin-left: ${props => props.fromLeft}em;
  transition: all .3s ease-in-out;
`;

const Pagination = ({ json, numberitem, currentPage, 
  count, 
  setCurrentPage, color, bgcolor, callback, scrollToTop }) => {
  const itemPerPage = numberitem;
  const pageNumbers = [];
    
  const length = !isNullOrUndefined(count) ? count : json.length;
  const pageNumbersUpperLimit = Math.ceil(length / itemPerPage);
  for (let i = 1; i <= pageNumbersUpperLimit; i += 1) {
    pageNumbers.push(i);
  }

  const [fromLeft, setFromLeft] = useState(0);

  const nextPage = () => {
    currentPage < Math.ceil(length / itemPerPage) &&
      setCurrentPage(currentPage + 1)
    pageNumbers.length > 10 &&
      window.innerWidth > 768 &&
      currentPage < pageNumbers.length && currentPage > 5 && setFromLeft(fromLeft - 4)

    pageNumbers.length > 2 &&
      window.innerWidth < 768 &&
      currentPage < pageNumbers.length && setFromLeft(fromLeft - 4.7)

    pageNumbers.length === 2 && setFromLeft(0)
    callback &&
      callback.bind(this) && callback(currentPage + 1)

    if (scrollToTop)
      window.scrollTo(0, 0)
  }

  const goToEnd = () => {

    setCurrentPage(pageNumbers.length)
    window.innerWidth > 768 && pageNumbers.length > 10 ?
      setFromLeft((pageNumbers.length - 1) * -4) :
      window.innerWidth > 768 && pageNumbers.length < 10 ? setFromLeft(0) :
        setFromLeft((pageNumbers.length - 1) * -4.7)
    callback &&
      callback.bind(this) && callback(pageNumbers.length - 1)
    if (scrollToTop)
      window.scrollTo(0, 0)
  }


  const prevPage = () => {
    currentPage > 1 &&
      setCurrentPage(currentPage - 1)

    pageNumbers.length > 10 &&
      window.innerWidth > 768 &&
      currentPage > 1 && currentPage <= pageNumbers.length && setFromLeft(fromLeft + 4)

    pageNumbers.length > 2 &&
      window.innerWidth < 768 &&
      currentPage > 1 && currentPage <= pageNumbers.length && setFromLeft(fromLeft + 4.7)

    pageNumbers.length === 2 && setFromLeft(0)

    currentPage === 1 && setFromLeft(0)
    callback &&
      callback.bind(this) && callback(currentPage - 1)
    if (scrollToTop)
      window.scrollTo(0, 0)
  }

  const goToStart = () => {
    setCurrentPage(1)
    callback &&
      callback.bind(this) && callback(1)
    setFromLeft(0)
    if (scrollToTop)
      window.scrollTo(0, 0)
  }

  useEffect(() => {
    if ((length <= itemPerPage) || (pageNumbers.length <= (length / itemPerPage))) {
      setFromLeft(0);
    }
  }, [json, numberitem, currentPage, count])

  return (
    <Wrapper>
      {pageNumbers.length > 2 &&
        <FaIcon
          title="Torna all'inizio"
          noShadow
          icon="\f100"
          onClick={() => goToStart()}
          bgcolor={pageNumbers.length > 1 && currentPage !== 1 ? "grey" : color ? color : "white"}
          height="1.5em"
          width="1.5em"
          radius="50%"
          color={pageNumbers.length > 1 && currentPage !== 1 ? bgcolor ? bgcolor : "primary" : "white"}
          fontSize="f5"
        />}
      <FaIcon
        noShadow
        icon="\f104"
        onClick={() => prevPage()}
        bgcolor={pageNumbers.length > 1 && currentPage !== 1 ? "grey" : color ? color : "white"}
        height="1.5em"
        width="1.5em"
        radius="50%"
        color={pageNumbers.length > 1 && currentPage !== 1 ? bgcolor ? bgcolor : "primary" : "white"}
        fontSize="f5"
      />
      <PaginationStyled calcWidth={fromLeft} pageNumbers={pageNumbers.length}>
        <AbsoluteContainer fromLeft={fromLeft}>
          <PageItem >
            {pageNumbers.length > 1
              && pageNumbers.map((number,index) => {
                return (
                  <PageNav
                    color={color}
                    bgcolor={bgcolor}
                    key={index.toString()}
                    id={number}
                    onClick={() => {
                      setCurrentPage(number);
                      if (count) {
                        callback &&
                          callback.bind(this) && callback(number)
                      }
                      if (scrollToTop) {
                        window.scrollTo(0, 0)
                      }
                      window.innerWidth > 768 && pageNumbers.length > 10 ? setFromLeft((number - 1) * (-4)) :
                        window.innerWidth > 768 && pageNumbers.length < 10 ? setFromLeft(0) : setFromLeft((number - 1) * (-4.7))
                    }}
                    style={{ fontSize: '8px' }}
                    className={number === currentPage ? 'activePage' : 'notActivePage'}
                  >
                    {number}
                  </PageNav>)

              })
            }
          </PageItem>
        </AbsoluteContainer>
      </PaginationStyled>
      <FaIcon
        noShadow
        onClick={() => nextPage()}
        icon="\f105"
        bgcolor={pageNumbers.length > 1 && currentPage !== pageNumbers.length ? "grey" : color ? color : "white"} 
        height="1.5em"
        width="1.5em"
        radius="50%"
        color={pageNumbers.length > 1 && currentPage !== pageNumbers.length ? bgcolor ? bgcolor : "primary" : "white"}
        fontSize="f5" />
      {pageNumbers.length > 2 &&
        <FaIcon
          noShadow
          title="Vai alla fine"
          onClick={() => goToEnd()}
          icon="\f101"
          bgcolor={pageNumbers.length > 1 && currentPage !== pageNumbers.length ? "grey" : color ? color : "white"}
          height="1.5em"
          width="1.5em"
          radius="50%"
          color={pageNumbers.length > 1 && currentPage !== pageNumbers.length ? bgcolor ? bgcolor : "primary" : "white"}
          fontSize="f5" />}
    </Wrapper>
  );
};
Pagination.displayName = "Pagination";

export default Pagination;
