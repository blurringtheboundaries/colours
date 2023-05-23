#include <DmxSimple.h>
int testValue;

void setup() {
 Serial.begin(115200);
 DmxSimple.usePin(2);
 testValue = 0;
}

void loop() {
     while (Serial.available() == 0) {}
     int testInt = Serial.parseInt(); 
     int testInt2 = Serial.parseInt();
     if(testInt>0){
        DmxSimple.write(testInt, testInt2);
     }
   
 }