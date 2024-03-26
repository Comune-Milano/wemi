import { 
    findEnteInfoByidRequest,
    selectDatiMerchant,
    selectPersone,
    selectQuantita,
    selectPrezzo,
    selectValidDataMerchant
} from "../../sql/ente/selezione";
import {
    deleteListinoPrezzi,
} from "../../sql/ente/delete";
import { insertMerchant } from '../../sql/ente/insert';
import { logger } from "utility/logger/getInstance";
import {
    personeColumnSet,
    prezzoColumnSet,
    unitaColumnSet,
} from './columnsSet';
/**
 * Class to interact with ente Table 
 */

class EnteDAO {
    /**
    * @param {db} indicates the connection object
    *
    */
    constructor(db, helpers, formatter) {
        this.connection = db;
        this.helpers = helpers;
        this.formatter = formatter;
    }
    async getPrezzo(idServizioEnte) {
        return this.connection.oneOrNone(
            selectPrezzo,
            {
                idServizioEnte,
            }
        );
    }

    async getPersone(idPrezzo) {
        return this.connection.any(
            selectPersone,
            {
                idPrezzo,
            }
        )
    }

    async getQuantita(idPrezzoPersone) {
        return this.connection.any(
            selectQuantita,
            {
                idPrezzoPersone,
            }
        )
    }

    async insertOrUpdateListinoPrezzi(idServizio, listinoPrezzi) {
        try {
            let insertOrUpdatePrezzo = '';
            const prezzoResult = await this.getPrezzo(idServizio);
            if (prezzoResult) {
                insertOrUpdatePrezzo = this.updatePrezzo(prezzoResult.idPrezzo, {
                    idPrezzo: prezzoResult.idPrezzo,
                    ...listinoPrezzi
                });
            } else {
                insertOrUpdatePrezzo = this.insertPrezzo(idServizio, listinoPrezzi);
            }
            await this.connection.tx(async t => {
                await t.none(deleteListinoPrezzi, {idServizioEnte: idServizio});
                const { idPrezzo } = await t.one(insertOrUpdatePrezzo);
                if(listinoPrezzi.listinoPrezzi.length > 0) {
                    const persone = await t.any(this.insertPersone(idPrezzo, listinoPrezzi.listinoPrezzi));
                    for(let i = 0; i < persone.length; i += 1) {
                        const persona = persone[i];
                        const index = listinoPrezzi.listinoPrezzi.findIndex(el =>(
                            persona.qtPersoneA === el.qtPersoneA && persona.qtPersoneDa === el.qtPersoneDa
                        ));
                        if (listinoPrezzi.listinoPrezzi[index].offerta.length > 0) {
                            await t.none(this.insertQuantita(
                                persona.idPrezzoPersone,
                                listinoPrezzi.listinoPrezzi[index].offerta
                            ));
                        }
                    }
                }
            });
        } catch(err) {
            logger.error(err);
            throw(err);
        }
    }
    insertQuantita(idPrezzoPersone, offerta) {
        return this.helpers.insert(
            offerta.map(off =>({
                idPrezzoPersone,
                ...off,
            })),
            unitaColumnSet(this.helpers)
        );
    }
    insertPrezzo(idServizio, listinoPrezzi) {
        return this.helpers.insert(
            {
                idServizioEnte: idServizio,
                ...listinoPrezzi
            },
            prezzoColumnSet(this.helpers)
        ) + this.formatter.format('RETURNING id_prezzo as "idPrezzo";');
    }

    updatePrezzo(idPrezzo, listinoPrezzi) {
        return this.helpers.update(
            listinoPrezzi,
            prezzoColumnSet(this.helpers)) + this.formatter.format(
                ' WHERE id_prezzo = $[idPrezzo] RETURNING id_prezzo as "idPrezzo";',
                { idPrezzo });
    }

    insertPersone(idPrezzo, persone) {
        return this.helpers.insert(
            persone.map(persona => ({
                idPrezzo,
                qtPersoneDa: persona.qtPersoneDa,
                qtPersoneA: persona.qtPersoneA,
            })),
            personeColumnSet(this.helpers)
        ) + this.formatter.format(`
        RETURNING 
            id_prezzo_persone as "idPrezzoPersone",
            qt_persone_a as "qtPersoneA",
            qt_persone_da as "qtPersoneDa"
        `);
    }
    
    /**
    *
    *
    */
    async findEnteInformationByIdRequest(idRichiestaEnte) {
        try {
            return await this.connection.one(findEnteInfoByidRequest, { idRichiestaEnte });
        }
        catch (error) {
            logger.error(error);
        }
    }

    async findDatiMerchant(idEnte) {
        try {
            return this.connection.oneOrNone(selectDatiMerchant, { idEnte });
        }
        catch (error) {
            logger.error(error);
        }
    }

    async findValidDataMerchant(idEnte) {
        try {
            return this.connection.oneOrNone(selectValidDataMerchant, { id_ente: idEnte });
        }
        catch (error) {
            logger.error(error);
        }
    }

    compareDate(date1, date2) {
        if(date1 instanceof Date && date2 instanceof Date) {
            return date1.getTime() === date2.getTime();
        }
        if(date1 === null && date2 === null) {
            return true;
        }
        if(date1 === undefined && date2 === undefined) {
            return true;
        }
        return false;
    }

    compareMerchant(objFromDb, newObj) {
        const diff = {};
        if (objFromDb.merchantId !== newObj.merchantId) {
            diff.id_merchant = newObj.merchantId
        }
        if (objFromDb.publicKey !== newObj.publicKey) {
            diff.id_public_key = newObj.publicKey
        }
        if (objFromDb.privateKey !== newObj.privateKey) {
            diff.id_private_key = newObj.privateKey
        }
        if (!this.compareDate(objFromDb.dataInizio, newObj.dataInizio)) {
            diff.dt_inizio_val = newObj.dataInizio
        }
        if (!this.compareDate(objFromDb.dataFine, newObj.dataFine)) {
            diff.dt_fine_val = newObj.dataFine
        }
        return Object.keys(diff) === 0 ? null : diff;
    }

    async insertOrUpdateMerchant(merchant, idUtente) {
        try {
            const merchantFromDb = await this.connection.oneOrNone(selectDatiMerchant, { idEnte: merchant.idEnte });
            let query = '';
            if(merchantFromDb) {
                const diff = this.compareMerchant(merchantFromDb, merchant);
                if(diff) {
                    query = this.helpers.update(
                        diff,
                        null,
                        'merchant') 
                        + 
                        this
                        .formatter
                        .format(',ts_creazione=CURRENT_TIMESTAMP WHERE id_ente = $[idEnte]', {idEnte: merchant.idEnte});
                } else {
                    return;
                }
            } else {
                query = insertMerchant;
            }
            this.connection.tx(async t => {
                await t.none(query, merchant);
                const toStoreInLog = await t.oneOrNone(selectDatiMerchant, { idEnte: merchant.idEnte }); 
                const cs = new this.helpers.ColumnSet([
                    {name: 'id_ente', prop: 'idEnte'},
                    {name: 'id_merchant', prop: 'merchantId'},
                    {name: 'id_public_key', prop: 'publicKey'},
                    {name: 'id_private_key', prop: 'privateKey'},
                    {name: 'dt_inizio_val', prop: 'dataInizio'},
                    {name: 'dt_fine_val', prop: 'dataFine', def: null},
                    {name: 'ts_creazione', prop: 'ts_creazione'},
                    {name: 'id_utente', prop: 'idUtente', def: null},
                ], {
                    table: 'merchant_log'
                });
                const insertMerchantLog = () => this.helpers.insert(
                    {
                        ...toStoreInLog,
                        idUtente,
                    },
                    cs
                );
                await t.none(insertMerchantLog);
            });
        }
        catch (error) {
            logger.error(error);
        }
    }
}

export default EnteDAO;
