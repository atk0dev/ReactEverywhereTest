import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { DesignerRootStoreContext } from './stores/DesignerRootStore';
import { CanvasItem, PropertyChangedResult } from './types';

interface Props {
	control?: CanvasItem;
	onPropertyChanged?: (data: PropertyChangedResult) => void; 
}

export const PropertiesList: React.FC<Props> = observer(({ control, onPropertyChanged }) => {

	const rootStore = useContext(DesignerRootStoreContext);
	
	const [selectedControl, setSelectedControl] = React.useState(rootStore.mainStore.canvasState.find(i => i.id === control?.id));
	const [controlProps, setControlProps] = React.useState(rootStore.mainStore.canvasState.find(i => i.id === control?.id)?.publicProps);

	React.useEffect(() => {		
		setControlProps(rootStore.mainStore.canvasState.find(i => i.id === control?.id)?.publicProps);
		setSelectedControl(rootStore.mainStore.canvasState.find(i => i.id === control?.id));
	}, [control, rootStore.mainStore.canvasState]);

	const propertyChanged = (propName: string, value: string) => {
		if (controlProps) {
			setControlProps([...controlProps]);
		}

		if (onPropertyChanged) {
			if (control && controlProps) {
				let r = {controlId: control.id, propertyName: propName, propertyValue: value};
				onPropertyChanged(r);
				rootStore.mainStore.setControlValue(r);
			}
		}		
	};

	return (
		<div style={styles.app}>
			<div>
				<div>
					<div>Properties list</div>
				</div>
				{control && (
					<div>
						<p>Id: {control.id}</p>
						<p>
							Type:{' '}
							{selectedControl?.typeName}
						</p>

						{controlProps?.map(
							(key, val) => (
								<div key={val} style={styles.propertyContainer}>
									<div style={styles.propertyTitle}>
									{
										key.name
									}
									</div>

									<input
										style={styles.propertyInput}
										type='text'
										value={
											key.value
										}
										onChange={e =>
											propertyChanged(
												key.name,
												e.target.value
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
});

const styles = StyleSheet.create({
	app: {
		backgroundColor: '#eaeaea',
		width: '20%',
		padding: 5,
	},
	propertyContainer: {
		backgroundColor: '#d6d6d6',
		height: 50,
		padding: 5,		
	},
	propertyTitle: {
		textTransform: 'capitalize',
	},
	propertyInput: {
		width: '95%'
	}
});
