const calcolaCalendario = (calendario) =>{
    let string={}
    if(calendario)
    for(let i=0; i<calendario.length;i+=1){
      let fascia = calendario[i].fascia;
      let index='tx_'+calendario[i].txValue.toLowerCase().replace('ì','i')+'_cal_disp'
      string[index] = '';
      for(let j=0; j<fascia.length; j+=1){
        let orario = fascia[j].ore;
        for(let z=0; z<orario.length; z+=1){
          if(orario[z].attivo||orario[z].compreso){
            string[index]=string[index]+'1';
          }
          else{
            string[index]=string[index]+'0';
          }
        }
      }
    }
    return string
}

export default calcolaCalendario;