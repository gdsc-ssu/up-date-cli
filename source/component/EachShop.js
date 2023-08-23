import React from 'react';
import {Text, Box, Newline} from 'ink';

const EachShop = ({data, key}) => {
	return (
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
	);
};

export default EachShop;
