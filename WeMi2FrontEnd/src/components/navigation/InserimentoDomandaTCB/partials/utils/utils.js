/** @format */

const minimoContrattuale = (arr) => {
  let min = 0;
  min = arr.sort((a, b) => { if (a.paga_minima_contrattuale < b.paga_minima_contrattuale) return -1 })[0].paga_minima_contrattuale;
  return min
};

export default function minPrice(modAss, livelliContrattuali, orarioId, contractId) {
  const minAssoluto = livelliContrattuali && livelliContrattuali.length > 0 && livelliContrattuali.sort((a, b) => {
    if (a.paga_minima_contrattuale < b.paga_minima_contrattuale) return -1
  })[0].paga_minima_contrattuale
  let price = minAssoluto && modAss === 1 ? minAssoluto : null;
  let arrTemp = []
  if (livelliContrattuali) {
    switch (modAss) {
      case 1:
        if (orarioId === -1) {
          for (let i = 0; i < livelliContrattuali.length; i += 1) {
            if (livelliContrattuali[i].LivelloContrattuale.cdLivelloContrattuale === orarioId) {
              arrTemp.push(livelliContrattuali[i])
              price = minimoContrattuale(arrTemp);
            }
          }
        }
        else {
          for (let i = 0; i < livelliContrattuali.length; i += 1) {
            if ((livelliContrattuali[i].cd_tipo_orario_lavoro) === parseInt(orarioId)) {
              if (livelliContrattuali[i].LivelloContrattuale.cdLivelloContrattuale === contractId) {
                arrTemp.push(livelliContrattuali[i])
                price = minimoContrattuale(arrTemp);
              }
            }

          }
        }
        break;
      case 2:
        price = null;
        break;
      case 3:
        price = 10;
        break;
      default:
        return null;
    }
  }
  return price;
};