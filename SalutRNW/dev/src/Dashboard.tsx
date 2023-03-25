import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { PropertiesList } from './PropertiesList';
import { CanvasItem, ItemPublicProp, PropertyChangedResult, ToolboxItem } from './types';
import { getAvailableControls, getComponentFromToolbox } from './toolboxHelper';
import { MdSettings, MdClose } from 'react-icons/md';
import { ToolBar } from './ToolBar';
import { DebugPanel } from './DebugPanel';

import { observer } from 'mobx-react-lite';
import { DesignerRootStoreContext } from '../src/stores/DesignerRootStore';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useServices } from '../src/services';
import { PublishProjectRequest } from './types/api';

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

	const { api } = useServices();

	const [state, setState] = useState([getAvailableControls(), []]);
	const [debugPanelVisible, setDebugPanelVisible] = useState(false);
	const [selectedControl, setSelectedControl] = useState<CanvasItem>();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		const storeState = rootStore.mainStore.canvasState;
		
		if (storeState && storeState.length > 0) {
			setState([getAvailableControls(), [...storeState]]);
		}
			
	  }, [rootStore.mainStore.canvasState]);

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

	const publishComposition = async () => {
		setLoading(true);

		try {

			let projectToPublish: PublishProjectRequest = {
				name: "Demo1",
				owner:"salut",
				description: "Demo project",
				components: [...rootStore.mainStore.canvasState],
			};
			
			const publishResult = await api.project.publishProject(projectToPublish);

			if (publishResult && publishResult.isSuccess) {
				notify('Publish OK');
			} else {
				setError(`Publish error`);
			}
		} catch (e) {
			// handle error
		} finally {
			setLoading(false);
		}
	};

	const newComposition = () => {
		setState([getAvailableControls(), []]);
		rootStore.mainStore.setCanvasStore([])
		notify('New');
	};

	const notify = (message: string) => toast(message, {position: toast.POSITION.BOTTOM_RIGHT});

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
		
		let propsFromStore = rootStore.mainStore.canvasState.find(i => i.id === item.id)
		
		let propsToProvide: Array<ItemPublicProp> = [];
		if (propsFromStore && propsFromStore.publicProps) {
			propsToProvide = propsFromStore.publicProps;
		}

		let componentResult = getComponentFromToolbox(item.typeName, propsToProvide);
		return componentResult;
	};

	const propertyChangedResult = (result: PropertyChangedResult) => {
		const newState = rootStore.mainStore.canvasState;
		setState([[...state[0]], [...newState]]);
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
			<ToastContainer />
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
