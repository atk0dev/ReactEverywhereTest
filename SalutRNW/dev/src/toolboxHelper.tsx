import { Card } from './salut-lib/dist/components/Card';
import { Counter } from './salut-lib/dist/components/Counter';
import { Content } from './salut-lib/dist/screens/Content';
import { Login } from './salut-lib/dist/screens/Login';
import { UserInfo } from './salut-lib/dist/screens/UserInfo';
import { CreateControlResult, ItemPublicProp, ToolboxItem } from './types';

export const getAvailableControls = () => {
	let result: Array<ToolboxItem> = [];
	result.push({ id: '11', typeName: 'Card', publicProps: [{ name: 'text', type: 'string', value: '' }] });
	result.push({ id: '13', typeName: 'Counter', publicProps: [] });
	result.push({ id: '14', typeName: 'Login', publicProps: [] });
	result.push({ id: '15', typeName: 'UserInfo', publicProps: [] });
	result.push({ id: '16', typeName: 'Content', publicProps: [] });
	return result;
};

export const getComponentFromToolbox = (item: ToolboxItem) => {

	// let pp: Array<ItemPublicProp> = [];

	// if (item.typeName === 'Card') {
	// 	pp.push({ name: 'text', type: 'string', value: 'DEMO' });
	// }

	let reactControl = (
		<div>

			{item.typeName === 'Card' && (
				<Card
					text={'DEMO'}
					onButtonClick={result => { }}
				></Card>
			)}

			{item.typeName === 'Counter' && <Counter />}

			{item.typeName === 'Login' && <Login />}

			{item.typeName === 'UserInfo' && <UserInfo />}

			{item.typeName === 'Content' && <Content />}
		</div>
	);

	// let result: CreateControlResult = {
	// 	control: reactControl,
	// 	publicProps: pp,
	// }

	return reactControl;
	//return result;
};

