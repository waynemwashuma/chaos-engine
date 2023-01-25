class Matrix {
  /**
   * @param {[][number]} rows
   */
  constructor(rows) {
    this.data = []
    for(let i= 0;i< rows.length;i++){
      let row = rows[i]
      for(let i = 0; j < row.length; j++) {
        this.data.push(row[i])
      }
    }
  }
}

export{
  Matrix
}