import { trovaAttributiDatoIdRichiesta } from 'sql/valattributodomanda/trovaAttributiDatoIdRichiesta';
import { eliminaValAttributoDatoIdRichiesta } from 'sql/valattributoreldomservlav/eliminaValAttributoDatoIdRichiesta';
import { eliminaValAttributoDomandaDatoIdRichiesta } from 'sql/valattributodomanda/eliminaValAttributoDomandaDatoIdRichiesta';
import { updateValAttributoDatoIdRichiesta } from 'sql/valattributodomanda/updateValAttributoDatoIdRichiesta';
import { eliminaValAttributoDomandaDatoVal } from 'sql/valattributodomanda/eliminaValAttributoDomandaDatoVal';
import { InsertValAttributoDomandaWithTxNotaOp } from 'sql/valattributodomanda/InsertValAttributoDomandaWithTxNotaOp';
import { InsertValAttributoDomanda } from 'sql/valattributodomanda/InsertValAttributoDomanda';
import { insertValAttributoRelDomServLav } from 'sql/valattributoreldomservlav/insertValAttributoRelDomServLav';
import { updateForInserisciModificaAttributo } from 'sql/richiestatcb/updateForInserisciModificaAttributo';
import {deleteForInserisciModificaAttributo} from 'sql/valattributodomanda/deleteForInserisciModificaAttributo';
import { updateUltimaModifica } from 'sql/richiestatcb/updateUltimaModifica';

export default {
  Mutation: {
    InserisciModificaAttributo: async (parent, args, context) => {
      await context.db.tx('InserisciModificaAttributo', async t => {
        let cdAttr;
        await t.batch([
          await t.any(trovaAttributiDatoIdRichiesta, args.input).then((result) => cdAttr = result.map(el => parseInt(el.cd_attributo))),
        ]);
        // Qui controllo se sono presenti mansioni e le elimino in virtù di quelle che voglio inserire
        let lsAttr = [16, 18, 56, 57, 58, 59, 60, 61, 62, 63, 64, 66, 67, 68, 69, 17, 159, 163];
        lsAttr.map(async (ls) => {
          if ((cdAttr.includes(ls) &&
            args.input.arrayConfig.find(async (val) => val.cd_attributo === ls))) {
            args.input.arrayConfig.map(async (val) => {
              if (val.cd_attributo === ls) {
                if (val.arrayBen && val.arrayBen.length) {
                  val.arrayBen.forEach(async () => {
                    await t.batch([
                      context.logger.info(eliminaValAttributoDatoIdRichiesta)
                      , t.oneOrNone(eliminaValAttributoDatoIdRichiesta, {...args.input,ls}).catch(error => { throw new Error(error); }),
                    ]);
                  });
                };
                await t.batch([
                  context.logger.info(eliminaValAttributoDomandaDatoIdRichiesta)
                  , t.oneOrNone(eliminaValAttributoDomandaDatoIdRichiesta, {...args.input,ls}).catch(error => { throw new Error(error); }),
                ]);
              }
            });
          }
        });

        args.input.arrayConfig.map(async (val) => {
          context.logger.info('Questi sono gli attributi che mi arrivano:', val);

          if (val.cd_attributo !== 16
            && val.cd_attributo !== 18
            && val.cd_attributo !== 56
            && val.cd_attributo !== 57
            && val.cd_attributo !== 58
            && val.cd_attributo !== 59
            && val.cd_attributo !== 60
            && val.cd_attributo !== 61
            && val.cd_attributo !== 62
            && val.cd_attributo !== 63
            && val.cd_attributo !== 64
            && val.cd_attributo !== 66
            && val.cd_attributo !== 67
            && val.cd_attributo !== 68
            && val.cd_attributo !== 69
            && val.cd_attributo !== 17
            && val.cd_attributo !== 159
            && val.cd_attributo !== 163

          ) {
            if (cdAttr.includes(val.cd_attributo)) {
              if (parseInt(val.cd_val_attributo) >= 0) {
                const updateValAttributoDatoIdRichiestaConst = updateValAttributoDatoIdRichiesta(val);
                await t.batch([
                  context.logger.info(updateValAttributoDatoIdRichiestaConst)
                  , await t.oneOrNone(updateValAttributoDatoIdRichiestaConst, {...args.input,val}).catch(error => { throw new Error(error); }),
                ]);

              }
              else if (parseInt(val.cd_val_attributo) === -1) {
                await t.batch([
                  context.logger.info(eliminaValAttributoDomandaDatoVal)
                  , await t.oneOrNone(eliminaValAttributoDomandaDatoVal, {...args.input,val}).catch(error => { throw new Error(error); }),
                ]);
              }
            }
            else if (!cdAttr.includes(val.cd_attributo) && val.cd_val_attributo !== -1) {
              const InsertValAttributoDomandaWithTxNotaOpConst = InsertValAttributoDomandaWithTxNotaOp(val);
              await t.batch([
                context.logger.info(InsertValAttributoDomandaWithTxNotaOpConst)
               ,await t.oneOrNone(InsertValAttributoDomandaWithTxNotaOpConst, {...args.input,val}).catch(error => { throw new Error(error); }),

              ]);
            }
          }
          else if ((
            val.cd_attributo === 16 ||
            val.cd_attributo === 18 ||
            val.cd_attributo === 56 ||
            val.cd_attributo === 57 ||
            val.cd_attributo === 58 ||
            val.cd_attributo === 59 ||
            val.cd_attributo === 60 ||
            val.cd_attributo === 61 ||
            val.cd_attributo === 62 ||
            val.cd_attributo === 63 ||
            val.cd_attributo === 64 ||
            val.cd_attributo === 66 ||
            val.cd_attributo === 67 ||
            val.cd_attributo === 68 ||
            val.cd_attributo === 69 ||
            val.cd_attributo === 17 ||
            val.cd_attributo === 159 ||
            val.cd_attributo === 163


          )
            && val.cd_val_attributo !== -1) {
            const InsertValAttributoDomandaConst = InsertValAttributoDomanda(val);
            await t.batch([
              await t.oneOrNone(InsertValAttributoDomandaConst, {...args.input,val}).catch(error => { throw new Error(error); }),
            ]);


            if (val.arrayBen && val.arrayBen.length > 0) {
              val.arrayBen.map(async (ben) => {
                await t.batch([
                  await t.oneOrNone(insertValAttributoRelDomServLav, {...args.input,val,ben}).catch(error => { throw new Error(error); }),

                ]);
              });
            }
          }

        });

        const updateForInserisciModificaAttributoConst = updateForInserisciModificaAttributo(args);

        await t.batch([
          await t.oneOrNone(updateForInserisciModificaAttributoConst, args.input).catch(error => { throw new Error(error); }),
        ]);

        await t.oneOrNone(updateUltimaModifica, { idRichiestaTcb: args.input.idRichiestaTcb, idUtente: context.user.idUtente });
      });

      return args.input.idRichiestaTcb;
    },

    EliminaDatiRichiestaByAttributo: async (parent, args, context) => {
      args.input.arrayAttributi.map(cdAttr => {
        context.db.any(deleteForInserisciModificaAttributo, {...args.input,cdAttr});
      });

      return args.input.idRichiestaTcb;

    },


  },
};