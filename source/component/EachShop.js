import React from 'react';
import {Text, Box, Newline} from 'ink';

const EachShop = ({data, key, isEnd}) => {
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
						"name" : "{data.name}",
						<Newline />
					</Text>
					<Text marginLeft={2}>
						"location" : "{data.location}",
						<Newline />
					</Text>
					<Text>
						"storeUrl" : "{data.url}",
						<Newline />
					</Text>
					<Text>
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
					</Text>

					<Text>
						"starRate" : "{data.averageStar}",
						<Newline />
					</Text>

				</Text>
			</Box>
			<Text>{isEnd ? '}' : '},'}</Text>
		</React.Fragment>
	);
};

export default EachShop;
