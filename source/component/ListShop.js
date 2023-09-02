import React, {useEffect, useState} from 'react';
import {Text, Box, Newline, Spacer} from 'ink';
import theme from '../Theme.js';
import TextInput from 'ink-text-input';
import EachShop from './EachShop.js';
import shoplist from '../examples/shoplist.js';

const ListShop = ({shops, setShops, setType}) => {
	const [confirmCommand, setConfirmCommand] = useState('');
	const [shop, setShop] = useState(shops.slice(0, 3));
	const [endMessage, setEndMessage] = useState(false);
	const loadMore = () => {
		setShop([...shop, ...shops.slice(shop.length, shop.length + 1)]);

		if (shops.length === shop.length) {
			setEndMessage(true);
		}
	};

	return (
		<>
			<Box marginY={1} flexDirection="column">
				{shop.length === 0 ? (
					<Box flexDirection="column">
						<Text>{'{'}</Text>
						<Text> "Status code": 404</Text>
						<Text> "Description": "검색 결과가 없습니다."</Text>
						<Text>{'{'}</Text>
					</Box>
				) : (
					<Box flexDirection="column">
						<Text>{'['}</Text>
						<Box marginLeft={2} flexDirection="column">
							{shop.length !== 0 ? (
								shop.map((data, index) => (
									<EachShop data={data} isEnd={index === shops.length - 1} />
								))
							) : (
								<Text>리스트가 없습니다.</Text>
							)}
						</Box>
						<Text>{']'}</Text>
					</Box>
				)}
				<Newline />
				<Text>{endMessage ? '더 이상 불러올 리스트가 없습니다' : ''}</Text>
				<Newline />
				<Box flexDirection="column">
					<Text color={theme.red}>
						<Newline />
						Commands
					</Text>
					<Box>
						<Text color={theme.commandFirst}>:q - quit</Text>
						<Text> / </Text>
						<Text color={theme.commandSecond}>:lm - load more store</Text>
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
