import tabelle from 'tabelle';

export const updateByTy = `UPDATE ${tabelle.contenuto} 
SET tl_testo_1=$[title], tl_testo_2=$[description] 
WHERE ty_contenuto = $[tyContenuto];`;