import tabelle from 'tabelle';

export const updateOrdineVis = `UPDATE ${tabelle.contenuto} 
SET nr_ordine_visualizzazione=$[nr_ordine_visualizzazione] 
WHERE id_contenuto = $[id_contenuto];`;