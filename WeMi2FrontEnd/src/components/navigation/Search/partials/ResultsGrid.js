/** @format */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { colors } from 'theme';
import media from 'utils/media-queries';
import { Row, Column } from 'components/ui/Grid';
import Pagination from 'components/ui2/Pagination';
import { AddEnte, RemoveEnte } from 'redux-modules/actions/authActions';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import SingleEnt from './EntGridElement/index';
import { POINT_CONVERSION_COMPRESSED } from 'constants';

const StyledEntColumn = styled(Column)`
    &:nth-child(odd) {
      padding: 0 0 2em 0;
      ${media.lg` 
        padding: 0 2em 2em 0;
      `}
    };
    &:nth-child(even) {
      padding: 0 0 2em 0;
      ${media.lg` 
        padding: 0 0 2em 2em;
      `}
    }
  `

const EntGridPagination = ({
  datiLogin,
  openPrice,
  setOpenPrice,
  openSchedaEnte,
  setOpenSchedaEnte,
  openEntService,
  setOpenEntService,
  json,
  openLoginModal,
  AddEnte,
  RemoveEnte,
  array,
  pathname,
  setOpenRating,
  openRating }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, _] = useState(6);
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = json
    && json.slice(indexOfFirstItem, indexOfLastItem);

  const seleziona = (id) => {
    let bol = false
    array.map((el) => { if ([id] == el.ente.id_ente) bol = true })
    return bol
  }

  // const [arrayState, setArrayState] = useState([]);
  const ResultsGrid = () => {

    return (
      <>
        <Row fluid justifycontent="space-between">
          {currentItems.map((singleEntProps, index) => {
            return (
              <StyledEntColumn xs="12" lg="6" margin="0" key={index.toString()}>

                <SingleEnt
                  openPrice={openPrice}
                  setOpenPrice={setOpenPrice.bind(this)}
                  openRating={openPrice}
                  setOpenRating={setOpenRating.bind(this)}
                  openSchedaEnte={openSchedaEnte}
                  setOpenSchedaEnte={setOpenSchedaEnte.bind(this)}
                  openEntService={openEntService}
                  setOpenEntService={setOpenEntService.bind(this)}
                  dbData={singleEntProps}
                  enteProps={singleEntProps}
                  attiva={singleEntProps && singleEntProps.ente ? seleziona(singleEntProps.ente.id_ente) : undefined}
                  selectedValue={array}
                  pathname={pathname}
                  onClick={event => {
                    if (event.target) {
                      if (!array.includes(singleEntProps)) {
                        AddEnte(singleEntProps);
                        event.stopPropagation()
                      }
                      else {
                        RemoveEnte(singleEntProps);
                      }
                      event.stopPropagation()
                    }
                  }}
                />

              </StyledEntColumn>)

          })}

        </Row>
      </>
    );
  }
  ResultsGrid.displayName = 'ResultsGrid';

  return (
    <>
      <>

        <ResultsGrid />
        <Pagination
          margin="2.5em 0 0 0"
          navNumber={10}
          json={json}
          currentPage={currentPage}
          numberitem={itemPerPage}
          setCurrentPage={setCurrentPage}
          initialPage={1}
          ariatitle="Elenco enti"
        />
      </>
    </>
  );
};

function mapStateToProps(state) {
  const { user, datiLogin, graphql } = state;
  const { enti } = user;
  return {
    datiLogin: datiLogin,
    array: enti
  };
};
const mapDispatchToProps = {
  AddEnte,
  RemoveEnte,
  graphqlRequest
};
EntGridPagination.displayName = 'EntGridPagination';

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EntGridPagination);
