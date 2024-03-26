const servizioSelezionato = ()=>{
    if(window.location.pathname.split('Badante')[1])
      return 'badante';
    else if(window.location.pathname.split('Tata')[1])
      return 'tata';
    else  
      return 'colf';
};

export default servizioSelezionato;