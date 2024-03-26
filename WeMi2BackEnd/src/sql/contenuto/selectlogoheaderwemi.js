import tabelle from 'tabelle';
import { STORAGE_ABS_PATH } from 'environment';

export const selectLogoHeaderWeMi = `
select CASE WHEN media.iw_path IS NOT NULL
THEN CONCAT('${STORAGE_ABS_PATH}', '/', media.iw_path)
END as "logoNavbar"
from ${tabelle.contenuto} as c
INNER JOIN ${tabelle.media} as media ON 
  c.id_media2 = media.id_media
where c.ty_contenuto=10 and c.tl_testo_1 ->> 'it' = 'HEADER_EMAIL'
`;