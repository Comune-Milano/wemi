import { getObjectValue } from 'utils/extensions/objectExtensions';

export function getTCBServiceName(servizioTCB, locale) {
    return getObjectValue(servizioTCB, 'tl_valore_testuale.' + locale, 'lavoratore/trice').toLowerCase();
}

// Resituisco gli array predisposti agli elementi UI a partire dai tipi dominio tcb

const getDomainId = (el) => {
    return (el.cdDominioTcb !== null && el.cdDominioTcb !== undefined) ? el.cdDominioTcb :
        (el.cd_dominio_tcb !== null && el.cd_dominio_tcb !== undefined) ? el.cd_dominio_tcb : null;
};

const getLabel = (value, locale) => {
    let label = '';
    if (value.tlValoreTestuale) {
        label = value.tlValoreTestuale[locale ? locale : "it"];
        if(label.toLocaleLowerCase() === 'tata') {
            label = 'baby-sitter'
        }
    }
    if (value.tl_valore_testuale) {
        label = value.tl_valore_testuale[locale ? locale : "it"];
        if(label.toLocaleLowerCase() === 'tata') {
            label = 'baby-sitter'
        }
    }
    return label;
};

export const createSelectArray = (array, locale) => {
    return array.map(el => (
        {
            id: getDomainId(el),
            value: getLabel(el, locale)
        }
    ))
};

export const createRadioArray = (array, locale) => {
    return array.map(el => (
        {
            id: getDomainId(el),
            label: getLabel(el, locale)
        }
    ))
};

export const createCheckboxArray = (array, locale) => {
    return array.map(el => (
        {
            id: getDomainId(el),
            label: getLabel(el, locale),
        }
    ))
};
