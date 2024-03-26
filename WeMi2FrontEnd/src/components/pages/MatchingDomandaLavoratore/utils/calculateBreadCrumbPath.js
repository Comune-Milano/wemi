/**
   * 
   * @param {Integer} idCittadino 
   * @param {Integer} idDomanda
   * Calculate the breadcrumb strings for the page
   *  
   */
  export const calculateBreadCrumbPath = (idCittadino, idDomanda) => {
    const breadcrumbPaths = [
      {
        slash: 'Home',
        url: '',
      },
      {
        slash: 'Area personale',
        url: 'areaPersonale',
      },
      {
        slash: 'Gestione Richieste di Servizio TCB',
        url: `admin/${idCittadino}/richiesteTcb`,
      },
      {
        slash: 'Associazione lavoratore con domanda',
        url: `admin/matchingDomandaLavoratore/${idDomanda}`,
      },
    ];
    return breadcrumbPaths;
  };