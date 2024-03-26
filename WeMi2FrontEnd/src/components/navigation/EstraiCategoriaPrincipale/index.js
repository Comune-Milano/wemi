export const EstraiCategoriaPrincipale = (CatArray, CatUrl) => {
    let mainCat;
    CatArray.map(
     elemento => {
       if(parseInt(elemento.idCategoria) === parseInt(CatUrl)){
         return(
           mainCat = elemento
           )}
       else return null;
     }
   )
     return mainCat
  }