import React from 'react';
import {Text, Box, Newline} from 'ink';
import theme from '../Theme.js';

const ListSubway = ({data, key}) => {
	return (
		<React.Fragment key={key}>
			<Text bold color={theme.neonGreen}>
				{data}
				{/* {data || data.original_title} */}
			</Text>
			<Newline />
		</React.Fragment>
	);
};

export default ListSubway;
