import { CAROUSEL, HERO_SLIDER, FOOTER_COLONNA_2, FOOTER_COLONNA_1, TESTIMONIALS_SCHEDA_INTRODUTTIVA, TESTIMONIALS_SCHEDA_SINGOLA, SPAZI_SINGOLI_WEMI, CATEGORIE_LIVELLO_2, CATEGORIE_LIVELLO_1, VOCI_MENU_LIVELLO_2, VOCI_MENU_LIVELLO_1 } from 'types/contenuti/typeContenuto';

/**
 * Admitted content for preview
 */
const arrayOfContents = [
  VOCI_MENU_LIVELLO_1,
  VOCI_MENU_LIVELLO_2,
  CATEGORIE_LIVELLO_1,
  CATEGORIE_LIVELLO_2,
  SPAZI_SINGOLI_WEMI,
  TESTIMONIALS_SCHEDA_SINGOLA,
  TESTIMONIALS_SCHEDA_INTRODUTTIVA,
  FOOTER_COLONNA_1,
  FOOTER_COLONNA_2,
  HERO_SLIDER,
  CAROUSEL
];


/**
 * 
 * @param {String} typeContenuto the type of the content
 * @return {Boolean}  
 */

export const checkPreview = ( typeContenuto ) => {
  try{
    const tyCnt = parseInt(typeContenuto, 10);
    for(const typeContent of arrayOfContents){
      if(typeContent === tyCnt){
        return true;
      }
    }
    return false;
  }
  catch(error){
    console.error(error);
    return false;
  }
  
}
