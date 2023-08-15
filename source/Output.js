import React from 'react';
import {Text, Box, useInput, Newline} from 'ink';
import TextInput from 'ink-text-input';
import theme from './Theme.js';
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
						? item[0].map((data, key) => (
								<React.Fragment key={key}>
									<Text bold color={theme.neonGreen}>
										{item[1] === 'ls' ? data : data.original_title}
										{/* {data || data.original_title} */}
									</Text>
									<Newline />
								</React.Fragment>
						  ))
						: item[0].map((data, key) => (
								<React.Fragment key={key}>
									<Text>{'{'}</Text>
									<Box marginLeft={2}>
										<Text>
											<Text>
												"id" : "{data.id}",
												<Newline />
											</Text>
											<Text>
												"title" : "{data.title}",
												<Newline />
											</Text>
											<Text marginLeft={2}>
												"location" : "{data.location}",
												<Newline />
											</Text>
											<Text>
												"nearStation" : "{data.nearStation}",
												<Newline />
											</Text>
											<Text>
												"menu" : {'['}
												<Newline />
												{data.menu.map((item, index, array) => (
													<Text key={item.name}>
														{' '}
														{'{'} "{item.name}" : {item.price} {'}'}
														{index !== array.length - 1 ? ',' : ''}
														<Newline />
													</Text>
												))}
												{']'},
												<Newline />
											</Text>
											<Text>
												"starRate" : "{data.starRate}",
												<Newline />
											</Text>
										</Text>
									</Box>
									<Text>{'}'}</Text>
								</React.Fragment>
						  ))}
				</>
			))}
		</Box>
	);
};

export default Output;
