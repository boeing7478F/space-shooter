input.onButtonPressed(Button.A, function () {
    if (px > 0) {
        led.unplot(px, py)
        px += -1
    }
})
input.onButtonPressed(Button.AB, function () {
    shoot = 1
})
input.onButtonPressed(Button.B, function () {
    if (px < 4) {
        led.unplot(px, py)
        px += 1
    }
})
let killed: number[] = []
let enemyY: number[] = []
let enemyX: number[] = []
let shoot = 0
let py = 0
let px = 0
px += 2
py = 4
let my = 3
shoot = 0
let ex = 0
let time = 0
let speed = 50
let acc = 0
for (let index = 0; index <= 4; index++) {
    enemyX[index] = randint(0, 4)
    enemyY[index] = index * -1
    killed[index] = 0
}
basic.forever(function () {
    led.plotBrightness(px, py, 255)
    for (let index = 0; index <= 4; index++) {
        if (killed[index] == 0) {
            led.unplot(enemyX[index], enemyY[index] - 1)
            led.plotBrightness(enemyX[index], enemyY[index], 255)
        }
    }
    if (shoot == 1) {
        led.plotBrightness(px, my, 51)
        for (let index = 0; index <= 4; index++) {
            if (killed[index] == 0 && (px == enemyX[index] && my == enemyY[index])) {
                killed[index] = 1
            }
        }
        basic.pause(25)
        led.unplot(px, my)
        my += -1
    }
    if (time > speed) {
        time = 0
        acc += 1
        for (let index = 0; index <= 4; index++) {
            enemyY[index] = enemyY[index] + 1
        }
    }
    if (my < 0) {
        shoot = 0
        my = 5
    }
    for (let index = 0; index <= 4; index++) {
        if (killed[index] == 0) {
            if (enemyY[index] > 4) {
                game.gameOver()
                basic.pause(200)
                basic.clearScreen()
                basic.showString("SCORE : ")
                basic.showNumber(acc)
            }
        }
    }
    time += 1
    if (acc % 5 == 0) {
        speed += -3
        acc += 1
    }
    for (let index = 0; index <= 4; index++) {
        if (enemyY[index] > 4) {
            enemyY[index] = -1
            enemyX[index] = randint(0, 4)
            killed[index] = 0
        }
    }
})
