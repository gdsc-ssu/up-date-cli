import React, {useState} from 'react';
import {Text, Box, useInput, Newline} from 'ink';
import TextInput from 'ink-text-input';
import {TypeMoive} from './api.js';
import data from './examples/location.js';

const Search = () => {
	const [search, setSearch] = useState('');
	const [list, setList] = useState([]);
	const [errorMessage, setErrorMessage] = useState(false);
	const [output, setOutput] = useState(false);

	const [structureCount, setStructureCount] = useState(1);

	const renderStructures = () => {
		const structures = [];
		for (let i = 0; i < structureCount; i++) {
			if (i !== 0) {
				structures.push(
					<Box key={i}>
						<Text color="#00FF19">$ </Text>
					</Box>,
				);
			}
		}
		structures.push(
			<Box key={structureCount}>
				<Text color="#00FF19">$ </Text>
				<TextInput value={search} onChange={setSearch} />
			</Box>,
		);
		return structures;
	};

	useInput((input, key) => {
		if (!key) return;

		if (key.return) {
			if (search === 'ls') {
				setOutput(true);
				setStructureCount(0);
				setSearch('');
			}
			if (search === 'popular' || search === 'upcoming') {
				setErrorMessage(false);
				TypeMoive(search)
					.then(response => {
						setList(response.data.results.slice(0, 4));
					})
					.catch(error => {
						console.error(error);
					});
				setStructureCount(0);
				setSearch('');
			} else {
				// setErrorMessage(false);
				// setErrorMessage(true);
				setStructureCount(prevCount => prevCount + 1);
			}
		}
	});

	return (
		<Box marginY={1} flexDirection="column">
			{output
				? data.location.map(item => {
						return (
							<>
								<Text color="#00FF19">{item}</Text>
								<Newline />
							</>
						);
				  })
				: ''}
			{/* {errorMessage ? <Text color="red">return!!</Text> : ''} */}
			<Box flexDirection="column">
				{list.map((item, key) => {
					return (
						<>
							<Text bold color="#00FF19" key={key}>
								{item.original_title}
							</Text>
							<Text>{item.overview}</Text>
							<Newline />
						</>
					);
				})}
			</Box>
			{renderStructures()}
		</Box>
	);
};

export default Search;
