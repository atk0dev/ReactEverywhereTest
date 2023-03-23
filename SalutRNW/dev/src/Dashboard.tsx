import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface Props {}

export const Dashboard: React.FC<Props> = () => {
	return (
		<View style={styles.app}>
			<Text>Dashboard</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	app: {},
});
