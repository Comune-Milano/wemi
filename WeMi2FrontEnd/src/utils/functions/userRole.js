const userRole = (profile)=>{
    let role = "";
    switch(profile){
        case "A":
           role = "Amministratore WeMi";
            break;
        case "E":
           role = "Operatore Ente";
            break;
        case "AE":
           role = "Amministratore Ente";
            break;
        case "C":
           role = "Cittadino";
            break;
        case "C":
           role = "Cittadino";
            break;
        default:
            break;
    }
    return role;
}

export default userRole;