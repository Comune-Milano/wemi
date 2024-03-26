import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Button from 'components/ui/Button';
import styled from 'styled-components';
import media from 'utils/media-queries';
import { colors } from 'theme';
import { Convivenza, PagaProposta, Livello, Indennita } from './filterpartials';
import { calcolaPreventivo } from './ConfigurazioneJson';
import { addParameter, simulaCosto } from 'redux-modules/actions/simActions';
import { AddClientError } from 'redux-modules/actions/errorActions';
const FilterColumn = styled(Column)`
${media.md`
border-right: 0.1em solid ${colors.primary};
padding: 0 1em 0 0;
`}
`;
const rimuoviDuplicati = (livelli) => {
    let arrayRisultato = [];
    for (let i = 0; i < livelli.length; i += 1)
        for (let j = 0; j < livelli.length; j += 1)
            if (livelli[i].cd_categoria_contrattuale !== livelli[j].cd_categoria_contrattuale) {
                let found = false;
                for (let z = 0; z < arrayRisultato.length; z += 1)
                    if (arrayRisultato[z].cd_categoria_contrattuale === livelli[i].cd_categoria_contrattuale)
                        found = true;
                if (!found)
                    arrayRisultato.push(livelli[i])
            }
    return arrayRisultato;
}
const FiltriSimulatoreTCB = ({ preventivoLight, addParameter, parametri, simulaCosto, AddClientError, simulatoreCosto }) => {
    let livelli = parametri.convivenza === undefined || (parametri.convivenza && parametri.convivenza.value.id === -1) ? rimuoviDuplicati(simulatoreCosto.estraiConfigurazioniLivelliContrattuali) : simulatoreCosto.estraiConfigurazioniLivelliContrattuali.filter(elemento => {
        if (elemento.cd_tipo_orario_lavoro === parametri.convivenza.value.id)
            return elemento
    });

    useEffect(() => {
        addParameter({ convivenza: { value: preventivoLight.orario }, livelli: { livelliArray: { value: preventivoLight.contract.id, textValue: preventivoLight.contract.value } } })
    }, [preventivoLight])
    return (
        <FilterColumn md="4" padding="0">
            <Column xs="12" padding="0" margin=".5em 0">
                <Text
                    weight="lighter"
                    value="Informazioni necessarie per il calcolo"
                    intlFormatter
                    color="darkGrey"
                    size="f7"
                />
            </Column>
            <Column padding=".5em 0">
                <Convivenza calcolaPreventivo={() => {
                    if (parametri.convivenza)
                        calcolaPreventivo({ convivenza: parametri.convivenza.value }, simulaCosto);
                }} addParameter={addParameter} parametri={parametri} />
            </Column>

            <Indennita addParameter={addParameter} parametri={parametri} />
            <Column padding=".5em 0">
                <PagaProposta
                    addParameter={addParameter}
                    parametri={parametri}
                />
            </Column>
            <Column padding=".5em 0">
                <Livello
                    livelli={livelli}
                    addParameter={addParameter}
                    parametri={parametri}
                />
            </Column>
            {parametri&&Object.keys(parametri).length===4? 
                 <Button
                 intl
                 value="Calcola"
                 type="primary"
                 onClick={() => {
                     let check = false;
                     if (parametri.convivenza.value.id === 1 && parametri.oreSettimanali >= 0 && parametri.oreSettimanali <= 54 && parametri.livelli)
                         check = true;
                     else if (parametri.convivenza.value.id === 2 && parametri.oreSettimanali >= 0 && parametri.oreSettimanali <= 30 && parametri.livelli)
                         check = true;
                     else if (parametri.convivenza.value.id === 3 && parametri.oreSettimanali >= 0 && parametri.oreSettimanali <= 40 && parametri.livelli)
                         check = true;
                     else if (parametri.convivenza.value.id === 4 && parametri.oreSettimanali >= 0 && parametri.oreSettimanali <= 25 && parametri.livelli)
                         check = true;
                     else if (parametri.convivenza.value.id === 5 && parametri.oreSettimanali >= 0 && parametri.oreSettimanali <= 40 && parametri.livelli)
                         check = true;
                     else if (parametri.convivenza.value.id === 6)
                         check = true;
                     let tariffa = false;
                     let tariffaBaseOraria = simulatoreCosto.estraiConfigurazioniLivelliContrattuali &&
                     simulatoreCosto.estraiConfigurazioniLivelliContrattuali.length > 0 &&
                     simulatoreCosto.estraiConfigurazioniLivelliContrattuali.filter(elemento => {
                         for (let i = 0; i < parametri.livelli.livelliArray.length; i += 1)
                             if (elemento.cd_tipo_orario_lavoro === parametri.livelli.livelliArray[i].id){
                                 return elemento;
                             }
                     });
                     if(tariffaBaseOraria.length>0)
                         tariffa=true;
 
                     if (check&&tariffa) {
                        
                        
                         if (tariffaBaseOraria.length > 0) {
                             tariffaBaseOraria = tariffaBaseOraria[0].paga_minima_contrattuale
                             calcolaPreventivo(
                                 {
                                     oreSettimanali: parametri.oreSettimanali? parametri.oreSettimanali : 0,
                                     convivenza: parametri.convivenza? parametri.convivenza.value :{},
                                     pagaProposta: parametri.pagaProposta? parametri.pagaProposta : 0,
                                     TMM: parametri.convivenza.value.id!==3? tariffaBaseOraria : undefined,
                                     indennita: simulatoreCosto.EstraiIndennita,
                                     tariffa: tariffaBaseOraria
                                 },simulaCosto);
                         }
                     }
                     else
                         AddClientError({ message: 'Errore nel calcolo della simulazione', modal: true });
                 }}
             >
 
             </Button>
                
                : <Button disabled type="disabled"  value="Calcola" />}
           
        </FilterColumn>


    )
}

FiltriSimulatoreTCB.displayName = 'FiltriSimulatoreTCB';

const mapStoreToProps = store => ({
    parametri: store.tcbSim.parametri,
    preventivoLight: store.requestTCB.preventivoLightTCB
});

const mapDispatchToProps = ({
    addParameter,
    simulaCosto,
    AddClientError
})

export default connect(mapStoreToProps, mapDispatchToProps)(FiltriSimulatoreTCB);