
import React, { useState, useEffect } from 'react';
import { Row, Column } from 'components/ui/Grid';
import Input from 'components/ui/Input';
import { colors } from 'theme';
import Table from 'components/ui/Table';
import Select from 'components/ui/Select';
import Pagination from 'components/ui/Pagination';
import Tooltip from 'components/ui/Tooltip';
import AnchorLink from 'components/ui/AnchorLink';
import FaIcon from 'components/ui/FaIcon';
import Text from 'components/ui/Text';
import Loader from 'components/ui/Loader';
import { graphqlRequest, resetField } from 'redux-modules/actions/authActions';
import { setFilter } from 'redux-modules/actions/filterActions';
import {
  dominioByTipoS as dominioByTipoSQ,
  EstraiContenutoCompleto as EstraiContenutoCompletoQ,
  // tipologiaContenutoPK as tipologiaContenutoPKQ
} from './adminGraphQL2';
import { getFooterLinks as getFooterLinksQ } from './adminGraphQL2';
import { contenutoTy as contenutoTyQ } from './adminGraphQL2';
import { statoContenutoUPD as statoContenutoUPDQ } from './adminGraphQL2';
import { estraiVociMenu as estraiVociMenuQ } from 'components/navigation/HandleContents/handleContents003/ContenutoMediaPKGraphQL';
import { connect } from 'react-redux';
import NavLink from 'components/router/NavLink';
import ModalSpaceWeMi from 'components/navigation/Spaces/partials/Modal';
import { isNullOrUndefined } from 'util';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { tipologiaContenutoPK as tipologiaContenutoPKQ} from './graphql/tipologiaContenuto';
import { getContenutoTy as getContenutoTyQ } from './graphql/getContenutoTy'; 
import { getDominioByTipoS as getDominioByTipoSQ } from './graphql/getDominioByTipo'; 
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';

var data

const Tabella = ({ 
  typeContenuto,
  numberitem = 10,
  pagenumber = 1,
  // dominioByTipoS,
  // contenutoTy,
  // tipologiaContenutoPK,
  graphqlRequest,
  statoContenutoUPD,
  locale,
  loaded,
  // resetField,
  // filters,
  // setFilter,
  }) => {
  const [filters, setFilters] = useState({ricerca: '', statoCnt: { id: 0, value: 'Tutti gli stati' }});

  const [currentPage, setCurrentPage] = useState(pagenumber);
  const indexOfLastItem = currentPage * numberitem;
  const indexOfFirstItem = indexOfLastItem - numberitem;
  // const [ricerca, setRicerca] = useState('')
  let currentItems;
  let totalItems;
  const [refresh, SetRefresh] = useState(false);
  const [ItemSelected, SetItemSelected] = useState('Seleziona uno stato');
  const [popupInformativo, setPopupInformativo] = useState(false);
  const [indice, setIndice] = useState(0)
  // const [NewContent, setNewContent] = useState(0);

  let ricerca = filters && filters.ricerca;

  /**
   * Request to get the domain of the selected type of content
   */
  const [typeStateOfContent] = useGraphQLRequest(
    undefined,
    getDominioByTipoSQ,
    {
      typeDominio: 'STATO_CONTENUTO'
    },
    true
  );
   /**
   * Request to get the contents of the selected type
   */
  const [contenutoTyData, getContenutoTyData] = useGraphQLRequest(
    undefined,
    getContenutoTyQ,
    {
      typeContenuto
    },
    true
  );

  const contenutoTy = contenutoTyData.data;

  if (contenutoTy) {
    // Ordino per id_contenuto_rif e pg_versione
    let sortedContenutoTy = contenutoTy.sort((a, b) => {
      if ((a.id_contenuto_rif + a.pg_versione) > (b.id_contenuto_rif + b.pg_versione)){
      return -1
      }
      else{
        return null;
      }
    })
    totalItems = ricerca && ricerca.length > 0 ?
    sortedContenutoTy.filter(el => el.tl_testo_1.it.toLowerCase().includes(ricerca)
        || el.tl_testo_1.it.includes(ricerca)
        || el.tl_testo_1.it.toUpperCase().includes(ricerca))    
      : sortedContenutoTy;
    currentItems = totalItems.slice(indexOfFirstItem, indexOfLastItem);
  }
  /**
   * Request to get the description of the selected type of contents
   */
  const [tipologiaContenuto] = useGraphQLRequest(
    undefined,
    tipologiaContenutoPKQ,
    {
      typeContenuto
    },
    true
  ); 
 
 
  useEffect(() => {
    if(filters.statoCnt)  {
      getContenutoTyData({
        typeContenuto,
        statoContenuto: filters.statoCnt.id
      });
    }

    if(!filters.statoCnt)
    getContenutoTyData({
      typeContenuto,
    });

  }, [refresh, statoContenutoUPD, filters]);

  
  const handleUpdateRow = id => {
    graphqlRequest(EstraiContenutoCompletoQ(id));
  }


  const handlePublish = id => {
    const status = 2
    const ut = 1
    graphqlRequest(statoContenutoUPDQ(id, status, ut))
    SetRefresh(!refresh); //window.location.reload();
  }



  const handleBlock = id => {
    const status = 3
    const ut = 1
    graphqlRequest(statoContenutoUPDQ(id, status, ut))
    SetRefresh(!refresh); //window.location.reload();
  }

  const funCallbk = async (option) => {
    setCurrentPage(1)
    setFilters({...filters, statoCnt: option });
  }

  const handleSearch = event => {
    const searchWord = event.target.value;
    setCurrentPage(1)
    setFilters({...filters, ricerca: searchWord  });
  };

  //---------------- Interpolazione di una variabile di comodo ----------------
  let dummy = []

  if (currentItems) {
    currentItems.map((cont,index) => {

      const Draft = (cont.cd_stato_contenuto === 1)
      const Published = (cont.cd_stato_contenuto === 2)
      const Deactivated = (cont.cd_stato_contenuto === 3)
      //if (ricerca == null || ricerca == "" || cont.tl_testo_1.it.includes(ricerca) || (cont.tl_testo_1.it.toUpperCase()).includes(ricerca) || (cont.tl_testo_1.it.toLowerCase()).includes(ricerca)) {
      if (cont.cd_stato_contenuto) {
        let json = {
          id: cont.id_contenuto,

        };
        if (parseInt(window.location.pathname.split('cnt/')[1]) === 7)
          json.testo_1 =
          <AnchorLink key={index.toString()} onClick={() => { setPopupInformativo(true);  setIndice(index) }} value={cont.tl_testo_1 ? cont.tl_testo_1.it : ''} size="f8" decoration="underline" color="darkGrey" />
        else if ((parseInt(window.location.pathname.split('cnt/')[1]) === 2 || 
        parseInt(window.location.pathname.split('cnt/')[1]) === 10 ||  parseInt(window.location.pathname.split('cnt/')[1]) === 11)
        && cont.ty_sottotipo_contenuto === 2)

          json.testo_1 =
 
              <NavLink key={index.toString()} to={`/PaginaInformativa/${cont.id_contenuto}`} width="100%" align="center">
                <Text value={cont.tl_testo_1 ? cont.tl_testo_1.it : ''} size="f8" decoration="underline" color="darkGrey" />
              </NavLink>
       
        else
          json.testo_1 = <Text key={index.toString()} value={cont.tl_testo_1 ? cont.tl_testo_1.it : ''} size="f8" />
        json.progressivo = cont.nr_ordine_visualizzazione;
        json.versione = cont.pg_versione;
        json.stato = cont.cd_stato_contenuto_desc;
        json.azioni = 
          <Row fluid padding="0" justifycontent="center" key={index.toString()}>


            {
              Draft && <>

                <Column xs="2" flex justifycontent="center" padding="1em 0" margin="0"
                  id={cont.id_contenuto}
                  onClick={() => handlePublish(cont.id_contenuto)}
                >


                  <Tooltip
                    top
                    horizzontalShift="-1em"
                    fontSize="f8"
                    textTT={`Pubblica`}
                    color="white"
                    bgcolor="green">
                    <FaIcon icon="\f093"
                      radius="50%"
                      noShadow
                      width="2em"
                      height="2em"
                      bgcolor="green"
                      fontSize="f8"
                      padding="0.5em"
                      color="white"
                      onClick={() => { window.location.pathname.split('/')[5]===9 &&  currentItems.map((elemento)=>{ if (elemento.id_contenuto !==cont.id_contenuto){return(handleBlock(elemento.id_contenuto))} else{return null;} }) ; (window.location.pathname.split('/')[5] === 10 || window.location.pathname.split('/')[5] === 11) && graphqlRequest(getFooterLinksQ()); handlePublish(cont.id_contenuto); (window.location.pathname.split('/')[5] === 1 || window.location.pathname.split('/')[5] === 2) && graphqlRequest(estraiVociMenuQ()); (window.location.pathname.split('/')[5] === 10 || window.location.pathname.split('/')[5] === 11) && graphqlRequest(getFooterLinksQ()); }} />
                  </Tooltip>
                </Column>
                <Column xs="2" flex justifycontent="center" padding="1em 0" margin="0">
                  <Tooltip
                    top
                    horizzontalShift="-1em"
                    fontSize="f8"
                    textTT={`Disattiva`}
                    color="white"
                    bgcolor="red">
                    <FaIcon icon="\f068"
                      radius="50%"
                      noShadow
                      width="2em"
                      height="2em"
                      color="white"
                      fontSize="f8"
                      padding="0.5em"
                      bgcolor="red"
                      onClick={() => { handleBlock(cont.id_contenuto); (window.location.pathname.split('/')[5] === 10 || window.location.pathname.split('/')[5] === 11) && graphqlRequest(getFooterLinksQ()); (window.location.pathname.split('/')[5] === 1 || window.location.pathname.split('/')[5] === 2) && graphqlRequest(estraiVociMenuQ()); }} />
                  </Tooltip>
                </Column>
                <Column xs="2" flex justifycontent="center" padding="1em 0" margin="0" >
                  <Tooltip
                    onClick={() => handleUpdateRow(cont.id_contenuto)}
                    top
                    horizzontalShift="-1em"
                    fontSize="f8"
                    textTT={`Modifica`}
                    color="white"
                    bgcolor="blue">

                    <NavLink to={`/admin/${window.location.pathname.split('admin/')[1].split('/cnt')[0]}/cnt/${typeContenuto}/crud/${cont.id_contenuto}`} >
                      <FaIcon icon="\f303"
                        radius="50%"
                        noShadow
                        width="2em"
                        height="2em"
                        bgcolor="blue"
                        fontSize="f8"
                        padding="0.5em"
                        color="white"
                        onClick={() => handleUpdateRow(cont.id_contenuto)} />

                    </NavLink>
                  </Tooltip>
                </Column>
              </>
            }

            {
              Published &&
              // <Column lg="6" flex justifycontent="center" padding="1em 0" margin="0">
              //   <Button 
              //     fontSize="f9" onClick={() =>{ graphqlRequest(getFooterLinksQ()); handleSaveDraft(cont.id_contenuto);graphqlRequest(estraiVociMenuQ());graphqlRequest(getFooterLinksQ()); }
              //      }
              //     type={'default'}
              //     value={'Cambia in bozza'} />
              // </Column>
              <>


                <Column xs="2" flex justifycontent="center" padding="1em 0" margin="0">
                  <Tooltip
                    top
                    horizzontalShift="-1em"
                    fontSize="f8"
                    textTT={`Disattiva`}
                    color="white"
                    bgcolor="red">
                    <FaIcon icon="\f068"
                      radius="50%"
                      noShadow
                      width="2em"
                      height="2em"
                      color="white"
                      fontSize="f8"
                      padding="0.5em"
                      bgcolor="red"
                      onClick={() => { handleBlock(cont.id_contenuto); (window.location.pathname.split('/')[5] === 10 || window.location.pathname.split('/')[5] === 11) && graphqlRequest(getFooterLinksQ()); (window.location.pathname.split('/')[5] === 1 || window.location.pathname.split('/')[5] === 2) && graphqlRequest(estraiVociMenuQ()); }} />
                  </Tooltip>
                </Column>
                <Column xs="2" flex justifycontent="center" padding="1em 0" margin="0" >
                  <Tooltip
                    onClick={() => handleUpdateRow(cont.id_contenuto)}
                    top
                    horizzontalShift="-1em"
                    fontSize="f8"
                    textTT={`Modifica`}
                    color="white"
                    bgcolor="blue">

                    <NavLink to={`/admin/${window.location.pathname.split('admin/')[1].split('/cnt')[0]}/cnt/${typeContenuto}/crud/${cont.id_contenuto}`} >
                      <FaIcon icon="\f303"
                        radius="50%"
                        noShadow
                        width="2em"
                        height="2em"
                        bgcolor="blue"
                        fontSize="f8"
                        padding="0.5em"
                        color="white"
                        onClick={() => handleUpdateRow(cont.id_contenuto)} />

                    </NavLink>
                  </Tooltip>
                </Column>
              </>
            }
            {
              Deactivated &&
              // <Column lg="6" flex justifycontent="center" padding="1em 0" margin="0">
              //   <Button 
              //     fontSize="f9" onClick={() => handleSaveDraft(cont.id_contenuto)}
              //     type={'primary'}
              //     value={'Riattiva'} />
              // </Column>

              <>

                <Column xs="2" flex justifycontent="center" padding="1em 0" margin="0"
                  id={cont.id_contenuto}
                  onClick={() => handlePublish(cont.id_contenuto)}
                >


                  <Tooltip
                    top
                    horizzontalShift="-1em"
                    fontSize="f8"
                    textTT={`Pubblica`}
                    color="white"
                    bgcolor="green">
                    <FaIcon icon="\f093"
                      radius="50%"
                      noShadow
                      width="2em"
                      height="2em"
                      bgcolor="green"
                      fontSize="f8"
                      padding="0.5em"
                      color="white"
                      onClick={() => { window.location.pathname.split('/')[5]===9 &&  currentItems.map((elemento)=>{ if (elemento.id_contenuto !==cont.id_contenuto){return(handleBlock(elemento.id_contenuto))} else{return null;} }) ; (window.location.pathname.split('/')[5] === 10 || window.location.pathname.split('/')[5] === 11) && graphqlRequest(getFooterLinksQ()); handlePublish(cont.id_contenuto); (window.location.pathname.split('/')[5] === 1 || window.location.pathname.split('/')[5] === 2) && graphqlRequest(estraiVociMenuQ()); (window.location.pathname.split('/')[5] === 10 || window.location.pathname.split('/')[5] === 11) && graphqlRequest(getFooterLinksQ()); }} />
                  </Tooltip>
                </Column>

                <Column xs="2" flex justifycontent="center" padding="1em 0" margin="0" >
                  <Tooltip
                    onClick={() => handleUpdateRow(cont.id_contenuto)}
                    top
                    horizzontalShift="-1em"
                    fontSize="f8"
                    textTT={`Modifica`}
                    color="white"
                    bgcolor="blue">

                    <NavLink to={`/admin/${window.location.pathname.split('admin/')[1].split('/cnt')[0]}/cnt/${typeContenuto}/crud/${cont.id_contenuto}`} >
                      <FaIcon icon="\f303"
                        radius="50%"
                        noShadow
                        width="2em"
                        height="2em"
                        bgcolor="blue"
                        fontSize="f8"
                        padding="0.5em"
                        color="white"
                        onClick={() => handleUpdateRow(cont.id_contenuto)} />

                    </NavLink>
                  </Tooltip>
                </Column>
              </>
            }
          </Row>

       
        dummy.push(json);
      }

    }

    )

    dummy = dummy.sort((a, b) => {
      if ((a.id + a.versione) > (b.id + b.versione)){
         return -1
      }
      else{
        return null;
      }
    })
  }
  data = {
    Colonne: ['Id', 'Descrizione', 'Progressivo', 'Versione', 'Stato', 'Azioni'],
    Righe: tipologiaContenuto.data && typeContenuto === tipologiaContenuto.data.id ? dummy : [],
  };
  return (
    <>


      <Row fluid padding="0 20px" justifycontent="flex-start">

        <Column xs="12" md="3" padding="1em 0">
          <Input material intlPlaceholder="Cerca" intlLabel="Ricerca per descrizione" 
          initialValue={filters.ricerca ? filters.ricerca : null}
          onChange={handleSearch} value={ricerca} />
        </Column>

        <Column xs="12" md="3" mdShift="1" padding="1em 0">
          {typeStateOfContent.data ?
            <Select material
              name="Filtro Stato"
              id="id_media1"
              selectedValue={filters.statoCnt}
              items={[{ textValue: "Tutti gli stati", value: 0 }, ...typeStateOfContent.data]}
              getValue={funCallbk}
            />
            : null}
        </Column>
<Column xs="12" md="5" padding="0" justifycontent="flex-end" flex>
        {loaded===1? 
  <Loader size="2.5em" margin="auto 0 auto auto" width="auto" /> : null }        
  </Column>
            
          

      </Row>


      {parseInt(window.location.pathname.split('cnt/')[1]) === 7 && popupInformativo && contenutoTy &&
        <div style={{ position: 'relative' }}>
          <ModalSpaceWeMi
            gestioneContenuti
            changeValue={val => {
              setIndice(val);
            }}
            value={indice}
            valueMax={currentItems.length}
            open={popupInformativo}
            openModal={setPopupInformativo}
            iconcolor="white"
            iconRadius="50%"
            iconBgColor="purple"
            iconBgColor2="green"
          >
            <NavLink to={`/pinfsw/${contenutoTy[indice].id_contenuto}`} >
              <AnchorLink value={!isNullOrUndefined(contenutoTy[indice].tl_testo_2)? contenutoTy[indice].tl_testo_1[locale] : ' '} size="f4" tag="h1" color="purple" weight="bold" />
            </NavLink>
            <Row fluid flex direction="column" padding="0 0 0.5rem">

              <Text value='Indirizzo email' size="f8" color="purple" weight="bold" />
              <Text value={!isNullOrUndefined(contenutoTy[indice].tl_testo_2)? contenutoTy[indice].tl_testo_2[locale]: 'Nessuna email disponibile'} size="f7" color="darkgrey" />

              <Text value='Indirizzo' size="f8" color="purple" weight="bold" />
              <Text value={!isNullOrUndefined(contenutoTy[indice].tl_testo_3)?contenutoTy[indice].tl_testo_3[locale]: 'Nessun indirizzo disponibile'} size="f7" color="darkgrey" />
              <Text value='Telefono' size="f8" color="purple" weight="bold" />
              <Text 
                value={
                  contenutoTy[indice].js_dati_contenuto && contenutoTy[indice].js_dati_contenuto.Telefono ?
                    contenutoTy[indice].js_dati_contenuto.Telefono :
                    'Nessun telefono disponibile'
                }
                size="f7"
                color="darkgrey"
              />

              <Text value='Descrizione' size="f8" color="purple" weight="bold" />
              <Text
                value={
                  contenutoTy[indice].js_dati_contenuto && contenutoTy[indice].js_dati_contenuto.Descrizione ?
                    contenutoTy[indice].js_dati_contenuto.Descrizione :
                    'Nessuna descrizione'
                }
                size="f7"
                color="darkgrey"
              />
            </Row>


          </ModalSpaceWeMi></div>}
      {contenutoTy ?
        <>
          <Row fluid padding="20px">
            {data ?
              <Table
                size="f8"
                thWidth="30em"
                tdWidth="10em"
                thHeight="3em"
                tdBold={[1, 4]}
                tdUppercase={[1]}
                thBorder={`5px solid ${colors.darkBlue}`}
      tdBorder={'none!important'}
                thColor="white"
                tdHeight="3em"
                tdColor="darkGrey"
                headerBgColor="blue"
                tableWidth="100%"
                {...data} />
              : null
            }
          </Row>

          <Row justifycontent="center" fluid padding="20px">
            <Pagination
              json={totalItems}
              currentPage={currentPage}
              numberitem={numberitem}
              setCurrentPage={setCurrentPage}
            />
          </Row>

        </>
        : null}    
    </>
 

  )
};

const mapDispatchToProps = {
  graphqlRequest,
  resetField,
  setFilter
};

function mapStateToProps(state) {
  const { graphql } = state;
  const { filter, locale } = state;
  const { dominioByTipoS, contenutoTy, EstraiContenutoCompleto, tipologiaContenutoPK, statoContenutoUPD, error, loaded } = graphql;
  return {
    filters: filter.filter,
    dominioByTipoS,
    contenutoTy,
    EstraiContenutoCompleto,
    statoContenutoUPD,
    loaded,
    tipologiaContenutoPK,
    locale,
    error
  };
}

Tabella.displayName = 'Tabella';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tabella);