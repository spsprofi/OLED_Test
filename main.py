def on_button_a():
    global Start, Programm, SchrittnummerGlobal, GeschwindigkeitAlt
    Start = 0
    basic.set_led_color(0xff0000)
    Programm = Programm + 1
    SchrittnummerGlobal = 1
    GeschwindigkeitAlt = -1
    if Programm > 4:
        Programm = 1
    AnzeigeProgramm()
input.on_button_event(Button.A, input.button_event_click(), on_button_a)

# Dummy fuer Test
def Programm1():
    global SchrittnummerGlobal, Start
    if SchrittnummerGlobal == 1:
        if Start == 1:
            SchrittnummerGlobal = 10
    elif SchrittnummerGlobal == 10:
        if SchrittNeu:
            calliBot2.set_led(C2Motor.BEIDE, False)
    else:
        Start = 0
        SchrittnummerGlobal = 1

def on_button_b():
    global Start, GeschwindigkeitAlt
    if Start == 0:
        Start = 1
        basic.set_led_color(0x00ff00)
        AnzeigeProgramm()
    else:
        basic.set_led_color(0xff0000)
        Start = 0
        GeschwindigkeitAlt = -1
input.on_button_event(Button.B, input.button_event_click(), on_button_b)


def on_pin_touch_p0():
    global Geschwindigkeit
    Geschwindigkeit = Geschwindigkeit - 4
    if Geschwindigkeit < 0:
        Geschwindigkeit = 0
input.on_pin_touch_event(TouchPin.P0, input.button_event_down(), on_pin_touch_p0)

def AnzeigeProgramm():
    if Programm == 1:
        basic.show_leds("""
            # . . . .
                        . . . . .
                        . # # # .
                        # # # # #
                        # # . # #
        """)
    elif Programm == 2:
        basic.show_leds("""
            # # . . .
                        . . . . .
                        # . . # #
                        # . # # #
                        # . . # #
        """)
    elif Programm == 3:
        basic.show_leds("""
            # # # . .
                        . . . . .
                        . # # # .
                        # . . . #
                        . # # # .
        """)
    elif Programm == 4:
        basic.show_leds("""
            # # # # .
                        . . . . .
                        . . # # .
                        # # . . #
                        . . . # .
        """)

def LEDAnsteuerung():
    global SchrittNummerLED, ZeitBelWechsel, BelBlau, BelGruen, BelRot, SchrittnummerGlobal, GeschwindigkeitAlt
    if Start == 1:
        if SchrittNummerLED == 1:
            SchrittNummerLED = 2
            ZeitBelWechsel = control.millis()
            calliBot2.set_rgb_led(C2RgbLed.LV, BelRot, BelGruen, BelBlau)
            calliBot2.set_rgb_led(C2RgbLed.LH, 0, 0, 0)
        elif SchrittNummerLED == 2:
            if BelDauer >= BelWechsel:
                SchrittNummerLED = 3
                ZeitBelWechsel = ZeitAktuell
                calliBot2.set_rgb_led(C2RgbLed.LV, 0, 0, 0)
                calliBot2.set_rgb_led(C2RgbLed.RV, BelRot, BelGruen, BelBlau)
        elif SchrittNummerLED == 3:
            if BelDauer >= BelWechsel:
                SchrittNummerLED = 4
                ZeitBelWechsel = ZeitAktuell
                calliBot2.set_rgb_led(C2RgbLed.RV, 0, 0, 0)
                calliBot2.set_rgb_led(C2RgbLed.RH, BelRot, BelGruen, BelBlau)
        elif SchrittNummerLED == 4:
            if BelDauer >= BelWechsel:
                SchrittNummerLED = 5
                ZeitBelWechsel = ZeitAktuell
                calliBot2.set_rgb_led(C2RgbLed.RH, 0, 0, 0)
                calliBot2.set_rgb_led(C2RgbLed.LH, BelRot, BelGruen, BelBlau)
        elif SchrittNummerLED == 5:
            if BelDauer >= BelWechsel:
                SchrittNummerLED = 1
                ZeitBelWechsel = ZeitAktuell
                if BelRot > 0:
                    BelBlau = 0
                    BelGruen = 16
                    BelRot = 0
                elif BelGruen > 0:
                    BelBlau = 16
                    BelGruen = 0
                    BelRot = 0
                elif BelBlau > 0:
                    BelBlau = 0
                    BelGruen = 0
                    BelRot = 16
        else:
            calliBot2.set_rgb_led(C2RgbLed.ALL, 0, 0, 0)
    else:
        BelBlau = 0
        BelGruen = 0
        BelRot = 16
        SchrittNummerLED = 1
        SchrittnummerGlobal = 1
        calliBot2.set_rgb_led(C2RgbLed.ALL, 0, 0, 0)
        calliBot2.motor_stop(C2Motor.BEIDE, C2Stop.BREMSEN)
        calliBot2.set_led(C2Motor.BEIDE, False)
        if Geschwindigkeit != GeschwindigkeitAlt:
            GeschwindigkeitAlt = Geschwindigkeit
            if Geschwindigkeit > 96:
                basic.show_leds("""
                    # # # # #
                                        # # # # #
                                        # # # # #
                                        # # # # #
                                        # # # # #
                """)
            elif Geschwindigkeit > 92:
                basic.show_leds("""
                    # # # # #
                                        # # # # #
                                        # # # # #
                                        # # # # #
                                        # # # # .
                """)
            elif Geschwindigkeit > 88:
                basic.show_leds("""
                    # # # # #
                                        # # # # #
                                        # # # # #
                                        # # # # #
                                        # # # . .
                """)
            elif Geschwindigkeit > 84:
                basic.show_leds("""
                    # # # # #
                                        # # # # #
                                        # # # # #
                                        # # # # #
                                        # # . . .
                """)
            elif Geschwindigkeit > 80:
                basic.show_leds("""
                    # # # # #
                                        # # # # #
                                        # # # # #
                                        # # # # #
                                        # . . . .
                """)
            elif Geschwindigkeit > 76:
                basic.show_leds("""
                    # # # # #
                                        # # # # #
                                        # # # # #
                                        # # # # #
                                        . . . . .
                """)
            elif Geschwindigkeit > 72:
                basic.show_leds("""
                    # # # # #
                                        # # # # #
                                        # # # # #
                                        # # # # .
                                        . . . . .
                """)
            elif Geschwindigkeit > 68:
                basic.show_leds("""
                    # # # # #
                                        # # # # #
                                        # # # # #
                                        # # # . .
                                        . . . . .
                """)
            elif Geschwindigkeit > 64:
                basic.show_leds("""
                    # # # # #
                                        # # # # #
                                        # # # # #
                                        # # . . .
                                        . . . . .
                """)
            elif Geschwindigkeit > 60:
                basic.show_leds("""
                    # # # # #
                                        # # # # #
                                        # # # # #
                                        # . . . .
                                        . . . . .
                """)
            elif Geschwindigkeit > 56:
                basic.show_leds("""
                    # # # # #
                                        # # # # #
                                        # # # # #
                                        . . . . .
                                        . . . . .
                """)
            elif Geschwindigkeit > 52:
                basic.show_leds("""
                    # # # # #
                                        # # # # #
                                        # # # # .
                                        . . . . .
                                        . . . . .
                """)
            elif Geschwindigkeit > 48:
                basic.show_leds("""
                    # # # # #
                                        # # # # #
                                        # # # . .
                                        . . . . .
                                        . . . . .
                """)
            elif Geschwindigkeit > 44:
                basic.show_leds("""
                    # # # # #
                                        # # # # #
                                        # # . . .
                                        . . . . .
                                        . . . . .
                """)
            elif Geschwindigkeit > 40:
                basic.show_leds("""
                    # # # # #
                                        # # # # #
                                        # . . . .
                                        . . . . .
                                        . . . . .
                """)
            elif Geschwindigkeit > 36:
                basic.show_leds("""
                    # # # # #
                                        # # # # #
                                        . . . . .
                                        . . . . .
                                        . . . . .
                """)
            elif Geschwindigkeit > 32:
                basic.show_leds("""
                    # # # # #
                                        # # # # .
                                        . . . . .
                                        . . . . .
                                        . . . . .
                """)
            elif Geschwindigkeit > 28:
                basic.show_leds("""
                    # # # # #
                                        # # # . .
                                        . . . . .
                                        . . . . .
                                        . . . . .
                """)
            elif Geschwindigkeit > 24:
                basic.show_leds("""
                    # # # # #
                                        # # . . .
                                        . . . . .
                                        . . . . .
                                        . . . . .
                """)
            elif Geschwindigkeit > 20:
                basic.show_leds("""
                    # # # # #
                                        # . . . .
                                        . . . . .
                                        . . . . .
                                        . . . . .
                """)
            elif Geschwindigkeit > 16:
                basic.show_leds("""
                    # # # # #
                                        . . . . .
                                        . . . . .
                                        . . . . .
                                        . . . . .
                """)
            elif Geschwindigkeit > 12:
                basic.show_leds("""
                    # # # # .
                                        . . . . .
                                        . . . . .
                                        . . . . .
                                        . . . . .
                """)
            elif Geschwindigkeit > 8:
                basic.show_leds("""
                    # # # . .
                                        . . . . .
                                        . . . . .
                                        . . . . .
                                        . . . . .
                """)
            elif Geschwindigkeit > 4:
                basic.show_leds("""
                    # # . . .
                                        . . . . .
                                        . . . . .
                                        . . . . .
                                        . . . . .
                """)
            elif Geschwindigkeit > 0:
                basic.show_leds("""
                    # . . . .
                                        . . . . .
                                        . . . . .
                                        . . . . .
                                        . . . . .
                """)
            else:
                basic.show_leds("""
                    . . . . .
                                        . . . . .
                                        . . . . .
                                        . . . . .
                                        . . . . .
                """)

def OLEDDisplay():
    global ZeitBelWechsel, BelBlau, BelGruen, BelRot, SchrittnummerGlobal, GeschwindigkeitAlt
    if SchrittNummerOLED == 1:
        SchrittNummerOLED = 2
        ZeitBelWechsel = control.millis()
        calliBot2.set_rgb_led(C2RgbLed.LV, BelRot, BelGruen, BelBlau)
        calliBot2.set_rgb_led(C2RgbLed.LH, 0, 0, 0)
    elif SchrittNummerOLED == 2:
        if BelDauer >= BelWechsel:
            SchrittNummerOLED = 3
            ZeitBelWechsel = ZeitAktuell
            calliBot2.set_rgb_led(C2RgbLed.LV, 0, 0, 0)
            calliBot2.set_rgb_led(C2RgbLed.RV, BelRot, BelGruen, BelBlau)
    elif SchrittNummerOLED == 3:
        if BelDauer >= BelWechsel:
            SchrittNummerOLED = 4
            ZeitBelWechsel = ZeitAktuell
            calliBot2.set_rgb_led(C2RgbLed.RV, 0, 0, 0)
            calliBot2.set_rgb_led(C2RgbLed.RH, BelRot, BelGruen, BelBlau)
    elif SchrittNummerOLED == 4:
        if BelDauer >= BelWechsel:
            SchrittNummerOLED = 5
            ZeitBelWechsel = ZeitAktuell
            calliBot2.set_rgb_led(C2RgbLed.RH, 0, 0, 0)
            calliBot2.set_rgb_led(C2RgbLed.LH, BelRot, BelGruen, BelBlau)
    elif SchrittNummerOLED == 5:
        if BelDauer >= BelWechsel:
            SchrittNummerOLED = 1
            ZeitBelWechsel = ZeitAktuell
            if BelRot > 0:
                BelBlau = 0
                BelGruen = 16
                BelRot = 0
            elif BelGruen > 0:
                BelBlau = 16
                BelGruen = 0
                BelRot = 0
            elif BelBlau > 0:
                BelBlau = 0
                BelGruen = 0
                BelRot = 16
    else:
        calliBot2.set_rgb_led(C2RgbLed.ALL, 0, 0, 0)
    
def on_pin_touch_p3():
    global Geschwindigkeit
    Geschwindigkeit = Geschwindigkeit + 4
    if Geschwindigkeit > 100:
        Geschwindigkeit = 100
input.on_pin_touch_event(TouchPin.P3, input.button_event_down(), on_pin_touch_p3)

SchrittnummerGlobalAlt = 0
Entf1 = 0
Entf2 = 0
Entf3 = 0
Entfernung = 0
GeschwindigkeitUS = 0
BelDauer = 0
BelBlau = 0
BelGruen = 0
BelRot = 0
ZeitBelWechsel = 0
SchrittNummerLED = 0
SuchZeit = 0
IstZeitPause = 0
ZeitAktuell = 0
StartZeitPause = 0
ZeitPause = 0
Geschwindigkeit = 0
SchrittNeu = 0
GeschwindigkeitAlt = 0
SchrittnummerGlobal = 0
Programm = 0
Start = 0
BelWechsel = 0
BelWechsel = 100

def on_forever():
    global ZeitAktuell, BelDauer, IstZeitPause, Entf3, Entf2, Entf1, Entfernung, Geschwindigkeit, Programm, SchrittnummerGlobal, Start, SchrittNeu, SchrittnummerGlobalAlt
    ZeitAktuell = control.millis()
    BelDauer = ZeitAktuell - ZeitBelWechsel
    IstZeitPause = ZeitAktuell - StartZeitPause
    Entf3 = Entf2
    Entf2 = Entf1
    Entf1 = calliBot2.entfernung(C2Einheit.CM)
    Entfernung = (Entf1 + Entf2 + Entf3) / 3
    if SchrittnummerGlobal == 0:
        calliBot2.motor_stop(C2Motor.BEIDE, C2Stop.BREMSEN)
        Geschwindigkeit = 40
        Programm = 1
        basic.set_led_color(0xff0000)
        basic.show_string("ON")
        SchrittnummerGlobal = 1
    if Programm == 1:
        Programm1()
    else:
        basic.show_icon(IconNames.CONFUSED)
        basic.set_led_color(0xff8000)
        Start = 0
        SchrittnummerGlobal = 1
        calliBot2.set_led(C2Motor.BEIDE, False)
        calliBot2.motor_stop(C2Motor.BEIDE, C2Stop.FREI)
    SchrittNeu = 0
    if SchrittnummerGlobal != SchrittnummerGlobalAlt:
        SchrittNeu = 1
    SchrittnummerGlobalAlt = SchrittnummerGlobal
    LEDAnsteuerung()
basic.forever(on_forever)
