import React from 'react';
import {Text, Box, Newline} from 'ink';
import theme from './Theme.js';
import ListSubway from './component/ListSubway.js';

//[[['신촌','강남','숭실대입구'],ls]]

// [[[{},{}],'맛집']]
const Output = ({list}) => {
	const check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
	return (
		<Box marginY={1} flexDirection="column">
			{list.map((item, index) => (
				<Box key={index} flexDirection="column">
					<Text color={theme.purple}>$ {item[1]} </Text>
					<Newline />
					{item[1] === 'ls' ? (
						item[0].map((data, key) => <ListSubway data={data} />)
					) : check.test(item[1]) ? (
						''
					) : (
						<Text color={theme.red}>{item[0][0]}</Text>
					)}
				</Box>
			))}
		</Box>
	);
};

export default Output;
