
/** @format */

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { colors, fonts } from 'theme';
import { isNullOrUndefined } from 'util';
import { keyCodes } from '../utils/constants/keyCodes';

const StyledUL = styled.ul`
  display: flex;
  align-items: center;
`;
const NavItem = styled.li`
  display: inline-block;
  font-size: ${fonts.size.f7};
  @keyframes softFadeIn {
    0% {opacity: 0};
    100% {opacity: 1}
  }
  opacity: 0;
  animation-name: softFadeIn;
  animation-fill-mode: forwards;
  animation-duration: 2s;
  cursor: pointer;
  &:hover, &:focus, &:focus-within {
    color: ${colors.primary};
  }
  button {
    background-color: transparent;
    margin: 0em;
    border: none;
    display: flex;
    align-items: center;
    color: ${colors.darkGrey};
    padding: .5em;
    text-decoration: none;
    transition: background 0.2s ease-out;
    outline: none;
    cursor: pointer;
    &:active {
      font-weight: 700;
      color: ${colors.primary};
    }
    &:hover, &:focus, &:focus-within {
      color: ${colors.primary};
    }
  }
  button[aria-current=true] {
    color: ${colors.primary};
    font-weight: 700;
  }  
`;

const StyledArrow = styled.div`
 box-sizing: border-box;
 height: 0.5em;
 width: 0.5em;
 display: inline-block;
 border-style: solid;
 border-color: inherit;
 border-width: 0px 3px 3px 0px;
 color: ${props => colors[props.color]};
 transform: ${props => {
   if (props.right) {
     return 'rotate(-45deg)';
   }
   if (props.left) {
     return 'rotate(135deg)';
   }
   return 'rotate(0deg)';
 }};
`;

const Pagination = ({
  json,
  currentPage,
  setCurrentPage,
  numberitem,
  count,
  ariatitle,
  color,
  navNumber,
  callback,
  scrollToTop,
  margin,
}) => {
  const itemPerPage = numberitem;
  const oldJson = useRef([json, itemPerPage, navNumber]);
  const length = !isNullOrUndefined(count) ? count : json && json.length;
  const pageNumbers = Array.from({ length: Math.ceil(length / itemPerPage) }, (v, i) => i + 1);

  const navArray = () => {
    let startFrom = 0;
    if (currentPage - 1 % navNumber === 0) {
      startFrom = currentPage - 1;
    } else {
      const temp = currentPage % navNumber === 0 ? currentPage - 1 : currentPage;
      startFrom = currentPage - (currentPage - (Math.floor(temp / navNumber) * navNumber));
    }
    const endTo = startFrom + navNumber;
    return pageNumbers.slice(startFrom, endTo);
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(length / itemPerPage)) {
      setCurrentPage(currentPage + 1);
    }
    if (callback) {
      callback.bind(this);
      callback(currentPage + 1);
    }
    if (scrollToTop) {
      window.scrollTo(0, 0);
    }
  };

  const goToEnd = () => {
    setCurrentPage(pageNumbers.length);
    if (callback) {
      callback.bind(this);
      callback(pageNumbers.length);
    }
    if (scrollToTop) {
      window.scrollTo(0, 0);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    if (callback) {
      callback.bind(this);
      callback(currentPage - 1);
    }
    if (scrollToTop) {
      window.scrollTo(0, 0);
    }
  };

  const goToStart = () => {
    setCurrentPage(1);
    if (callback) {
      callback.bind(this);
      callback(1);
    }
    if (scrollToTop) {
      window.scrollTo(0, 0);
    }
  };

  const checkJsonVariation = () => {
    if ((oldJson.current[0].length === json.length) &&
      (oldJson.current[1] === itemPerPage) &&
      (oldJson.current[2] === navNumber)) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (checkJsonVariation()) {
      setCurrentPage(1);
      oldJson.current = [json, itemPerPage, navNumber];
    }
  }, [json, navNumber, itemPerPage]);

  return (
    <>
      {pageNumbers.length > 1 && (
        <nav role="navigation" aria-label={ariatitle} style={{ margin }}>
          <StyledUL>
            <NavItem>
              <button
                type="button"
                aria-label="Torna alla prima pagina"
                title="Torna alla prima pagina"
                tabIndex={pageNumbers.length > 1 && currentPage !== 1 ? 0 : -1}
                disabled={!(pageNumbers.length > 1 && currentPage !== 1)}
                onClick={() => {
                  if (pageNumbers.length > 1 && currentPage !== 1) {
                    goToStart();
                  }
                }}
                onKeyDown={(event) => {
                  if (event.keyCode === keyCodes.ENTER) {
                    event.target.click();
                  }
                }}
              >
                <StyledArrow
                  left
                  color={pageNumbers.length > 1 && currentPage !== 1 ? color || 'primary' : 'grey'}
                />
                <StyledArrow
                  left
                  color={pageNumbers.length > 1 && currentPage !== 1 ? color || 'primary' : 'grey'}
                />
              </button>
            </NavItem>
            <NavItem>
              <button
                type="button"
                aria-label="Vai alla pagina precedente"
                title="Vai alla pagina precedente"
                tabIndex={pageNumbers.length > 1 && currentPage !== 1 ? 0 : -1}
                disabled={!(pageNumbers.length > 1 && currentPage !== 1)}
                onClick={() => {
                  if (pageNumbers.length > 1 && currentPage !== 1) {
                    prevPage();
                  }
                }}
                onKeyDown={(event) => {
                  if (event.keyCode === keyCodes.ENTER) {
                    event.target.click();
                  }
                }}
              >
                <StyledArrow
                  left
                  color={pageNumbers.length > 1 && currentPage !== 1 ? color || 'primary' : 'grey'}
                />
              </button>
            </NavItem>
            {pageNumbers.length >= 1
              && navArray().map((number, index) => (
                <NavItem key={`pag${index + 1}`}>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage(number);
                      if (count) {
                        if (callback) {
                          callback(number);
                        }
                      }
                      if (scrollToTop) {
                        window.scrollTo(0, 0);
                      }
                    }}
                    aria-label={
                        currentPage === (number) ?
                          `${currentPage}, pagina corrente`
                          : `Vai alla pagina ${number}`
                      }
                    aria-current={currentPage === number}
                    tabIndex="0"
                    onKeyDown={(event) => {
                      if (event.keyCode === keyCodes.ENTER) {
                        event.target.click();
                      }
                    }}
                  >
                    {number}
                  </button>
                </NavItem>
                ))
            }
            <NavItem>
              <button
                type="button"
                tabIndex={pageNumbers.length > 1 && currentPage !== pageNumbers.length ? 0 : -1}
                disabled={!(pageNumbers.length > 1 && currentPage !== pageNumbers.length)}
                aria-label="Vai alla pagina successiva"
                title="Vai alla pagina successiva"
                onClick={() => {
                  if (pageNumbers.length > 1 && currentPage !== pageNumbers.length) {
                    nextPage();
                  }
                }}
                onKeyDown={(event) => {
                  if (event.keyCode === keyCodes.ENTER) {
                    event.target.click();
                  }
                }}
              >
                <StyledArrow
                  right
                  color={pageNumbers.length > 1 && currentPage !== pageNumbers.length ? color || 'primary' : 'grey'}
                />
              </button>
            </NavItem>
            <NavItem>
              <button
                type="button"
                tabIndex={pageNumbers.length > 1 && currentPage !== pageNumbers.length ? 0 : -1}
                disabled={!(pageNumbers.length > 1 && currentPage !== pageNumbers.length)}
                aria-label={"Vai all'ultima pagina"}
                title="Vai all'ultima pagina"
                onClick={() => {
                  if (pageNumbers.length > 1 && currentPage !== pageNumbers.length) {
                    goToEnd();
                  }
                }}
                onKeyDown={(event) => {
                  if (event.keyCode === keyCodes.ENTER) {
                    event.target.click();
                  }
                }}
              >
                <StyledArrow
                  right
                  color={pageNumbers.length > 1 && currentPage !== pageNumbers.length ? color || 'primary' : 'grey'}
                />
                <StyledArrow
                  right
                  color={pageNumbers.length > 1 && currentPage !== pageNumbers.length ? color || 'primary' : 'grey'}
                />
              </button>
            </NavItem>
          </StyledUL>
        </nav>
      )}
    </>
  );
};
Pagination.displayName = 'Pagination';

export default Pagination;
