// export default gql`
// {
//     pagamentoPK(id_interno_transazione:200155){
//       js_dati_fatturazione
//     }
//   }

  export const datiFatturazione = (value) => [
    'datiFatturazione',
  ` 
  { 
    pagamentoPK(id_interno_transazione:${value}){
            js_dati_fatturazione
            }
  }
        
      `
  ];