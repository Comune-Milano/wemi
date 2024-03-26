/** @format */

import React, { useState, useEffect } from 'react';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import { connect } from 'react-redux';
import { Row, Column } from 'components/ui/Grid';
import { NavLink, withRouter } from 'react-router-dom';
import Text from 'components/ui/Text';
import Button from 'components/ui/Button';
import MultiSelect from 'components/ui/MultiSelect';
import Input from 'components/ui/Input';
import Select from 'components/ui/Select';
import { AddClientError } from 'redux-modules/actions/errorActions';
import Wrapper from 'components/navigation/NavigationWrapper';
import withAuthentication from 'hoc/withAuthentication';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import {
  InserisciDatiIdentificativiEnte as InserisciDatiIdentificativiEnteQ,
  ModificaDatiIdentificativiEnte as ModificaDatiIdentificativiEnteQ,
  contenutoByTyS as contenutoByTySQ,
  dominioByTipoS as dominioByTipoSQ,
  EstraiDatiPropriEnte as EstraiDatiPropriEnteQ,
} from './enteGraphQL';

const DatiIdentificativiEnte = ({ spazi, categorie, dominioByTipoS, graphqlRequest, userProfile, match }) => {
  const { datiLogin } = userProfile;

  const IDente = Number.parseInt(match.params.idEnte, 10);
  const [refresh, setRefresh] = useState(false);
  const [controllo, setControllo] = useState(true);
  const [cont, setCont] = useState(true);


  const [P, setP] = useState({});
  const [statoDominio, setstatoDominio] = useState();
  const [labelStato, setLabelStato] = useState();
  const [spaziSelezionati, setSpaziSelezionati] = useState([]);
  const [categorieSelezionate, setCategorieSelezionate] = useState([]);


  const IdTy_spazi = 7;
  const IdTy_categorie = 13;
  const primo = 'spazi';
  const secondo = 'categorie';

  const [datiPropriEnteResponse, datiPropriEnteQ] = useGraphQLRequest(
    undefined,
    EstraiDatiPropriEnteQ,
    {},
    false
  );

  const datiPropriEnte = datiPropriEnteResponse?.data;

  useEffect(() => {
    if (IDente >= 0) {
      datiPropriEnteQ({ id_ente: Number.parseInt(IDente, 10) });
    }
  }, [IDente]);


  if (datiPropriEnte && (Object.entries(P).length === 0)) {
    setP({ ...datiPropriEnte });
  }

  const handleChange = (event) => {
    setstatoDominio(event.id.toString());
    setLabelStato(event.value);
  };


  useEffect(() => {
    graphqlRequest(dominioByTipoSQ('STATO_ENTE'));
    graphqlRequest(contenutoByTySQ(primo, IdTy_spazi));
    graphqlRequest(contenutoByTySQ(secondo, IdTy_categorie));
  }, [refresh, graphqlRequest]);


  useEffect(() => {
    // inizializzazione della variabile di stato P e statoDominio
    if (datiPropriEnte && IDente >= 0) {
      P.cd_stato_ente = datiPropriEnte.cd_stato_ente;
      P.nr_operatori_servizi_wemi = datiPropriEnte.nr_operatori_servizi_wemi;
      P.id_ente = datiPropriEnte.id_ente;
      P.ptx_email = datiPropriEnte.ptx_email;
      P.nm_ente = datiPropriEnte.nm_ente;
      P.id_utente = datiPropriEnte.id_utente;
      P.id_partita_iva_ente = datiPropriEnte.id_partita_iva_ente;
      P.nm_ente_completo = datiPropriEnte.nm_ente_completo;
      P.pg_versione = datiPropriEnte.pg_versione;
      P.tl_valore_testuale = datiPropriEnte.tl_valore_testuale;
      P.ts_variazione_stato = datiPropriEnte.ts_variazione_stato;
      setP(P);
      setstatoDominio(datiPropriEnte.cd_stato_ente);
    }
  }, [datiPropriEnte]);


  const arr = [];
  const arr2 = [];

  useEffect(() => {
    // inizializzazione select e multiselect
    if (IDente < 0) {
      setLabelStato('Bozza');
      setstatoDominio('1');
    }
    if (IDente > 0) {
      if (dominioByTipoS) {
        let controllo = true;
        dominioByTipoS.map((el) => {
          if (el.value == 21) controllo = false;
        });
        if (controllo) {
          dominioByTipoS.pop();
          dominioByTipoS.push({ value: 21, textValue: 'in compilazione' });
          dominioByTipoS.push({ value: 22, textValue: 'compilata' });
          dominioByTipoS.push({ value: 30, textValue: 'da correggere' });
          dominioByTipoS.push({ value: 31, textValue: 'validata' });
          dominioByTipoS.push({ value: 4, textValue: 'disattivato' });
        }
      }
      if (dominioByTipoS) {
        dominioByTipoS.map((el) => {
          if (datiPropriEnte && el.value == datiPropriEnte.cd_stato_ente) setLabelStato(el.textValue);
          datiPropriEnte && setstatoDominio(datiPropriEnte.cd_stato_ente);
        });
      }
      if (spazi && spazi.contenutoByTyS && datiPropriEnte) {
        for (let i = 0; i < spazi.contenutoByTyS.length; i++) {
          datiPropriEnte.id_spazio_wemi.map((el) => { if (el == spazi.contenutoByTyS[i].value) arr.push({ id: el, value: spazi.contenutoByTyS[i].textValue }); });
        }

        setSpaziSelezionati(arr);
      }

      if (categorie && categorie.contenutoByTyS && datiPropriEnte) {
        for (let i = 0; i < categorie.contenutoByTyS.length; i++) {
          datiPropriEnte.id_cat_accreditamento.map((el) => { if (el == categorie.contenutoByTyS[i].value) arr2.push({ id: el, value: categorie.contenutoByTyS[i].textValue }); });
        }

        setCategorieSelezionate(arr2);
      }
    }
  }, [dominioByTipoS, datiPropriEnte, spazi && spazi.contenutoByTyS, categorie && categorie.contenutoByTyS]);


  const handleMultiSelectSpazi = (option) => {
    setControllo(!controllo);
    setSpaziSelezionati(option);
  };

  const handleMultiSelectCategorie = (option) => {
    setControllo(!controllo);
    setCategorieSelezionate(option);
  };

  const CatchKey = event => {
    P[event.target.id] = event.target.value;
    // ?
    //   (event.target.value == "null" ? null : event.target.value)
    //   : P[event.target.id];
    setControllo(!controllo);
    setP(P);
  };

  const UPDente = () => {
    const arr1 = [];
    const arr2 = [];
    const finalOBJ = {};
    Array.from(spaziSelezionati).map(ele => {
      arr1.push(ele.id);
    });
    Array.from(categorieSelezionate).map(ele => {
      arr2.push(ele.id);
    });
    finalOBJ.id_partita_iva_ente = P.id_partita_iva_ente;
    finalOBJ.nm_ente = P.nm_ente;
    finalOBJ.nr_operatori_servizi_wemi = P.nr_operatori_servizi_wemi;
    finalOBJ.nm_ente_completo = P.nm_ente_completo;
    finalOBJ.ptx_email = P.ptx_email;
    finalOBJ.cd_stato_ente = statoDominio;
    finalOBJ.id_spazio_wemi = arr1;
    finalOBJ.id_cat_accreditamento = arr2;
    finalOBJ.idCittadino = datiLogin.idCittadino;

    if (IDente >= 0) graphqlRequest(ModificaDatiIdentificativiEnteQ(IDente, finalOBJ));
    else {
      graphqlRequest(InserisciDatiIdentificativiEnteQ(finalOBJ));
    }
    // sessionStorage.setItem('flag_refresh', true)
  };
  return (
    <div>
      {datiPropriEnte && IDente == datiPropriEnte.id_ente ? (
        <Wrapper>
          <Text lg="12" xs="12" size="f0" align="center" tag="p" value="Dati Identificativi Ente" />

          <Row division={12}>
            <Column lg="6">
              {IDente >= 0 && datiPropriEnte ? (
                <Input
                  material
                  intlLabel="Nome Chiave Ente"
                  id="nm_ente"
                  initialValue={datiPropriEnte.nm_ente}
                  onChange={CatchKey}
                  required
                />
              ) :
                IDente < 0 && (
                  <Input
                    material
                    intlLabel="Nome Chiave Ente"
                    id="nm_ente"
                    onChange={CatchKey}
                    required
                  />
                )}
            </Column>

            <Column lg="6">
              {IDente >= 0 && datiPropriEnte ? (
                <Input
                  material
                  intlLabel="Email Amministratore Ente"
                  id="ptx_email"
                  initialValue={datiPropriEnte.ptx_email}
                  onChange={CatchKey}
                  required
                />
              )
                :
                IDente < 0 && (
                  <Input
                    material
                    intlLabel="Email Amministratore Ente"
                    id="ptx_email"
                    onChange={CatchKey}
                    required
                  />
                )}
            </Column>
          </Row>

          <Row division={12}>
            <Column lg="12">
              {IDente >= 0 && datiPropriEnte ? (
                <Input
                  material
                  intlLabel="Partita IVA"
                  maxLength={11}
                  id="id_partita_iva_ente"
                  initialValue={datiPropriEnte.id_partita_iva_ente}
                  onChange={CatchKey}
                  required
                />
              )
                :
                IDente < 0 && (
                  <Input
                    material
                    intlLabel="Partita IVA"
                    maxLength={11}

                    id="id_partita_iva_ente"
                    onChange={CatchKey}
                    required
                  />
                )}
            </Column>
          </Row>

          <Row division={12}>
            <Column lg="12">
              {IDente >= 0 && datiPropriEnte ? (
                <Input
                  material
                  intlLabel="Nome completo di ragione sociale"
                  id="nm_ente_completo"
                  initialValue={datiPropriEnte.nm_ente_completo}
                  getValue={() => { }}
                  onChange={CatchKey}
                  required
                />
              )
                :
                IDente < 0 && (
                  <Input
                    material
                    intlLabel="Nome completo di ragione sociale"
                    id="nm_ente_completo"
                    getValue={() => { }}
                    onChange={CatchKey}
                    required
                  />
                )}
            </Column>
          </Row>

          <Row division={12}>
            <Column lg="12">
              {spazi && spaziSelezionati.length > 0 && spazi.contenutoByTyS ? (
                <MultiSelect
                  material
                  name="Spazi Wemi Gestiti"
                  items={spazi.contenutoByTyS}
                  intlFormatter
                  selectedArrDefault={spaziSelezionati}
                  getValue={handleMultiSelectSpazi}
                />
              )
                :
                spazi && spazi.contenutoByTyS && (
                  <MultiSelect
                    material
                    name="Spazi Wemi Gestiti"
                    items={spazi.contenutoByTyS}
                    intlFormatter
                    getValue={handleMultiSelectSpazi}

                  />
                )}
            </Column>
          </Row>

          <Row>

            <Column lg="6">
              {dominioByTipoS ? (
                <Select
                  material
                  name="Stato:"
                  getValue={handleChange}
                  items={dominioByTipoS}
                  selectedValue={{ value: labelStato }}
                  intlFormatter
                  required
                  intlPlaceholder="Stato:"
                />
              )
                : null
              }
            </Column>
            <Column lg="6">
              {IDente >= 0 && datiPropriEnte ? (
                <Input
                  type="number"
                  min={0}
                  material
                  intlLabel="Operatori servizi WeMi"
                  id="nr_operatori_servizi_wemi"
                  initialValue={datiPropriEnte.nr_operatori_servizi_wemi}
                  onChange={CatchKey}
                />
              )
                :
                null
              }
            </Column>
          </Row>

          <Row division={12}>
            <Column lg="12">
              {categorie ? (
                <MultiSelect
                  selectedArrDefault={categorieSelezionate}
                  material
                  name="Categorie accreditate"
                  items={categorie.contenutoByTyS}
                  intlFormatter
                  required
                  getValue={handleMultiSelectCategorie}
                />
              )
                : null}
            </Column>
          </Row>

          <Row justifycontent="space-around">
            <Column xs="12" md="3">
              <NavLink to="/gestioneEnti" width="100%">
                <Button type="cancel" value="Annulla" fontSize="f7" />
              </NavLink>
            </Column>
            {controllo ?
              IDente < 0 ? (
                <Column xs="12" md="3">
                  {(P.id_partita_iva_ente != '' && P.nm_ente != '' && P.nm_ente_completo != ''
                    && P.ptx_email != '' && labelStato != '' && categorieSelezionate != '') ? (
                      <NavLink to="/gestioneEnti" width="100%">

                        <Button
                          type="default"
                          onClick={UPDente}
                          value="Conferma"
                          fontSize="f7"
                        />
                      </NavLink>
                    )
                    : (
                      <Button
                        disabled
                        type="disabled"
                        value="Conferma"
                        fontSize="f7"
                      />
                    )}
                </Column>
              )
                : IDente >= 0 ? (
                  <Column xs="12" md="3">
                    {(P.id_partita_iva_ente != '' && P.nm_ente != '' && P.nm_ente_completo != ''
                      && P.ptx_email != '' && labelStato != '' && categorieSelezionate != '') ? (
                        <NavLink to="/gestioneEnti" width="100%">

                          <Button
                            type="default"
                            onClick={UPDente}
                            value="Conferma"
                            fontSize="f7"
                          />
                        </NavLink>
                      )
                      :
                        <Button disabled type="disabled" value="Conferma" fontSize="f7" />
                    }
                  </Column>
                ) : null
              :
              IDente < 0 ? (
                <Column xs="12" md="3">
                  {(P.id_partita_iva_ente != '' && P.nm_ente != '' && P.nm_ente_completo != ''
                    && P.ptx_email != '' && labelStato != '' && categorieSelezionate != '') ? (
                      <NavLink to="/gestioneEnti" width="100%">

                        <Button
                          type="default"
                          onClick={UPDente}
                          value="Conferma"
                          fontSize="f7"
                        />
                      </NavLink>
                    )
                    : (
                      <Button
                        disabled
                        type="disabled"
                        value="Conferma"
                        fontSize="f7"
                      />
                    )}
                </Column>
              )
                :
                IDente >= 0 && (
                  <Column xs="12" md="3">
                    {(P.id_partita_iva_ente != '' && P.nm_ente != '' && P.nm_ente_completo != ''
                      && P.ptx_email != '' && labelStato != '' && categorieSelezionate != '') ? (
                        <NavLink to="/gestioneEnti" width="100%">

                          <Button
                            type="default"
                            onClick={UPDente}
                            value="Conferma"
                            fontSize="f7"
                          />
                        </NavLink>
                      )
                      :
                        <Button disabled type="disabled" value="Conferma" fontSize="f7" />
                    }
                  </Column>
                )}
          </Row>
        </Wrapper>
      )
        : IDente < 0 && (
          <Wrapper>
            {/* per i nuovi        */}
            <Text lg="12" xs="12" size="f0" align="center" tag="p" value="Dati Identificativi Ente" />

            <Row division={12}>
              <Column lg="6">
                {IDente >= 0 && datiPropriEnte ? (
                  <Input
                    material
                    intlLabel="Nome Chiave Ente"
                    id="nm_ente"
                    initialValue={datiPropriEnte.nm_ente}
                    onChange={CatchKey}
                    required
                  />
                ) :
                  IDente < 0 && (
                    <Input
                      material
                      intlLabel="Nome Chiave Ente"
                      id="nm_ente"
                      onChange={CatchKey}
                      required
                    />
                  )}
              </Column>

              <Column lg="6">
                {IDente < 0 ? (
                  <Input
                    material
                    intlLabel="Email Amministratore Ente"
                    id="ptx_email"
                    onChange={CatchKey}
                    required
                  />
                )
                  :
                  null
                }
              </Column>
            </Row>

            <Row division={12}>
              <Column lg="12">

                <Input
                  material
                  intlLabel="Partita IVA"
                  maxLength={11}

                  id="id_partita_iva_ente"
                  onChange={CatchKey}
                  required
                />


              </Column>
            </Row>

            <Row division={12}>
              <Column lg="12">

                <Input
                  material
                  intlLabel="Nome completo di ragione sociale"
                  id="nm_ente_completo"
                  getValue={() => { }}
                  onChange={CatchKey}
                  required
                />


              </Column>
            </Row>

            <Row division={12}>
              <Column lg="12">
                {spazi && spaziSelezionati.length > 0 && spazi.contenutoByTyS ? (
                  <MultiSelect
                    material
                    name="Spazi Wemi Gestiti"
                    items={spazi.contenutoByTyS}
                    intlFormatter
                    selectedArrDefault={spaziSelezionati}
                    getValue={handleMultiSelectSpazi}
                  />
                )
                  :
                  spazi && spazi.contenutoByTyS && (
                    <MultiSelect
                      material
                      name="Spazi Wemi Gestiti"
                      items={spazi.contenutoByTyS}
                      intlFormatter
                      getValue={handleMultiSelectSpazi}

                    />
                  )}
              </Column>
            </Row>

            <Row>

              <Column lg="6">
                {dominioByTipoS ? (
                  <Select
                    material
                    name="Stato:"
                    getValue={handleChange}
                    items={[{ value: 1, textValue: 'Bozza' }]}
                    selectedValue={{ value: labelStato }}
                    intlFormatter
                    required
                    intlPlaceholder="Stato:"
                  />
                )
                  : null
                }
              </Column>
              <Column lg="6">
                {IDente >= 0 && datiPropriEnte ? (
                  <Input
                    type="number"
                    min={0}
                    material
                    intlLabel="Operatori servizi WeMi"
                    id="nr_operatori_servizi_wemi"
                    initialValue={datiPropriEnte.nr_operatori_servizi_wemi}
                    onChange={CatchKey}
                  />
                )
                  :
                  IDente < 0 && (
                    <Input
                      type="number"
                      min={0}
                      material
                      intlLabel="Operatori servizi WeMi"
                      id="nr_operatori_servizi_wemi"
                      onChange={CatchKey}
                    />
                  )}
              </Column>
            </Row>

            <Row division={12}>
              <Column lg="12">
                {categorie ? (
                  <MultiSelect
                    selectedArrDefault={categorieSelezionate}
                    material
                    name="Categorie accreditate"
                    items={categorie.contenutoByTyS}
                    intlFormatter
                    required
                    getValue={handleMultiSelectCategorie}
                  />
                )
                  : null}
              </Column>
            </Row>

            <Row justifycontent="space-around">
              <Column xs="12" md="3">
                <NavLink to="/gestioneEnti" width="100%">
                  <Button type="cancel" value="Annulla" fontSize="f7" />
                </NavLink>
              </Column>
              {controllo ?
                IDente < 0 ? (
                  <Column xs="12" md="3">
                    {(P.id_partita_iva_ente != '' && P.nm_ente != '' && P.nm_ente_completo != ''
                      && P.ptx_email != '' && labelStato != '' && categorieSelezionate != '') ? (
                        <NavLink to="/gestioneEnti" width="100%">

                          <Button
                            type="default"
                            onClick={UPDente}
                            value="Conferma"
                            fontSize="f7"
                          />
                        </NavLink>
                      )
                      : (
                        <Button
                          disabled
                          type="disabled"
                          value="Conferma"
                          fontSize="f7"
                        />
                      )}
                  </Column>
                )
                  : IDente >= 0 ? (
                    <Column xs="12" md="3">
                      {(P.id_partita_iva_ente != '' && P.nm_ente != '' && P.nm_ente_completo != ''
                        && P.ptx_email != '' && labelStato != '' && categorieSelezionate != '') ? (
                          <NavLink to="/gestioneEnti" width="100%">

                            <Button
                              type="default"
                              onClick={UPDente}
                              value="Conferma"
                              fontSize="f7"
                            />
                          </NavLink>
                        )
                        :
                          <Button disabled type="disabled" value="Conferma" fontSize="f7" />
                      }
                    </Column>
                  ) : null
                :
                IDente < 0 ? (
                  <Column xs="12" md="3">
                    {(P.id_partita_iva_ente != '' && P.nm_ente != '' && P.nm_ente_completo != ''
                      && P.ptx_email != '' && labelStato != '' && categorieSelezionate != '') ? (
                        <NavLink to="/gestioneEnti" width="100%">

                          <Button
                            type="default"
                            onClick={UPDente}
                            value="Conferma"
                            fontSize="f7"
                          />
                        </NavLink>
                      )
                      : (
                        <Button
                          disabled
                          type="disabled"
                          value="Conferma"
                          fontSize="f7"
                        />
                      )}
                  </Column>
                )
                  :
                  IDente >= 0 && (
                    <Column xs="12" md="3">
                      {(P.id_partita_iva_ente != '' && P.nm_ente != '' && P.nm_ente_completo != ''
                        && P.ptx_email != '' && labelStato != '' && categorieSelezionate != '') ? (
                          <NavLink to="/gestioneEnti" width="100%">

                            <Button
                              type="default"
                              onClick={UPDente}
                              value="Conferma"
                              fontSize="f7"
                            />
                          </NavLink>
                        )
                        :
                          <Button disabled type="disabled" value="Conferma" fontSize="f7" />
                      }
                    </Column>
                  )}
            </Row>
          </Wrapper>
        )}
    </div>
  );
};

const mapDispatchToProps = {
  graphqlRequest,
  AddClientError,
};

function mapStateToProps(state) {
  const { graphql } = state;
  const { InserisciDatiIdentificativiEnte, ModificaDatiIdentificativiEnte, contenutoByTyS, dominioByTipoS, spazi, categorie, error, entePK } = graphql;
  // const { datiLogin } = state;
  return {
    InserisciDatiIdentificativiEnte,
    ModificaDatiIdentificativiEnte,
    contenutoByTyS,
    dominioByTipoS,
    spazi,
    categorie,
    error,
    entePK,
  };
}

DatiIdentificativiEnte.displayName = 'DatiIdentificativiEnte';

export default withAuthentication(connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DatiIdentificativiEnte)));
