export const getFooterLinks = (stt) => [
  '',
  `{queryFooter (stt : ${stt ? stt : 0}){
  col1{
    id_contenuto
    ty_contenuto
    ty_sottotipo_contenuto
    tl_testo_1
    tl_testo_2
    tl_testo_5
    ln_link_1
    id_media1
    oj_media1
    ty_mime_type_media1
    nm_nome_media1
    id_media2
    oj_media2
    ty_mime_type_media2
    nm_nome_media2

    
  }
  col2{
   id_contenuto
    ty_contenuto
    ty_sottotipo_contenuto
    tl_testo_1
    tl_testo_2
    tl_testo_5
    ln_link_1
    id_media1
    ty_mime_type_media1
    nm_nome_media1

    id_media2
    oj_media2
    ty_mime_type_media2
    nm_nome_media2
    
  }
}}`
];