import tabelle from 'tabelle';

export const selectContenutoMediaAdd = `
select * 
                from ${tabelle.contenuto} 
                where ty_contenuto=$[ty_contenuto]
                order by nr_ordine_visualizzazione`;