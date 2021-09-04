import React, { useState } from 'react';
import { Text, View, StatusBar, TouchableOpacity, Switch } from "react-native";
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from "./styles";
import { api } from '../../services/api';

export function Home() {
  const [isEnableLightRed, setIsEnableLightRed] = useState(false);
  const [isEnableLightGreen, setIsEnableLightGreen] = useState(false);
  
  const [dhtAir, setDhtAir] = useState('');
  const [dhtTemp, setDhtTemp] = useState('');

  async function handlePowerLedRed() {
    setIsEnableLightRed(!isEnableLightRed);

    if (isEnableLightRed) {
      await api.get('/offRed');
    } else {
      await api.get('/onRed');
    }
  }
  
  async function handlePowerLedGreen() {
    setIsEnableLightGreen(!isEnableLightGreen);

    if (isEnableLightGreen) {
      await api.get('/offGreen');
    } else {
      await api.get('/onGreen');
    }
  }

  async function handleRefreshTemperature() {
    const { data } = await api.get('/dht11/temperature');
    
    setDhtTemp(data);
  }
  
  async function handleRefreshAirHumidity() {
    const { data } = await api.get('/dht11/umidity');

    setDhtAir(data);
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0E1647" />
      
      <LinearGradient 
        colors={['rgba(29, 39, 102, 1)', 'rgba(23, 31, 82, 1)']} 
        start={{ x: 0.5, y: 0.6 }} 
        style={styles.contentLight}
      >
        <Text style={styles.textLight}>Luz Vermelho</Text>

        <View style={[styles.boxLight, isEnableLightRed && styles.boxRed]} />

        <View style={styles.contentSwitch}>
          <Text style={[styles.statusLight, isEnableLightRed ? styles.statusOn : styles.statusOff]}>
            {isEnableLightRed ? 'Ligado' : 'Desligado'}
          </Text>

          <Switch 
            onValueChange={handlePowerLedRed}
            value={isEnableLightRed}
          />
        </View>
      </LinearGradient>

      <LinearGradient 
        colors={['rgba(29, 39, 102, 1)', 'rgba(23, 31, 82, 1)']} 
        start={{ x: 0.5, y: 0.6 }} 
        style={styles.contentLight}
      >
        <Text style={styles.textLight}>Luz Verde</Text>

        <View style={[styles.boxLight, isEnableLightGreen && styles.boxGreen]} />
        
        <View style={styles.contentSwitch}>
          <Text style={[styles.statusLight, isEnableLightGreen ? styles.statusOn : styles.statusOff]}>
            {isEnableLightGreen ? 'Ligado' : 'Desligado'}
          </Text>
          
          <Switch 
            onValueChange={handlePowerLedGreen}
            value={isEnableLightGreen}
          />
        </View>
      </LinearGradient>

      <View style={styles.separator} />
      
      <View style={styles.content}>
        <Text style={styles.textContent}>Umidade</Text>

        <View style={styles.contentDht}>
          <View style={styles.contentResults}>
            <Text style={styles.text}>Medida:</Text>
            <Text style={styles.textResults}>{!dhtAir ? '---' : `${dhtAir} %`}</Text>
          </View>

          <TouchableOpacity
            style={styles.buttonRefresh}
            onPress={handleRefreshAirHumidity}
          > 
            <Feather name="refresh-ccw" color="#DDE3F0" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.textContent}>Temperatura</Text>

        <View style={styles.contentDht}>
          <View style={styles.contentResults}>
            <Text style={styles.text}>Medida:</Text>
            <Text style={styles.textResults}>{!dhtTemp ? '---' : `${dhtTemp} ºC`}</Text>
          </View>

          <TouchableOpacity
            style={styles.buttonRefresh}
            onPress={handleRefreshTemperature}
          > 
            <Feather name="refresh-ccw" color="#DDE3F0" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}