/** @format */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import useWindowSize from 'hooks/useWindowSize';
import Text from 'components/ui/Text';
import styled from 'styled-components';
import media from 'utils/media-queries';
import { colors } from 'theme';
import { WINDOW_SIZE } from 'types/windowSize';
import { Row, Column } from 'components/ui/Grid';
import Pagination from 'components/ui2/Pagination';
import SingolaRecensione from './SingolaRecensione';

const MyColumn = styled(Column)`
 
${media.lg`
  border-left: ${colors.grey} solid 1px;
  padding:0 0 0 1em;
`}
${media.md`
border-left: ${colors.grey} solid 1px;
padding:0 0 0 1em;
`}
${media.sm`

`}

${media.xs`

`}
`;

const ColumnRight = styled(Column)`
 
${media.lg`
  padding:0 1em 0 0;
`}
${media.md`
padding:0 1em 0 0;
`}
${media.sm`

`}

${media.xs`

`}
`;

const Rating = ({ Recensioni, locale }) => {
  const [arraySinistro, setArraySinistro] = useState([]);
  const [arrayDestro, setArrayDestro] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, _] = useState(6);
  const windowSize = useWindowSize();

  const isMobile = WINDOW_SIZE.windowSizesLarge.concat(WINDOW_SIZE.windowSizesMedium).indexOf(windowSize) === -1;
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  let currentItems = Recensioni?.slice(indexOfFirstItem, indexOfLastItem);
  useEffect(() => {
    if (Recensioni) {
      let arr1 = []
      let arr2 = []
      currentItems.forEach((element, i) => {
        if (i % 2 === 0) {
          arr1.push(element)
        } else {
          arr2.push(element)
        }
      });
      setArraySinistro(arr1);
      setArrayDestro(arr2);
    }
  }, [Recensioni, currentPage])

  if (isMobile) {
    if (currentItems?.length) {
      return (
        <React.Fragment>
          {
            currentItems.map(recensione => (
              <Row fluid padding="0 0 4rem 0" key={recensione.id_rich_serv_rec}>
                <SingolaRecensione recensione={recensione} />
              </Row>
            ))
          }
          <Row fluid justifycontent="center" >
            <Pagination
              json={Recensioni}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              numberitem={itemPerPage}
              initialPage={1}
              ariatitle="Elenco di recensioni"
              navNumber={4}
              scrollToTop
            />
          </Row>
        </React.Fragment>
      );
    }
    return (
      <Text
        value="Nessuna recensione!"
        size="f6"
        color="black"
      />
    )
  }
  return (
    (Recensioni && Recensioni.length > 0) ?
      <Row fluid padding="1em 0">
        <ColumnRight lg='6' md='6' xs='12' sm='12' padding="0">
          {
            arraySinistro.map(element => {
              return (<Row fluid padding='0 0 4rem 0' key={element.id_rich_serv_rec}>
                <SingolaRecensione recensione={element} />
              </Row>
              )
            })
          }
        </ColumnRight>
        {
          arrayDestro.length > 0 &&
          <MyColumn lg='6' md='6' xs='12' sm='12' padding="0">
            {
              arrayDestro.map(element => {
                return (<Row fluid padding='0 0 4rem 0' key={element.id_rich_serv_rec}>
                  <SingolaRecensione recensione={element} />
                </Row>
                )
              })
            }
          </MyColumn>}
        <Row fluid justifycontent="center" >
          <Pagination
            json={Recensioni}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            numberitem={itemPerPage}
            initialPage={1}
            ariatitle={'Elenco di recensioni'}
            navNumber={4}
            scrollToTop
          />
        </Row>
      </Row>
      :
      <Text
        value="Nessuna recensione!"
        size="f6"
        color="black"
      />

  )
};

const mapStoreToProps = store => ({
  locale: store.locale,
});
export default connect(mapStoreToProps)(Rating);
