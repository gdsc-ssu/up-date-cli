import React, {useState} from 'react';
import {Box, Text, Newline} from 'ink';
import Login from './Login.js';
import Intro from './component/intro.js';
import SelectUserInfo from './SelectUserInfo.js';
import Register from './Register.js';
import Container from './Container.js';

const App = () => {
	const [show, setShow] = useState(false);
	const [spaceStep, setSpaceStep] = useState('');
	const [isSelected, setIsSelected] = useState(true);
	const [Id, setId] = useState('');

	return (
		<>
			<Intro />
			<Text>press "help" to see the list of commands</Text>
			{show ? (
				<Text color="white">Username : {Id}</Text>
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
					<Box flexDirection="column">
						<Container />
					</Box>
				)}
			</Box>
		</>
	);
};

export default App;
