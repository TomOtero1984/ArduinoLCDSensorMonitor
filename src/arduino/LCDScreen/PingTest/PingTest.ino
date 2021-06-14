int trigPin = 4;
int echoPin = 3;
long waitStart = 0;
long waitCur = 0;
int errorFlag = 0;
int sample = 0;
long duration, inches, cm;

void setup()
{
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT_PULLUP);
}

void loop()
{
  ///////////////////////////////
  ///Trigger pin high for 10uS///

  // STEP: Set trigPin HIGH
  digitalWrite(trigPin, HIGH);

  // STEP: Wait for 10 uS
  waitStart = micros();
  while (((waitCur - waitStart) < 10) || errorFlag == 1)
  {
    //    Serial.print("MICROS: ");
    //    Serial.print(micros());
    //    Serial.println();
    waitCur = micros();
    if (waitCur < waitStart)
    {
      errorFlag = 1;
    }
  }
  waitCur = 0;
  errorFlag = 0;

  // STEP: Set trigPin LOW
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);

  // convert the time into a distance
  inches = microsecondsToInches(duration);
  cm = microsecondsToCentimeters(duration);

  Serial.print(inches);
  Serial.print("in, ");
  Serial.print(cm);
  Serial.print("cm");
  Serial.println();

  delay(100);
}

long microsecondsToInches(long microseconds)
{
  // According to Parallax's datasheet for the PING))), there are 73.746
  // microseconds per inch (i.e. sound travels at 1130 feet per second).
  // This gives the distance travelled by the ping, outbound and return,
  // so we divide by 2 to get the distance of the obstacle.
  // See: http://www.parallax.com/dl/docs/prod/acc/28015-PING-v1.3.pdf
  return microseconds / 74 / 2;
}

long microsecondsToCentimeters(long microseconds)
{
  // The speed of sound is 340 m/s or 29 microseconds per centimeter.
  // The ping travels out and back, so to find the distance of the object we
  // take half of the distance travelled.
  return microseconds / 29 / 2;
}
