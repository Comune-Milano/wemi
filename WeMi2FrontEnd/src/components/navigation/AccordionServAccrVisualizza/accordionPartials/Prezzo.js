/** @format */

import React,{useState,useEffect} from 'react';
import { Row, Column } from "components/ui/Grid";
import Accordion from "components/ui/Accordion";
import Text from "components/ui/Text";
import { connect } from "react-redux";
import { isNullOrUndefined } from 'util';
import { AccordionBodyWrapper } from '../partials';
import {RadioSection,ValueSection, UnderSection} from './partials';
import withAuthentication from 'hoc/withAuthentication';



const Prezzo = ({note,setnote, EstraiDettaglioAmministrativoServizioEnte,datipr,setdatipr, userProfile }) => {
  
  // const strDatiLogin = sessionStorage.getItem('DatiLogin');
  // const DatiLogin = strDatiLogin && JSON.parse(strDatiLogin);
  const DatiLogin = userProfile.datiLogin;

  const [tipoPagamento,setTipoPagamento] = useState(isNullOrUndefined( EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.cd_tipo_offerta_srv)?"": EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.cd_tipo_offerta_srv===1?{ id: 1, value: "Gratuito-pagato attraverso finanziamento" }
                                                  :EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.cd_tipo_offerta_srv===2?{id:1,value:"Gratuito-erogato con volontari"}
                                                   :EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.cd_tipo_offerta_srv===3?{id:3,value:"Pagamento"}
                                                   :EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.cd_tipo_offerta_srv===null?"":"")

  const [modalitaPagamento,setModalitaPagamento] = useState(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.cd_tipo_offerta_srv?
    EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.cd_tipo_offerta_srv===2?{id:2,value:"con volontari"}: EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.cd_tipo_offerta_srv===1?{id:1}:{id:1}:{id:1});
  const [switchvalore,setvalore]=useState(false)
  const [prezzobase,setPrezzoBase]=useState()
  const[titfinanz,setfinanz]=useState({id:"",sostegno:""})
  const [prezzounitmin,setprezzo]=useState()
  const [quantitàmin,setquantitàmin]=useState()
  const[validitàdal,setvaliditàdal]=useState()
  const[validitàal,setvaliditàal]=useState()
  const [quantitàmax,setquantitàmax]=useState()
  const [tipoServizio,setTipoServizio] = useState(isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.cd_tipo_servizio_erog)?"":EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.cd_tipo_servizio_erog===1?{id:1,value:"individuale"}:
  EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.cd_tipo_servizio_erog===2?{id:2,value:"Condiviso"}:"");
  
  const idservizio = window.location.pathname.split('/')[5]

  const [serviziostt,setstt]=useState(EstraiDettaglioAmministrativoServizioEnte && EstraiDettaglioAmministrativoServizioEnte.EstraiServizioErogatoEnte004.filter(e=>{if(e.cd_stato_dati_servizio_ente===31 && e.id_servizio_ente==idservizio) return e}))



  useEffect(() => {
    setdatipr({modalitaPagamento:modalitaPagamento,
      tipoPagamento:tipoPagamento,
      tipoServizio:tipoServizio,
      PrezzoBase:prezzobase===undefined?EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo && EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.prezzoBase ?EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.prezzoBase:null:prezzobase,
      TitoloFinanziamento:titfinanz===undefined?"":titfinanz,
      QuantitàMinPersone:quantitàmin===undefined?EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.qt_min_pers?EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.qt_min_pers:null:quantitàmin,
      QuantitàMaxPersone:quantitàmax===undefined?EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.qt_max_pers?EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.qt_max_pers:null:quantitàmax,
      ValiditàDal:validitàdal===undefined?EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo && EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.validita?EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.validita.dal:null:validitàdal,
      ValiditàAl:validitàal===undefined?EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo && EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.validita?EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.validita.al:null:validitàal,
      sconto:EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo && EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.sconto?EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.sconto:null,
      scontoperunità:EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo && EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.scontoperunita?EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.scontoperunita:null,
      orario:EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo && EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.orario?EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.orario:null
      // TitoloFinanziamento:"",
      // ValiditàOffertaDal:EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.validita.dal,
      // ValiditàOffertaAl:EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.validita.al 
    })},
        [tipoPagamento,modalitaPagamento,tipoServizio,prezzobase,quantitàmin,quantitàmax,validitàal,validitàdal,titfinanz]);


  return (
    <Column sm="12" padding="20px">
      <Accordion
       maxHeight="unset"
       headerBgColorOpen="blue"
       headerBgColor="grey"
       headerColorOpen="white"
       headerColor="blue"
       arrowOpenColor="white"
       arrowClosedColor="blue"
       arrowSize="f1"
       headerPadding="0.75rem 1.25rem"
       aperto={false}
        AccordionHeader={() => (
          <Text weight="bold" size="f4" value="Prezzo" intlFormatter />
        )}
        children={EstraiDettaglioAmministrativoServizioEnte ?
            <AccordionBodyWrapper>
               <Row>
                <RadioSection informazioni={{tipoPagamento,tipoServizio,modalitaPagamento}}
                 setInformazioni={setTipoPagamento} setInformazioni1={setModalitaPagamento}
                 datipr={datipr} setdatipr={setdatipr} />
                <ValueSection informazioni={{tipoPagamento,tipoServizio,modalitaPagamento}} prezzounit={prezzounitmin} setprezzounit={setprezzo}
                valoreswitch={switchvalore} setvaloreswitch={setvalore}   datipr={datipr} setdatipr={setdatipr}
                EstraiDettaglioAmministrativoServizioEnte={EstraiDettaglioAmministrativoServizioEnte}
                prezzobase={prezzobase} setPrezzoBase={setPrezzoBase.bind(this)} setfinanz={setfinanz.bind(this)}
               setquantitàmin={setquantitàmin.bind(this)} setquantitàmax={setquantitàmax.bind(this)}/>
              </Row>
              <UnderSection informazioni={{tipoPagamento,tipoServizio,modalitaPagamento}} prezzounit={prezzounitmin} setprezzounit={setprezzo}
               valoreswitch={switchvalore} setvaloreswitch={setvalore}   datipr={datipr} setdatipr={setdatipr}
               setInformazioni={setTipoServizio} setvaliditàal={setvaliditàal} setvaliditàdal={setvaliditàdal}
               note= {note} setnote={setnote} datipr={datipr} setdatipr={setdatipr} validitàdal={validitàdal}
               validitàal={validitàal} />
            </AccordionBodyWrapper>
            

            : null

        }
      />
    </Column>


  );
};


const mapStoreToProps = store => ({
  locale: store.locale,
  EstraiDettaglioAmministrativoServizioEnte: store.graphql.EstraiDettaglioAmministrativoServizioEnte
})


Prezzo.displayName = 'Prezzo';

export default connect(
  mapStoreToProps
)(withAuthentication(Prezzo));
