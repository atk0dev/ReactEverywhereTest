import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Card } from './salut-lib/components/Card';
import { Dashboard } from "./Dashboard";

interface Props {}

export const App: React.FC<Props> = () => {
	return (
		<View style={styles.app}>
			<View>
				<Text>Salut dev env: 0.1</Text>
			</View>
			<Card text='Test card' onButtonClick={(result) => console.log('test card click, result:', result)}></Card>
      <Dashboard />;
		</View>
	);
};

const styles = StyleSheet.create({
	app: {},
});
