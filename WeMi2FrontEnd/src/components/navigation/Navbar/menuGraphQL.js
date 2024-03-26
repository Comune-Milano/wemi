

    export const estraiVociMenu = () => [
        'VociMenu',
      `{
        estraiVociMenu   {
          idLiv1
          txLiv1
          linkLiv1
          footerColDx
          liv2 {
            idLiv2
            txLiv2
            linkLiv2
            sottotipo
            media1 {
              id_media
              ty_mime_type_media
              nm_nome_media
              oj_media
              
            }
          }
        } 
        }
`];
  
export const estraiVociMenuPreviewLivello1 = () => [
  'estraiVociMenuPreviewLivello1',
`{
  estraiVociMenuPreviewLivello1   {
    idLiv1
    txLiv1
    linkLiv1
    liv2 {
      idLiv2
      txLiv2
      linkLiv2
      sottotipo
      media1 {
        id_media
        ty_mime_type_media
        nm_nome_media
        oj_media
        
      }
    }
  } 
  }
`];


export const estraiVociMenuPreviewLivello2 = () => [
  'estraiVociMenuPreviewLivello2',
`{
  estraiVociMenuPreviewLivello2   {
    idLiv1
    txLiv1
    linkLiv1
    liv2 {
      idLiv2
      txLiv2
      linkLiv2
      sottotipo
      media1 {
        id_media
        ty_mime_type_media
        nm_nome_media
        oj_media
        
      }
    }
  } 
  }
`];

export const estraiDatiLoginEnte = [
  '',
  `
    query datiEnte($idEnte: Int!) {
      datiEnte(idEnte: $idEnte) 
    }
  `,
  'datiEnte',
];
