import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { PropertiesList } from './PropertiesList';
import { CanvasItem, ToolboxItem } from './types';
import { getAvailableControls, getComponentFromToolbox } from './toolboxHelper';
import { MdSettings, MdClose } from 'react-icons/md';
import { ToolBar } from './ToolBar';
import { DebugPanel } from './DebugPanel';

interface Props {}

const reorder = (
	list: Array<ToolboxItem>,
	startIndex: number,
	endIndex: number
) => {
	console.log('list', list);
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
		content: removed.content,
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

		// change background colour if dragging
		background: isDragging ? '#cccccc' : '#d6d6d6',

		// styles we need to apply on draggables
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

export const Dashboard: React.FC<Props> = () => {
	const [state, setState] = useState([getAvailableControls(), []]);
	const [debugPanelVisible, setDebugPanelVisible] = useState(false);

	const [selectedControl, setSelectedControl] =
		useState<CanvasItem | null>(null);

	const deleteFromCanvas = (index: number) => {
		const newState = [...state];
		newState[1].splice(index, 1);
		setState(newState.filter(group => group.length));
	};

	const showProperties = (index: number) => {
		const canvasItems = state[1];
		const selectedItem = canvasItems[index];

		console.log('selectedItem', selectedItem);

		let ctrl: CanvasItem = {
			id: selectedItem.id,
			content: selectedItem.content,
			controlType: selectedItem.typeName,
			controlName: `${selectedItem.typeName}-${selectedItem.id}`,
      publicProps: selectedItem.publicProps,
		};

		setSelectedControl(ctrl);
	};

	const publishComposition = () => {
		console.log('Publish Composition', state[1]);
	};

	const newComposition = () => {
		console.log('New Composition');
		setState([getAvailableControls(), []]);
	};

	function onDragEnd(result: { source: any; destination: any }) {
		console.log('onDragEnd', result);
		const { source, destination } = result;

		// dropped outside the list
		if (!destination) {
			return;
		}

		if (destination.droppableId === '0') {
			return;
		}

		const sInd = +source.droppableId;
		const dInd = +destination.droppableId;

		if (sInd === dInd) {
			console.log('reorder in the same list');
			const items = reorder(
				state[sInd],
				source.index,
				destination.index
			);
			const newState: Array<Array<ToolboxItem>> = [...state];
			console.log(typeof newState);

			newState[sInd] = items;
			setState(newState);
		} else {
			console.log('reorder between lists', state);

			const result = move(
				state[sInd],
				state[dInd],
				source,
				destination
			);
			const newState = [...state];

			newState[sInd] = state[sInd];
			newState[dInd] = result;

			setState(newState.filter(group => group.length));
		}
	}

	const drawComponent = (item: ToolboxItem) => {
		let componentResult = getComponentFromToolbox(item);
		const itemOnCanvas = state[1].find(i => i.id === item.id);
		if (itemOnCanvas) {
			itemOnCanvas.publicProps = [
				...componentResult.publicProps,
			];
		}

		return componentResult.control;
	};

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
															item.content
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
																		color='green'
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
				></PropertiesList>
			</div>
			<div>
				{debugPanelVisible && (
					<DebugPanel data={state[1]} />
				)}
			</div>
		</div>
	);
};

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
