import { isNullOrUndefined } from 'util';
import { ApolloError } from 'apollo-server';
import { PG_BENEFICIARY_ALREADY_EXISTS_ERROR } from 'errors/errors';
import {selectQtBeneficiari} from 'sql/richiestatcb/selectQtBeneficiari';
import { selectByIdRichiesta} from 'sql/beneficiarioricservtcb/selectByIdRichiesta';
import { insertBeneficiario } from 'sql/beneficiarioricservtcb/insertBeneficiario';
import { updateForInserisciBeneficiario } from 'sql/richiestatcb/updateForInserisciBeneficiario';
import { selectPgBeneficiario } from 'sql/beneficiarioricservtcb/selectPgBeneficiario';
import { selectByPgBeneficiario } from 'sql/valattributoreldomservlav/selectByPgBeneficiario';
import { selectNotByPgBeneficiario } from 'sql/valattributoreldomservlav/selectNotByPgBeneficiario';
import { deleteForEliminaBeneficiario } from 'sql/valattributobeneficiario/deleteForEliminaBeneficiario';
import { deleteForEliminaBen } from 'sql/valattributoreldomservlav/deleteForEliminaBen';
import { deleteForElimBeneficiario } from 'sql/valattributodomanda/deleteForElimBeneficiario';
import {updateForEliminaBeneficiario} from 'sql/valattributobeneficiario/updateForEliminaBeneficiario';
import {updateForEliminaBenef} from 'sql/valattributoreldomservlav/updateForEliminaBenef';
import { deleteAndUpdateBeneficiarioRic } from 'sql/beneficiarioricservtcb/deleteAndUpdateBeneficiarioRic';
import { selectByIdRichiestaAndPg } from 'sql/valattributobeneficiario/selectByIdRichiestaAndPg';
import { deleteForInserisciModificaAttr } from 'sql/valattributobeneficiario/deleteForInserisciModificaAttr';
import { updateForInserisciModificaAttrBeneficiarioTCB } from 'sql/valattributobeneficiario/updateForInserisciModificaAttrBeneficarioTCB';
import {insertForInserModAttrBenTCB} from 'sql/valattributobeneficiario/insertForInserModAttrBenTCB';
import { insertForInserModAttrBenTCBNotDtVal } from 'sql/valattributobeneficiario/insertForInserModAttrBenTCBNotDtVal';
import { updateForModificaFasciaEta } from 'sql/valattributoreldomservlav/updateForModificaFasciaEta';
import { updateUltimaModifica } from 'sql/richiestatcb/updateUltimaModifica';
import { deleteAttributiBeneficiario } from 'sql/beneficiarioricservtcb/delete';
import { selectAttributiComuniBeneficiari } from 'sql/beneficiarioricservtcb/select';

export default {
  Query: {
    EstraiAttributoBeneficiarioTCB: async (parent, args, context) => {
      const sql = `
          SELECT 
            id_richiesta_servizio_tcb as "idRichiestaTcb", 
            pg_beneficiario_richiesta_tcb as "pgBen",
            cd_attributo as "cdAttributo", 
            cd_val_attributo as "cdValAttributo",
            tx_val as "txVal",
            dt_val::timestamp with time zone as "dtVal",
            tx_nota as "txNota",
            tx_nota_op as "txNotaOp",
            fg_val as "fgVal",
            nr_val as "nrVal",
            ts_ult_modifica as "tsModifica",
            ts_creazione as "tsCreazione"
          FROM wemi2.val_attributo_beneficiario
          WHERE id_richiesta_servizio_tcb = $[idRichiestaTcb] and cd_attributo = $[cdAttributo]
                `;
      context.logger.info(sql, args);
      return await context.db.any(sql, args).catch(error => { throw new Error(error); });

    },
  },
  Mutation: {
    InserisciBeneficiarioTCB: async (parent, args, context) => {
      let oldPg, insertedPg;
      let qt_beneficiari;
      await context.db.tx('InserisciBeneficiarioTCB', async t => {
        qt_beneficiari= await t.oneOrNone(selectQtBeneficiari, args);
      
        await t.batch([
          await t.any(selectByIdRichiesta, args).then((res) => oldPg = res)
          , context.logger.info('questi già ci sono', oldPg)
           ,context.logger.info('qt_beneficiari',qt_beneficiari),
          
        
        ]);

        if (!oldPg.length > 0 || (oldPg.length > 0 && !oldPg.find(el => el.pg_beneficiario_richiesta_tcb === args.pgBen))) {
             
          const updateForInserisciBeneficiarioConst = updateForInserisciBeneficiario(qt_beneficiari);

          await t.batch([
            await t.none(insertBeneficiario, args)
            , insertedPg = 'inserito',
            await t.oneOrNone(updateForInserisciBeneficiarioConst, {...args,qt_beneficiari}),
          
          ]);
        }

        await t.oneOrNone(updateUltimaModifica, { idRichiestaTcb: args.idRichiestaTcb, idUtente: context.user.idUtente });
      });

      if (insertedPg === 'inserito'){

        return {
          action: 'Inserito',
          idRichiestaTCB: args.idRichiestaTcb,
          pgBen: args.pgBen,
        };}
      else throw new ApolloError(PG_BENEFICIARY_ALREADY_EXISTS_ERROR.message, PG_BENEFICIARY_ALREADY_EXISTS_ERROR.code);

    },

    EliminaBeneficiarioTCB: async (parent, args, context) => {

      await context.db.tx('EliminaBeneficiarioTCB', async t => {
        let pgBenUp, attributi2, attributi2All, attributiAll;
        let qt_beneficiari;
        qt_beneficiari = await t.oneOrNone(selectQtBeneficiari, args);
        await t.batch([
          context.logger.trace(selectPgBeneficiario)
          , await t.any(selectPgBeneficiario, args).then(res => pgBenUp = res)
          , context.logger.trace('Questi sono i pg superiori', pgBenUp)

          , await t.any(selectByPgBeneficiario, args).then(res => attributi2 = res)
          , context.logger.trace(`Questi sono gli attributi 2 per il beneficiario ${args.pgBen}`, attributi2)

          , await t.any(selectNotByPgBeneficiario, args).then(res => attributi2All = res)
          , context.logger.trace('Questi sono gli attributi 2', attributi2All)
          , await t.any(selectAttributiComuniBeneficiari, args).then(res => attributiAll = res)
          , context.logger.trace('Questi sono gli attributi della domanda', attributiAll),
        ]);

        context.logger.trace(deleteForEliminaBeneficiario);
        await t.oneOrNone(deleteForEliminaBeneficiario, args);

        context.logger.trace(deleteForEliminaBen);
        await t.oneOrNone(deleteForEliminaBen, args);

        let cdAttrAll = attributi2All.map(el => el.cd_attributo_1);
        let cdValAttrAll = attributi2All.map(el => el.cd_val_attributo_1);
        if (attributi2.length > 0) {
          let arrFil = attributi2.slice().filter(filteredBenAttr => {
            if(cdAttrAll.includes(filteredBenAttr.cd_attributo_1)) {
              if(!cdValAttrAll.includes(filteredBenAttr.cd_val_attributo_1)) {
                return filteredBenAttr;
              }
            }
          });
          context.logger.trace(arrFil);
          if (arrFil.length) {
            arrFil.forEach(async (attr2) => {
              context.logger.trace(deleteForElimBeneficiario);
              await t.oneOrNone(deleteForElimBeneficiario, { ...args, attr2});
            });
          }
        };

        if(!(pgBenUp.length > 0) && !(attributi2All.length > 0) && attributiAll.length > 0) {
          context.logger.trace('elimino altri attributi', pgBenUp.length);
          await t.none(deleteAttributiBeneficiario, { ...args });
        }

        if (pgBenUp) {
          for (let i = 0; i <= pgBenUp.length; i += 1) {
            await t.batch([
              await t.oneOrNone(updateForEliminaBeneficiario, {...args,i})
            ,await t.oneOrNone(updateForEliminaBenef, {...args,i}),
            ]);
          }

          const pgBenUpBeneficiarioTcb = pgBenUp[pgBenUp.length - 1] ? pgBenUp[pgBenUp.length - 1].pg_beneficiario_richiesta_tcb:null;

          const deleteAndUpdateBeneficiarioRicConst = deleteAndUpdateBeneficiarioRic(pgBenUpBeneficiarioTcb);

          await t.batch([
            await t.oneOrNone(deleteAndUpdateBeneficiarioRicConst, {...args,
              pgBenUpBeneficiarioTcb,
              qt_beneficiari}),
          ]);

          await t.batch([
            await t.oneOrNone(deleteAndUpdateBeneficiarioRicConst, {...args,
              pgBenUpBeneficiarioTcb,
              qt_beneficiari}),
          ]);

        }

        await t.oneOrNone(updateUltimaModifica, { idRichiestaTcb: args.idRichiestaTcb, idUtente: context.user.idUtente });
      });

      return {
        action: 'Eliminato',
        idRichiestaTCB: args.idRichiestaTcb,
        pgBen: args.arrayPgBen,
      };
    },

    InserisciModificaAttributoBeneficiarioTCB: async (parent, args, context) => {
      args.input.arrayBen.forEach(async (arrBen) => {
        await context.db.tx('InserisciModificaAttributoBeneficiario', async t => {
          let cdAttr = [];

          await t.batch([
            context.logger.info(selectByIdRichiestaAndPg)
          , await t.any(selectByIdRichiestaAndPg, {...args.input,arrBen}).then((result) => cdAttr = result.map(el => parseInt(el.cd_attributo))),
          ]);

        // Qui controllo se sono presenti mansioni e le elimino in virtù di quelle che voglio inserire
          let lsAttr = [8, 15, 58, 306, 64, 65, 66, 77, 78, 85];
          lsAttr.map(ls => {
            if ((cdAttr.includes(ls) &&
            arrBen.arrayConfig.find(async (val) => val.cd_attributo === ls))) {
              arrBen.arrayConfig.map((val) => {
                if (val.cd_attributo === ls) {
       
                  t.batch([
                    context.logger.info(deleteForInserisciModificaAttr)
                  , t.oneOrNone(deleteForInserisciModificaAttr, {...args.input,arrBen,ls}),
                  ]);
                }
              });
            }
          });

          arrBen.arrayConfig.map(async (val) => {
            context.logger.info('Questi sono gli attributi che mi arrivano:', val);

            const updateForInserisciModificaAttrBeneficiarioTCBConst = updateForInserisciModificaAttrBeneficiarioTCB(val);

            if (val.cd_attributo !== 8
            && val.cd_attributo !== 15
            && val.cd_attributo !== 306
            && val.cd_attributo !== 58
            && val.cd_attributo !== 64
            && val.cd_attributo !== 65
            && val.cd_attributo !== 66
            && val.cd_attributo !== 77
            && val.cd_attributo !== 78
            && val.cd_attributo !== 85
          ) {
              if (cdAttr.includes(val.cd_attributo) && !isNullOrUndefined(val.cd_val_attributo)) {
                if (parseInt(val.cd_val_attributo) >= 0) {
                  await t.batch([
                    context.logger.info(updateForInserisciModificaAttrBeneficiarioTCBConst)
                  , await t.oneOrNone(updateForInserisciModificaAttrBeneficiarioTCBConst, {...args.input,val,arrBen}),
                  ]);
                }
                else if (parseInt(val.cd_val_attributo) === -1) {
                  const ls = val.cd_attributo;
                  await t.batch([
                    context.logger.info(deleteForInserisciModificaAttr)
                  , await t.oneOrNone(deleteForInserisciModificaAttr, {...args.input,ls,arrBen}),
                  ]);
                }
              }
              else if (!cdAttr.includes(val.cd_attributo) && val.cd_val_attributo !== -1 &&
              !isNullOrUndefined(val.cd_val_attributo)) {
                const insertForInserModAttrBenTCBConst = insertForInserModAttrBenTCB(val);
                await t.batch([
                  await t.oneOrNone(insertForInserModAttrBenTCBConst, {...args.input,arrBen,val}),

                ]);
              }
            }

            else if ((val.cd_attributo === 8 ||
            val.cd_attributo === 15 ||
            val.cd_attributo === 306 ||
            val.cd_attributo === 58 ||
            val.cd_attributo === 64 ||
            val.cd_attributo === 65 ||
            val.cd_attributo === 66 ||
            val.cd_attributo === 77 ||
            val.cd_attributo === 78 ||
            val.cd_attributo === 85)
            && val.cd_val_attributo !== -1
            && !isNullOrUndefined(val.cd_val_attributo)) {
              const insertForInserModAttrBenTCBNotDtValConst = insertForInserModAttrBenTCBNotDtVal(val);
              await t.batch([
                await t.oneOrNone(insertForInserModAttrBenTCBNotDtValConst, {...args.input,arrBen,val}),
              ]);

            }

          });

          await t.oneOrNone(updateUltimaModifica, { idRichiestaTcb: args.input.idRichiestaTcb, idUtente: context.user.idUtente });
        });
      });
      return args.input.idRichiestaTcb;
    },


    ModificaFasciaEtaBeneficiarioTCB: async (parent, args, context) => {
      let updated;
      await context.db.tx('ModificaFasciaEtaBeneficiarioTCB', async t => {

        await t.batch([
          await t.any(updateForModificaFasciaEta, args).then((res) => updated = res),
        ]);

        await t.oneOrNone(updateUltimaModifica, { idRichiestaTcb: args.idRichiestaTcb, idUtente: context.user.idUtente });
      });
      if (updated.length) {
        return true;
      }
    },
  },
};