export const CalcolaStatoRichiestaBase = (rBase) => {
    let richiesta = 1;
    let arrayRichiesteEnte =  rBase.richiestaEnte;
    let arrayStatiAggregati = [];


    arrayRichiesteEnte.map(rEnte => {
      const lastState = rEnte.storiaStati[rEnte.storiaStati.length -1];
      if(lastState!==undefined ){
      if ( lastState.cd_stato_ric_serv_ente === '8') 
          return richiesta = 2;
    else arrayStatiAggregati.push(lastState.cd_stato_ric_serv_ente)
}
     })
    if(arrayStatiAggregati.length > 0 && arrayStatiAggregati.every( value => value === '5'))
    return richiesta = 3;   
    if(arrayStatiAggregati.length > 0 && arrayStatiAggregati.every( value => value === '6'))
    return richiesta = 4;

    if(richiesta!== 0)
    return richiesta; 
  }