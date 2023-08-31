import React, {useEffect, useState} from 'react';
import {Text, Box, Newline, Spacer} from 'ink';
import theme from '../Theme.js';
import TextInput from 'ink-text-input';
import EachShop from './EachShop.js';
import shoplist from '../examples/shoplist.js';

const ListShop = ({shops, setShops, setType}) => {
	let first = 0;
	let last = 3;
	const [confirmCommand, setConfirmCommand] = useState('');
	const loadMore = () => {
		// if (shops)
		setShops([...shops, ...shoplist.slice(first + 3, last + 3)]);
	};

	return (
		<>
			<Box marginY={1} flexDirection="column">
				{shops.length === 0 ? (
					<Box flexDirection="column">
						<Text>Status code: 404</Text>
						<Text color={theme.red}>검색 결과가 없습니다.</Text>
					</Box>
				) : (
					<Box flexDirection="column">
						<Text>{'['}</Text>
						<Box marginLeft={2} flexDirection="column">
							{shops.map((data, index) => (
								<EachShop data={data} isEnd={index === shops.length - 1} />
							))}
						</Box>
						<Text>{']'}</Text>
					</Box>
				)}

				<Box flexDirection="column">
					<Spacer />
					<Text color={theme.red}>
						<Newline />
						Commands
					</Text>
					<Box>
						<Text color={theme.commandFirst}>:q - quit</Text>
						<Text> / </Text>
						<Text color={theme.commandSecond}>:lm - load more reviews</Text>
					</Box>
					<TextInput
						value={confirmCommand}
						onChange={setConfirmCommand}
						onSubmit={() => {
							if (confirmCommand == ':q') {
								setType('');
							} else if (confirmCommand == ':lm') {
								loadMore();
								setConfirmCommand('');
							} else {
								setConfirmCommand('');
							}
						}}
					/>
				</Box>
			</Box>
		</>
	);
};

export default ListShop;
