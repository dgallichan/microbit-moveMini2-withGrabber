radio.onReceivedValueDeprecated(function (name, value) {
    if (name == "Turn") {
        rawTurn = value
        mappedTurn = pins.map(
        rawTurn,
        -90,
        90,
        0,
        180
        )
        turnLeft = mappedTurn
        turnRight = mappedTurn
        LeftOutput = (driveLeft + turnLeft) / 2
        RightOutput = (driveRight + turnRight) / 2
    } else if (name == "Drive") {
        rawDrive = value
        mappedDrive = pins.map(
        rawDrive,
        -90,
        90,
        180,
        0
        )
        driveLeft = mappedDrive
        driveRight = 180 - mappedDrive
        LeftOutput = (driveLeft + turnLeft) / 2
        RightOutput = (driveRight + turnRight) / 2
    } else if (name == "Lmotor") {
        LeftOutput = Math.constrain(value, 0, 180)
    } else if (name == "Rmotor") {
        RightOutput = Math.constrain(value, 0, 180)
    }
    if (rawDrive == 0 && rawTurn == 0) {
        if (name == "Lmotor" || name == "Rmotor") {
            pins.servoWritePin(AnalogPin.P1, LeftOutput)
            pins.servoWritePin(AnalogPin.P2, RightOutput)
        } else {
            pins.digitalWritePin(DigitalPin.P1, 0)
            pins.digitalWritePin(DigitalPin.P2, 0)
        }
    } else {
        pins.servoWritePin(AnalogPin.P1, LeftOutput)
        pins.servoWritePin(AnalogPin.P2, RightOutput)
    }
    if (name == "Grabber") {
        RawGrabber = value
        if (RawGrabber == -999) {
            pins.digitalWritePin(DigitalPin.P0, 0)
        } else {
            // Modify the mapping range to adapt to individual grabber/servo. Full range would be -90 to +90
            MappedGrabber = pins.map(
            RawGrabber,
            -70,
            90,
            0,
            180
            )
            // Again might need calibration - full range is 0 to 180
            pins.servoWritePin(AnalogPin.P0, Math.constrain(MappedGrabber, 0, 90))
        }
    }
})
input.onButtonPressed(Button.AB, function () {
    basic.showNumber(groupNumber)
    makingChoice = true
    while (makingChoice) {
        basic.pause(200)
        if (input.logoIsPressed()) {
            makingChoice = false
            if (groupNumber <= -1) {
                groupNumber = groupNumber + 256
            }
            if (groupNumber >= 256) {
                groupNumber = groupNumber - 256
            }
            radio.setGroup(groupNumber)
            basic.showIcon(IconNames.Yes)
            basic.pause(200)
            basic.showLeds(`
                # . . . #
                . # . # .
                . . # . .
                . # . # .
                . # # # .
                `)
        } else if (input.buttonIsPressed(Button.A)) {
            groupNumber = groupNumber - 1
            basic.showNumber(groupNumber)
        } else if (input.buttonIsPressed(Button.B)) {
            groupNumber = groupNumber + 1
            basic.showNumber(groupNumber)
        }
    }
})
let makingChoice = false
let MappedGrabber = 0
let RawGrabber = 0
let mappedDrive = 0
let rawDrive = 0
let driveRight = 0
let RightOutput = 0
let driveLeft = 0
let LeftOutput = 0
let turnRight = 0
let turnLeft = 0
let mappedTurn = 0
let rawTurn = 0
let groupNumber = 0
groupNumber = 254
radio.setGroup(groupNumber)
basic.showLeds(`
    # . . . #
    . # . # .
    . . # . .
    . # . # .
    . # # # .
    `)
basic.forever(function () {
	
})
