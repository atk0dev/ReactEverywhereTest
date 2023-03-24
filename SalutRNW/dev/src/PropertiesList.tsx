import React from 'react';
import { StyleSheet } from 'react-native';
import { CanvasItem, PropertyChangedResult } from './types';

interface Props {
	control: CanvasItem | null;
	onPropertyChanged?: (data: PropertyChangedResult) => void; 
}

export const PropertiesList: React.FC<Props> = ({ control, onPropertyChanged }) => {
	const [controlProps, setControlProps] = React.useState(
		control?.publicProps
	);

	React.useEffect(() => {		
		setControlProps(control?.publicProps);
	}, [control]);

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

		if (onPropertyChanged) {
			if (control && controlProps) {
				onPropertyChanged({controlId: control.id, typeName: control.controlType, publicProps: [...controlProps]});
			}
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
