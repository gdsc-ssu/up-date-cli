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
	const initialData = {
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
		reviews: [
			{writer: 'hoyeon', content: 'good', starRate: 5},
			{writer: 'hoyeon', content: '맛있네요', starRate: 3},
		],
	};

	const [data, setData] = useState(initialData);

	const [command, setCommand] = useState('');

	const [isAddReview, setIsAddReview] = useState(false);
	const [currentReview, setCurrentReview] = useState('');
	const [currentRate, setCurrentRate] = useState(1);

	const onCommandSubmit = () => {
		if (command === ':q') {
			setId(0);
		}
		if (command === ':ar') {
			// TODO : add review
			setCommand('');
			setIsAddReview(true);
		}
		if (command === ':lm') {
			// TODO : load more reviews
			setCommand('');
		}
		// handle invalid command
		setCommand('');
	};

	useInput((input, key) => {
		if (isAddReview) {
			if (key.upArrow && currentRate < 5) {
				setCurrentRate(prevRate => prevRate + 1);
			} else if (key.downArrow && currentRate > 1) {
				setCurrentRate(prevRate => prevRate - 1);
			}
		}
	});

	const onReivewSubmit = () => {
		// TODO : add review
		setIsAddReview(false);
		const updatedReviews = [
			...data.reviews,
			{
				writer: 'hoyeon',
				content: currentReview,
				starRate: currentRate,
			},
		];

		setData({...data, reviews: updatedReviews});
		setCurrentReview('');
		setCurrentRate(1);
	};

	return (
		<>
			<ShopView data={data} />
			{!isAddReview ? (
				<>
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
						onSubmit={onCommandSubmit}
					/>
				</>
			) : (
				<>
					<TextInput
						value={currentReview}
						onChange={setCurrentReview}
						onSubmit={onReivewSubmit}
					/>

					<Box>
						<Text>{currentRate}</Text>
						<Spacer />
						<Text>⬆️ / ⬇️ to set rating</Text>
					</Box>
				</>
			)}
		</>
	);
};

const ShopView = ({data}) => {
	const starRateString = '⭐'.repeat(Math.round(data.starRate));

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
						{data.reviews.length ? <Newline /> : <></>}
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
		</>
	);
};

export default ShopDetail;
