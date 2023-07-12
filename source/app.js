import React, {useState} from 'react';
import {Box, Text, Newline} from 'ink';
import Login from './Login.js';
import Search from './Search.js';
import React, {useContext, useState} from 'react';
import {Box, Text, useInput} from 'ink';
import Intro from './intro.js';
import SelectUserInfo from './SelectUserInfo.js';
import Register from './Register.js';
import { StoreContext } from './store.js';

const App = () => {
	const [show, setShow] = useState(false);
	const [spaceStep, setSpaceStep] = useState('');
	const [isSelected, setIsSelected] = useState(true);
	const [Id, setId] = useState('');

	return (
		<>
			<Intro />
			<Text>
					press "help" to see the list of commands
				</Text>
			{show ? (
				<Text color="red">Username : {Id}</Text>
			) : (
				<SelectUserInfo
					isSelected={isSelected}
					setIsSelected={setIsSelected}
					setSpaceStep={setSpaceStep}
				/>
			)}
			<Box marginY={1}>
				{!show ? (
					spaceStep == 'login' ? (
						<Login setShow={setShow} Id={Id} setId={setId} />
					) : spaceStep == 'register' ? (
						<Register
							setIsSelected={setIsSelected}
							setSpaceStep={setSpaceStep}
						/>
					) : (
						''
					)
				) : (
					<Search />
				)}
			</Box>
		</>
	);
};

export default App;
