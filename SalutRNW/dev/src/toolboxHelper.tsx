import { Card } from './salut-lib/dist/components/Card';
import { Counter } from './salut-lib/dist/components/Counter';
import { Content } from './salut-lib/dist/screens/Content';
import { Login } from './salut-lib/dist/screens/Login';
import { UserInfo } from './salut-lib/dist/screens/UserInfo';
import { ItemPublicProp, ToolboxItem } from './types';

export const getAvailableControls = () => {
	let result: Array<ToolboxItem> = [];
	result.push({ id: '11', typeName: 'Card', publicProps: [{ name: 'text', type: 'string', value: '' }] });
	result.push({ id: '13', typeName: 'Counter', publicProps: [] });
	result.push({ id: '14', typeName: 'Login', publicProps: [] });
	result.push({ id: '15', typeName: 'UserInfo', publicProps: [] });
	result.push({ id: '16', typeName: 'Content', publicProps: [] });
	return result;
};

export const getComponentFromToolbox = (itemTypeName: string, publicProps: Array<ItemPublicProp>) => {

	let reactControl = (
		<div>

			{itemTypeName === 'Card' && (
				<Card
					text={publicProps?.find(p => p.name === 'text')?.value}
					onButtonClick={result => { }}
				></Card>
			)}

			{itemTypeName === 'Counter' && <Counter />}

			{itemTypeName === 'Login' && <Login />}

			{itemTypeName === 'UserInfo' && <UserInfo />}

			{itemTypeName === 'Content' && <Content />}
		</div>
	);

	return reactControl;
};

