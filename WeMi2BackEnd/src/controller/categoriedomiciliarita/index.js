import { CategoriesDomain } from 'domain/categoriedomiciliarita';

/**
 *Categories Controller Class
 */
export class CategoriesController {
  /**
   * The constructor of the class
   * @param {*} context the context of graphql
   * @param {string} locale the locale
   */
  constructor(context = {}, locale = 'it')  {
    this.context = {...context, locale};
  }
 /**
  * Return the areas and categories
  * @param {object} args the type of the section
  * @returns {object[]} the areas and categories
  */
  async getAllCategories(args) {
    const categorieDomiciliaritaDomain = new CategoriesDomain(this.context);
    const categories = await categorieDomiciliaritaDomain.getAllCategories(args);
    return categories;
  };

  /**
   * Return the areas and categories by tag
   * @param {object} args the type of the section
   * @returns {object[]} the areas and categories
   */
  async getAllCategoriesByTag(args) {
    const categorieDomiciliaritaDomain = new CategoriesDomain(this.context);
    const categories = await categorieDomiciliaritaDomain.getAllCategoriesByTag(args);
    return categories;
  };
}
