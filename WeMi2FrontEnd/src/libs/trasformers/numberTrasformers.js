

export const transformsFloatingValue=(value)=>{
    value= String(value);
     if (value.includes('.')) {
       return null;
     }
     return Number.parseFloat(value.replace(',', '.'), 10);
}