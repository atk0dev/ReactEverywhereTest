import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useServices } from '../services';
import { RootStoreContext } from '../stores/RootStore';

interface Props {}

export const Login: React.FC<Props> = observer(() => {
	const rootStore = React.useContext(RootStoreContext);

	const { api } = useServices();

	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleLogin = async () => {
		console.log('Handle login');

		setLoading(true);
		try {
			const authResult = await api.auth.login(
				email,
				password
			);

			if (authResult && authResult.success) {
				rootStore.authStore.authorize({
					userId: authResult.userID,
					accessToken: authResult.token,
					email: email
				});
				rootStore.routerStore.changeScreen('UserInfo');
			} else {
				setError(`Login error`);
        console.error(authResult);
			}
		} catch (e) {
			// handle error
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<Text>Login screen</Text>
			<View>
				<TextInput
					placeholder={'Email'}
					value={email}
					onChangeText={setEmail}
					keyboardType='email-address'
				/>
			</View>

			<View>
				<TextInput
					placeholder={'Password'}
					value={password}
					onChangeText={setPassword}
					secureTextEntry
				/>
			</View>

			<Button
				title={loading ? 'Logging in ...' : 'Login'}
				onPress={() => {
					handleLogin();
				}}
			/>

			{!!error && (
				<View>
					<Text>{error}</Text>
				</View>
			)}
		</View>
	);
});

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'orange',
		minWidth: 300,
	},
});
