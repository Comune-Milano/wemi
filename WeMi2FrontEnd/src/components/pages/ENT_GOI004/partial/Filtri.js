import React from 'react'
import {Row,Column} from 'components/ui/Grid'
import Input from 'components/ui/Input'
import { setFilter } from 'redux-modules/actions/filterActions';
import Select from 'components/ui/Select'
import { connect } from 'react-redux';

const Filtri = ({State, SetState,filtri,setFilter})=>{
    let categorie = State.listaCategorieAccreditate?State.listaCategorieAccreditate:[]
    let statoServizio = State.listaStatiServizio?State.listaStatiServizio:[]
    return(
        <Row fluid justifycontent="space-between" margin="2em 0">
            <Column xs={11} sm={5} md={3} padding="0" margin="1em 0">
                <Input material intlLabel="Servizio" intlPlaceholder="Servizio"
                    initialValue={filtri&& filtri.InputServizi&& filtri.InputServizi}
                     onBlur={(event)=>{setFilter({...filtri,InputServizi:event.target.value})}}        
                    getValue={(value)=>{
                        setFilter({...filtri,InputServizi:value})
                        State.filtri.nomeServizio=value;
                        State.callback()
                        SetState({...State.filtri})
                    }}
                ></Input>
            </Column>
            
            <Column xs={11} sm={5} md={3} padding="0" margin="1em 0">
                <Select 
                
                material 
                maxLength={20}
                name="Categoria accreditamento"
                intlPlaceholder="Categoria accreditamento"
                selectedValue = {State.filtri.categoriaAccreditamento?
                    State.filtri.categoriaAccreditamento:
                    {id:-1, value:"Tutte le categorie"}}
                items = {[{value:-1, textValue:"Tutte le categorie"},...categorie]}
                getValue = {value => {
                    if(value.id==-1){
                        State.filtri.categoriaAccreditamento = null
                        setFilter({...filtri,SelectCategoria:null})

                    }else{
                        State.filtri.categoriaAccreditamento = value
                        setFilter({...filtri,SelectCategoria:value})

                    }
                    State.callback()
                    SetState({...State.filtri})
                }}
                ></Select>
            </Column>
            
            <Column xs={11} sm={5} md={3} padding="0" margin="1em 0">
            <Select 
                material 
                name="Stato del servizio"
                intlPlaceholder="Stato del servizio"
                selectedValue={State.filtri.statoServizio?
                    State.filtri.statoServizio
                    :{id:-1, value:"Tutti gli stati"}}
                items = {[{value:-1, textValue:"Tutti gli stati"},...statoServizio]}
                getValue = {value => {
                    if(value.id==-1){
                        State.filtri.statoServizio = null
                        setFilter({...filtri,SelectStato:null})

                    }else{
                        State.filtri.statoServizio = value
                        setFilter({...filtri,SelectStato:value})

                    }
                    State.callback()
                    SetState({...State.filtri})
                }}
                ></Select>
            </Column>
        
        </Row>
    )
}

const mapDispatchToProps = {
    setFilter,
};
    
function mapStateToProps(state) {
    const {filter } = state;
    return {
        filtri: filter.filter,
    };
}

Filtri.displayName = 'Filtri';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Filtri);
    