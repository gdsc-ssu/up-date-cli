import React, {useState} from 'react';
import {Text, Box, useInput} from 'ink';
import TextInput from 'ink-text-input';
import data from './examples/location.js';
import theme from './Theme.js';

const Search = ({setlist, setStation, setId, setStoreName}) => {
	const [search, setSearch] = useState('');
	useInput((input, key) => {
		if (!key) return;

		if (key.return) {
			if (search === 'ls') {
				setlist(list => [...list, [data.location, search]]);
				setSearch('');
				return;
			}
			if (search.startsWith('cd ')) {
				let station = search.slice(3, search.length);
				setlist(list => [...list, [[], search]]);
				setStation(station);
				setSearch('');
				return;
			}
			if (search.startsWith('vi ')) {
				let storeId = search.slice(3, search.length);
				setlist(list => [...list, [[], search]]);
				setId(storeId); // 지금은 임시로 Id값을 저장하지만, 나중에 서버 구축이 되면, 여기서 api call 해서 가게 상세정보를 state값에 저장한다.
				setSearch('');
				return;
			}
			if (search === 'mkdir') {
				setlist(list => [...list, [[], search]]);
				setStoreName(search);
				setSearch('');
				return;
			}
				setSearch('');
			if (search === 'exit') {
				process.exit(0);
			}
			setlist(list => [...list, [['command not found'], search]]);
			setSearch('');
		}
	});

	return (
		<Box marginY={1} flexDirection="column">
			<Box>
				<Text color={theme.neonGreen}>$ </Text>
				<TextInput value={search} onChange={setSearch} />
			</Box>
		</Box>
	);
};

export default Search;
