import { isNumber } from 'utils/functions/typeCheckers';

// money è il valore da trasformare
// simboloEuro booleano che determina il ritorno del simbolo dell'euro
export const moneyFormat = (money, simboloEuro) => {
  if (String(money).includes('€')) {
    money = money.replace('€', '');
  }

  if (isNumber(parseFloat(money))) {
    const format = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' });
    const res = format.format(parseFloat(money));
    if (simboloEuro) {
      return res;
    }
    return res.replace('€', '');
  }
  return money;
};
