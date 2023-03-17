import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import DemoApp from './DemoApp';

interface Props {}

export const App: React.FC<Props> = () => (
  <View style={styles.app}>
    <View>
      <Text>Demo app v: 0.1</Text>
      <Text>Test user: andrii@email.com</Text>
      <Text>Test pass: P@ssw0rd!</Text>
    </View>
    <DemoApp />
  </View>
);

const styles = StyleSheet.create({
  app: {
    paddingTop: 50,
  },
});

export default App;
