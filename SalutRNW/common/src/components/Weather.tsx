import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

interface WeatherData {
  name: string;
  weather: { description: string }[];
  main: { temp: number };
}

const Weather: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const handlePress = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8814eb72c263523eff8262d5e52155fe&units=metric`)
      .then((response) => response.json())
      .then((data: WeatherData) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={city}
        onChangeText={setCity}
        placeholder="Enter city name"
      />
      <Button title="Get weather" onPress={handlePress} />
      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>{weatherData.name}</Text>
          <Text style={styles.weatherText}>{weatherData.weather[0].description}</Text>
          <Text style={styles.weatherText}>{weatherData.main.temp}°C</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 20,
    width: '80%',
  },
  weatherContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  weatherText: {
    fontSize: 20,
    marginVertical: 10,
  },
});

export default Weather;
