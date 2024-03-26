import tabelle from 'tabelle';

export const deleteForContenutoMediaAdd = (nmRelazione) => {
    let baseQuery = `
    DELETE FROM ${tabelle.contenuto_associato}
    WHERE id_contenuto_primario = $[idContenuto] `;

    if(nmRelazione){
        baseQuery +=` and nm_relazione= $[nmRelazione];`
    }

    return baseQuery;
}
