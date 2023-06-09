import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet, Text } from 'react-native';
import { Counter } from './components/Counter';
import { Router } from './Router';
import { RootStoreContext } from './stores/RootStore';
import { Content } from './screens/Content';
import { observer } from 'mobx-react-lite';

export const PageStatic = observer(() => {
	const rootStore = React.useContext(RootStoreContext);

	const [contentVisible, setContentVisible] = useState(rootStore.authStore.authorized);

	useEffect(() => {
		init();
	});

	const init = () => {
		if (rootStore.authStore.authorized) {
			rootStore.routerStore.changeScreen('UserInfo');
		} else {
			rootStore.routerStore.changeScreen('Login');
		}

		setContentVisible(rootStore.authStore.authorized);
	};

	return (
		// <SafeAreaView>
		// 	<ScrollView>
				<View style={styles.container}>
					<View style={styles.counterView}>
						<Counter />
					</View>
					<View style={styles.appView}>
						<Router />
					</View>
					{!!contentVisible && (
						<View
							style={
								styles.contentView
							}
						>
							<Content 
								buttonGetContentVisible = {true}
								buttonHideContentVisible = {true}
							/>
						</View>
					)}
					
				</View>
		// 	</ScrollView>
		// </SafeAreaView>
	);
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		//backgroundColor: 'pink',
	},
	counterView: {
		padding: 40,
		margin: 20,
		borderWidth: 2,
	},
	appView: {
		padding: 40,
		margin: 20,
		borderWidth: 2,
	},
	contentView: {
		padding: 40,
		margin: 20,
		minWidth: 200,
	},
});
