import { Card } from './salut-lib/dist/components/Card';
import { Counter } from './salut-lib/dist/components/Counter';
import { Content } from './salut-lib/dist/screens/Content';
import { Login } from './salut-lib/dist/screens/Login';
import { UserInfo } from './salut-lib/dist/screens/UserInfo';
import { CreateControlResult, ItemPublicProp, ToolboxItem } from './types';

export const getAvailableControls = () => {
	let result: Array<ToolboxItem> = [];
	result.push({ id: '11', content: 'Card', typeName: 'Card', publicProps: [{name: 'text', type: 'string'}] });
	result.push({ id: '13', content: 'Counter', typeName: 'Counter', publicProps: [] });
	result.push({ id: '14', content: 'Login', typeName: 'Login', publicProps: [] });
	result.push({ id: '15', content: 'User info', typeName: 'UserInfo', publicProps: [] });
  result.push({ id: '16', content: 'Content', typeName: 'Content', publicProps: [] });
	return result;
};

export const getComponentFromToolbox = (item: ToolboxItem) => {
	

  let pp: Array<ItemPublicProp> = [];

  if (item.typeName === 'Card') {
    pp.push({ name: 'text', type:'string', value: item.content });
  }

  let reactControl = (
		<div>
			{item.typeName === 'Text' && (
				<p>{item.content}</p>
			)}

			{item.typeName === 'Card' && (
				<Card
					text={item.content}
					onButtonClick={result => {}}
				></Card>
			)}

			{item.typeName === 'Counter' && <Counter />}

			{item.typeName === 'Login' && <Login />}

			{item.typeName === 'UserInfo' && <UserInfo />}

      {item.typeName === 'Content' && <Content />}
		</div>
	);

  let result: CreateControlResult = {
    control: reactControl,
    publicProps: pp,
  }

  console.log('react control type: ', typeof(reactControl));
  
  //return reactControl; 
  return result;
};

