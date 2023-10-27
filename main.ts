function OLEDDisplay () {
    if (OledDauer >= OLEDBearbeiten) {
        ZeitOLEDWechsel = ZeitAktuell
        if (SchrittNummerOLED == 1) {
            kitronik_VIEW128x64.zeigeZahl(Geschwindigkeit)
            SchrittNummerOLED = 2
        } else if (SchrittNummerOLED == 2) {
            kitronik_VIEW128x64.show(kitronik_VIEW128x64.OLEDstring("Entfernung"), 1, kitronik_VIEW128x64.ShowAlign.Left)
            kitronik_VIEW128x64.show(calliBot2.entfernung(C2Einheit.cm), 1, kitronik_VIEW128x64.ShowAlign.Right)
            SchrittNummerOLED = 3
        } else if (SchrittNummerOLED == 3) {
            kitronik_VIEW128x64.show(kitronik_VIEW128x64.OLEDstring("Licht"), 2, kitronik_VIEW128x64.ShowAlign.Left)
            kitronik_VIEW128x64.show(input.lightLevel(), 2, kitronik_VIEW128x64.ShowAlign.Right)
            SchrittNummerOLED = 4
        } else if (SchrittNummerOLED == 4) {
            kitronik_VIEW128x64.show(kitronik_VIEW128x64.OLEDstring("Temperatur"), 3, kitronik_VIEW128x64.ShowAlign.Left)
            kitronik_VIEW128x64.show(input.temperature(), 3, kitronik_VIEW128x64.ShowAlign.Right)
            SchrittNummerOLED = 4
        } else if (SchrittNummerOLED == 5) {
            kitronik_VIEW128x64.show(kitronik_VIEW128x64.OLEDstring("Lautstärke"), 4, kitronik_VIEW128x64.ShowAlign.Left)
            kitronik_VIEW128x64.show(input.soundLevel(), 4, kitronik_VIEW128x64.ShowAlign.Right)
            SchrittNummerOLED = 6
        } else if (SchrittNummerOLED == 6) {
            kitronik_VIEW128x64.show(kitronik_VIEW128x64.OLEDstring("Kompass"), 5, kitronik_VIEW128x64.ShowAlign.Left)
            kitronik_VIEW128x64.show(input.compassHeading(), 5, kitronik_VIEW128x64.ShowAlign.Right)
            SchrittNummerOLED = 7
        } else if (SchrittNummerOLED == 7) {
            kitronik_VIEW128x64.show(kitronik_VIEW128x64.OLEDstring("Beschleunigung"), 6, kitronik_VIEW128x64.ShowAlign.Left)
            kitronik_VIEW128x64.show(input.acceleration(Dimension.Strength), 6, kitronik_VIEW128x64.ShowAlign.Right)
            SchrittNummerOLED = 7
        } else {
            kitronik_VIEW128x64.writeImageOLED(kitronik_VIEW128x64.iImage(IconNames.Sad), 60, 28)
        }
    }
}
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    Start = 0
    basic.setLedColor(0xff0000)
    Programm = Programm + 1
    SchrittnummerGlobal = 1
    GeschwindigkeitAlt = -1
    if (Programm > 4) {
        Programm = 1
    }
    AnzeigeProgramm()
})
// Dummy fuer Test
function Programm1 () {
    if (SchrittnummerGlobal == 1) {
        if (Start == 1) {
            SchrittnummerGlobal = 10
        }
    } else if (SchrittnummerGlobal == 10) {
        if (SchrittNeu) {
            calliBot2.setLed(C2Motor.beide, false)
        }
    } else {
        Start = 0
        SchrittnummerGlobal = 1
    }
}
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    if (Start == 0) {
        Start = 1
        basic.setLedColor(0x00ff00)
        AnzeigeProgramm()
    } else {
        basic.setLedColor(0xff0000)
        Start = 0
        GeschwindigkeitAlt = -1
    }
})
input.onPinTouchEvent(TouchPin.P0, input.buttonEventDown(), function () {
    Geschwindigkeit = Geschwindigkeit - 4
    if (Geschwindigkeit < 0) {
        Geschwindigkeit = 0
    }
})
function AnzeigeProgramm () {
    if (Programm == 1) {
        basic.showLeds(`
            # . . . .
            . . . . .
            . # # # .
            # # # # #
            # # . # #
            `)
    } else if (Programm == 2) {
        basic.showLeds(`
            # # . . .
            . . . . .
            # . . # #
            # . # # #
            # . . # #
            `)
    } else if (Programm == 3) {
        basic.showLeds(`
            # # # . .
            . . . . .
            . # # # .
            # . . . #
            . # # # .
            `)
    } else if (Programm == 4) {
        basic.showLeds(`
            # # # # .
            . . . . .
            . . # # .
            # # . . #
            . . . # .
            `)
    }
}
function LEDAnsteuerung () {
    if (Start == 1) {
        if (SchrittNummerLED == 1) {
            SchrittNummerLED = 2
            ZeitBelWechsel = ZeitAktuell
            calliBot2.setRgbLed(C2RgbLed.LV, BelRot, BelGruen, BelBlau)
            calliBot2.setRgbLed(C2RgbLed.LH, 0, 0, 0)
        } else if (SchrittNummerLED == 2) {
            if (BelDauer >= BelWechsel) {
                SchrittNummerLED = 3
                ZeitBelWechsel = ZeitAktuell
                calliBot2.setRgbLed(C2RgbLed.LV, 0, 0, 0)
                calliBot2.setRgbLed(C2RgbLed.RV, BelRot, BelGruen, BelBlau)
            }
        } else if (SchrittNummerLED == 3) {
            if (BelDauer >= BelWechsel) {
                SchrittNummerLED = 4
                ZeitBelWechsel = ZeitAktuell
                calliBot2.setRgbLed(C2RgbLed.RV, 0, 0, 0)
                calliBot2.setRgbLed(C2RgbLed.RH, BelRot, BelGruen, BelBlau)
            }
        } else if (SchrittNummerLED == 4) {
            if (BelDauer >= BelWechsel) {
                SchrittNummerLED = 5
                ZeitBelWechsel = ZeitAktuell
                calliBot2.setRgbLed(C2RgbLed.RH, 0, 0, 0)
                calliBot2.setRgbLed(C2RgbLed.LH, BelRot, BelGruen, BelBlau)
            }
        } else if (SchrittNummerLED == 5) {
            if (BelDauer >= BelWechsel) {
                SchrittNummerLED = 1
                ZeitBelWechsel = ZeitAktuell
                if (BelRot > 0) {
                    BelBlau = 0
                    BelGruen = 16
                    BelRot = 0
                } else if (BelGruen > 0) {
                    BelBlau = 16
                    BelGruen = 0
                    BelRot = 0
                } else if (BelBlau > 0) {
                    BelBlau = 0
                    BelGruen = 0
                    BelRot = 16
                }
            }
        } else {
            calliBot2.setRgbLed(C2RgbLed.All, 0, 0, 0)
        }
    } else {
        BelBlau = 0
        BelGruen = 0
        BelRot = 16
        SchrittNummerLED = 1
        SchrittnummerGlobal = 1
        calliBot2.setRgbLed(C2RgbLed.All, 0, 0, 0)
        calliBot2.motorStop(C2Motor.beide, C2Stop.Bremsen)
        calliBot2.setLed(C2Motor.beide, false)
        if (Geschwindigkeit != GeschwindigkeitAlt) {
            GeschwindigkeitAlt = Geschwindigkeit
            if (Geschwindigkeit > 96) {
                basic.showLeds(`
                    # # # # #
                    # # # # #
                    # # # # #
                    # # # # #
                    # # # # #
                    `)
            } else if (Geschwindigkeit > 92) {
                basic.showLeds(`
                    # # # # #
                    # # # # #
                    # # # # #
                    # # # # #
                    # # # # .
                    `)
            } else if (Geschwindigkeit > 88) {
                basic.showLeds(`
                    # # # # #
                    # # # # #
                    # # # # #
                    # # # # #
                    # # # . .
                    `)
            } else if (Geschwindigkeit > 84) {
                basic.showLeds(`
                    # # # # #
                    # # # # #
                    # # # # #
                    # # # # #
                    # # . . .
                    `)
            } else if (Geschwindigkeit > 80) {
                basic.showLeds(`
                    # # # # #
                    # # # # #
                    # # # # #
                    # # # # #
                    # . . . .
                    `)
            } else if (Geschwindigkeit > 76) {
                basic.showLeds(`
                    # # # # #
                    # # # # #
                    # # # # #
                    # # # # #
                    . . . . .
                    `)
            } else if (Geschwindigkeit > 72) {
                basic.showLeds(`
                    # # # # #
                    # # # # #
                    # # # # #
                    # # # # .
                    . . . . .
                    `)
            } else if (Geschwindigkeit > 68) {
                basic.showLeds(`
                    # # # # #
                    # # # # #
                    # # # # #
                    # # # . .
                    . . . . .
                    `)
            } else if (Geschwindigkeit > 64) {
                basic.showLeds(`
                    # # # # #
                    # # # # #
                    # # # # #
                    # # . . .
                    . . . . .
                    `)
            } else if (Geschwindigkeit > 60) {
                basic.showLeds(`
                    # # # # #
                    # # # # #
                    # # # # #
                    # . . . .
                    . . . . .
                    `)
            } else if (Geschwindigkeit > 56) {
                basic.showLeds(`
                    # # # # #
                    # # # # #
                    # # # # #
                    . . . . .
                    . . . . .
                    `)
            } else if (Geschwindigkeit > 52) {
                basic.showLeds(`
                    # # # # #
                    # # # # #
                    # # # # .
                    . . . . .
                    . . . . .
                    `)
            } else if (Geschwindigkeit > 48) {
                basic.showLeds(`
                    # # # # #
                    # # # # #
                    # # # . .
                    . . . . .
                    . . . . .
                    `)
            } else if (Geschwindigkeit > 44) {
                basic.showLeds(`
                    # # # # #
                    # # # # #
                    # # . . .
                    . . . . .
                    . . . . .
                    `)
            } else if (Geschwindigkeit > 40) {
                basic.showLeds(`
                    # # # # #
                    # # # # #
                    # . . . .
                    . . . . .
                    . . . . .
                    `)
            } else if (Geschwindigkeit > 36) {
                basic.showLeds(`
                    # # # # #
                    # # # # #
                    . . . . .
                    . . . . .
                    . . . . .
                    `)
            } else if (Geschwindigkeit > 32) {
                basic.showLeds(`
                    # # # # #
                    # # # # .
                    . . . . .
                    . . . . .
                    . . . . .
                    `)
            } else if (Geschwindigkeit > 28) {
                basic.showLeds(`
                    # # # # #
                    # # # . .
                    . . . . .
                    . . . . .
                    . . . . .
                    `)
            } else if (Geschwindigkeit > 24) {
                basic.showLeds(`
                    # # # # #
                    # # . . .
                    . . . . .
                    . . . . .
                    . . . . .
                    `)
            } else if (Geschwindigkeit > 20) {
                basic.showLeds(`
                    # # # # #
                    # . . . .
                    . . . . .
                    . . . . .
                    . . . . .
                    `)
            } else if (Geschwindigkeit > 16) {
                basic.showLeds(`
                    # # # # #
                    . . . . .
                    . . . . .
                    . . . . .
                    . . . . .
                    `)
            } else if (Geschwindigkeit > 12) {
                basic.showLeds(`
                    # # # # .
                    . . . . .
                    . . . . .
                    . . . . .
                    . . . . .
                    `)
            } else if (Geschwindigkeit > 8) {
                basic.showLeds(`
                    # # # . .
                    . . . . .
                    . . . . .
                    . . . . .
                    . . . . .
                    `)
            } else if (Geschwindigkeit > 4) {
                basic.showLeds(`
                    # # . . .
                    . . . . .
                    . . . . .
                    . . . . .
                    . . . . .
                    `)
            } else if (Geschwindigkeit > 0) {
                basic.showLeds(`
                    # . . . .
                    . . . . .
                    . . . . .
                    . . . . .
                    . . . . .
                    `)
            } else {
                basic.showLeds(`
                    . . . . .
                    . . . . .
                    . . . . .
                    . . . . .
                    . . . . .
                    `)
            }
        }
    }
}
input.onPinTouchEvent(TouchPin.P3, input.buttonEventDown(), function () {
    Geschwindigkeit = Geschwindigkeit + 4
    if (Geschwindigkeit > 100) {
        Geschwindigkeit = 100
    }
})
let SchrittnummerGlobalAlt = 0
let Entfernung = 0
let Entf1 = 0
let Entf2 = 0
let Entf3 = 0
let IstZeitPause = 0
let BelDauer = 0
let BelBlau = 0
let BelGruen = 0
let BelRot = 0
let ZeitBelWechsel = 0
let SchrittNummerLED = 0
let SchrittNeu = 0
let GeschwindigkeitAlt = 0
let SchrittnummerGlobal = 0
let Programm = 0
let Start = 0
let Geschwindigkeit = 0
let SchrittNummerOLED = 0
let ZeitAktuell = 0
let ZeitOLEDWechsel = 0
let OledDauer = 0
let OLEDBearbeiten = 0
let BelWechsel = 0
let ZeitPause = 0
let SuchZeit = 0
let GeschwindigkeitUS = 0
BelWechsel = 100
OLEDBearbeiten = 500
kitronik_VIEW128x64.clear()
basic.forever(function () {
    let StartZeitPause = 0
    ZeitAktuell = control.millis()
    BelDauer = ZeitAktuell - ZeitBelWechsel
    OledDauer = ZeitAktuell - ZeitOLEDWechsel
    IstZeitPause = ZeitAktuell - StartZeitPause
    Entf3 = Entf2
    Entf2 = Entf1
    Entf1 = calliBot2.entfernung(C2Einheit.cm)
    Entfernung = (Entf1 + Entf2 + Entf3) / 3
    if (SchrittnummerGlobal == 0) {
        calliBot2.motorStop(C2Motor.beide, C2Stop.Bremsen)
        Geschwindigkeit = 40
        Programm = 1
        basic.setLedColor(0xff0000)
        basic.showString("ON")
        SchrittnummerGlobal = 1
    }
    if (Programm == 1) {
        Programm1()
    } else {
        basic.showIcon(IconNames.Confused)
        basic.setLedColor(0xff8000)
        Start = 0
        SchrittnummerGlobal = 1
        calliBot2.setLed(C2Motor.beide, false)
        calliBot2.motorStop(C2Motor.beide, C2Stop.Frei)
    }
    SchrittNeu = 0
    if (SchrittnummerGlobal != SchrittnummerGlobalAlt) {
        SchrittNeu = 1
    }
    SchrittnummerGlobalAlt = SchrittnummerGlobal
    LEDAnsteuerung()
    OLEDDisplay()
})
