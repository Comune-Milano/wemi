import React from 'react';
import Wrapper from './../partials/Wrapper';
import SectionTitle from './../partials/SectionTitle';
import FieldText from './../partials/FieldText';
import FieldCheck from './../partials/FieldCheck';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { getTCBServiceName } from '../../utils';
import { cdAttributo } from './../../CodiciAttributi';
import { functionSort } from "utils/functions/functionSort";
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { EstraiEtaLavoratore as EstraiEtaLavoratoreQ, EstraiCarattereLavoratore as EstraiCarattereLavoratoreQ } from '../stepsGraphql';
import { estraiCaratteristicheAbitazione } from '../../CuraDellaCasa/estraiDominiTcb';

const Preferenze = ({
    title,
    moveTo,
    servizioTCB,
    locale,
    loading,
    errored,
    data
}) => {

    const [estraiEta] = useGraphQLRequest(
        undefined,
        EstraiEtaLavoratoreQ,
        {},
        true
    )

    const [estraiCarattere] = useGraphQLRequest(
        undefined,
        EstraiCarattereLavoratoreQ,
        {},
        true
    )

    const etaCodiciSelezionati = [];
    const carattereCodiciSelezionati = [];
    const sessoEta = [];
    const carattere = [];
    const titolo = [];
    let anni = 0;
    const lingue = [];
    let patente = false;
    let auto = false;
    let altrePreferenze;
    let altreEsperienze;

    if (data && estraiEta.data && estraiCarattere.data) {

        data.forEach(element => {
            switch (element.cd_attributo) {
                case cdAttributo.CD_RIC_SESSO_LAV:
                    sessoEta.push({ value: getObjectValue(element, 'tl_valore_testuale.' + locale, null) });
                    break;
                case cdAttributo.CD_RIC_FASCIA_ETA_LAV:
                    etaCodiciSelezionati.push(element.cd_val_attributo);
                    break;
                case cdAttributo.LS_RIC_CARATTERE_LAV:
                    carattereCodiciSelezionati.push({ id: element.cd_val_attributo, txNota: element.tx_nota })
                    break;
                case cdAttributo.CD_RIC_TITOLO_STUDIO_GENERALE:

                    if (element.cd_val_attributo === 0) {
                        titolo.push({ other: true, value: getObjectValue(element, 'tx_nota', ''), error: !getObjectValue(element, 'tx_nota', false), label: "Altro", cdDominioTcb: element.cd_val_attributo });
                    } else {
                        titolo.push({ value: getObjectValue(element, 'tl_valore_testuale.' + locale, null) })
                    }

                    break;
                case cdAttributo.NR_ANNI_DI_ESPERIENZA:
                    anni = element.nr_val
                    break;
                case cdAttributo.LS_PREF_LINGUE:
                    if (element.cd_val_attributo === 0) {
                        lingue.push({ other: true, value: getObjectValue(element, 'tx_nota', ''), error: !getObjectValue(element, 'tx_nota', false), label: "Altro", cdDominioTcb: element.cd_val_attributo });
                    } else {
                        lingue.push({ value: getObjectValue(element, 'tl_valore_testuale.' + locale, null) });
                    }

                    break;
                case cdAttributo.FG_PREF_MUNITA_PATENTE:
                    patente = element.fg_val === '1' ? true : false
                    break;
                case cdAttributo.FG_PREF_AUTOMUNITA:
                    auto = element.fg_val === '1' ? true : false
                    break;
                case cdAttributo.TX_PREF_ALTRO:
                    altrePreferenze = element.tx_val
                    break;
                case cdAttributo.POSITIVE_ESPERIENZE_COLLAB:
                    altreEsperienze = element.tx_val
                    break;
                default:
            }
        });

        estraiEta.data.filter((ele) => {
            return etaCodiciSelezionati.indexOf(ele.cdDominioTcb) > -1;
        }).forEach(el => sessoEta.push({ value: el.tlValoreTestuale[locale] }));

        estraiCarattere.data.forEach((ele) => {
            const selezionato = carattereCodiciSelezionati.find(SelezionatoApp => (
                SelezionatoApp.id === ele.cdDominioTcb
            ));

            if (selezionato) {
                if (ele.cdDominioTcb === 0) {
                    carattere.push({ other: true, value: selezionato.txNota, error: !selezionato.txNota, label: "Altro", cdDominioTcb: 0 });
                } else {
                    carattere.push({ value: ele.tlValoreTestuale[locale] })
                }
            }
        });
    }

    return (
        <>
            <SectionTitle
                title={title}
                moveTo={moveTo}
            />
            <Wrapper
                loading={loading}
                errored={errored}>
                <FieldText
                    title={'Preferenze anagrafiche'}
                    array={sessoEta}
                />
                <FieldText
                    title={'Carattere'}
                    array={functionSort(carattere, "cdDominioTcb")}
                />
                <FieldText
                    title={'Titolo di studio'}
                    array={functionSort(titolo, "cdDominioTcb")}
                />
                <FieldText
                    title={'Anni di esperienza'}
                    value={(anni) ? anni + ' anni' : null}
                />
                <FieldText
                    title={'Lingue parlate'}
                    array={functionSort(lingue, "cdDominioTcb")}
                />
                <FieldCheck
                    title={"Il/la " + getTCBServiceName(servizioTCB, locale) + " deve avere la patente"}
                    checked={patente}
                />
                <FieldCheck
                    title={"Il/la " + getTCBServiceName(servizioTCB, locale) + " deve essere automunito/a"}
                    checked={auto}
                />
                <FieldText
                    title={'Altre preferenze'}
                    value={altrePreferenze}
                    textarea={true}
                />
                <FieldCheck
                    title={"Ho già avuto esperienze con " + getTCBServiceName(servizioTCB, locale)}
                    checked={altreEsperienze ? true : false}
                    note={altreEsperienze}
                />
            </Wrapper>
        </>
    )
}
Preferenze.displayName = 'Preferenze';

export default Preferenze;