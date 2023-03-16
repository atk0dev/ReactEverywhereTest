import React, { useState } from 'react';
import { Button, SafeAreaView, ScrollView, Text, View } from 'react-native';

export const App = () => {
	const [count, setCount] = useState(0);

	return (
		<SafeAreaView>
			<ScrollView contentInsetAdjustmentBehavior='automatic'>
				<View>
					<View>
						<Text>Hello {count}</Text>
					</View>
					<Button
						title='Increment'
						onPress={() =>
							setCount(count + 1)
						}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};
