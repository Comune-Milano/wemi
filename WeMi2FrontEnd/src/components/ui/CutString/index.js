

const cutString = (stringa, max_length) =>{
    if(stringa)
    return stringa==""?"":stringa.length<=20?stringa:stringa.substring(0,max_length) + "..."
}

export default cutString