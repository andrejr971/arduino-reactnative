#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>;
#include <DHT.h>;

#define DHTTYPE DHT11   //DHT11
#define dht_dpin 0 //d3

DHT dht(dht_dpin, DHTTYPE);

int LEDred = 5; //D1
int LEDgreen = 4; //D2

const char* ssid= "nitro";
const char* password= "F.130607";

ESP8266WebServer server(80);

float humidity, temp; //valores que o sensor DHt11 vai informar
String value = "";

unsigned long previousMillis = 0; //vai gravar a ultima leitura do sensor
const long interval = 2000; //intervalo

void setup() {  
  Serial.begin(115200);

  dht.begin();

  pinMode(LEDred, OUTPUT);
  digitalWrite(LEDred, LOW);

  pinMode(LEDgreen, OUTPUT);
  digitalWrite(LEDgreen, LOW);
  
  WiFi.begin(ssid, password);

  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.print("NodeMCU conectado no IP: ");
  Serial.println(WiFi.localIP());
  Serial.print("Conexao efetuada com sucesso!");

  server.begin();
  Serial.println("Webserver inicializado");
  delay(500);
  Serial.println("Acesse pelo IP: ");
  Serial.println(WiFi.localIP());

  server.on("/onRed", []() {
    server.send(200, "Cabeçalho da requisição", "LED vermelha ligada");
     digitalWrite(LEDred, HIGH);
     delay(1000);
  });
  
  server.on("/offRed", []() {
    server.send(200, "Cabeçalho da requisição", "LED vermelha desligada");
     digitalWrite(LEDred, LOW);
     delay(1000);
  });
  
  server.on("/onGreen", []() {
    server.send(200, "Cabeçalho da requisição", "LED verde ligada");
     digitalWrite(LEDgreen, HIGH);
     delay(1000);
  });

 server.on("/offGreen", []() {
    server.send(200, "Cabeçalho da requisição", "LED verde desligada");
     digitalWrite(LEDgreen, LOW);
     delay(1000);
  });

  server.on("/dht11/umidity", []() {
     getData();
     value = String((int) humidity);
      
     server.send(200, "Cabeçalho da requisição", value);
  });

   server.on("/dht11/temperature", []() {
    getData();
    value = String((int) temp);
    
    server.send(200, "Cabeçalho da requisição", value);
  });
}

void loop() {  
  server.handleClient();
}

void getData() {
  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;  
  }

  humidity = dht.readHumidity();
  temp = dht.readTemperature();


  if (isnan(humidity) || isnan(temp)) {
    Serial.println("Falha na leitura do sensor");
  }

  return;
}
