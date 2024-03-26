import tabelle from 'tabelle';

export const insertServizioForContenutoMediaAdd = `INSERT INTO ${tabelle.servizio}
(id_servizio,id_categoria_accreditamento,tx_tags_ricerca,cd_unita_prezzo)
VALUES ($[idContenuto],$[idCategoriaAccreditamento],$[txTagsRicerca],$[unitaPrezzo])
`;