
/** @format */

/** IMPORTANT!: Questa mutation, oltre ad inserire gli attributi, inizializza la tabella
 * utente_offerta_servizio
 */
export const inserisciModificaAttributoOffertaServizio = [
  '',
  `mutation inserisciModificaAttributoOffertaServizio(
        $idUtenteLav: Int!
        $idServizioRif: Int!
        $flagCandidatura: Boolean!
        $arrayAttrOffertaServizio: [attrOffertaServizio]
      ) {
        inserisciModificaAttributoOffertaServizio(
          idUtenteLav: $idUtenteLav
          idServizioRif: $idServizioRif
          flagCandidatura: $flagCandidatura
          arrayAttrOffertaServizio:  $arrayAttrOffertaServizio
        )
      }`,
  'inserisciModificaAttributoOffertaServizio'
];
