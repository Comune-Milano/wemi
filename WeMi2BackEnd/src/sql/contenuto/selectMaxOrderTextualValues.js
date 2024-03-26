export const selectMaxOrderTextualValues = `
SELECT tl_testo_1, tl_testo_2, nr_ordine_visualizzazione
FROM wemi2.contenuto
WHERE ty_contenuto = $[tyContenuto] and nr_ordine_visualizzazione = (
SELECT MAX(nr_ordine_visualizzazione) 
FROM wemi2.contenuto 
WHERE ty_contenuto = $[tyContenuto]
);`;
