import React from 'react';
import {Text, Newline, Box} from 'ink';

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
const ShopDetail = ({data}) => {
	const starRateRounded = Math.round(data.starRate);

	const starRateString = '⭐'.repeat(starRateRounded);

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
						<Newline />
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
