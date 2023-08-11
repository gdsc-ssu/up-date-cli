import React from 'react';
import {Text, Box, useInput, Newline} from 'ink';
import TextInput from 'ink-text-input';
import theme from './Theme.js';
//[[['신촌','강남','숭실대입구'],ls]]
const Output = ({list}) => {
	return (
		<Box marginY={1} flexDirection="column">
			{list.map(item => (
				<>
					<Text color={theme.purple}>$ {item[1]} </Text>
					<Newline />
					{item[0].map((detail, key) => (
						<React.Fragment key={key}>
							<Text bold color={theme.neonGreen}>
								{item[1] === 'ls' ? detail : detail.original_title}
								{/* {detail || detail.original_title} */}
							</Text>
							<Newline />
						</React.Fragment>
					))}
				</>
			))}
		</Box>
	);
};

export default Output;
