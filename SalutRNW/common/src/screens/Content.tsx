import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image } from 'react-native';
import { useServices } from '../services';
import { RootStoreContext } from '../stores/RootStore';
import { ContentResponse } from '../types/api';

interface Props {
	buttonGetContentVisible: boolean;
	buttonHideContentVisible: boolean;
	contentId?: string;
}

export const Content: React.FC<Props> = observer(({ buttonGetContentVisible, buttonHideContentVisible, contentId }) => {
	const [cid, setCid] = useState(contentId);

	const [content, setContent] = useState<ContentResponse | null>();
	const [loading, setLoading] = useState(false);

	const { api } = useServices();

	const rootStore = React.useContext(RootStoreContext);

	useEffect(() => {
		handleGetContent();
	}, [contentId]);

	const handleGetContent = async () => {
		setLoading(true);
		try {
			if (cid) {
				const c = await api.content.get(
					cid,
					rootStore.authStore.accessToken
				);
				setContent(c);
			}
		} catch (e) {
			console.error('Error getting content:', e);
			setContent(null);
		} finally {
			setLoading(false);
		}
	};

	const handleHideContent = async () => {
		setContent(null);
	};

	return (
		<View>
			<Text>Content</Text>

			{buttonGetContentVisible &&
				<View style={styles.inputContainer}>
					<TextInput
						placeholder={'Content id'}
						value={cid}
						onChangeText={setCid}
					/>
				</View>
			}

			<View style={styles.buttonsContainer}>
				{buttonGetContentVisible &&
					<Button
						title={loading ? 'Getting...' : 'Get content'}
						onPress={() => {
							handleGetContent();
						}}
					/>
				}
				{buttonHideContentVisible &&
					<Button
						title={'Hide content'}
						onPress={() => {
							handleHideContent();
						}}
					/>
				}
			</View>

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
	buttonsContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-evenly'
	}
});
