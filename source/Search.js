import React, {useState} from 'react';
import {Text, Box, useInput, Newline} from 'ink';
import TextInput from 'ink-text-input';
import {TypeMoive} from './api.js';

const Search = () => {
	const [search, setSearch] = useState('');
	const [list, setList] = useState([]);
	const [errorMessage, setErrorMessage] = useState(false);

	useInput((input, key) => {
		if (!key) return;

		if (key.return) {
			if (search === 'popular' || search === 'upcoming') {
				setErrorMessage(false);
				TypeMoive(search).then(response => {
					setList(response.data.results.slice(0, 4));
				}).catch(error => {
					console.error(error);
				});
			} else {
				setErrorMessage(false);
				setErrorMessage(true);
			}
		}
	});

	return (
		<Box marginY={1} flexDirection="column">
			<Box>
				<Text color="green">search : </Text>
				<TextInput value={search} onChange={setSearch} />
			</Box>
			<Newline />
			{errorMessage ? <Text color="red">return!!</Text> : ''}
			<Box flexDirection="column">
				{list.map((item, key) => {
					return (
						<>
							<Text bold color="red" key={key}>
								{item.original_title}
							</Text>
							<Text>{item.overview}</Text>
							<Newline />
						</>
					);
				})}
			</Box>
		</Box>
	);
};

export default Search;
