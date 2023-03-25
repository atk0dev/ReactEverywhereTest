import { Card } from './salut-lib/dist/components/Card';
import { Counter } from './salut-lib/dist/components/Counter';
import { Content } from './salut-lib/dist/screens/Content';
import { Login } from './salut-lib/dist/screens/Login';
import { UserInfo } from './salut-lib/dist/screens/UserInfo';
import { ItemPublicProp, ToolboxItem } from './types';

export const getAvailableControls = () => {
	let result: Array<ToolboxItem> = [];
	result.push({ id: '11', typeName: 'Card', publicProps: [{ name: 'text', type: 'string', value: '' }, { name: 'color', type: 'string', value: '' }] });
	result.push({ id: '13', typeName: 'Counter', publicProps: [] });
	result.push({ id: '14', typeName: 'Login', publicProps: [] });
	result.push({ id: '15', typeName: 'UserInfo', publicProps: [] });
	result.push({
		id: '16', typeName: 'Content', publicProps: [
			{ name: 'buttonGetContentVisible', type: 'boolean', value: 'true' },
			{ name: 'buttonHideContentVisible', type: 'boolean', value: 'true' },
			{ name: 'contentId', type: 'string', value: '35d749e7-0779-4f5c-943a-e7dea1513270' }]
	});
	return result;
};

export const getComponentFromToolbox = (itemTypeName: string, publicProps: Array<ItemPublicProp>) => {

	let reactControl = (
		<div>

			{itemTypeName === 'Card' && (
				<Card
					text={publicProps?.find(p => p.name === 'text')?.value}
					color={publicProps?.find(p => p.name === 'color')?.value}
					onButtonClick={result => { }}
				></Card>
			)}

			{itemTypeName === 'Counter' && <Counter />}

			{itemTypeName === 'Login' && <Login />}

			{itemTypeName === 'UserInfo' && <UserInfo />}

			{itemTypeName === 'Content' && (
				<Content
					buttonGetContentVisible={publicProps?.find(p => p.name === 'buttonGetContentVisible')?.value === 'true' ? true : false}
					buttonHideContentVisible={publicProps?.find(p => p.name === 'buttonHideContentVisible')?.value === 'true' ? true : false}
					contentId={publicProps?.find(p => p.name === 'contentId')?.value}
				></Content>
			)}
		</div>
	);

	return reactControl;
};

