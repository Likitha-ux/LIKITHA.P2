import React, { useState, useEffect } from 'react';
import { Thermometer, Zap, Monitor, Code, CircuitBoard, Settings } from 'lucide-react';

function App() {
  const [temperature, setTemperature] = useState(25.0);
  const [isRunning, setIsRunning] = useState(true);
  const [serialOutput, setSerialOutput] = useState<string[]>([]);
  const [tempHistory, setTempHistory] = useState<number[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Simulate temperature sensor readings
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      // Simulate realistic temperature fluctuations
      const variation = (Math.random() - 0.5) * 2; // ±1°C variation
      const newTemp = Math.max(0, Math.min(50, temperature + variation));
      setTemperature(newTemp);
      
      // Update history for graph
      setTempHistory(prev => [...prev.slice(-19), newTemp]);
      
      // Update serial output
      const timestamp = new Date().toLocaleTimeString();
      setSerialOutput(prev => [
        ...prev.slice(-10),
        `[${timestamp}] Temperature: ${newTemp.toFixed(1)}°C`
      ]);
      
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, temperature]);

  const handleTempChange = (delta: number) => {
    setTemperature(prev => Math.max(0, Math.min(50, prev + delta)));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-blue-400">Temperature Monitoring System</h1>
          <p className="text-gray-300">Circuit Design, Code, and Live Demonstration</p>
        </div>

        {/* Main Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* LCD Display Simulation */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <Monitor className="w-5 h-5 text-green-400 mr-2" />
              <h2 className="text-xl font-semibold">16x2 LCD Display</h2>
            </div>
            
            <div className="bg-black p-4 rounded font-mono text-green-400 border-2 border-green-600">
              <div className="grid grid-cols-16 gap-1 text-sm">
                {/* Line 1: Temperature */}
                <div className="col-span-16 text-center">
                  Temp: {temperature.toFixed(1)}°C
                </div>
                {/* Line 2: Status */}
                <div className="col-span-16 text-center mt-2">
                  Status: {isRunning ? 'RUNNING' : 'STOPPED'}
                </div>
              </div>
            </div>
          </div>

          {/* Temperature Gauge */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <Thermometer className="w-5 h-5 text-red-400 mr-2" />
              <h2 className="text-xl font-semibold">Temperature Gauge</h2>
            </div>
            
            <div className="relative w-48 h-48 mx-auto">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Gauge background */}
                <circle cx="100" cy="100" r="80" fill="none" stroke="#374151" strokeWidth="20" />
                
                {/* Temperature arc */}
                <circle 
                  cx="100" 
                  cy="100" 
                  r="80" 
                  fill="none" 
                  stroke={temperature > 30 ? "#ef4444" : temperature > 20 ? "#f59e0b" : "#3b82f6"}
                  strokeWidth="20"
                  strokeDasharray={`${(temperature / 50) * 502} 502`}
                  strokeDashoffset="125.5"
                  className="transition-all duration-500"
                />
                
                {/* Center text */}
                <text x="100" y="95" textAnchor="middle" className="text-2xl font-bold fill-white">
                  {temperature.toFixed(1)}
                </text>
                <text x="100" y="115" textAnchor="middle" className="text-sm fill-gray-400">
                  °C
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* Controls and Serial Monitor */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Controls */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <Settings className="w-5 h-5 text-blue-400 mr-2" />
              <h2 className="text-xl font-semibold">System Controls</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`px-4 py-2 rounded font-medium transition-colors ${
                    isRunning 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {isRunning ? 'Stop Monitoring' : 'Start Monitoring'}
                </button>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Simulate Temperature Change:
                </label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleTempChange(-5)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                  >
                    -5°C
                  </button>
                  <button
                    onClick={() => handleTempChange(-1)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                  >
                    -1°C
                  </button>
                  <button
                    onClick={() => handleTempChange(1)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
                  >
                    +1°C
                  </button>
                  <button
                    onClick={() => handleTempChange(5)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
                  >
                    +5°C
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Serial Monitor */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <Code className="w-5 h-5 text-green-400 mr-2" />
              <h2 className="text-xl font-semibold">Serial Monitor</h2>
            </div>
            
            <div className="bg-black p-4 rounded font-mono text-green-400 text-sm h-48 overflow-y-auto">
              {serialOutput.map((line, index) => (
                <div key={index} className="mb-1">{line}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Circuit Design */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
          <div className="flex items-center mb-4">
            <CircuitBoard className="w-5 h-5 text-purple-400 mr-2" />
            <h2 className="text-xl font-semibold">Circuit Design</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Components List */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-yellow-400">Required Components:</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  Arduino Uno R3
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  DS18B20 Temperature Sensor
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                  16x2 LCD Display (I2C)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                  4.7kΩ Pull-up Resistor
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                  Breadboard & Jumper Wires
                </li>
              </ul>
            </div>

            {/* Wiring Diagram */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-yellow-400">Wiring Connections:</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-gray-700 p-2 rounded">
                  <strong className="text-blue-400">DS18B20 → Arduino:</strong>
                  <br />VCC → 5V, GND → GND, Data → Pin 2
                </div>
                <div className="bg-gray-700 p-2 rounded">
                  <strong className="text-green-400">LCD (I2C) → Arduino:</strong>
                  <br />VCC → 5V, GND → GND, SDA → A4, SCL → A5
                </div>
                <div className="bg-gray-700 p-2 rounded">
                  <strong className="text-purple-400">Pull-up Resistor:</strong>
                  <br />4.7kΩ between DS18B20 Data and VCC
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Arduino Code */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center mb-4">
            <Code className="w-5 h-5 text-orange-400 mr-2" />
            <h2 className="text-xl font-semibold">Arduino Code</h2>
          </div>
          
          <div className="bg-black p-4 rounded font-mono text-sm text-green-400 overflow-x-auto">
            <pre>{`#include <OneWire.h>
#include <DallasTemperature.h>
#include <LiquidCrystal_I2C.h>

// Temperature sensor setup
#define ONE_WIRE_BUS 2
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

// LCD setup (I2C address 0x27, 16x2 display)
LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  // Initialize serial communication
  Serial.begin(9600);
  
  // Initialize temperature sensor
  sensors.begin();
  
  // Initialize LCD
  lcd.init();
  lcd.backlight();
  
  // Display startup message
  lcd.setCursor(0, 0);
  lcd.print("Temp Monitor");
  lcd.setCursor(0, 1);
  lcd.print("Starting...");
  
  delay(2000);
  lcd.clear();
}

void loop() {
  // Request temperature readings
  sensors.requestTemperatures();
  
  // Get temperature in Celsius
  float tempC = sensors.getTempCByIndex(0);
  
  // Check if reading is valid
  if (tempC != DEVICE_DISCONNECTED_C) {
    // Display on LCD
    lcd.setCursor(0, 0);
    lcd.print("Temp: ");
    lcd.print(tempC, 1);
    lcd.print(" C");
    
    lcd.setCursor(0, 1);
    lcd.print("Status: OK");
    
    // Print to serial monitor
    Serial.print("Temperature: ");
    Serial.print(tempC);
    Serial.println(" °C");
  } else {
    // Error handling
    lcd.setCursor(0, 0);
    lcd.print("Sensor Error!");
    lcd.setCursor(0, 1);
    lcd.print("Check Wiring");
    
    Serial.println("Error: Could not read temperature");
  }
  
  // Wait 1 second before next reading
  delay(1000);
}`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;