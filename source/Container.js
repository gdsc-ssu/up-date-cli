import React, {useState} from 'react';
import {Text, Box, useInput, Newline} from 'ink';
import TextInput from 'ink-text-input';
import Search from './Search.js';
import Output from './Output.js';

const Container = () => {
	const [list, setlist] = useState([]);
	return (
		<Box marginY={1} flexDirection="column">
			<Output list={list} />
			<Search setlist={setlist} />
		</Box>
	);
};

export default Container;
