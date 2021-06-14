#include <Wire.h>
#include <LiquidCrystal_I2C.h>


#define LCD_WIDTH ((int)16)
#define LCD_HEIGHT ((int)2)
#define TRIG_PIN ((int)4)
#define ECHO_PIN ((int)3)
#define DISPLAY_OFFSET ((int) 5)


LiquidCrystal_I2C lcd(0x27, LCD_WIDTH, 2);

long data[2] = {0, 0};            // {in, cm}
long prev_data[2] = {0, 0};       // {in, cm}

void setup() {
  Serial.begin(9600);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN,INPUT_PULLUP);
  // initialize the lcd 
  lcd.init();
  lcd.backlight();
  lcd.setCursor(1,0);
  lcd.print("in: ");
  lcd.setCursor(1,1);
  lcd.print("cm: ");
}

void loop() {
  getPingData();
  printToLCD();
  serialSendDataValues();
  delay(500);
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

  // STEP: Save last data point
  prev_data[0] = data[0];
  prev_data[1] = data[1];
  
  // STEP: Convert the time into a distance
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
  for(int row = 0; row<2; row++){
    if(prev_data[row] > data[row]){
      int prev_digits = countDigits(prev_data[row]);
      int cur_digits = countDigits(data[row]);
      clearLCD(DISPLAY_OFFSET + cur_digits, DISPLAY_OFFSET + prev_digits, row);
    }
    lcd.setCursor(DISPLAY_OFFSET,row);
    lcd.print(data[row]);
  }
}

void clearLCD(int col_start, int col_stop, int row){
  for(int col=col_start; col<15; col++) {
    lcd.setCursor(col, row);
    lcd.print(" ");
  }
}

int countDigits(long num) {
  int count = 0;
  while(num != 0){
    num = num/10;
    count++;
  }
  return count;
}

void serialSendDataValues(){
  Serial.write("{");
  Serial.write("\"in\" : ");
  Serial.print(data[0]);
  Serial.write(", \"cm\" : ");
  Serial.print(data[1]);
  Serial.write("}\n");
}
