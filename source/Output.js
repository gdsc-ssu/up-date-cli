import React from 'react';
import {Text, Box, Newline} from 'ink';
import theme from './Theme.js';
import ListSubway from './component/ListSubway.js';
import ListShop from './component/ListShop.js';
//[[['신촌','강남','숭실대입구'],ls]]

// [[[{},{}],'맛집']]
const Output = ({list}) => {
	return (
		<Box marginY={1} flexDirection="column">
			{list.map(item => (
				<>
					<Text color={theme.purple}>$ {item[1]} </Text>
					<Newline />
					{item[1] === 'ls'
						? item[0].map((data, key) => <ListSubway data={data} key={key} />)
						: item[0].map((data, key) => <ListShop data={data} key={key} />)}
				</>
			))}
		</Box>
	);
};

export default Output;
