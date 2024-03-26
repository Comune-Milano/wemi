

export const selectSliderByTyContenuto = `
SELECT tl_testo_1, tl_testo_2
from wemi2.contenuto
WHERE ty_contenuto = $[tyContenuto]
LIMIT 1;`;