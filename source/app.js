import React, {useState} from 'react';
import {Box, Text, Newline} from 'ink';
import UserInfo from './UserInfo.js';
import Search from './Search.js';
import Enquirer from 'enquirer';
import example from './api.js';

const App = () => {
	const [show, setShow] = useState(false);
	const [name, setName] = React.useState();

	React.useEffect(() => {
	  const enquirer = new Enquirer();
	  enquirer
		.prompt({
		  type: 'input',
		  name: 'username',
		  message: 'HTTP Answer : ' + example,
		})
		.then(answer => setName(answer.username));
	}, []);

	return (
		<>
			<Text>
			<Text>   __  __                __      __          ____  ____  ____      ____________________<Newline/></Text>
			<Text>  / / / /___        ____/ /___ _/ /____     / __ \/ __ \/ __ \    / / ____/ ____/_  __/<Newline/></Text>
			<Text> / / / / __ \______/ __  / __ `/ __/ _ \   / /_/ / /_/ / / / /_  / / __/ / /     / /   <Newline/></Text>
			<Text>/ /_/ / /_/ /_____/ /_/ / /_/ / /_/  __/  / ____/ _, _/ /_/ / /_/ / /___/ /___  / /    <Newline/></Text>
			<Text>\____/ .___/      \__,_/\__,_/\__/\___/  /_/   /_/ |_|\____/\____/_____/\____/ /_/     <Newline/></Text>
			<Text>    /_/                                                                                <Newline/></Text>
		</Text>
			<Box marginY={1}>
				{!show ? <UserInfo setShow={setShow} /> : <Search />}
			</Box>
		</>
	);
};

export default App;
