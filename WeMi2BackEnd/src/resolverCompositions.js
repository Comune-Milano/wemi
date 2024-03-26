import { getFieldsWithDirectives } from "graphql-toolkit";
import { isUndefined } from "util";
import { DIRECTIVE_TO_GUARD } from "./directives";



export const resolversComposition = ({ typeDefs }) => {
  const fieldsAndTypeToDirectivesMap = getFieldsWithDirectives(typeDefs);
  let result = [];
  const authService = !isUndefined(process.env.WEMI2_AUTENTICAZIONE_SERVICE)? true : false;
  for (const fieldPath in fieldsAndTypeToDirectivesMap) {
     const directives = fieldsAndTypeToDirectivesMap[fieldPath];
    
     if (directives.length > 0 && authService) {
       result[fieldPath] = directives.map(directive => {
          if (DIRECTIVE_TO_GUARD[directive.name]) {
              const mapperFn = DIRECTIVE_TO_GUARD[directive.name];

              return mapperFn(directive.args);
          }

          return null;
       }).filter(a => a);
     }
  }
  
  return result;
};

 