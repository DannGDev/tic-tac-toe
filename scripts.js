
const one = document.querySelector('.one')
const two = document.querySelector('.two')
const three = document.querySelector('.three')
const four = document.querySelector('.four')
const five = document.querySelector('.five')
const six = document.querySelector('.six')
const seven = document.querySelector('.seven')
const eigth = document.querySelector('.eigth')
const nine = document.querySelector('.nine')

const restart = document.querySelector('button')
const playerXScore = document.querySelector('.player-score')
const playerOScore = document.querySelector('.computer-score')
const totalGames = document.querySelector('.games-played')
const drawGames = document.querySelector('.draw-score')
const winnerMessage = document.querySelector('.winner-message')

const line = document.querySelector('img').style;
const slots = [one, two, three, four, five, six, seven, eigth, nine]

let value = 'X'
let gameOver = false
let playerX = 0
let playerO = 0
let resetGame = 0
let drawScore = 0


function clicking(val) {
    if (gameOver) return

    const slotsMap = {
        1: one, 2: two, 3: three, 4: four, 5: five,
        6: six, 7: seven, 8: eigth, 9: nine
    }

    if (slotsMap[val].textContent !== '') return

    slotsMap[val].textContent = value
    value = value === 'X' ? 'O' : 'X'

    verify()
}

function playerScore(winner) {
    if (winner === 'X') {
        playerX++
        playerXScore.textContent = playerX
        winnerMessage.innerHTML = 'X Won'
    }

    if (winner === 'O') {
        playerO++
        playerOScore.textContent = playerO
        winnerMessage.innerHTML = 'O Won'
    }

}

function drawLine(from, to) {
    const board = document.querySelector('.game')
    const boardRect = board.getBoundingClientRect()
    const fromRect = from.getBoundingClientRect()
    const toRect = to.getBoundingClientRect()

    const x1 = fromRect.left - boardRect.left + fromRect.width / 2
    const y1 = fromRect.top - boardRect.top + fromRect.height / 2
    const x2 = toRect.left - boardRect.left + toRect.width / 2
    const y2 = toRect.top - boardRect.top + toRect.height / 2

    const length = Math.hypot(x2 - x1, y2 - y1)
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI

    line.display = 'block'
    line.width = `${length}px`
    line.top = `${y1}px`
    line.left = `${x1}px`
    line.transform = `rotate(${angle}deg)`
    line.transformOrigin = '0 50%'
}

function resetLine() {
    line.display = 'none'
    line.width = '0'
}

function verify() {

    const wins = [
        [one, two, three],
        [four, five, six],
        [seven, eigth, nine],
        [one, four, seven],
        [two, five, eigth],
        [three, six, nine],
        [one, five, nine],
        [three, five, seven]
    ]
        

    for (const [a, b, c] of wins) {
        if (
            a.textContent && a.textContent === b.textContent && a.textContent === c.textContent) {
            gameOver = true
            drawLine(a,c)
            
            if (a.textContent === 'X') {
                playerX++
                playerXScore.textContent = playerX
                winnerMessage.textContent = 'X Player WON'
            } else {
                playerO++
                playerOScore.textContent = playerO
                winnerMessage.textContent = 'O Player WON'
            }
            return
        }
    }
    checkDraw()
}

function checkDraw() {
    const slots = [
        one, two, three, four, five, six, seven, eigth, nine
    ]

    const allFilled = slots.every(slot =>
        slot.textContent === 'X' || slot.textContent === 'O'
    )

    if (allFilled && !gameOver) {
        gameOver = true
        gameIsADraw()
    }
}

function gameIsADraw() {
    const slots = [
        one, two, three, four, five, six, seven, eigth, nine
    ]

    slots.forEach(slot => {
        slot.style.backgroundColor = '#fff201'
    })

    drawScore++
    drawGames.textContent = drawScore
    winnerMessage.innerHTML = 'It is a Draw'
}

function restartGame() {

    const slots = [
        one, two, three,
        four, five, six,
        seven, eigth, nine
    ]

    slots.forEach(slot => {
        slot.textContent = ''
        slot.style.backgroundColor = ''
    })

    resetLine()
    value = 'X'
    gameOver = false

    resetGame++
    totalGames.textContent = resetGame
    winnerMessage.innerHTML = ''

}