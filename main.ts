function OLEDDisplay () {
    if (OledDauer >= OLEDBearbeiten) {
        ZeitOLEDWechsel = ZeitAktuell
        if (SchrittNummerOLED == 1) {
            oledssd1306.setTextXY(0, 10)
            oledssd1306.writeNumber(Geschwindigkeit)
            SchrittNummerOLED = 2
        } else if (SchrittNummerOLED == 2) {
            oledssd1306.setTextXY(1, 10)
            oledssd1306.writeNumber(calliBot2.entfernung(C2Einheit.cm))
            SchrittNummerOLED = 3
        } else if (SchrittNummerOLED == 3) {
            oledssd1306.setTextXY(2, 10)
            oledssd1306.writeNumber(input.lightLevel())
            SchrittNummerOLED = 4
        } else if (SchrittNummerOLED == 4) {
            oledssd1306.setTextXY(3, 10)
            oledssd1306.writeNumber(input.temperature())
            SchrittNummerOLED = 5
        } else if (SchrittNummerOLED == 5) {
            oledssd1306.setTextXY(4, 10)
            oledssd1306.writeNumber(input.soundLevel())
            SchrittNummerOLED = 6
        } else if (SchrittNummerOLED == 6) {
            oledssd1306.setTextXY(5, 10)
            SchrittNummerOLED = 7
        } else if (SchrittNummerOLED == 7) {
            oledssd1306.setTextXY(6, 10)
            oledssd1306.writeNumber(input.acceleration(Dimension.Strength))
            SchrittNummerOLED = 1
        }
    }
}
input.onPinTouchEvent(TouchPin.P0, input.buttonEventDown(), function () {
    Geschwindigkeit = Geschwindigkeit - 4
    if (Geschwindigkeit < 0) {
        Geschwindigkeit = 0
    }
})
function LEDAnsteuerung () {
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
}
input.onPinTouchEvent(TouchPin.P3, input.buttonEventDown(), function () {
    Geschwindigkeit = Geschwindigkeit + 4
    if (Geschwindigkeit > 100) {
        Geschwindigkeit = 100
    }
})
let SchrittnummerGlobalAlt = 0
let SchrittNeu = 0
let Entfernung = 0
let Entf1 = 0
let Entf2 = 0
let Entf3 = 0
let BelDauer = 0
let BelBlau = 0
let BelGruen = 0
let BelRot = 0
let ZeitBelWechsel = 0
let Geschwindigkeit = 0
let ZeitAktuell = 0
let OledDauer = 0
let ZeitOLEDWechsel = 0
let SchrittNummerOLED = 0
let SchrittNummerLED = 0
let OLEDBearbeiten = 0
let BelWechsel = 0
let GeschwindigkeitUS = 0
let SuchZeit = 0
let ZeitPause = 0
BelWechsel = 100
OLEDBearbeiten = 500
SchrittNummerLED = 1
SchrittNummerOLED = 1
ZeitOLEDWechsel = control.millis()
basic.setLedColor(0xff0000)
oledssd1306.initDisplay()
oledssd1306.clearDisplay()
basic.setLedColor(0x00ff00)
oledssd1306.setTextXY(0, 0)
oledssd1306.writeString("Geschw.:")
oledssd1306.setTextXY(1, 0)
oledssd1306.writeString("Entf.:")
oledssd1306.setTextXY(2, 0)
oledssd1306.writeString("Licht:")
oledssd1306.setTextXY(3, 0)
oledssd1306.writeString("Temp.:")
oledssd1306.setTextXY(4, 0)
oledssd1306.writeString("Lautst.:")
oledssd1306.setTextXY(5, 0)
oledssd1306.writeString("Kompass:")
oledssd1306.setTextXY(6, 0)
oledssd1306.writeString("Beschl.:")
basic.forever(function () {
    let SchrittnummerGlobal = 0
    ZeitAktuell = control.millis()
    BelDauer = ZeitAktuell - ZeitBelWechsel
    OledDauer = ZeitAktuell - ZeitOLEDWechsel
    Entf3 = Entf2
    Entf2 = Entf1
    Entf1 = calliBot2.entfernung(C2Einheit.cm)
    Entfernung = (Entf1 + Entf2 + Entf3) / 3
    SchrittNeu = 0
    SchrittnummerGlobalAlt = SchrittnummerGlobal
    LEDAnsteuerung()
    OLEDDisplay()
})
