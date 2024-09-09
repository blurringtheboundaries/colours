#include <DmxSimple.h>

int testValue;
int val1;
int val2;

String inString = "";

void setup() {
 Serial.begin(115200);
 DmxSimple.usePin(2);
 // DmxSimple.maxChannel(6);
 // DmxSimple.write(4, 255);
 testValue = 0;
 while(!Serial){}
}

void loop() {
  while (Serial.available() > 0) {
    int inChar = Serial.read();
    if(isDigit(inChar)){
      inString += (char)inChar;
    }
    
    if(inChar == ':'){
      val1 = inString.toInt();
      inString = "";
    }
    
    if(inChar == '\n'){
      val2 = inString.toInt();
      Serial.print(val1);
      Serial.print("===");
      Serial.println(val2);
      DmxSimple.write(val1, val2);
      inString = "";
    }
  
  }
  
}