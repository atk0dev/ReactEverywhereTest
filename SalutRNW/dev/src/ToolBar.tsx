import React from 'react';
import { MdFiberNew, MdPublish, MdBuild } from 'react-icons/md';
import { StyleSheet } from 'react-native';

interface Props {
	onNewPress?: () => void;
	onPublishPress?: () => void;
	onDebugPress?: () => void;
}

export const ToolBar: React.FC<Props> = ({ onNewPress, onPublishPress, onDebugPress }) => {
	return (
		<div style={styles.app}>
			<div style={styles.captionText}>
				<p>Salut dev env: 0.1</p>
			</div>
			

				<div style={styles.toolbarButtonContainer}>
					<button
						type='button'
						style={styles.toolbarButton}
						onClick={() => {
							if (onNewPress) {
								onNewPress();
							}
						}}
					>
						<MdFiberNew size='30px' />
					</button>
				</div>
				<div>
					<button
						type='button'
						style={styles.toolbarButton}
						onClick={() => {
							if (onPublishPress) {
								onPublishPress();
							}
						}}
					>
						<MdPublish size='30px' />
					</button>
				</div>
				<div>
					<button
						type='button'
						style={styles.toolbarButton}
						onClick={() => {
							if (onDebugPress) {
								onDebugPress();
							}
						}}
					>
						<MdBuild size='30px' />
					</button>
				</div>
			</div>
		
	);
};

const styles = StyleSheet.create({
	app: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		height: 50,
		width: '100%',
		backgroundColor: '#eaeaea',
	},
	toolbarButton: {
		margin: 3,
	},
	toolbarButtonContainer: {
		paddingLeft: 16,
	},
	captionText: {
		width: '20%',
		textAlign: 'center',
	}
});
