import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { PropertiesList } from './PropertiesList';
import { CanvasItem, PropertyChangedResult, ToolboxItem } from './types';
import { getAvailableControls, getComponentFromToolbox } from './toolboxHelper';
import { MdSettings, MdClose } from 'react-icons/md';
import { ToolBar } from './ToolBar';
import { DebugPanel } from './DebugPanel';

import { observer } from 'mobx-react-lite';
import { DesignerRootStoreContext } from '../src/stores/DesignerRootStore';

interface Props { }

const reorder = (
	list: Array<ToolboxItem>,
	startIndex: number,
	endIndex: number
) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

const move = (
	source: Array<ToolboxItem>,
	destination: Array<ToolboxItem>,
	droppableSource: DropItem,
	droppableDestination: DropItem
) => {
	const sourceClone = Array.from(source);
	const destClone = Array.from(destination);

	const [removed] = sourceClone.splice(droppableSource.index, 1);

	let newItem: ToolboxItem = {
		id: new Date().valueOf().toString(),
		typeName: removed.typeName,
		publicProps: [...removed.publicProps],
	};

	destClone.splice(droppableDestination.index, 0, newItem);

	return destClone;
};

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => {
	return {
		userSelect: 'none',
		padding: grid * 2,
		margin: `0 0 ${grid}px 0`,

		background: isDragging ? '#cccccc' : '#d6d6d6',

		...draggableStyle,
	};
};

const getListStyle = (isDraggingOver: boolean, column: string) => {
	const style = {
		background: isDraggingOver ? '#e0e0e0' : '#eaeaea',
		padding: grid,
		width: '20%',
	};

	if (column === 'toolbox') {
		style.width = '20%';
	} else if (column === 'canvas') {
		style.width = '60%';
	}

	return style;
};

export const Dashboard: React.FC<Props> = observer(() => {

	const rootStore = useContext(DesignerRootStoreContext);

	const [state, setState] = useState([getAvailableControls(), []]);
	const [debugPanelVisible, setDebugPanelVisible] = useState(false);
	const [selectedControl, setSelectedControl] = useState<CanvasItem>();

	const deleteFromCanvas = (index: number) => {
		const newState = [...state];
		newState[1].splice(index, 1);
		//setState(newState.filter(group => group.length));
		setState(newState);
		rootStore.mainStore.setCanvasStore(newState[1])	
	};

	const showProperties = (index: number) => {
		const canvasItems = state[1];
		const selectedItem = canvasItems[index];

		let ctrl: CanvasItem = {
			id: selectedItem.id,			
		};

		setSelectedControl(ctrl);
	};

	const publishComposition = () => {
		console.log('Publish Composition', state[1]);
	};

	const newComposition = () => {
		setState([getAvailableControls(), []]);
		rootStore.mainStore.setCanvasStore([])
	};

	function onDragEnd(result: { source: any; destination: any }) {
		const { source, destination } = result;

		// dropped outside the list
		if (!destination) {
			return;
		}

		if (source.droppableId === '1' && destination.droppableId === '0') {
			return;
		}

		const sInd = +source.droppableId;
		const dInd = +destination.droppableId;

		if (sInd === dInd) {
			const items = reorder(
				state[sInd],
				source.index,
				destination.index
			);
			const newState: Array<Array<ToolboxItem>> = [...state];

			newState[sInd] = items;
			setState(newState);
			rootStore.mainStore.setCanvasStore(newState[1])
		} else {
			const result = move(
				state[sInd],
				state[dInd],
				source,
				destination
			);
			const newState = [...state];

			newState[sInd] = state[sInd];
			newState[dInd] = result;

			//setState(newState.filter(group => group.length));
			setState(newState);
			rootStore.mainStore.setCanvasStore(newState[1])
		}
	}

	const drawComponent = (item: ToolboxItem) => {
		let componentResult = getComponentFromToolbox(item);
		
		// const itemOnCanvas = state[1].find(i => i.id === item.id);
		// if (itemOnCanvas) {
		// 	itemOnCanvas.publicProps = [
		// 		...componentResult.publicProps,
		// 	];
		// }

		return componentResult;
	};

	const propertyChangedResult = (result: PropertyChangedResult) => {
		console.log('in dashboard. Property changed result', result);
	}

	return (
		<div>
			<div>
				<ToolBar
					onNewPress={() => {
						newComposition();
					}}
					onPublishPress={() => {
						publishComposition();
					}}
					onDebugPress={() => {
						setDebugPanelVisible(
							!debugPanelVisible
						);
					}}
				/>
			</div>
			<div style={{ display: 'flex' }}>
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable key={1} droppableId={`0`}>
						{(provided, snapshot) => (
							<div
								ref={
									provided.innerRef
								}
								style={getListStyle(
									snapshot.isDraggingOver,
									'toolbox'
								)}
								{...provided.droppableProps}
							>
								{state[0].map(
									(
										item,
										index
									) => (
										<Draggable
											key={
												item.id
											}
											draggableId={
												item.id
											}
											index={
												index
											}
										>
											{(
												provided,
												snapshot
											) => (
												<div
													ref={
														provided.innerRef
													}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													style={getItemStyle(
														snapshot.isDragging,
														provided
															.draggableProps
															.style
													)}
												>
													<div
														style={{
															display: 'flex',
															justifyContent:
																'space-around',
														}}
													>
														{
															item.typeName
														}
													</div>
												</div>
											)}
										</Draggable>
									)
								)}
								{
									provided.placeholder
								}
							</div>
						)}
					</Droppable>

					<Droppable key={2} droppableId={`1`}>
						{(provided, snapshot) => (
							<div
								ref={
									provided.innerRef
								}
								style={getListStyle(
									snapshot.isDraggingOver,
									'canvas'
								)}
								{...provided.droppableProps}
							>
								{state[1] &&
									state[1].map(
										(
											item,
											index
										) => (
											<Draggable
												key={
													item.id
												}
												draggableId={
													item.id
												}
												index={
													index
												}
											>
												{(
													provided,
													snapshot
												) => (
													<div
														ref={
															provided.innerRef
														}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														style={getItemStyle(
															snapshot.isDragging,
															provided
																.draggableProps
																.style
														)}
													>
														<div
															style={{
																display: 'flex',
																justifyContent:
																	'space-between',
															}}
														>
															<div
																style={
																	styles.canvasControlContainer
																}
															>
																{
																	//item.content
																	drawComponent(
																		item
																	)
																}
															</div>
															<div
																style={
																	styles.canvasButtonsContainer
																}
															>
																<button
																	type='button'
																	style={
																		styles.canvasButton
																	}
																	onClick={() => {
																		deleteFromCanvas(
																			index
																		);
																	}}
																>
																	<MdClose
																		size='20px'
																		color='red'
																	/>
																</button>
																<button
																	type='button'
																	style={
																		styles.canvasButton
																	}
																	onClick={() => {
																		showProperties(
																			index
																		);
																	}}
																>
																	<MdSettings
																		size='20px'
																	/>
																</button>
															</div>
														</div>
													</div>
												)}
											</Draggable>
										)
									)}
								{
									provided.placeholder
								}
							</div>
						)}
					</Droppable>
				</DragDropContext>
				<PropertiesList
					control={selectedControl}
					onPropertyChanged={(result) => {
						propertyChangedResult(result);
					}}
				></PropertiesList>
			</div>
			<div>
				{debugPanelVisible && (
					<DebugPanel data={rootStore.mainStore.canvasState} />
				)}
			</div>
		</div>
	);
});

const styles = StyleSheet.create({
	app: {},
	divWithBorder: {
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: '#000000',
	},
	canvasButton: {
		margin: 3,
	},
	canvasButtonsContainer: {
		display: 'flex',
		flexDirection: 'column',
		//justifyContent:'space-between',
		//alignItems: 'center',
		//width: '100%',
		height: '100%',
	},
	canvasControlContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '100%',
		width: '100%',
	},
});

interface DropItem {
	index: number;
	droppableId: string;
}
