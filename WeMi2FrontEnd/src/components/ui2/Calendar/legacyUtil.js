/**
 * Esporta i risultati prodotti dal Calendario in un formato compatibile con ui/Calendario, versione 1.0
 */
export function computeLegacy(input) {
    const defaultLegacy = {
        attivo: false,
        txValue: "Giorno",
        countM: 0,
        countP: 0,
        fascia: [
            {
                txValue: "Mattino",
                attivo: false,
                ore: [
                    {txValue: "01"},
                    {txValue: "02"},
                    {txValue: "03"},
                    {txValue: "04"},
                    {txValue: "05"},
                    {txValue: "06"},
                    {txValue: "07"},
                    {txValue: "08"},
                    {txValue: "09"},
                    {txValue: "10"},
                    {txValue: "11"},
                    {txValue: "12"}
                ]
            },
            {
                txValue: "Pomeriggio",
                attivo: false,
                ore: [
                    {txValue: "13"},
                    {txValue: "14"},
                    {txValue: "15"},
                    {txValue: "16"},
                    {txValue: "17"},
                    {txValue: "18"},
                    {txValue: "19"},
                    {txValue: "20"},
                    {txValue: "21"},
                    {txValue: "22"},
                    {txValue: "23"},
                    {txValue: "24"}
                ]
            }
        ]
    }
    const output = [];

    input.forEach(day => {
       const legacyDay = JSON.parse(JSON.stringify(defaultLegacy));
       legacyDay.txValue = day.txValue;
       legacyDay.attivo = day.count > 0;

       const hoursBinM = day.hoursBin.substr(0, 12),
             hoursBinP = day.hoursBin.substr(12, 12);
        legacyDay.countM = hoursBinM.split("1").length - 1;
        legacyDay.countP = hoursBinP.split("1").length - 1;
        legacyDay.fascia[0].attivo = legacyDay.countM > 0;
        legacyDay.fascia[1].attivo = legacyDay.countP > 0;

        for (let h=1; h<=24; h++) {
            let p = (h>12) ? h-12 : h;
            if (day.hoursBin.charAt(h-1) === '1') {
                if(p!=1 && p!=12 && day.hoursBin.charAt(h-2) === '1' && day.hoursBin.charAt(h) === '1') {
                    legacyDay.fascia[(h>12)?1:0].ore[p-1].compreso = true;
                } else {
                    legacyDay.fascia[(h>12)?1:0].ore[p-1].attivo = true;
                }
            }
        }

        output.push(legacyDay);
    });

    return output;
}
