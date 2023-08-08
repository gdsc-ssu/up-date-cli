import React, {useState} from 'react';
import {Text, Box, useInput, Newline} from 'ink';
import TextInput from 'ink-text-input';
import {TypeMoive} from './api.js';
import data from './examples/location.js';

const Search = ({setlist}) => {
	const [search, setSearch] = useState('');

	useInput((input, key) => {
		if (!key) return;

		if (key.return) {
			if (search === 'ls') {
				setlist(list => [...list, [data.location, search]]);
				setSearch('');
			}
			if (search === 'popular' || search === 'upcoming') {
				TypeMoive(search)
					.then(response => {
						console.log(response.data.results.slice(0, 4));
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
				<Text color="#00FF19">$ </Text>
				<TextInput value={search} onChange={setSearch} />
			</Box>
		</Box>
	);
};

export default Search;
