import React from 'react';
import {Text, Box, Newline} from 'ink';

const SingleShop = ({starRateString, data}) => {
	return (
		<React.Fragment>
			<Text>{'{'}</Text>
			<Box marginLeft={2}>
				<Text>
					<Text>
						"id" : "{data.id}",
						<Newline />
					</Text>
					<Text>
						"name" : "{data.name}",
						<Newline />
					</Text>
					<Text marginLeft={2}>
						"location" : "{data.location}",
						<Newline />
					</Text>
					<Text marginLeft={2}>
						"location" : "{data.location}",
						<Newline />
					</Text>
					<Text>
						"phoneNumber" : "{data.phoneNumber}",
						<Newline />
					</Text>
					<Text>
						"storeUrl" : "{data.url}",
						<Newline />
					</Text>
					{/* <Text>
						"menu" : {'['}
						<Newline />
						{data.menu.map((item, index, array) => (
							<Text key={index}>
								{' '}
								{'{'} "{item.menuName}" : {item.menuPrice} {'}'}
								{index !== array.length - 1 ? ',' : ''}
								<Newline />
							</Text>
						))}
						{']'},
						<Newline />
					</Text> */}
					<Text>
						"starRate" : "{starRateString}({data.averageStar})",
						<Newline />
					</Text>
				</Text>
			</Box>
			<Text>{'}'}</Text>
		</React.Fragment>
	);
};

export default SingleShop;
