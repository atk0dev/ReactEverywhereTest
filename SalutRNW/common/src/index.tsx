import React, { useContext } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import { Counter } from './screens/Counter';
import { Router } from './Router';
import { Card } from './components/Card';

export const App = () => {

  const handleButtonClick = (result: string) => {
    console.log('Button click result: ', result);
  }

	return (
		<SafeAreaView>
			<ScrollView contentInsetAdjustmentBehavior='automatic'>
				<View style={styles.container}>
					<Counter />
          <Router />
          <Card text='Test card' onButtonClick={(result) => {handleButtonClick(result)}}/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'pink',
	},
});
