import React, {useState} from 'react';
import {Text, Newline, Box, useInput} from 'ink';
import TextInput from 'ink-text-input';
import theme from '../Theme.js';
import {postReview} from '../api/remote.js';
import {getReviewCheck} from '../api/remote.js';

const ShopDetail = ({id, setId, userId, singleShop}) => {
	const [data, setData] = useState(singleShop);

	const [page, setPage] = useState(1);

	const [reviewlist, setReviewlist] = useState(singleShop.reviews);
	const [command, setCommand] = useState('');
	const [isAddReview, setIsAddReview] = useState(false);

	const [content, setContent] = useState('');
	const [star, setStar] = useState(5);

	const onCommandSubmit = () => {
		if (command === ':q') {
			setId(0);
			return;
		}
		if (command === ':ar') {
			setIsAddReview(true);
		}
		if (command === ':lm') {
			getReviewCheck(singleShop.id, page + 1).then(res => {
				setReviewlist([...reviewlist, ...res.data.body]);
				setPage(page + 1);
			});
		}
		// handle invalid command
		setCommand('');
	};

	useInput((input, key) => {
		if (isAddReview) {
			if (key.upArrow && star < 5) {
				setStar(prevRate => prevRate + 1);
			} else if (key.downArrow && star > 1) {
				setStar(prevRate => prevRate - 1);
			}
		}
	});

	const onReivewSubmit = () => {
		postReview(userId, id, content, star);
		setReviewlist([
			...reviewlist,
			{
				userId: userId,
				content: content,
				star: star,
			},
		]);
		setContent('');
		setStar(5);
		setIsAddReview(false);
	};

	return (
		<>
			{!isAddReview ? (
				<>
					<ShopView data={data} reviewlist={reviewlist} />
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
							<Text>"starRate" : {star}</Text>
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

const ShopView = ({data, reviewlist}) => {
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
					<Text>"location" : "{data.location}",</Text>
				</Box>
				<Box>
					<Text>"storeUrl" : "{data.url}",</Text>
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
							<Text key={index}>
								{'  '}
								{'{'} "{item.name}" : {item.price} {'}'}
								{index !== array.length - 1 ? ',' : ''}
								<Newline />
							</Text>
						))}
						{']'},
					</Text>
				</Box>
				<Box>
					<Text>
						"starRate" : "{starRateString} ({data.averageStar})",
					</Text>
				</Box>
				{reviewlist.length > 0 ? (
					<Box flexDirection="column">
						<Box>
							<Text>"reviews" : {'['}</Text>
						</Box>
						<Box flexDirection="column">
							{reviewlist.map((item, index) => (
								<ReviewView
									key={index}
									writer={item.userId}
									content={item.content}
									starRate={item.star}
									isEnd={index !== reviewlist.length - 1}
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
