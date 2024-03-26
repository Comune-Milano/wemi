import moment from 'moment';

export const countMinutes = (obj) => {
  const keys = Object.keys(obj)

  let differenzaInMinuti = 0;

  keys.forEach(chiave => {
    obj[chiave].forEach(fascia => {
      let fine = (moment(fascia.end).hours() * 60) + moment(fascia.end).minutes();
      if (fine === 0) {
        // 0 perchè le 24 le trasforama 0
        fine = 24 * 60 + moment(fascia.end).minutes();
      }
      const inizio = (moment(fascia.start).hours() * 60) + moment(fascia.start).minutes();
   
      differenzaInMinuti = differenzaInMinuti + (fine - inizio);
    })
  })

  const differenzaInOre = differenzaInMinuti / 60;

  return differenzaInOre;

};