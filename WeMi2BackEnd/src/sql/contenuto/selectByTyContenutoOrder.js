import tabelle from 'tabelle';

export const selectByTyContenutoOrder = `select * 
from ${tabelle.contenuto} 
where ty_contenuto=$[tipologiaCont]
order by nr_ordine_visualizzazione`;