/** @format */

import React from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { colors, fonts } from 'theme';
import { hexToRgba } from 'utils/functions/hexToRgba';
import { noop } from 'utils/functions/noop';
import { Row, Column } from 'components/ui/Grid';
import Checkbox from 'components/ui2/Checkbox';
import ButtonIcon from 'components/ui2/FaIcon/ButtonIcon';
import Tooltip from 'components/ui2/Tooltip';
import Button from 'components/ui2/Button';
import Rating from 'components/ui2/Rating';
import Text from 'components/ui/Text';
import { AddEnte, graphqlRequest } from 'redux-modules/actions/authActions';
import {
  entePK as entePKQ, enteDatiPK as enteDatiPKQ,
  EstraiServizioErogato as EstraiServizioErogatoQ,
  EstraiDettaglioAmministrativoServizioEnte as EstraiDettaglioAmministrativoServizioEnteQ,
  EstraiRecensioni as EstraiRecensioniQ,
} from '../FilterRequestGraphQL';
import { moneyFormat } from 'utils/formatters/moneyFormat';

const StyledDiv = styled.div`
  position: relative;
  padding: 0 1.2em 0.8em 1.2em;
  transition: background-color 0.2s linear;
  background-color: transparent;
  cursor: pointer;

  div.ent-header {
    border-top: 2px solid ${colors.darkGrey};
    padding-top: 1em

    label {
      padding-left: 1em;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      width: 100%;
    };

    .header-buttons > div {
      margin-left: 1em;
    }

  }

  small.ent-details ul {
    margin-left: 2.5em;
    font-style: italic;

    li {
      padding-top: 2px;
    }
  }

  div.ent-body {
    padding-top: 1.2em;

    div.price {
      display: inline-block;
      font-weight: 700;
      line-height: 1.4;

      small {
        font-weight: 500;
        display: block;
      }
    }

    div.modal-buttons {
      > div {
        width: 45%;
        &:first-child {
          margin-right: 0.5em;
        }
        &:last-child {
          margin-left: 0.5em;
        }
      }
    }
  }

  div.ent-footer {
    padding-top: 0.7em;

    a.reviews {
      display: inline-block;
      margin: 0 1em;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
        color: ${colors.black};
      }
    }

    span.rating {
      display: inline-block;
    }
  }

  ${props =>
    props.attiva &&
    css`
      transition: background-color 0.2s linear;
      background-color: ${hexToRgba(colors.primary, 0.15)}
    `}
`;


const SingleEnt = ({
  attiva,
  onClick,
  completaRichiesta,
  enteProps,
  graphqlRequest,
  locale,
  openEntService,
  setOpenEntService,
  openSchedaEnte,
  setOpenSchedaEnte,
  openPrice,
  setOpenPrice,
  setOpenRating,
  openRating,
  removeEnte,
  calcLightCost,
  filtri,
  match
}) => {
  const {
    ente,
    im_prezzo_minimo,
    media_recensioni,
    id_servizio_ente,
    spaziWeMi,
    id_servizio_riferimento,
    listaModalitaPagamento,
    cd_tipo_servizio_erog,
    numeroRecensioni
  } = enteProps;
  const getPrezzoMinimo = () => {
    //TODO: Da togliere, e sostituire minCond con im_prezzo_minimo_cond, che arriverà dall query modificata
    let im_prezzo_minimo_cond = im_prezzo_minimo - 10;
    let prezzoMinimo;

    /** CONTROLLO SE STO NELLA PAGINA DI COMPLETAMENTO RICHIESTA */
    if (completaRichiesta) {
      prezzoMinimo = calcLightCost;
      return prezzoMinimo;
    }

    /** PAGINA DI RICERCA SERVIZIO */

    /** listaModalitaPagamento è un array di un elemento, 
     * corrispondente alla modalità pagamento del singolo ente in questione. */
    let modalitaPagamentoSingleEnt = listaModalitaPagamento[0];
    if (modalitaPagamentoSingleEnt && modalitaPagamentoSingleEnt.cdOfferta !== 3) {
      prezzoMinimo = 'Gratuito';
      return prezzoMinimo;
    }

    /** Veirfica della lunghezza dell'array del filtro "tipologia servizio" 
     * Se è 0 o 2, significa che sto mostrando tutti i servizi, e di conseguenza 
     * il prezzo da mostrare sarà il minore tra im_prezzo_minimo (prezzo minimo individuale) e im_prezzo_minimo_cond (prezzo minimo condiviso)
     * (Qualora uno dei due non esista, mostra l'unico che ha)
    */
    if (filtri
      && filtri.tipologia &&
      filtri.tipologia.length === 1
    ) {
      /** Dal momento che la lunghezza dell'array del filtro è pari a 1, 
       * significa che è stata selezionato solo una voce tra individuale e condiviso,
       * e dunque che il prezzo da mostrare sarà l'importo per la tipologia di servizio selezionata.
       */
      if (filtri.tipologia[0].id === 1) {
        prezzoMinimo = `${im_prezzo_minimo.toFixed(2).replace('.', ',')}€`;
      } else prezzoMinimo = `${im_prezzo_minimo_cond.toFixed(2).replace('.', ',')}€`;
    } else prezzoMinimo = (im_prezzo_minimo_cond && im_prezzo_minimo && im_prezzo_minimo > im_prezzo_minimo_cond) || !im_prezzo_minimo ?
      `${im_prezzo_minimo_cond.toFixed(2).replace('.', ',')}€` : `${im_prezzo_minimo.toFixed(2).replace('.', ',')}€`;
    return prezzoMinimo;
  };

  const prezzoMinimo = getPrezzoMinimo();

  return (
    <StyledDiv onClick={(event) => {
      if (onClick) {
        onClick(event)
      } else noop()
    }
    }
      attiva={attiva}
      aria-checked={attiva}
    >
      <Row fluid justifycontent="space-between" alignitems="center" className="ent-header">
        <Column xs="9" padding="0">
          {!completaRichiesta ?
            <Checkbox value={attiva} onChange={v => null} checkcolor="primary"
              label={ente.nm_ente} fontSize="f6" spacing="0" />
            :
            <Text
              value={ente.nm_ente}
              size="f6"
              color="black"
              transform="uppercase"
              letterSpacing="0.05em"
              weight="bold"
            />}
        </Column>
        <Column xs="3" padding="0" flex justifycontent="flex-end" className="header-buttons">
          <Tooltip
            position="bottom"
            color="white"
            bgcolor="blue"
            posAdjustment="-425%"
            value="Visualizza la scheda dell'ente e scopri gli altri servizi offerti">
            <ButtonIcon color="primary" icon="info" fontSize="f9"
              onClick={async (event) => {
                event.preventDefault();
                event.stopPropagation();
                if (ente) {
                  if (await graphqlRequest(entePKQ(ente.id_ente)));
                  setOpenSchedaEnte.bind(this); setOpenSchedaEnte(true)
                }
              }} />
          </Tooltip>
          {completaRichiesta ?
            <Tooltip
              position="bottom"
              color="white"
              bgcolor="blue"
              posAdjustment="-425%"
              value={`Rimuovi ${ente.nm_ente}`}>
              <ButtonIcon
                color="red"
                icon="times"
                label={`Rimuovi ${ente.nm_ente}`}
                fontSize="f9"
                onClick={() => { removeEnte() }}
              />
            </Tooltip>
            : null}
        </Column>
      </Row>
      <Row fluid tagName="small" className="ent-details">
        { // Spazi WeMi per Tate, Colf e Badanti
          (parseInt(id_servizio_riferimento) === 999997 ||
            parseInt(id_servizio_riferimento) === 999998 ||
            parseInt(id_servizio_riferimento) === 999999) ? (
              <ul>
                {spaziWeMi.map((el, index) => (
                  <li key={index.toString()}>
                    <Text tag="span" value={el.tlValoreTestuale[locale]} />
                  </li>
                ))}
              </ul>
            )
            : null}
      </Row>
      <Row fluid justifycontent="space-between" alignitems="center" className="ent-body">
        <Column xs="4" className="price" padding="0">
          {prezzoMinimo ?
            ((prezzoMinimo == 'Gratuito') ?
              <Text tag="span" size="f6" value={prezzoMinimo} /> :
              <><Text tag="small" value="da" size="f7" color="darkGrey" />
                <Text tag="span" value={prezzoMinimo} size="f5" />
              </>
            )
            : null}
        </Column>
        <Column xs="8" flex justifycontent="flex-end" className="modal-buttons" padding="0">
          <Tooltip position="bottom" color="white" bgcolor="blue"
            value="Qui puoi trovare maggiori informazioni sulle variazioni di prezzo del servizio">
            <Button label="Prezzi" color="primary" fontSize="f7"
              padding="0.4em 0"
              onClick={async (event) => {
                event.preventDefault();
                event.stopPropagation();
                await graphqlRequest(EstraiDettaglioAmministrativoServizioEnteQ(id_servizio_ente, ente.id_ente));
                setOpenPrice.bind(this); setOpenPrice(true);
              }} />
          </Tooltip>
          <Tooltip position="bottom" color="white" bgcolor="blue"
            value="Qui puoi trovare maggiori informazioni su come questo ente gestisce il servizio">
            <Button label="Dettagli" color="primary" fontSize="f7"
              padding="0.4em 0"
              onClick={async (event) => {
                event.preventDefault();
                event.stopPropagation();
                await graphqlRequest(EstraiDettaglioAmministrativoServizioEnteQ(id_servizio_ente, ente.id_ente));
                setOpenEntService.bind(this); setOpenEntService(true)
              }} />
          </Tooltip>
        </Column>
      </Row>
      <Row justifycontent="flex-end" className="ent-footer">
        <Tooltip position="bottom" fontSize="f8" color="white" bgcolor="blue"
          value="Leggi le recensioni">
          <a className="reviews" onClick={async (event) => {
            event.preventDefault();
            event.stopPropagation();
            await graphqlRequest(EstraiRecensioniQ(ente.id_ente, id_servizio_riferimento));
            setOpenRating.bind(this); setOpenRating(true)
          }}>
            <Text tag="span" value={numeroRecensioni === 1 ? numeroRecensioni + ' recensione' : (numeroRecensioni ? numeroRecensioni : 0) + ' recensioni'} fontSize="f7" color="darkGrey" /></a>
        </Tooltip>
        <span className="rating">
          <Rating readOnly={true} stars={media_recensioni} spacingRight="0.1em" fontSize="f8" />
        </span>
      </Row>
    </StyledDiv>
  );
};

const mapDispatchToProps = {
  AddEnte,
  graphqlRequest
};
function mapStateToProps(state) {
  const { user, graphql, locale } = state;
  const { ServizioErogato, loaded } = graphql;
  const { filtri } = user;
  return { filtri, ServizioErogato, loaded, locale };
}
SingleEnt.displayName = 'SingleEnt';
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SingleEnt);
