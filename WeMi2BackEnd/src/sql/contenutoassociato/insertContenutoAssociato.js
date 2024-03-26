import tabelle from 'tabelle';

export const insertContenutoAssociato = (nmRelazione) => {
    let baseQuery = ` INSERT INTO ${tabelle.contenuto_associato}
    (id_contenuto_primario,id_contenuto_associato,nm_relazione,ts_creazione)
    VALUES ($[idContenuto],$[cat],`;

     if(nmRelazione){
         baseQuery += `$[nmRelazione], localtimestamp) returning *`;
     }

     return baseQuery;
}