import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import Loader from 'components/ui/Loader';
const print = (simulazione,key) => {
    let string = `
    <div style="font-weight: bold;font-size: 1.5em;padding: 1em 0">
        ${key}
    </div>`
    Object.keys(simulazione).map(elemento => (
       string = string + `
        <div style="display:flex; align-items:center; justify-content: space-between;">
           ${simulazione[elemento].value ?
            `<span>
                ${simulazione[elemento].name.replace('${servizio}', 'colf')}
            </span>
            <span>
                ${typeof simulazione[elemento].value !== 'string' ? simulazione[elemento].value.toFixed(2) : simulazione[elemento].value}           
            </span>
            `
            : ``}
        </div>`
    )).toString().split(',').join(' ');
    return string;
}

const StampaHTMLPage = ({ simulazione }) => {
    useEffect(()=>{
        window.onpopstate  = (e) => {
            window.location.reload()
        }
    },[]);
    return (
    <div style={{ padding: '0 3rem' }}>
        {simulazione ? <>
            <div style={{padding: '1em 0'}}>
                {window.print(simulazione.preventivo,'Preventivo')}
                {document.write(print(simulazione.prospetto,'Prospetto'))}
            </div>
        {/* <div style={{fontWeight: 'bold',fontSize: '1.5em',padding: '1em 0'}}>
            Preventivo
        </div>
            <div className="preventivo" dangerouslySetInnerHTML={{ __html: print(simulazione.preventivo) }}></div>
            </div>
            <div style={{padding: '1em 0'}}>
            <div style={{fontWeight: 'bold',fontSize: '1.5em',padding: '1em 0'}}>Prospetto</div>
            <div className="preventivo" dangerouslySetInnerHTML={{ __html: print(simulazione.prospetto) }}></div> */}
</>: window.history.go(-1)&&<Loader />}
        
</div>
)};

StampaHTMLPage.displayName = "StampaHTMLPage";

const mapStoreToProps = store => ({
    simulazione: store.tcbSim.simulazione
})

export default connect(mapStoreToProps)(StampaHTMLPage);