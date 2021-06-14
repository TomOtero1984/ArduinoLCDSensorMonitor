#include <Wire.h>
#include <LiquidCrystal_I2C.h>


#define LCD_WIDTH ((int)16)
#define LCD_HEIGHT ((int)2)
#define TRIG_PIN ((int)4)
#define ECHO_PIN ((int)3)


LiquidCrystal_I2C lcd(0x27, LCD_WIDTH, 2);

long data[2] = {0, 0};            // {inches, cm}


void setup() {
  Serial.begin(9600);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN,INPUT_PULLUP);
  // initialize the lcd 
  lcd.init();
  // Print a message to the LCD.
  lcd.backlight();
}

void loop() {
  getPingData();
  printToLCD();
  delay(100);
}


void getPingData() {
  // Gets data from the PING sensor
  //
  // Returns 

  long waitStart = 0;
  long waitCur = 0;
  int errorFlag = 0;
  long duration;

  ////////////////////////////////
  // Trigger pin high for 10uS //  
  // STEP: Set TRIG_PIN HIGH
  digitalWrite(TRIG_PIN, HIGH);
  
  // STEP: Wait for 10 uS
  waitStart = micros();
  while(waitCur - waitStart < 10 || errorFlag == 1) {
    waitCur = micros();
    if(waitCur < waitStart) {
      errorFlag = 1;
    }
  }
  
  // STEP: Set TRIG_PIN LOW
  digitalWrite(TRIG_PIN, LOW);

  // STEP: Read Echo pin, returns time in ms
  duration = pulseIn(ECHO_PIN, HIGH);

  // convert the time into a distance
  data[0] = microsecondsToInches(duration);
  data[1] = microsecondsToCentimeters(duration);
}


long microsecondsToInches(long microseconds) {
  // According to Parallax's datasheet for the PING))), there are 73.746
  // microseconds per inch (i.e. sound travels at 1130 feet per second).
  // This gives the distance travelled by the ping, outbound and return,
  // so we divide by 2 to get the distance of the obstacle.
  // See: http://www.parallax.com/dl/docs/prod/acc/28015-PING-v1.3.pdf
  return microseconds / 74 / 2;
}


long microsecondsToCentimeters(long microseconds) {
  // The speed of sound is 340 m/s or 29 microseconds per centimeter.
  // The ping travels out and back, so to find the distance of the object we
  // take half of the distance travelled.
  return microseconds / 29 / 2;
}


void printToLCD() {
  lcd.setCursor(1,0);
  lcd.print("in: ");
  lcd.print(data[0]);
  lcd.setCursor(1,1);
  lcd.print("cm: ");
  lcd.print(data[1]);
}
