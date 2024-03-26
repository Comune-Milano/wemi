const cercaArraySpazi = (disponibilita,cd_attributo)=>{
    let array =[];
   
    if(disponibilita){
    for(let i=0; i< disponibilita.length; i+=1)
       if(disponibilita[i].cd_attributo===cd_attributo)
          array.push({
             id: disponibilita[i].cd_val_attributo,
             value: disponibilita[i].tx_val
          });
    }

    return array
 
 }

 export default cercaArraySpazi;