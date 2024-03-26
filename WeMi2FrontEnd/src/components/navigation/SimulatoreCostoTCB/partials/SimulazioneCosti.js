import React,{useState} from 'react';
import { connect } from 'react-redux';
import { Row, Column } from 'components/ui/Grid';
import { Preventivo, Prospetto, ButtonTabs,MyColumn } from './simulatepartials';
import { NonConvivenza, Convivenza } from './ConfigurazioneJson';
import { simulaCosto } from 'redux-modules/actions/simActions';
import cutString from 'components/ui/CutString';


const SimulazioneCosti = ({ risultato, parametri }) => {
    const [stato, setStato] = useState({ id: 1 });

    return (
        <>
            <Row fluid alignitems="center" display="flex" margin="20px 0">
                {/* <Column xs="12" md="7" padding="1em 0 1em 1em">
                <Button value="Ipotesi di preventivo spesa per assistenza familiare" type={"primary"} size="f6" />
                </Column>
                <Column xs="12" md="5">
                <Button value="Prospetto di spesa annuale" type={"primary"} size="f6" />
                </Column> */}
                <MyColumn xs="12" md="4" padding="20px 0" >
                    <ButtonTabs fontSize="f7" intlFormatter value={cutString("Ipotesi di preventivo spesa per assistenza familiare",21)}
                        active={stato.id === 1}
                        onClick={() => setStato({ id: 1 })}
                    />
                </MyColumn>
                <MyColumn xs="12"  md="4"  padding="20px 0" >
                    <ButtonTabs fontSize="f7" intlFormatter value={cutString("Prospetto di spesa annuale",20)}
                        active={stato.id === 2}
                        onClick={() => setStato({ id: 2 })}
                    />
                </MyColumn>
                <MyColumn  xs="12" md="4"  padding="20px 0">
                    <ButtonTabs fontSize="f7" intlFormatter value="Riepilogo"
                        active={stato.id === 3}
                        onClick={() => setStato({ id: 3 })}
                    />
                </MyColumn>
            </Row>
            {stato.id === 1 ||stato.id===3 ?

                <Row fluid>
                    <Preventivo items={risultato ? risultato.preventivo : parametri.convivenza && parametri.convivenza.value.id === 3 ? NonConvivenza.preventivo : Convivenza.preventivo} />
                </Row>
                : null}
            {stato.id === 2 || stato.id===3 ?
                <Row fluid>
                    <Prospetto items={risultato ? risultato.prospetto : parametri.convivenza && parametri.convivenza.value.id === 3 ? NonConvivenza.prospetto : Convivenza.prospetto} />
                </Row>
                : null}
        </>
    )
};

SimulazioneCosti.displayName = 'SimulazioneCosti';
const mapStoreToProps = store => ({
    risultato: store.tcbSim.simulazione && store.tcbSim.simulazione,
    parametri: store.tcbSim.parametri && store.tcbSim.parametri
});

const mapDispatchToProps = ({
    simulaCosto
})
export default connect(mapStoreToProps, mapDispatchToProps)(SimulazioneCosti);