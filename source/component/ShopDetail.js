import React, {useState} from 'react';
import {Text, Newline, Box, Spacer} from 'ink';
import TextInput from 'ink-text-input';
import theme from '../Theme.js';
import SingleShop from './SingleShop.js';

const ShopDetail = ({singleShop, setId}) => {
	// const data = {
	// 	id: '1',
	// 	title: 'The 5th Wave',
	// 	location: '서울시 동작구 상도로 369',
	// 	nearStation: '상도역',
	// 	openTime: '09:00',
	// 	closeTime: '22:00',
	// 	menu: [
	// 		{
	// 			name: '카페라떼',
	// 			price: 4000,
	// 		},
	// 	],
	// 	starRate: 4.5,
	// 	reviews: [],
	// };

	const starRateRounded = Math.round(singleShop.averageStar);

	const starRateString = '⭐'.repeat(starRateRounded);

	const [command, setCommand] = useState('');

	const onCommandSubmit = () => {
		if (command === ':q') {
			setId(0);
		}
		if (command === ':ar') {
			// TODO : add review
			setCommand('');
		}
		if (command === ':lm') {
			// TODO : load more reviews
			setCommand('');
		}
		// handle invalid command
		setCommand('');
	};

	return (
		<Box marginY={1} flexDirection="column">
			<SingleShop starRateString={starRateString} data={singleShop} />

			<Box flexDirection="column">
				<Spacer />
				<Text color={'red'}>
					<Newline />
					Commands
				</Text>
				<Box>
					<Text color={theme.commandFirst}>:q - quit</Text>
					<Spacer />
					<Text color={theme.commandSecond}>:lm - load more reviews </Text>
					<Spacer />
					<Text color={theme.commandThird}>:ar - add review</Text>
				</Box>
				<TextInput
					value={command}
					onChange={setCommand}
					onSubmit={onCommandSubmit}
				/>
			</Box>
		</Box>
	);
};
export default ShopDetail;
