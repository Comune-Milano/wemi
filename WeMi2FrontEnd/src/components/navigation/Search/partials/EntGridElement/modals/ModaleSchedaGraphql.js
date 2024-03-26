

export const EstraiAllegatiEnte = [
    '',
    `query EstraiAllegatiEnte ($id_ente: Int!){
        EstraiAllegatiEnte(
            id_ente: $id_ente
        ) {
            id_media
            ty_allegato
            tl_valore_testuale
            ty_mime_type_media
        }
    }`
];

export const EstraiMediaBase64 = [
    '',
    `query EstraiMediaBase64 ($id_media: Int!){
        EstraiMediaBase64(
            id_media: $id_media
        ){
            oj_media
        }
    }`
];