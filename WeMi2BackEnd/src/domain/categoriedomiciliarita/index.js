import { CD_CONTENUTO_AREA } from 'constants/db/cdContenuto';
import { ContenutoDAO } from 'dao/contenuto/contenutoDAO';

/**
 * Class to get the domiciliary categories
 */
export class CategoriesDomain {
  /**
   * The constructor of the class
   * @param {*} context the context of graphql
   */
  constructor(context = {}) {
    const {
      db: connection,
      formatter, queryBuilder,
    } = context;
    this.db = connection;
    this.locale = context.locale;
    this.formatter = formatter;
    this.helpers = queryBuilder;
  }
  /**
   * Return the domiciliary categories
   * @param {object} args the type of the section and the area
   * @returns {object[]} the domiciliary categories
   */
  async getAllCategories(args) {
    const contenutoDao = new ContenutoDAO(this.db, this.formatter);
    const allAreasCategories = await contenutoDao.getAllCategories(args);
    let result = {};
    let areas = allAreasCategories.reduce((acc, cv, index, array) => {
      if (!(acc.find(element => element.id === cv.idArea))) {
        acc.push({
          id: cv.idArea,
          title: cv.txTitoloArea ? cv.txTitoloArea[this.locale] : '',
          progressive: cv.ordineVisualizzazioneArea,
          categorie: array.reduce((accumulator, currentValue) => {
            if ((currentValue.idArea === cv.idArea) && !(accumulator.some(element => element.id === currentValue.idCategoria))) {
              accumulator.push({
                id: currentValue.idCategoria,
                title: currentValue.txTitoloCategoria ? currentValue.txTitoloCategoria[this.locale] : '',
                description: currentValue.description ? currentValue.description[this.locale] : '',
                progressive: currentValue.ordineVisualizzazioneCategoria,
                sottotipo: currentValue.sottotipo,
                idServizio: currentValue.idServizio,
                image: {
                  id: currentValue.id_media,
                  name: currentValue.nm_nome_media,
                  path: currentValue.iw_path,
                },
              });
            }
            return accumulator;
          }, []),
        });
      }
      return acc;
    }, []);
    if(!args.cdContenutoArea){
      areas.splice(0, 0, {
        id:0,
        title: 'Tutti',
        categorie: allAreasCategories.reduce((accumulator, currentValue) => {
          if(!(accumulator.some(element => element.id === currentValue.idCategoria))){
            accumulator.push({
              id: currentValue.idCategoria,
              title: currentValue.txTitoloCategoria ? currentValue.txTitoloCategoria[this.locale] : '',
              description: currentValue.description ? currentValue.description[this.locale] : '',
              progressive: currentValue.ordineVisualizzazioneCategoria,
              sottotipo: currentValue.sottotipo,
              idServizio: currentValue.idServizio,
              image: {
                id: currentValue.id_media,
                name: currentValue.nm_nome_media,
                path: currentValue.iw_path,
              },
            });
          }
          return accumulator;
        },[]),
      });
    };
    result.areeCategoria = areas;
    return result;
  }

  /**
   * Return the categories and services by tag
   * @param {object} args the type of the section and the area
   * @returns {object[]} the categories
   */
  async getAllCategoriesByTag(args) {
    const contenutoDao = new ContenutoDAO(this.db, this.formatter);
    const allAreasCategories = await contenutoDao.getAllCategoriesByTag(args);
    let result = {};
    let areas = allAreasCategories.reduce((acc, cv, index, array) => {
      if (!(acc.find(element => element.id === cv.idArea))) {
        acc.push({
          id: cv.idArea,
          title: cv.txTitoloArea ? cv.txTitoloArea[this.locale] : '',
          progressive: cv.ordineVisualizzazioneArea,
          categorie: array.reduce((accumulator, currentValue) => {
            if ((currentValue.idArea === cv.idArea) && !(accumulator.some(element => element.id === currentValue.idCategoria))) {
              accumulator.push({
                tipoArea: currentValue.tipoArea ? currentValue.tipoArea : null,
                idServizio: currentValue.idServizio,
                nomeServizio: currentValue.nomeServizio?  currentValue.nomeServizio[this.locale] : '',
                datiSezione: currentValue.datiSezione,
              });
            }
            return accumulator;
          }, []),
        });
      }
      return acc;
    }, []);
    const categories = [];
    for (let i = 0; i < areas?.length; i += 1){
      for (let j = 0; j < areas[i].categorie?.length; j += 1){
        categories.push(areas[i].categorie[j]);
      }
    }
    result.areeCategoria = areas;
    const services = categories?.map((element) => ({
      idServizio: element.idServizio,
      tipoArea: element.tipoArea,
      nomeServizio: element.nomeServizio,
      datiSezione: element.datiSezione,
    }));
    const services018 = services.filter(element => element.tipoArea.trim() === CD_CONTENUTO_AREA.ZERO_18)
    ?.reduce((unique, o) => {
      if(!unique.some(obj => (obj.idServizio === o.idServizio))) {
        unique.push(o);
      }
      return unique;
    },[]);
    const servicesdDom = services.filter(element => !(element.tipoArea.trim() === CD_CONTENUTO_AREA.ZERO_18))?.reduce((unique, o) => {
      if(!unique.some(obj => (obj.idServizio === o.idServizio))) {
        unique.push(o);
      }
      return unique;
    },[]);
    const filteredServices = services018.concat(servicesdDom);
    result.services = filteredServices;
    return result;
  }
}
