import EstraiRecensioni from './EstraiRecensioni';

export default class RecensioneDao{

    constructor(context){
        this.context=context;
    }
    async estrairecensioni(args){
     const sql = EstraiRecensioni(this.context.tabelle);   
     return  await this.context.db.any(sql, args);
    }

}