class Field {
    #value;
    constructor(x, y, value) {
        this.x = x
        this.y = y
        this.#value = value
        this.neighbours = [
            null,   //  ⭦
            null,   //  ⭡
            null,   //  ⭧
            null,   //  ⭢
            null,   //  ⭨
            null,   //  ⭣
            null,   //  ⭩
            null    //  ⭠
        ]
    }

    setValue(value){
        this.#value = value
    }

    getValue(){
        return this.#value
    }

    countNeighbours(turnValue){
        let max = 1
        for (let i = 0; i < this.neighbours.length; i++){
            let tmpField = this
            let count = 1

            while(tmpField.neighbours[i] !== null && tmpField.neighbours[i].#value === turnValue){
                tmpField = tmpField.neighbours[i]
            }
            
            //  i + 4 % 8 = reverse direction of current direction
            while (tmpField.neighbours[i + 4 % 8] && tmpField.neighbours[i + 4 % 8].#value === turnValue){
                tmpField = tmpField.neighbours[i + 4 % 8]
                count++
            }
            max = Math.max(count, max)
        }
        return max
    }

    hasValueOf(value){
        return value === this.#value
    }
}

module.exports = Field