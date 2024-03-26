/**
 * Class domain for voucher management
 */
 export class MotiviRow {
    /**
     * The constructor of the class
     * @param row riga in esame
     */
    constructor(row) {
      this.row = row;
      this.motiviRow = []
    }

    add({id, motivo, col = -1}) {
      this.motiviRow.push({
        id: id,
        motivo: motivo, 
        row: this.row,
        col: col >= 0 ? col + 1 : null
      })
    }

    getMotivi() {
      return this.motiviRow
    }

 }  