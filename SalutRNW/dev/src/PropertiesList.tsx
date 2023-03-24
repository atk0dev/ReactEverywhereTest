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
	}, [control, rootStore.mainStore.canvasState]);

	const propertyChanged = (propName: string, value: string) => {
		console.log('propertyChanged', value)
		// if (
		// 	control !== null &&
		// 	control.publicProps !== null &&
		// 	control.publicProps !== undefined &&
		// 	control.publicProps?.length > 0
		// ) {
		// 	control.publicProps[0].value = value;
		// }

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
				<div style={styles.propertiesCaption}>
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
	},
	propertiesCaption: {},
});
