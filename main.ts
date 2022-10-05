radio.onReceivedValueDeprecated(function (name, value) {
    if (name == "Turn") {
        RawRoll = value
        MappedRoll = pins.map(
        RawRoll,
        -1000,
        1000,
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
        1000,
        -1000,
        0,
        180
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
        if (RawGrabber == -9999) {
            pins.digitalWritePin(DigitalPin.P0, 0)
        } else {
            MappedGrabber = pins.map(
            RawGrabber,
            0,
            1000,
            0,
            180
            )
            pins.servoWritePin(AnalogPin.P0, MappedGrabber)
        }
    }
})
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
radio.setGroup(1)
basic.showLeds(`
    # . . . #
    . # . # .
    . . # . .
    . # . # .
    . # # # .
    `)
basic.forever(function () {
    basic.pause(100)
})
basic.forever(function () {
	
})
