import React, {useState} from 'react';
import {Box, Text, Newline} from 'ink';
import UserInfo from './UserInfo.js';
import Search from './Search.js';
import Intro from './intro.js';

const App = () => {
	const [show, setShow] = useState(false);

	return (
		<>
			<Intro />
			<Box marginY={1}>
				{!show ? <UserInfo setShow={setShow} /> : <Search />}
			</Box>
		</>
	);
};

export default App;
