import React, { useEffect, useState } from 'react';
import { StyleSheet} from 'react-native';
import { Dashboard } from './Dashboard';
import { DesignerRootStoreContext } from './stores/DesignerRootStore';
import { observer } from 'mobx-react-lite';

interface Props {}

export const App: React.FC<Props> = observer(() => {

	const rootStore = React.useContext(DesignerRootStoreContext);

	const [contentVisible, setContentVisible] = useState(rootStore.authStore.authorized);
	
	useEffect(() => {
		init();
	});

	const init = () => {
		if (rootStore.authStore.authorized) {
			rootStore.routerStore.changeScreen('Main');
		} else {
			rootStore.routerStore.changeScreen('Login');
		}

		setContentVisible(rootStore.authStore.authorized);
	};

	return (
		<div style={styles.app}>
			<div>
				<p>Salut dev env: 0.1</p>
			</div>			
			<Dashboard />
		</div>
	);
});

const styles = StyleSheet.create({
	app: {},
});
