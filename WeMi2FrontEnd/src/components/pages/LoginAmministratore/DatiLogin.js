export const setDatiLogin = (args) => {
  let risultato;
  try {
    const argsString = JSON.stringify(args);
    sessionStorage.setItem('DatiLogin', argsString);
    risultato = true;
  } catch (error) {
    risultato = false;
    throw new Error(error);
  }
  return risultato;
};

export const getDatiLogin = () => {
  try {
    const datiLoginString = sessionStorage.getItem('DatiLogin');
    const datiLogin = JSON.parse(datiLoginString);
    return datiLogin;
  } catch (error) {
    throw new Error(error);
  }
};
