const CONFIG = require('../config.js')
const Field = require('./Field.js')

class Game {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.fields = new Array(height)

        for (let row = 0; row < height; row++) {
            this.fields[row] = new Array(width)
            for (let col = 0; col < width; col++) {
                this.fields[row][col] = new Field(row, col, CONFIG.emptyField)
            }
        }
    }

    isInBoundaries(row, col){
        return (row < this.height && row >= 0 && col < this.width && col >= 0)
    }

    setupNeighbourhood() {
        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                this.fields[row][col].neighbours[0] = row > 0 && col > 0 ? this.fields[row - 1][col - 1] : null                             //  ⭦
                this.fields[row][col].neighbours[1]= row > 0 ? this.fields[row - 1][col] : null                                             //  ⭡
                this.fields[row][col].neighbours[2] = row > 0 && col < this.width - 1 ? this.fields[row - 1][col + 1] : null                //  ⭧
                this.fields[row][col].neighbours[3] = col < this.width - 1 ? this.fields[row][col + 1] : null                               //  ⭢
                this.fields[row][col].neighbours[4]= row < this.height - 1 && col < this.width - 1 ? this.fields[row + 1][col + 1] : null   //  ⭨
                this.fields[row][col].neighbours[5] = row < this.height - 1 ? this.fields[row + 1][col] : null                              //  ⭣
                this.fields[row][col].neighbours[6] = row < this.height - 1 && col > 0 ? this.fields[row + 1][col - 1] : null               //  ⭩
                this.fields[row][col].neighbours[7] = col > 0 ? this.fields[row][col - 1] : null                                            //  ⭠
            }
        }
    }
}

module.exports = Game