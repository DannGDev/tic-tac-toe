
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
const lineElement = document.querySelector('img')
const slots = [one, two, three, four, five, six, seven, eigth, nine]


let value = 'X'
let gameOver = false
let playerX = 0
let playerO = 0
let resetGame = 0
let drawScore = 0
let gameMode = null

function selectGameMode(mode) {
    gameMode = mode
    const popup = document.querySelector('.game-mode')
    popup.style.visibility = 'hidden'
    popup.style.pointerEvents = 'none'
}

function animateMark(slot) {
    slot.style.transform = 'scale(0.3)'
    slot.style.opacity = '0'

    requestAnimationFrame(() => {
        slot.style.transition = 'transform 0.2s ease, opacity 0.2s ease'
        slot.style.transform = 'scale(1)'
        slot.style.opacity = '1'
    })
}

function clicking(val) {
    if (gameOver) return

    const slotsMap = {
        1: one, 2: two, 3: three, 4: four, 5: five,
        6: six, 7: seven, 8: eigth, 9: nine
    }

    const slot = slotsMap[val]
    if (slot.textContent !== '') return

    slot.textContent = value
    animateMark(slot)
    value = value === 'X' ? 'O' : 'X'

    verify()

    if (gameMode === 'cpu' && !gameOver) {
        setTimeout(computerMove, 300)
    }
}

function getEmptySlots() {
    return slots.filter(slot => slot.textContent === '')
}

function findWinningMove(symbol) {
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

    for (const combo of wins) {
        const values = combo.map(slot => slot.textContent)
        if (values.filter(v => v === symbol).length === 2 && values.includes('')) {
            return combo[values.indexOf('')]
        }
    }
    return null
}

function computerMove() {
    if (gameOver) return

    let move =
        findWinningMove('O') ||
        findWinningMove('X') ||
        (five.textContent === '' ? five : null) ||
        [one, three, seven, nine].find(s => s.textContent === '') ||
        getEmptySlots()[0]

    if (!move) return

    move.textContent = 'O'
    animateMark(move)
    value = 'X'
    verify()
}

function animateLineDraw(finalLength) {
    line.transition = 'none'
    line.width = `${finalLength}px`

    requestAnimationFrame(() => {
        line.transition = 'width 04s ease'
        line.width = `${finalLength}px`
    })
}

    function animateWinLine() {
    lineElement.classList.remove('win-line-blink', 'win-line-glow')

    void lineElement.offsetHeight

    lineElement.classList.add('win-line-blink', 'win-line-glow')
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

    const extraLength = 20
    const length = Math.hypot(x2 - x1, y2 - y1) + extraLength
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI

    line.display = 'block'
    line.top = `${y1}px`
    line.left = `${x1}px`
    line.transform = `rotate(${angle}deg)`
    line.transformOrigin = '0 50%'
    line.zIndex = '999'
    line.position = 'absolute'

    requestAnimationFrame(() => {
    animateLineDraw(length)
    animateWinLine()
})
}


function resetLine() {
    line.display = 'none'
    line.width = '0'
    line.transition = 'none'
    lineElement.classList.remove('win-line-blink')
    lineElement.classList.remove('win-line-glow')

    void lineElement.offsetWidth
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
        if (a.textContent && a.textContent === b.textContent && a.textContent === c.textContent) {
            gameOver = true
            drawLine(a, c)

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
    if (slots.every(slot => slot.textContent !== '') && !gameOver) {
        gameOver = true
        gameIsADraw()
    }
}

function gameIsADraw() {
    slots.forEach(slot => slot.style.backgroundColor = '#fff201')
    drawScore++
    drawGames.textContent = drawScore
    winnerMessage.innerHTML = 'It is a Draw'
}

function restartGame() {
    slots.forEach(slot => {
        slot.textContent = ''
        slot.style.backgroundColor = ''
        slot.style.transition = ''
        slot.style.transform = ''
        slot.style.opacity = ''
    })

    resetLine()
    value = 'X'
    gameOver = false
    resetGame++
    totalGames.textContent = resetGame
    winnerMessage.innerHTML = ''
}

document.querySelectorAll('.mode-select button')[0]
    .addEventListener('click', () => selectGameMode('human'))

document.querySelectorAll('.mode-select button')[1]
    .addEventListener('click', () => selectGameMode('cpu'))
