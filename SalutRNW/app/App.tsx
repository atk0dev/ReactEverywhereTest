import React from 'react';
import {View, StyleSheet, Text, SafeAreaView, ScrollView} from 'react-native';
import DemoApp from './DemoApp';

interface Props {}

export const App: React.FC<Props> = () => (
  <SafeAreaView>
    <ScrollView>
      <View style={styles.app}>
        <View>
          <Text>Demo app v: 0.1</Text>
          <Text>Test user: andrii@email.com</Text>
          <Text>Test pass: P@ssw0rd!</Text>
        </View>
        <DemoApp />
      </View>
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  app: {
    //paddingTop: 50,
  },
});

export default App;
