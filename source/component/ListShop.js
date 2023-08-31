import React, {useEffect, useState} from 'react';
import {Text, Box, Newline, Spacer} from 'ink';
import theme from '../Theme.js';
import TextInput from 'ink-text-input';
import EachShop from './EachShop.js';

const ListShop = ({shops, setShops, setType}) => {
	let first = 0;
	let last = 3;
	const [confirmCommand, setConfirmCommand] = useState('');
	const loadMore = () => {
		setShops([...shops, ...shoplist.slice(first + 3, last + 3)]);
	};

	return (
		<Box marginY={1} flexDirection="column">
			{shops.map((data, key) => (
				<EachShop data={data} key={key} />
			))}
			<Box flexDirection="column">
				<Spacer />
				<Text color={'red'}>
					<Newline />
					Commands
				</Text>
				<Box>
					<Text color={'yellow'}>:q - quit</Text>
					<Spacer />
					<Text color={'green'}>:lm - load more</Text>
					<Spacer />
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
