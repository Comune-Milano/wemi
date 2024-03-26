/** @format */

import React from 'react';
import { connect } from 'react-redux';
import GroupFieldTitle from '../partials/GroupFieldTitle';
import Text from 'components/ui/Text';
import SedeInput from './SedeInput';

const SedeLavoro = ({
    dataset,
    setFormField,
    datiUtente,
    errors,
    touched,
    handleFieldBlur,
    datiLogin
}) => {

    return (
        <>
            <GroupFieldTitle
                title={`Sede di lavoro`}
            />
            <Text
                tag="p"
                size="f7"
                margin="0 0 1em 0"
                value="Inserisci l’indirizzo dove vuoi ricevere il servizio."
            />
            <SedeInput
                dataset={dataset}
                setFormField={setFormField}
                datiUtente={datiUtente.datiUtente}
                errors={errors}
                touched={touched}
                handleFieldBlur={handleFieldBlur}
            />
        </>
    );
};

SedeLavoro.displayName = 'SedeLavoro';

const mapDispatchToProps = ({

});

const mapStoreToProps = store => ({

});

export default connect(mapStoreToProps, mapDispatchToProps)(SedeLavoro);
