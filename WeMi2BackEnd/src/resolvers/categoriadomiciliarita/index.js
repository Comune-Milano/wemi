import { CD_CONTENUTO_AREA, CD_CONTENUTO_SEZIONE } from 'constants/db/cdContenuto';
import { CategoriesController } from 'controller/categoriedomiciliarita';

export default {
  Query: {
    getAllCategoriesDom: (parent, args, context) => {
      const controller = new CategoriesController(context);
      return controller.getAllCategories({ cdContenutoSez: CD_CONTENUTO_SEZIONE.DOMICILIARITA });
    },
    getAllCategories018: (parent, args, context) => {
      const controller = new CategoriesController(context);
      return controller.getAllCategories({ cdContenutoSez: CD_CONTENUTO_SEZIONE.ZERO_18, cdContenutoArea: CD_CONTENUTO_AREA.ZERO_18, is018: true });
    },
    getAllCategoriesByTag: (parent, args, context) => {
      const controller = new CategoriesController(context);
      return controller.getAllCategoriesByTag({tag: args.tag });
    },
    getAllCategories018Cross: (parent, args, context) => {
      const controller = new CategoriesController(context);
      return controller.getAllCategories({ cdContenutoArea: CD_CONTENUTO_AREA.ZERO_18_CROSS, is018: true });
    },
  },
};
