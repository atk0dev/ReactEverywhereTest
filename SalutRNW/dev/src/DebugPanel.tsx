import React from 'react';
import { JSONTree } from 'react-json-tree';
import ReactJson from 'react-json-view';

import { StyleSheet } from 'react-native';

interface Props {
	data?: any;
}

export const DebugPanel: React.FC<Props> = ({ data }) => {

  const theme = {
    scheme: 'monokai',
    author: 'andrii',
    base00: '#eaeaea',
    base01: '#383830',
    base02: '#49483e',
    base03: '#75715e',
    base04: '#a59f85',
    base05: '#f8f8f2',
    base06: '#f5f4f1',
    base07: '#f9f8f5',
    base08: '#f92672',
    base09: '#fd971f',
    base0A: '#f4bf75',
    base0B: '#000',
    base0C: '#001',
    base0D: '#002',
    base0E: '#ae81ff',
    base0F: '#cc6633',
  };

	return (
		<div style={styles.app}>
			{/* {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
			{data && (
				<JSONTree
					data={data}
					theme={{
						extend: theme,
						// underline keys for literal values
						valueLabel: {
							textDecoration:
								'underline',
						},
						// switch key for objects to uppercase when object is expanded.
						// `nestedNodeLabel` receives additional argument `expandable`
						nestedNodeLabel: (
							{ style },
							keyPath,
							nodeType,
							expanded
						) => ({
							style: {
								...style,
								textTransform:
									expanded
										? 'uppercase'
										: 'lowercase',
							},
						}),
					}}
				/>
			)}
		</div>
	);
};

const styles = StyleSheet.create({
	app: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: '100%',
		backgroundColor: '#eaeaea',
	},
});
