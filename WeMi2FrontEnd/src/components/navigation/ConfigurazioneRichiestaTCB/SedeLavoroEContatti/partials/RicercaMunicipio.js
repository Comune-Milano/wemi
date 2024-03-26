/** @format */

import React,{useState} from 'react';
import FaIcon from 'components/ui/FaIcon';
import Button from 'components/ui/Button';
import Zone from 'components/navigation/Search/partials/filterPartials/MunicipioModal';

const RicercaMunicipio = ({
getInfoSede
}) => {
    const [state,setState] = useState({modal:false});
    return (
        <>
            <Button child="1" 
            onClick={()=> setState({...state,modal:true})}
            >
            <FaIcon
                  noShadow
                  icon="\f002"
                  size="1x"
                  fontSize="f7"
                  />
                
                </Button>
                <Zone
                modalOpen={state.modal}
                openModal={()=>{setState({...state,modal: !state.modal});
            }}
                getValue={(value)=>{
                    let municipio = value.cercaMunicipio;
                    municipio = {id: municipio.idMunicipio, value: municipio.nmMunicipio.toUpperCase()};
                    setState({...state,modal:false});
                    getInfoSede("municipio",municipio);
                }}
                setSelectedAddress={(value)=>{setState({...state,address:value})}}
                selectedAddress={state.address? state.address: undefined}
                
                
                />
            </>
    );
}


RicercaMunicipio.displayName = ' RicercaMunicipio';
export default RicercaMunicipio;