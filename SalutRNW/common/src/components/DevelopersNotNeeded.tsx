import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DevelopersNotNeeded: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Developers are no longer needed because they will be replaced with Chat GPT</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'red',
    fontSize: 24,
    textAlign: 'center',
  },
});

export default DevelopersNotNeeded;
