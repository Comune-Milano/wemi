export const PAGE_TCB_DISPONIBILITA_LAVORATORE = `/disponibilitaLavoratore`;
export const PAGE_FEEDBACK_TCB_URL = `/FeedbackTCB/:idRichiesta`;
export const PAGE_FEEDBACK_LAVORATORE_URL = `/feedbackLavoratoreCitt/:idRichiesta`;
export const PAGE_AREAPERSONALE_URL = `/AreaPersonale`;
export const PAGE_REQUESTSINDEX_URL = `/r/idRequestsIndex`;
export const PAGE_FEEDBACK_URL = `/Feedback/:idRichiesta`;

export const generatePath = (url="", elements={}) => {
  //url saraà l'url di destinazione
  //elements Json di elementi da sostituire
  const keys= Object.keys(elements);
  
  keys.forEach(ele =>{
    const reg= new RegExp(`:${ele}`,'gi');
    url= url.replace(reg, elements[ele])
  });
 
    return url;
  };