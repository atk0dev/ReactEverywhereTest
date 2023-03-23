import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface Props {}

// fake data generator
const getItems = () => {
	let result: Array<ToolboxItem> = [];
	result.push({ id: '1', content: 'Item 1' });
	result.push({ id: '2', content: 'Item 2' });
	result.push({ id: '3', content: 'Item 3' });
	return result;
};

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

/**
 * Moves an item from one list to another list.
 */
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
		background: isDragging ? 'lightgreen' : 'grey',

		// styles we need to apply on draggables
		...draggableStyle,
	};
};

const getListStyle = (isDraggingOver: boolean) => ({
	background: isDraggingOver ? 'lightblue' : 'lightgrey',
	padding: grid,
	width: 250,
});

export const Dashboard: React.FC<Props> = () => {
	const [state, setState] = useState([getItems(), []]);
	console.log('state', state);

	function onDragEnd(result: { source: any; destination: any }) {
		console.log('onDragEnd', result);
		const { source, destination } = result;

		// dropped outside the list
		if (!destination) {
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
			console.log('reorder between lists');
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

	return (
		<div>
			<div style={{ display: 'flex' }}>
				<DragDropContext onDragEnd={onDragEnd}>
					{state.map((el, ind) => (
						<Droppable
							key={ind}
							droppableId={`${ind}`}
						>
							{(
								provided,
								snapshot
							) => (
								<div
									ref={
										provided.innerRef
									}
									style={getListStyle(
										snapshot.isDraggingOver
									)}
									{...provided.droppableProps}
								>
									{el.map(
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
															<button
																type='button'
																onClick={() => {
																	const newState =
																		[
																			...state,
																		];
																	newState[
																		ind
																	].splice(
																		index,
																		1
																	);
																	setState(
																		newState.filter(
																			group =>
																				group.length
																		)
																	);
																}}
															>
																delete
															</button>
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
					))}
				</DragDropContext>
			</div>
		</div>
	);
};

const styles = StyleSheet.create({
	app: {},
});

interface ToolboxItem {
	id: string;
	content: string;
}

interface DropItem {
	index: number;
	droppableId: string;
}
