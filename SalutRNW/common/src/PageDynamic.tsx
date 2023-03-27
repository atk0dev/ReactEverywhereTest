import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet, Text } from 'react-native';
import { Counter } from './components/Counter';
import { Router } from './Router';
import { RootStoreContext } from './stores/RootStore';
import { Content } from './screens/Content';
import { observer } from 'mobx-react-lite';
import { useServices } from './services';
import { ComponentResponse, ProjectResponse } from './types/api';
import { Card } from './components/Card';
import { Login } from './screens/Login';
import { UserInfo } from './screens/UserInfo';
import CatImage from './components/CatImage';
import DevelopersNotNeeded from './components/DevelopersNotNeeded';
import Weather from './components/Weather';

export const PageDynamic = observer(() => {
	const rootStore = React.useContext(RootStoreContext);

	const [projectVisible, setProjectVisible] = useState(false);
	const [project, setProject] = useState<ProjectResponse>();

	const { api } = useServices();

	useEffect(() => {
		init();
	}, []);

	const init = async () => {

		setProjectVisible(false);
		try {
			const projectResult = await api.project.getLatestProject('salut');

			if (projectResult) {
				setProject(projectResult);
			} else {
				console.error('Error loading project');
			}
		} catch (e) {
			// handle error
		} finally {
			setProjectVisible(true);
		}

	};

	const renderComponent = (component: ComponentResponse) => {

		switch (component.typeName) {
			case 'Card':
				return (
					<Card
						text={component.publicProps?.find(p => p.name === 'text')?.value ?? ''}
						color={component.publicProps?.find(p => p.name === 'color')?.value}
						onButtonClick={result => { }}
					></Card>
				);
			case 'Counter':
				return (
          <View style={styles.counterView}>
					  <Counter />
          </View>
				);

			case 'Login':
				return (
					<Login />
				);

        case 'CatImage':
				return (
					<CatImage />
				);

        case 'DevelopersNotNeeded':
				return (
					<DevelopersNotNeeded />
				);

        case 'Weather':
				return (
					<Weather />
				);


			case 'UserInfo':
				return (
					<UserInfo />
				);

			case 'Content':
				return (
          <View
							style={
								styles.contentView
							}
						>
              <Content
                buttonGetContentVisible={component.publicProps?.find(p => p.name === 'buttonGetContentVisible')?.value === 'true' ? true : false}
                buttonHideContentVisible={component.publicProps?.find(p => p.name === 'buttonHideContentVisible')?.value === 'true' ? true : false}
                contentId={component.publicProps?.find(p => p.name === 'contentId')?.value}
              ></Content>
          </View>
				);

			default:
				return <Text>Unknown type {component.typeName}</Text>
		}

		return <></>
	}

	return (
		<SafeAreaView>
			<ScrollView>
				<View style={styles.container}>

					{project && project.components.map(component => {
						return (
							<View key={component.id}>
								{renderComponent(component)}
							</View>

						);
					})
					}
					
				</View>
			</ScrollView>
		</SafeAreaView>
	);
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
	},
  counterView: {
		padding: 40,
		margin: 20,
		borderWidth: 2,
	},
	appView: {
		padding: 40,
		margin: 20,
		borderWidth: 2,
	},
	contentView: {
		padding: 40,
		margin: 20,
		minWidth: 200,
	},
});
