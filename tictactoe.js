const CONFIG = require('./config.js')
const Game = require('./Classes/Game.js')

var iterator = 0

function printState(game) {
    if (CONFIG.disableCmdPrint) return
    if (CONFIG.disableHistory) process.stdout.write("\u001b[2J\u001b[0;0H")

    process.stdout.write('\t');
    for (let w = 0; w < game.width; w++) {
        process.stdout.write('   ' + w.toString() + '   ')
    }
    process.stdout.write('\n\n')

    game.fields.forEach((row, rowindex) => {
        process.stdout.write('\t');
        [...Array(game.width)].map(() => process.stdout.write('-------'))
        process.stdout.write('\n')
        process.stdout.write(rowindex.toString() + '\t')

        row.forEach((col, colindex, origin) => {
            if (colindex === origin.length - 1) {
                process.stdout.write('|  ' + col.getValue() + '  |')
            } else {
                process.stdout.write('|  ' + col.getValue() + '   ')
            }
        })
        process.stdout.write('\n')
    });
    process.stdout.write('\t');
    [...Array(game.width)].map(() => process.stdout.write('-------'))
    process.stdout.write('\n')
}

function play() {
    let game = new Game(CONFIG.width, CONFIG.height, CONFIG.distance)
    game.setupNeighbourhood()
    printState(game)

    process.stdin.on('data', destination => {
        destination = destination.toString()
        let [row, col] = destination.split(CONFIG.inputDividerCharacter)
        row = parseInt(row)
        col = parseInt(col)

        if (game.isInBoundaries(row, col)) {

            if (game.fields[row][col].hasValueOf(CONFIG.emptyField)) {
                game.fields[row][col].setValue(CONFIG.players[iterator % CONFIG.players.length].symbol)

                if (game.fields[row][col].countNeighbours(game.fields[row][col].getValue()) >= CONFIG.distance) {
                    printState(game)
                    process.exit()
                }

                iterator++
                printState(game)
            }
        }
    })
}

play()