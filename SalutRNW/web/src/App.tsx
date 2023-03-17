import React from 'react';
import { View, StyleSheet, Text, Linking } from 'react-native';
import DemoApp from './DemoApp';

interface Props {}

export const App: React.FC<Props> = () => {
	return (
		<View style={styles.app}>
			<View>
				<Text>Demo app v: 0.1</Text>
				<Text>Test user: andrii@email.com</Text>
				<Text>Test pass: P@ssw0rd!</Text>
				<Text
					style={{ color: 'blue' }}
					onPress={() =>
						Linking.openURL(
							'app-release.apk'
						)
					}
				>
					Android APK
				</Text>
			</View>
			<DemoApp />
		</View>
	);
};

const styles = StyleSheet.create({
	app: {},
});
