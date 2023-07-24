import React, {useState} from 'react';
import {Text, Box, useInput} from 'ink';
import TextInput from 'ink-text-input';

const Register = ({setIsSelected, setSpaceStep}) => {
	const [nextStepInfo, setNextStepInfo] = useState(0);
	const [Id, setId] = useState('');
	const [Password, setPassword] = useState('');
	const [girlfriend, setGirlfriend] = useState('');
	const [openMessage, setOpenMessage] = useState('');

	useInput((input, key) => {
		if (!key) return;

		if (key.return) {
			if (nextStepInfo === 2) {
				setSpaceStep('login');
				setIsSelected(true);
			}
			setNextStepInfo(nextStepInfo + 1);
		}
		if (nextStepInfo === 2) {
			if (input === 'y') {
				setOpenMessage('complete');
			} else {
				setOpenMessage('fail');
			}
		}
	});

	return (
		<Box marginY={1} flexDirection="column">
			<Box>
				<Text color="#00FF19">NEW ID: </Text>
				{nextStepInfo === 0 ? (
					<TextInput value={Id} onChange={setId} />
				) : (
					<Text>{Id}</Text>
				)}
			</Box>
			<Box>
				{nextStepInfo === 1 ? (
					<>
						<Text color="#00FF19">NEW PASSWORD: </Text>
						<TextInput value={Password} onChange={setPassword} />
					</>
				) : nextStepInfo === 2 ? (
					<>
						<Text color="#00FF19">NEW PASSWORD: </Text>
						<Text> {Password}</Text>
					</>
				) : (
					''
				)}
			</Box>
			{nextStepInfo === 2 ? (
				<Box>
					<Text color="#00FF19">Do you have a girlfriend? (y/n): </Text>
					<TextInput value={girlfriend} onChange={setGirlfriend} />
				</Box>
			) : (
				<Text>{girlfriend}</Text>
			)}
			{openMessage === 'complete' ? (
				<Text color="#FF0000">
					Sign up is complete. (Please press space to login.)
				</Text>
			) : openMessage === 'fail' ? (
				<Text color="#FF0000">Sign up is not possible.</Text>
			) : (
				''
			)}
		</Box>
	);
};

export default Register;
