import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image } from 'react-native';
import { useServices } from '../services';
import { RootStoreContext } from '../stores/RootStore';
import { ContentResponse } from '../types/api';

interface Props {}

export const Content: React.FC<Props> = observer(() => {
	const [cid, setCid] = useState('35d749e7-0779-4f5c-943a-e7dea1513270');
	const [content, setContent] = useState<ContentResponse | null>();
	const [loading, setLoading] = useState(false);

	const { api } = useServices();

	const rootStore = React.useContext(RootStoreContext);

	const handleGetContent = async () => {
		setLoading(true);
		try {
			const c = await api.content.get(
				cid,
				rootStore.authStore.accessToken
			);
			setContent(c);
		} catch (e) {
			// handle error
			console.error('Error getting content:', e);
			setContent(null);
		} finally {
			setLoading(false);
		}
	};

	return (
		<View>
			<Text>Content</Text>

			<View style={styles.inputContainer}>
				<TextInput
					placeholder={'Content id'}
					value={cid}
					onChangeText={setCid}
				/>
			</View>

			<Button
				title={loading ? 'Getting...' : 'Get content'}
				onPress={() => {
					handleGetContent();
				}}
			/>

			<View style={styles.contentContainer}>
				{!!content && !!content.contentItems && (
					<View>
						{content.contentItems.map(
							(item, ndx) => (
								<View
									key={
										ndx
									}
									style={
										styles.contentItem
									}
								>
									{item.contentType ===
										'Heading' && (
										<Text>
											{
												item.contents
											}
										</Text>
									)}
									{item.contentType ===
										'Text' && (
										<Text>
											{
												item.contents
											}
										</Text>
									)}
									{item.contentType ===
										'Image' && (
										<Image
											style={
												styles.image
											}
											source={{
												uri: item.contents,
											}}
										/>
									)}
								</View>
							)
						)}

						{content.contentItems.map(
							ci => {
								<Text>
									{
										ci.contentType
									}
								</Text>;
							}
						)}
					</View>
				)}
			</View>
		</View>
	);
});

const styles = StyleSheet.create({
	contentContainer: {
		backgroundColor: 'orange',
		minWidth: 300,
	},
	contentItem: {
		padding: 20,
	},
	image: {
		width: 300,
		height: 300,
	},
  inputContainer: {
		padding: 5,
		margin: 5,
		borderWidth: 1,
	},
});
