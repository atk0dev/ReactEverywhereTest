import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { RootStoreContext } from '../stores/RootStore';

interface Props {}

export const Counter: React.FC<Props> = observer(() => {
	const rootStore = useContext(RootStoreContext);

  const handleIncrement = () => {
    rootStore.counterStore.increment();
  }

	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.text}>
					Counter {rootStore.counterStore.count}
				</Text>
			</View>
			<Button
				title='Increment'
				onPress={() => handleIncrement() }
			/>
      {/* <Text>Click me</Text> */}
		</View>
	);
});

const styles = StyleSheet.create({
	container: {
    //backgroundColor: 'pink',
  },
  text: {
		fontSize: 20,
	},
});
