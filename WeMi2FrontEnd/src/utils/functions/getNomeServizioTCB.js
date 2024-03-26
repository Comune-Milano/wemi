const getNomeServizioTCB = (idServizio) => {
  if (idServizio === 1 || idServizio === 999997) {
    return 'Baby-Sitter';
  }
  else if (idServizio === 2 || idServizio === 999998) {
    return 'Colf';
  }
  else if (idServizio === 3 || idServizio === 999999) {
    return 'Badante';
  }
  else return ':tcb';
};

getNomeServizioTCB.defaultName = 'getNomeServizioTCB';
export default getNomeServizioTCB;