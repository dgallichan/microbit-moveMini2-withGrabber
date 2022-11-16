radio.onReceivedValueDeprecated(function (name, value) {
    if (name == "Turn") {
        RawRoll = value
        MappedRoll = pins.map(
        RawRoll,
        -90,
        90,
        0,
        180
        )
        RollLeft = MappedRoll
        RollRight = MappedRoll
    }
    if (name == "Drive") {
        RawPitch = value
        MappedPitch = pins.map(
        RawPitch,
        -90,
        90,
        180,
        0
        )
        PitchLeft = MappedPitch
        PitchRight = 180 - MappedPitch
    }
    LeftOutput = (PitchLeft + RollLeft) / 2
    RightOutput = (PitchRight + RollRight) / 2
    if (RawPitch == 0 && RawRoll == 0) {
        pins.digitalWritePin(DigitalPin.P1, 0)
        pins.digitalWritePin(DigitalPin.P2, 0)
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
            pins.servoWritePin(AnalogPin.P0, Math.constrain(MappedGrabber, 0, 140))
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
let RightOutput = 0
let LeftOutput = 0
let PitchRight = 0
let PitchLeft = 0
let MappedPitch = 0
let RawPitch = 0
let RollRight = 0
let RollLeft = 0
let MappedRoll = 0
let RawRoll = 0
let groupNumber = 0
groupNumber = 253
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
