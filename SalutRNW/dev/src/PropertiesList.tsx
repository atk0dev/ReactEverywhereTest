import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Dashboard } from './Dashboard';
import { Card } from './salut-lib/dist/components/Card';
import { CanvasItem, ItemPublicProp } from './types';

interface Props {
	control: CanvasItem | null;
}

export const PropertiesList: React.FC<Props> = ({ control }) => {
	const [controlProps, setControlProps] = React.useState(
		control?.publicProps
	);

	React.useEffect(() => {
		console.log('in use effect', control);
		setControlProps(control?.publicProps);
	}, [control]);

	console.log('controlProps', controlProps);

	const propertyChanged = (e: any) => {
		if (
			control !== null &&
			control.publicProps !== null &&
			control.publicProps !== undefined &&
			control.publicProps?.length > 0
		) {
			control.publicProps[0].value = e.target.value;
		}

		if (controlProps) {
			setControlProps([...controlProps]);
		}
	};

	return (
		<div style={styles.app}>
			<div>
				<div style={styles.propertiesCaption}>
					<div>Properties list</div>
				</div>
				{control && (
					<div>
						<p>Id: {control.id}</p>
						<p>
							Type:{' '}
							{control.controlType}
						</p>

						{controlProps?.map(
							(key, val) => (
								<div key={val}>
									{
										key.name
									}

									<input
										type='text'
										value={
											key.value
										}
										onChange={e =>
											propertyChanged(
												e
											)
										}
									/>
								</div>
							)
						)}
					</div>
				)}
			</div>
		</div>
	);
};

const styles = StyleSheet.create({
	app: {
		backgroundColor: '#eaeaea',
		width: '20%',
	},
	propertiesCaption: {},
});
