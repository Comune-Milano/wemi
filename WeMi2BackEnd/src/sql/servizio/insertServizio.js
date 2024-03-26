import tabelle from 'tabelle';

export const insertServizio = 
`INSERT INTO ${tabelle.servizio}
(id_servizio,id_categoria_accreditamento,tx_tags_ricerca,cd_unita_prezzo)
VALUES ($[id],$[categoriaAccreditamento],$[txTagsRicerca],$[unitaPrezzo])
`;