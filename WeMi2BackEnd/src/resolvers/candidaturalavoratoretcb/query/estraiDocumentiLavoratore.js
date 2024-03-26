  import {
    estraiDocumentiLavoratoreQuery, estraiIdAllegatiAttributiQuery,
  } from '../queries/queries';
 /**
  * estrazione documenti lavoratore
  * @param parent
  * @param args
  * @param context
  * @param info
  */
  export const estraiDocumentiLavoratore = async (parent, args, context, info) => {
    const { idUtenteLav } = args;
    let arrayIdAllegati = [0];
    let allDocuments = [];
    await context.db.any(estraiIdAllegatiAttributiQuery, { idUtenteLav }).then(res => {
      if (res.length) {
        arrayIdAllegati = res.map(el => el.cd_val_attributo);
      }
    });
    allDocuments = await context.db.any(estraiDocumentiLavoratoreQuery, { idUtenteLav, arrayIdAllegati });
    const documentiLavoratore = allDocuments.map(doc => (
      {
        id: doc.id_allegato,
        fileName: doc.nm_nome_allegato_off,
        data: '',
      }
      ));
    return {
      documentiLavoratore: documentiLavoratore,
    };
  };