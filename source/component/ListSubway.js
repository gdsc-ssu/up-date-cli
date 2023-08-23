import React from 'react';
import {Text, Box, Newline} from 'ink';
import theme from '../Theme.js';

const ListSubway = ({data}) => {
	return (
		<>
			<Text bold color={theme.neonGreen}>
				{data}
			</Text>
		</>
	);
};

export default ListSubway;
