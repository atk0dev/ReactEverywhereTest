import React from 'react';
import { StyleSheet} from 'react-native';
import { Dashboard } from './Dashboard';
import { Card } from './salut-lib/dist/components/Card';

interface Props {}

export const App: React.FC<Props> = () => {
	return (
		<div style={styles.app}>
			<div>
				<p>Salut dev env: 0.1</p>
			</div>
			{/* <Card
				text='Test card'
				onButtonClick={result =>
					console.log(
						'test card click, result:',
						result
					)
				}
			></Card> */}
			<Dashboard />
		</div>
	);
};

const styles = StyleSheet.create({
	app: {},
});
