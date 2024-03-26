import React, { useRef, useEffect, useMemo } from 'react';
import { Row, Column } from 'components/ui/Grid';
import styled, {css} from 'styled-components';
import Slider from 'components/ui2/Slider';
import Text from 'components/ui/Text';
import { SearchFiltersJson } from 'mocks/SearchServiceJson';
import media from 'utils/media-queries';


const ShowFilterWrap = styled.div`
  height: auto;
  max-height: 0;
  width: 80%;
  opacity: 0;
  transition: max-height .4s linear, opacity .3s linear;

  ${media.lg` 
    width: 60%;
  `}


  ${props => props.shown && css`
    height: auto;
    max-height: 60vh;
    opacity: 1;
    transition: max-height .4s linear, opacity .3s linear;
  `}
`;

const findPrezzoMax = (serviziErogati) => {
  let max = 0;
  max = serviziErogati && serviziErogati.length > 0 && serviziErogati.filter(el => (
    el.listaModalitaPagamento[0] && el.listaModalitaPagamento[0].cdOfferta === 3 &&
    el.ente.cd_stato_ente == 31 &&
          el.ultimoStato &&
          el.ultimoStato.cd_stato_dati_servizio_ente === '31'
    )
    ).sort((a, b) => {
    if (a.im_prezzo_minimo > b.im_prezzo_minimo) return -1
  })[0] ?
    serviziErogati.filter(el => (el.listaModalitaPagamento[0] && el.listaModalitaPagamento[0].cdOfferta === 3)).sort((a, b) => {
      if (a.im_prezzo_minimo > b.im_prezzo_minimo) return -1
    })[0].im_prezzo_minimo : null;
  return max;
};

const Tasks = ({
    showPriceFilter,
    getValue,
    loaded,
    enti,
}) => {
  const prezzoMaxUpdate = useRef();
  const memoizedPrezzoMax =  useMemo(() => findPrezzoMax(enti), [prezzoMaxUpdate]);
  useEffect(() => {
    if(loaded){
    prezzoMaxUpdate.current = 1;
    }
  }, [!prezzoMaxUpdate.current]);

  if (!showPriceFilter) {
    return null;
  }

  return (
    <ShowFilterWrap shown={showPriceFilter}>
      <Text
        weight="bold"
        tag="h2"
        value={SearchFiltersJson.costLabel}
        transform="uppercase"
        letterSpacing="0.05em"
        intlFormatter
        color="black"
        size="f8"
      />
      <Slider
        width="100%"
        min={0}
        max={memoizedPrezzoMax}
        getValue={getValue.bind(this)}
        initialValue={memoizedPrezzoMax}
        margin="1.5em 0"
      />
    </ShowFilterWrap>
  );
}

Tasks.displayName = 'Tasks';

export default Tasks;
