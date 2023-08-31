import React, {useState} from 'react';
import {Text, Newline, Box, Spacer, useInput} from 'ink';
import TextInput from 'ink-text-input';
import theme from '../Theme.js';
import SingleShop from './SingleShop.js';

const ShopDetail = ({id, setId, userId, singleShop}) => {
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

	const [data, setData] = useState(singleShop);

	const [command, setCommand] = useState('');

	const [isAddReview, setIsAddReview] = useState(false);
	const [content, setContent] = useState('');
	const [rate, setRate] = useState(5);

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
			const updatedReviews = [
				...data.reviews,
				{
					writer: 'hoyeon',
					content: 'content',
					starRate: 3,
				},
			];
			setData({...data, reviews: updatedReviews});
			setCommand('');
		}
		// handle invalid command
		setCommand('');
	};

	useInput((input, key) => {
		if (isAddReview) {
			if (key.upArrow && rate < 5) {
				setRate(prevRate => prevRate + 1);
			} else if (key.downArrow && rate > 1) {
				setRate(prevRate => prevRate - 1);
			}
		}
	});

	const onReivewSubmit = () => {
		// TODO : add review
		setIsAddReview(false);
		const updatedReviews = [
			...data.reviews,
			{
				writer: userId,
				content: content,
				starRate: rate,
			},
		];

		setData({...data, reviews: updatedReviews});
		setContent('');
		setRate(5);
	};

	return (
		<>
			{!isAddReview ? (
				<>
					<ShopView data={data} />
					<Text color={'red'}>Commands</Text>
					<Box>
						<Text color={theme.commandFirst}>:q - quit</Text>
						<Text> / </Text>
						<Text color={theme.commandSecond}>:lm - load more reviews</Text>
						<Text> / </Text>
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
					<Text>
						// Add review <Newline />
						{'{'}
					</Text>
					<Box marginLeft={2} flexDirection="column">
						<Box>
							<Text>"content" : "</Text>
							<TextInput
								value={content}
								onChange={setContent}
								onSubmit={onReivewSubmit}
							/>
							<Text>"</Text>
						</Box>
						<Box>
							<Text>"starRate" : {rate}</Text>
						</Box>
						<Box>
							<Text>"helpText" : "⬆️ / ⬇️ to set rating"</Text>
						</Box>
					</Box>
					<Text>{'}'}</Text>
				</>
			)}
		</>
	);
};

const ShopView = ({data}) => {
	const starRateString = '⭐'.repeat(Math.round(data.averageStar));

	return (
		<>
			<Text>{'{'}</Text>
			<Box marginLeft={2} flexDirection="column">
				<Box>
					<Text>"id" : "{data.id}",</Text>
				</Box>
				<Box>
					<Text>"name" : "{data.name}",</Text>
				</Box>
				<Box>
					<Text marginLeft={2}>"location" : "{data.location}",</Text>
				</Box>
				<Box>
					<Text>"nearStation" : "{data.station}",</Text>
				</Box>
				<Box>
					<Text>
						"openTime" : "{data.open_time}" - "{data.end_time}",
					</Text>
				</Box>
				<Box>
					<Text>
						"menu" : {'['}
						<Newline />
						{data.menu.map((item, index, array) => (
							<Text>
								{' '}
								{'{'} "{item.menuName}" : {item.menuPrice} {'}'}
								{index !== array.length - 1 ? ',' : ''}
								<Newline />
							</Text>
						))}
						{']'},
					</Text>
				</Box>
				<Box>
					<Text>
						"starRate" : "{starRateString}({data.averageStar})",
					</Text>
				</Box>
				{data.reviews.length > 0 ? (
					<Box flexDirection="column">
						<Box>
							<Text>"reviews" : {'['}</Text>
						</Box>
						<Box flexDirection="column">
							{data.reviews.map((item, index) => (
								<ReviewView
									writer={item.userId}
									content={item.content}
									starRate={item.star}
									isEnd={index !== data.reviews.length - 1}
								/>
							))}
						</Box>
						<Box>
							<Text>{']'}</Text>
						</Box>
					</Box>
				) : (
					<Box>
						<Text>"reviews" : {'[]'}</Text>
					</Box>
				)}
			</Box>
			<Text>{'}'}</Text>
		</>
	);
};

const ReviewView = ({writer, content, starRate, isEnd}) => {
	return (
		<Box marginLeft={2}>
			<Text>
				{'{'} "{writer}" : "{content} ({starRate})" {'}'}
				{isEnd ? ',' : ''}
			</Text>
		</Box>
	);
};

export default ShopDetail;
