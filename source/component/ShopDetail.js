import React, {useState} from 'react';
import {Text, Newline, Box, useInput, Spacer} from 'ink';
import TextInput from 'ink-text-input';
import theme from '../Theme.js';

/**
 *
 * @param {Object} data
 * @description
 * data = {
 * 	id: '1',
 * 	title: 'The 5th Wave',
 * 	location: '서울시 동작구 상도로 369',
 * 	nearStation: '상도역',
 * 	openTime: '09:00',
 * 	closeTime: '22:00',
 * 	menu: [
 * 		{
 * 			name: '카페라떼',
 * 			price: 4000,
 * 		},
 * 	],
 * 	starRate: 4.5,
 * 	reviews: [],
 * }
 */
const ShopDetail = ({Id, setId}) => {
	const data = {
		id: '1',
		title: 'The 5th Wave',
		location: '서울시 동작구 상도로 369',
		nearStation: '상도역',
		openTime: '09:00',
		closeTime: '22:00',
		menu: [
			{
				name: '카페라떼',
				price: 4000,
			},
		],
		starRate: 4.5,
		reviews: [],
	};

	const starRateRounded = Math.round(data.starRate);

	const starRateString = '⭐'.repeat(starRateRounded);

	const [command, setCommand] = useState('');

	const handleCommandSubmit = () => {
		if (command === ':q' || command === ':wq') {
			setId(0);
			setCommand('');
		}
		setCommand('1231');
	};

	useInput((input, key) => {
		if (!key) return;

		if (key.enter) {
			if (command === ':q') {
				setCommand('');
				setId(0);
			}
			if (command === ':lm') {
				setCommand('');
			}
			setCommand('');
		}
	});

	return (
		<>
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
						"openTime" : "{data.openTime}" - "{data.closeTime}",
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
						"starRate" : "{starRateString}({data.starRate})",
						<Newline />
					</Text>
					<Text>
						"reviews" : {'['}
						{data.reviews.length == !0 ? <Newline /> : <></>}
						{data.reviews.map((item, index, array) => (
							<Text key={item.id}>
								{' '}
								{'{'} "{item.writer}" : "{item.content} ({item.starRate})" {'}'}
								{index !== array.length - 1 ? ',' : ''}
								<Newline />
							</Text>
						))}
						{']'}
					</Text>
				</Text>
			</Box>
			<Text>{'}'}</Text>
			<Text color={'red'}>Commands</Text>
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
				onSubmit={handleCommandSubmit}
			/>
		</>
	);
};
export default ShopDetail;
