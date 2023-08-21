import React, {useState} from 'react';
import {Text, Box, useInput, Newline} from 'ink';
import TextInput from 'ink-text-input';
import {TypeMoive} from './api.js';
import data from './examples/location.js';
import theme from './Theme.js';

const Search = ({setlist, setStation, setId}) => {
	const [search, setSearch] = useState('');
	useInput((input, key) => {
		if (!key) return;

		if (key.return) {
			if (search === 'ls') {
				setlist(list => [...list, [data.location, search]]);
				setSearch('');
			}
			if (search.includes('cd ')) {
				let station = search.slice(3, search.length);
				setStation(station);
				setSearch('');
			}
			if (search.includes('vi ')) {
				let storeId = search.slice(3, search.length);
				setId(storeId); // 지금은 임시로 Id값을 저장하지만, 나중에 서버 구축이 되면, 여기서 api call 해서 가게 상세정보를 state값에 저장한다.
				setSearch('');
			}
			if (search === 'popular' || search === 'upcoming') {
				TypeMoive(search)
					.then(response => {
						setlist(list => [
							...list,
							[response.data.results.slice(0, 4), search],
						]);
					})
					.catch(error => {
						console.error(error);
					});
				setSearch('');
			}
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
