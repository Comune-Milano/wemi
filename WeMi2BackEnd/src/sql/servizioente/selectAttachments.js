export const EstraiAllegatiServizioEnte = `SELECT 
allegato_servizio_ente.id_media,
convert_from(oj_media, 'UTF-8') as oj_media
FROM wemi2.allegato_servizio_ente
LEFT JOIN wemi2.media ON wemi2.media.id_media = wemi2.allegato_servizio_ente.id_media
LEFT JOIN wemi2.dominio ON allegato_servizio_ente.ty_allegato = dominio.cd_dominio AND wemi2.dominio.ty_dominio = 'ALLEGATO_SERVIZIO'
WHERE id_servizio_ente = $[idServizioEnte]
ORDER BY allegato_servizio_ente.nr_progressivo_slider
`;