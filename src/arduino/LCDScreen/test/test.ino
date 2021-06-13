/*
 *  Tutorial https://create.arduino.cc/projecthub/Arnov_Sharma_makes/lcd-i2c-tutorial-664e5a#content
 */

#include <Wire.h>
#include <LiquidCrystal_I2C.h>

// initialize the library by associating any needed LCD interface pin
// with the arduino pin number it is connected to
          
LiquidCrystal_I2C lcd(0x27, 20, 4);

void setup() {
  lcd.init();                      // initialize the lcd 
  // Print a message to the LCD.
  lcd.backlight();
  lcd.setCursor(1,0);
  lcd.print("hello everyone");
  lcd.setCursor(1,1);
  lcd.print("konichiwaa");
}

void loop() {
}
