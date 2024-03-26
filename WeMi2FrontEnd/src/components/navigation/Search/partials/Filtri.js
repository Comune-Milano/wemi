/** @format */

import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Row } from 'components/ui/Grid';

import { OfferTypology, ServiceTypology, TargetLevel1, TargetLevel2, Zone, Tasks, When, PriceSlider, FilterTitle } from './filterPartials';
import { graphqlRequest, AddEnte, AddFilter, AddFilterData, resetField, removeFilters, ResetEnti } from 'redux-modules/actions/authActions';
import { isNullOrUndefined } from 'util';

const periodiErogazioneArray = (serviziErogati) => {
  let periodi = [];
  for (let i = 0; i < serviziErogati.length; i += 1) {
    let listaPeriodi = serviziErogati[i].listaPeriodiErogazione;
    for (let j = 0; j < listaPeriodi.length; j += 1) {
      if (periodi.length > 0) {
        let found = false;
        periodi.forEach((elemento) => {
          if (elemento.id_periodo === listaPeriodi[j].id_periodo)
            found = true;
        })
        if (!found)
          periodi.push(listaPeriodi[j]);
      }
      else
        periodi.push(listaPeriodi[j]);
    }
  }
  periodi.sort((a, b) => {
    if (a.id_periodo < b.id_periodo) return -1;
  })
  return periodi;
}
const mansioniArray = (serviziErogati) => {
  let mansioni = [];
  for (let i = 0; i < serviziErogati.length; i += 1) {
    let listaMansioni = serviziErogati[i].listaMansioniSvolte;
    for (let j = 0; j < listaMansioni.length; j += 1) {
      if (mansioni.length > 0) {
        let found = false;
        mansioni.forEach((elemento) => {
          if (elemento.idMansione === listaMansioni[j].idMansione)
            found = true;
        })
        if (!found)
          mansioni.push(listaMansioni[j]);
      }
      else
        mansioni.push(listaMansioni[j]);
    }
  }
  mansioni.sort((a, b) => {
    if (a.idMansione < b.idMansione) return -1;
  })
  return mansioni;
};

const destinatariArray = (serviziErogati) => {
  let destinatari = [];
  for (let i = 0; i < serviziErogati.length; i += 1) {
    let listaDestinatari = serviziErogati[i].listaDestinatariPrimoLivello;
    for (let j = 0; j < listaDestinatari.length; j += 1) {
      if (destinatari.length > 0) {
        let found = false;
        destinatari.forEach((elemento) => {
          if (elemento.idDestinatario === listaDestinatari[j].idDestinatario)
            found = true;
        })
        if (!found)
          destinatari.push(listaDestinatari[j]);
      }
      else
        destinatari.push(listaDestinatari[j]);
    }
  }
  destinatari.sort((a, b) => {
    if (a.idDestinatario < b.idDestinatario) return -1;
  })
  return destinatari;
};

const destinatariSecondoArray = (serviziErogati) => {
  let destinatari = [];
  for (let i = 0; i < serviziErogati.length; i += 1) {
    let listaDestinatari = serviziErogati[i].listaDestinatariSecondoLivello;
    for (let j = 0; j < listaDestinatari.length; j += 1) {
      if (destinatari.length > 0) {
        let found = false;
        destinatari.forEach((elemento) => {
          if (elemento.idDestinatario === listaDestinatari[j].idDestinatario)
            found = true;
        })
        if (!found)
          destinatari.push(listaDestinatari[j]);
      }
      else
        destinatari.push(listaDestinatari[j]);
    }
  }
  destinatari.sort((a, b) => {
    if (a.idDestinatario < b.idDestinatario) return -1;
  })
  return destinatari;
};

const tipoServizioArray = (serviziErogati, tipologieServizio) => {
  let tipoServEntiFiltrati = [];
  for (let i = 0; i < serviziErogati.length; i += 1) {
    if (!tipoServEntiFiltrati.includes(serviziErogati[i].cd_tipo_servizio_erog)) {
      tipoServEntiFiltrati.push(serviziErogati[i].cd_tipo_servizio_erog);
    }
  };
  /** Se negli enti filtrati è incluso un ente misto individuale/colletivo,
   * allora non filtro l'arrai di tipologieServizio. (formato da id e descrizione)
   */
  return tipoServEntiFiltrati.includes(3) ? tipologieServizio : tipologieServizio.filter(el => tipoServEntiFiltrati.includes(el.cdServizio));
};

const tipologiaOfferta = (serviziErogati) => {
  let offerta = [];
  for (let i = 0; i < serviziErogati.length; i += 1) {
    let listaPagamento = serviziErogati[i].listaModalitaPagamento;
    for (let j = 0; j < listaPagamento.length; j += 1) {
      if (offerta.length > 0) {
        let found = false;
        for (let z = 0; z < offerta.length; z += 1) {
          if (offerta[z].cdOfferta === listaPagamento[j].cdOfferta)
            found = true;
        }
        if (!found && (listaPagamento[j].cdOfferta === 1 || listaPagamento[j].cdOfferta === 2))
          offerta.push({ cdOfferta: 1, tl_valore_testuale: { it: "Gratuito" } });
        else if (!found && listaPagamento[j].cdOfferta === 3)
          offerta.push({ cdOfferta: 3, tl_valore_testuale: { it: "Pagamento" } });
      }
      else {
        if (listaPagamento[j].cdOfferta === 1 || listaPagamento[j].cdOfferta === 2)
          offerta.push({ cdOfferta: 1, tl_valore_testuale: { it: "Gratuito" } });
        else if (listaPagamento[j].cdOfferta === 3)
          offerta.push({ cdOfferta: 3, tl_valore_testuale: { it: "Pagamento" } });
      }
    }
  }
  offerta.sort((a, b) => {
    if (a.cdOfferta < b.cdOfferta) return -1;
  })
  return offerta;
}

const findSecondLevel = (destinatariPrimoLivello, selectedValue, locale, stateCallback) => {
  let secondoLivello = [];
  for (let i = 0; i < destinatariPrimoLivello.length; i += 1)
    for (let j = 0; j < selectedValue.length; j += 1) {
      if (destinatariPrimoLivello[i].value === selectedValue[j].id) {
        for (let z = 0; z < destinatariPrimoLivello[i].secondoLivello.length; z += 1) {
          let found = -1;

          for (let t = 0; t < secondoLivello.length; t += 1)
            if (secondoLivello[t].value === destinatariPrimoLivello[i].secondoLivello[z].idDestinatario)
              found = i;
          if (found === -1)
            secondoLivello.push({
              value: destinatariPrimoLivello[i].secondoLivello[z].idDestinatario,
              textValue: destinatariPrimoLivello[i].secondoLivello[z].txDestinatario[locale]
            })
        }
      }
    }
  stateCallback.bind(this);
  stateCallback(secondoLivello);
};

const Filtri = ({
  AddFilter,
  locale,
  ResetEnti,
  filtri,
  enti,
  entiFiltrati,
  loaded,
  removeFilters,
  initialValue,
}) => {

  const [filteredDestinatariSecondoValue, setFilteredDestinatariSecondoValue] = useState([]);
  const [firstTime, setFirstTime] = useState(true);

  let prezzoMax,
    ORA_EROGAZIONE_SRV,
    listaDestinatari,
    listaMansioni,
    tipoServizio, tipoOfferta,
    listaDestinatariSecondoLivello;

  ORA_EROGAZIONE_SRV = useMemo(() => periodiErogazioneArray(entiFiltrati), [firstTime]);
  listaDestinatari = useMemo(() => destinatariArray(entiFiltrati), [firstTime]);
  listaMansioni = useMemo(() => mansioniArray(entiFiltrati), [firstTime]);
  tipoOfferta = useMemo(() => tipologiaOfferta(entiFiltrati), [firstTime]);
  tipoServizio = useMemo(() => tipoServizioArray(entiFiltrati, enti['dTipoServizioAll']), [firstTime]);
  listaDestinatariSecondoLivello = useMemo(() => destinatariSecondoArray(entiFiltrati), [firstTime]);

  const destinatariPrimoLivelloSelect =
  listaDestinatari && listaDestinatariSecondoLivello?
    listaDestinatari.map((destinatario) => {
      let destinatari = [];

      for(let i=0; i<listaDestinatariSecondoLivello.length; i+=1)
        if(destinatario.idDestinatario===listaDestinatariSecondoLivello[i].idDestinatarioPrimoLivello)
          destinatari.push(listaDestinatariSecondoLivello[i])
      return {
        value: destinatario.idDestinatario,
        textValue: destinatario.txDestinatario[locale],
        secondoLivello: destinatari,
      };
    }) : [];


  useEffect(() => {
    if (firstTime) {
      removeFilters('filtri');
      setFirstTime(false);
    }
    if (filtri && filtri.destinatariLiv1 && filtri.destinatariLiv1.length > 0) {
      findSecondLevel(destinatariPrimoLivelloSelect,
        filtri.destinatariLiv1,
        locale,
        setFilteredDestinatariSecondoValue)
    }
  }, [filtri, locale, destinatariPrimoLivelloSelect]);

  const getPagamentoValue = value => {
    AddFilter({
      ...filtri,
      offerta: value ? [1, 2] : [3],
      showPrice: showPrice([value])
    })
    ResetEnti([]);
  };

  const tipoOffertaFunction = (modalitaPagamento) => {
    let offerta = [];
    for (let i = 0; i < modalitaPagamento.length; i += 1) {
      let found = false;
      for (let j = 0; j < offerta.length; j += 1)
        if (offerta[j].value === modalitaPagamento[i].cdOfferta)
          found = true;
      if (!found) {
        offerta.push({
          value: modalitaPagamento[i].cdOfferta === 1 || modalitaPagamento[i].cdOfferta === 2 ? 1 : 3,
          textValue: modalitaPagamento[i].tl_valore_testuale[locale],
        })
      }
    }
    return offerta;
  }

  const tipoOffertaSelect =
    tipoOfferta && tipoOffertaFunction(tipoOfferta);
  const showPrice = (pagamentoValue) => {
    let found = -1;
    for (let i = 0; i < pagamentoValue.length; i += 1)
      if (pagamentoValue[i].id === 3)
        found = i;
    if (found === -1)
      return false
    else
      return true;

  };

  const getSliderValue = valore => {
    ResetEnti([]);
    AddFilter({
      ...filtri,
      costo: valore,
    });
  };

  const getTipoServizioValue = (value) => {
    ResetEnti([]);
    AddFilter({
      ...filtri,
      tipologia: value,
    });
  };


  const getDestinatariPrimoValue = value => {
    ResetEnti([]);
    AddFilter({
      ...filtri,
      destinatariLiv1: value,
      openLiv2: value.length > 0,
    });
    if (value.length > 0) {
      findSecondLevel(destinatariPrimoLivelloSelect, value, locale, setFilteredDestinatariSecondoValue)
    }
  };


  const getDestinatariSecondoValue = value => {
    ResetEnti([]);
    AddFilter({
      ...filtri,
      destinatariLiv2: value,
    });
  };

  const getMansioneValue = value => {
    ResetEnti([]);
    AddFilter({
      ...filtri,
      mansione: value,
    });
  };

  const listaMansioniSelect =
    listaMansioni && listaMansioni.map((mansione) => (
      {
        value: mansione.idMansione,
        textValue: mansione.txTitoloMansione[locale],
      }
    ));


  const getOrarioValue = value => {
    AddFilter({
      ...filtri,
      orario: value,
    });
    ResetEnti([]);
  };

  const listaOrarioSelect =
    ORA_EROGAZIONE_SRV &&
    ORA_EROGAZIONE_SRV.map((orario) => {
      let chiavi = Object.keys(orario.tl_valore_testuale);
      for (let i = 0; i < chiavi.length; i++)
        if (locale === chiavi[i])
          return {
            value: orario.pg_visualizzazione,
            textValue: orario.tl_valore_testuale[locale],
          }
    });

  const numeroPersoneCheckboxes = tipoServizio.map(
    el => ({
      id: el.cdServizio,
      value: el.tl_valore_testuale[locale],
    }))
    // "Tutti" viene nascosto (equivale a selezionare contemporaneamente individuale e colletivo).
    .filter(item => item.id !== 3)
    .sort((a, b) => a.id - b.id);

  return (
    <Row fluid>
      <FilterTitle />
      {tipoOffertaSelect && tipoOffertaSelect.length > 0 ?
        (
          <OfferTypology
            getValue={getPagamentoValue}
          />
        ) :
        null
      }
      <PriceSlider
        enti={entiFiltrati}
        showPriceFilter={
          tipoOffertaSelect &&
          tipoOffertaSelect.find(el => el.value === 3) &&
          ((filtri && filtri.offerta &&
            filtri.offerta.includes(3)) || !filtri ||
            (filtri && !filtri.offerta))
        }
        getValue={getSliderValue}
        sliderValue={filtri && filtri.costo && filtri.costo}
        initialValue={initialValue}
      />

      {numeroPersoneCheckboxes && numeroPersoneCheckboxes.length ?
        (
          <ServiceTypology
            getValue={getTipoServizioValue}
            items={numeroPersoneCheckboxes}
          />
        )
        : null
      }

      {listaOrarioSelect && listaOrarioSelect.length > 0 ?
        (
          <When
            getValue={getOrarioValue}
            items={listaOrarioSelect}
          />
        )
        : null}

      {destinatariPrimoLivelloSelect && destinatariPrimoLivelloSelect.length > 0 &&
        (
          <TargetLevel1
            getValue={getDestinatariPrimoValue}
            destinatariPrimoLivello={destinatariPrimoLivelloSelect}
            locale={locale}
          />
        )
      }

      <TargetLevel2
        showTarget2Filter={filteredDestinatariSecondoValue && filteredDestinatariSecondoValue.length > 0 && filtri && filtri.openLiv2 ? filtri.openLiv2 : false}
        getValue={getDestinatariSecondoValue}
        items={filteredDestinatariSecondoValue}
      />
      {listaMansioniSelect && listaMansioniSelect.length > 0 &&
        (
          <Tasks
            getValue={getMansioneValue}
            items={listaMansioniSelect}
          />
        )
      }
    </Row>
  );
};

Filtri.displayName = ' Filtri';

const mapStoreToProps = (store) => ({
  filtri: store.user.filtri,
  locale: store.locale,
  servizio: store.graphql.servizioSelezionato,
  MunicipioSelezionato: store.graphql.MunicipioSelezionato,
  loaded: store.graphql.loaded,
  EnteByServiceSearch: store.graphql.EnteByServiceSearch,
});

const mapDispatchToProps = {
  graphqlRequest,
  AddEnte,
  AddFilter,
  AddFilterData,
  resetField,
  removeFilters,
  ResetEnti,
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps,
)(Filtri);
