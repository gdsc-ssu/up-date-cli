import React, {useState} from 'react';
import {Text, Box, Newline, Spacer} from 'ink';
import theme from '../Theme.js';
import TextInput from 'ink-text-input';
import EachShop from './EachShop.js';
import shoplist from '../examples/shoplist.js';

const ListShop = ({setType}) => {
	let first = 0;
	let last = 3;
	const [confirmCommand, setConfirmCommand] = useState('');
	const [shops, setShops] = useState(shoplist.slice(first, last));

	const loadMore = () => {
		setShops([...shops, ...shoplist.slice(first + 3, last + 3)]);
	};
	return (
		<Box marginY={1} flexDirection="column">
			<Text>{'['}</Text>
			<Box marginLeft={2} flexDirection="column">
				{shops.map((data, index, key) => (
					<EachShop data={data} key={key} isEnd={index === shops.length - 1} />
				))}
			</Box>
			<Text>{']'}</Text>
			<Box flexDirection="column">
				<Spacer />
				<Text color={'red'}>
					<Newline />
					Commands
				</Text>
				<Box>
					<Text color={'yellow'}>:q - quit</Text>
					<Text> / </Text>
					<Text color={'green'}>:lm - load more reviews</Text>
				</Box>
				<TextInput
					value={confirmCommand}
					onChange={setConfirmCommand}
					onSubmit={() => {
						if (confirmCommand == ':q') {
							//TODO : 저장하고 종료
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
	);
};

export default ListShop;
