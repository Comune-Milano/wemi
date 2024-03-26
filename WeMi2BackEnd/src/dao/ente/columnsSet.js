export const prezzoColumnSet = (helpers) => (
  new helpers.ColumnSet([
    {name: 'id_prezzo', prop: 'idPrezzo', mod: '^', def: "nextval('seq_prezzo')" },
    {name: 'id_servizio_ente', prop: 'idServizioEnte'},
    {name: 'cd_tipo_offerta_srv', prop: 'cdTipoOffertaServizio'},
    {name: 'dt_inizio', prop: 'dataInizio'},
    {name: 'dt_fine', prop: 'dataFine', def: null},
    {name: 'tx_titolo_finanziamento', prop: 'txTitoloFinanziamento', def: null},
    {name: 'qt_minima_unita', prop: 'qtMinimaUnita'},
    {name: 'im_prezzo_minimo', prop: 'imPrezzoMinimo'},
    {name: 'im_prezzo_minimo_cond', prop: 'imPrezzoMinimoCond'},
    {name: 'cd_tipo_servizio_erog', prop: 'cdTipoServizioErog'},
    {name: 'tx_note_al_prezzo', prop: 'txNoteAlPrezzo', def: null},
    {name: 'ts_creazione', mod: '^', def:'current_timestamp'},
], {
    table: 'srv_prezzo'
}));

export const personeColumnSet = (helpers) => (
  new helpers.ColumnSet([
    {name: 'id_prezzo_persone', prop: 'idPrezzoPersone', mod: '^', def: "nextval('seq_prezzo_persone')",},
    {name: 'id_prezzo', prop: 'idPrezzo'},
    {name: 'qt_persone_da', prop: 'qtPersoneDa'},
    {name: 'qt_persone_a', prop: 'qtPersoneA'},
], {
    table: 'srv_prezzo_persone'
}));

export const unitaColumnSet = (helpers) => (
  new helpers.ColumnSet([
    {name: 'id_quantita', prop: 'idQuantita', mod: '^', def: "nextval('seq_prezzo_persone_quantita')",},
    {name: 'id_prezzo_persone', prop: 'idPrezzoPersone'},
    {name: 'qt_unita_da', prop: 'qtUnitaDa'},
    {name: 'qt_unita_a', prop: 'qtUnitaA'},
    {name: 'valore', prop: 'valore', def: 0},
], {
    table: 'srv_prezzo_persone_quantita'
}));