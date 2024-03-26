export const calcolaPreventivo = (input,callback) => {
    const risultato = {};
    if(input.oreSettimanali){
    //Non CONVIVENTE
    if (input.convivenza.id === 3 ) {
        risultato.preventivo = NonConvivenza.preventivo;
        risultato.prospetto = NonConvivenza.prospetto;
        risultato.preventivo.riposi.value = "24 ore di domenica";
        risultato.preventivo.TBO = input.tariffa; //Prendere da Database
        risultato.preventivo.TO.value =  input.pagaProposta;
        risultato.preventivo.SM.value  = (input.oreSettimanali * risultato.preventivo.TO.value * 52)/12;
        risultato.preventivo.SUP.value = risultato.preventivo.TO.value - risultato.preventivo.TBO;
        risultato.preventivo.TOE.value = risultato.preventivo.TO.value + (risultato.preventivo.TO.value / 12);
        risultato.preventivo.IV.value = 0;
        risultato.prospetto.IVAF.value = 0;
        risultato.prospetto.SNA.value = risultato.preventivo.SM.value * 12;
        //input.tariffa leggere da tabella contributi
        risultato.prospetto.CTT.value = input.tariffa * input.oreSettimanali * 52;
        risultato.prospetto.CDL.value = input.tariffa * input.oreSettimanali * 52;
        risultato.prospetto.CLA.value = input.tariffa * input.oreSettimanali * 52;
        risultato.prospetto.CACODL.value = 0.02 * input.oreSettimanali * 52;
        risultato.prospetto.CACOLA.value = 0.01 * input.oreSettimanali * 52;
        risultato.prospetto.A13.value = risultato.preventivo.SM;
        risultato.prospetto.TFR.value = risultato.preventivo.SM * 13 / 13.5;
        risultato.prospetto.totaleAnnuoConContributi.value = risultato.prospetto.TFR.value + risultato.prospetto.A13.value +
            risultato.prospetto.CTT.value + risultato.prospetto.SNA.value + risultato.prospetto.CACOLA.value + risultato.prospetto.CACODL.value + risultato.prospetto.IVAF.value;
        risultato.prospetto.totaleMensileConContributi.value = risultato.prospetto.totaleAnnuoConContributi.value / 12;

        risultato.prospetto.totaleAnnuoAlNetto.value = risultato.prospetto.SNA.value + risultato.prospetto.CDL.value + risultato.prospetto.A13.value +
            risultato.prospetto.TFR.value + risultato.prospetto.CACODL.value + risultato.prospetto.IVAF.value;
        risultato.prospetto.totaleMensileAlNetto.value = risultato.prospetto.totaleAnnuoAlNetto.value / 12;
    }
    //CONVIVENTE
    else {
        risultato.preventivo = Convivenza.preventivo;
        risultato.prospetto = Convivenza.prospetto;
        risultato.preventivo.riposi.value = "36 ore di cui 24 la domenica";
        risultato.preventivo.TO.value =  input.pagaProposta;
       
        risultato.preventivo.SM  = (input.oreSettimanali * risultato.preventivo.TO.value * 52)/12;
        //input.TMM deriva da tabella
        
        risultato.preventivo.SUP.value = input.pagaProposta - input.TMM
        risultato.preventivo.IDDS = (input.indennita.indennitaPranzo+ input.indennita.indennitaCena+ input.indennita.indennitaAlloggio);
        if (input.convivenza.id === 6) {
            risultato.preventivo.SM = (input.oreSettimanali * risultato.preventivo.TO.value * 52) / 12;
            risultato.preventivo.IV = risultato.preventivo.IDDS * 52 / 12;
            risultato.prospetto.IVAF.value = risultato.preventivo.IV;
        }
        if (input.convivenza.id === 1 || input.convivenza.id === 2)
            risultato.preventivo.IV = risultato.preventivo.IDDS * 26;
        if (input.convivenza.id === 5)
            risultato.preventivo.IV = (input.colazione + input.alloggio) * 26;

        risultato.preventivo.CNM.value = input.TMM + risultato.preventivo.IDDS

        risultato.preventivo.CMEF.value = input.TMM + risultato.preventivo.IDDS + risultato.preventivo.SUP.value + risultato.preventivo.IV;

        risultato.preventivo.COEF.value = risultato.preventivo.CMEF.value / (input.oreSettimanali / 4, 33)
       
        risultato.prospetto.SNA.value = risultato.preventivo.SM * 12;

        risultato.prospetto.IVAF.value = risultato.preventivo.IV;
//         //input.tariffa leggere da tabella contributi
        risultato.prospetto.CTT.value = input.tariffa * input.oreSettimanali * 52;
        risultato.prospetto.CDL.value = input.tariffa * input.oreSettimanali * 52;
        risultato.prospetto.CLA.value = input.tariffa * input.oreSettimanali * 52;
        risultato.prospetto.CACODL.value = 0.02 * input.oreSettimanali * 52;
        risultato.prospetto.CACOLA.value = 0.01 * input.oreSettimanali * 52;
        risultato.prospetto.A13.value = risultato.preventivo.SM;
        risultato.prospetto.TFR.value = risultato.preventivo.SM * 13 / 13.5;
        risultato.prospetto.totaleAnnuoConContributi.value = risultato.prospetto.TFR.value + risultato.prospetto.A13.value +
            risultato.prospetto.CTT.value + risultato.prospetto.SNA.value + risultato.prospetto.CACOLA.value + risultato.prospetto.CACODL.value + risultato.prospetto.IVAF.value;
        risultato.prospetto.totaleMensileConContributi.value = risultato.prospetto.totaleAnnuoConContributi.value / 12;

        risultato.prospetto.totaleAnnuoAlNetto.value = risultato.prospetto.SNA.value + risultato.prospetto.CDL.value + risultato.prospetto.A13.value +
            risultato.prospetto.TFR.value + risultato.prospetto.CACODL.value + risultato.prospetto.IVAF.value;
        risultato.prospetto.totaleMensileAlNetto.value = risultato.prospetto.totaleAnnuoAlNetto.value / 12;
    }
    callback(risultato);
}

else{
 if(input.convivenza.id === 3){
     risultato.preventivo= NonConvivenza.preventivo;
     risultato.prospetto  =NonConvivenza.prospetto;
 }
 else{
    risultato.preventivo= Convivenza.preventivo;
    risultato.prospetto  =Convivenza.prospetto;
 }
 callback(risultato);
    
}
}



export const NonConvivenza = {
    preventivo: {
      riposi:  { name: 'Riposi', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.' },
      ferie:  { name: 'Ferie', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
      TO:  { name: 'Tariffa oraria'
       //(minimo)'
       , description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
       TOE:  { name: 'Tariffa mensile '
      //(minimo)
      , description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
      SUP:  { name: 'Superminimo', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
      IV:  { name: 'Indennità vitto e alloggio (valore convenzionale)', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
    //   CNM:  { name: 'Retribuzione oraria', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
    //   CMEF:  { name: 'Retribuzione oraria effettiva', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
      SM:  { name: 'Retribuzione medio mensile', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  }
    },
    prospetto: {
     SNA:   { name: 'Stipendio netto annuale', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
     IVAF:  { name: 'Indennità di vitto e alloggio su ferie', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
     CTT:   { name: 'Contributi', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
    CDL:  { name: 'Contributi a carico del datore di lavoro', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
     CLA:   { name: 'Contributi a carico del lavoratore', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
      CACODL:  { name: 'Cassa ${servizio} a carico del datore di lavoro', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
      CACOLA:   { name: 'Cassa ${servizio} a carico del lavoratore', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
      A13:  { name: 'Tredicesima mensilità', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
      TFR:  { name: 'T.F.R.', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
      totaleAnnuoConContributi:  { name: 'Totale annuo', nameDescription: ' comprensivo dei contributi a carico del lavoratore', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
      totaleMensileConContributi:  { name: 'Totale mensile ', nameDescription: ' comprensivo dei contributi a carico del lavoratore', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
      totaleAnnuoAlNetto:  { name: 'Totale annuo', nameDescription: ' al netto dei contributi a carico del lavoratore', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
      totaleMensileAlNetto:  { name: 'Totale mensile', nameDescription: ' al netto dei contributi a carico del lavoratore', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  }
    }
}

export const Convivenza = {
    preventivo: {
      riposi:  { name: 'Riposi', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
       ferie: { name: 'Ferie', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
       TO: { name: 'Tariffa oraria' 
       //(minimo)'
       , description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
       TMM: { name: 'Tariffa mensile' 
       //(minimo)'
       , description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
       ID: { name: 'Indennità', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
       IDDS: { name: 'Indennità D e DS', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
        SUP :{ name: 'Superminimo', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
        IV: { name: 'Indennità vitto e alloggio'
         //(valore convenzionale)'
         , description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
        CNM: { name: 'Costo netto mensile', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
        CMEF:{ name: 'Costo effettivo', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
        COEF:{ name: 'Costo orario effettivo', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  }
    },
    prospetto: {
        SNA:   { name: 'Stipendio netto annuale', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
        IVAF:  { name: 'Indennità di vitto e alloggio su ferie', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
        CTT:   { name: 'Contributi', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
       CDL:  { name: 'Contributi a carico del datore di lavoro', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
        CLA:   { name: 'Contributi a carico del lavoratore', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
         CACODL:  { name: 'Cassa ${servizio} a carico del datore di lavoro', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
         CACOLA:   { name: 'Cassa ${servizio} a carico del lavoratore', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
         A13:  { name: 'Tredicesima mensilità', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
         TFR:  { name: 'T.F.R.', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
         totaleAnnuoConContributi:  { name: 'Totale annuo', nameDescription: ' comprensivo dei contributi a carico del lavoratore', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
         totaleMensileConContributi:  { name: 'Totale mensile ', nameDescription: ' comprensivo dei contributi a carico del lavoratore', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
         totaleAnnuoAlNetto:  { name: 'Totale annuo', nameDescription: ' al netto dei contributi a carico del lavoratore', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
         totaleMensileAlNetto:  { name: 'Totale mensile', nameDescription: ' al netto dei contributi a carico del lavoratore', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  }
       }
}

export const tipologiaConvivenza = [{ value: 1, textValue: 'Convivenza', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
{ value: 2, textValue: 'Convivenza ridotta', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
{ value: 3, textValue: 'Non Convivente', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
{ value: 4, textValue: 'Assistenza notturna', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  },
{ value: 5, textValue: 'Presenza notturna', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  }, { value: 6, textValue: 'Sostituzione riposi', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.'  }];

export const livelli = {
     description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.', 
    livelli: [{ value: 1, textValue: 'Livello A' },
{ value: 2, textValue: 'Livello B' },
{ value: 3, textValue: 'Livello C' },
{ value: 4, textValue: 'Livello D' }]};

export const mockIndennita = [{value: 1, textValue: 'Pranzo e/o colazione', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.' },{value: 2, textValue: 'Cena', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.' },{value: 3, textValue: 'Alloggio', description: 'Lorem ipsum dolor sit amet dolor sit amet lorem.' }];