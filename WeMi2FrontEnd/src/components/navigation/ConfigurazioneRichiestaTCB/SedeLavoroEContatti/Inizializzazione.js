const Inizializzazione = (arr, id, chiave) => {
  let risultato;
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i].cd_attributo === id) {
      risultato = arr[i][chiave];
      break;
    }
  }
  return risultato;
};

export default Inizializzazione;
