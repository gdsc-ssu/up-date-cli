import React, {useState} from 'react';
import {Text, Box, useInput} from 'ink';
import TextInput from 'ink-text-input';
import theme from './Theme.js';
import {postRegister} from './api/remote.js';

const Register = ({setIsSelected, setSpaceStep}) => {
	const [nextStepInfo, setNextStepInfo] = useState(0);
	const [userId, setUserId] = useState('');
	const [eMail, setEMail] = useState('');
	const [girlfriend, setGirlfriend] = useState('');
	const [openMessage, setOpenMessage] = useState('');

	useInput((input, key) => {
		if (!key) return;

		if (key.return) {
			if (nextStepInfo === 2) {
				setSpaceStep('login');
				setIsSelected(true);
				postRegister(userId, eMail);
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
				<Text color={theme.neonGreen}>NEW ID: </Text>
				{nextStepInfo === 0 ? (
					<TextInput value={userId} onChange={setUserId} />
				) : (
					<Text>{userId}</Text>
				)}
			</Box>
			<Box>
				{nextStepInfo === 1 ? (
					<>
						<Text color={theme.neonGreen}>NEW EMAIL: </Text>
						<TextInput value={eMail} onChange={setEMail} />
					</>
				) : nextStepInfo === 2 ? (
					<>
						<Text color={theme.neonGreen}>NEW EMAIL: </Text>
						<Text> {eMail}</Text>
					</>
				) : (
					''
				)}
			</Box>
			{nextStepInfo === 2 ? (
				<Box>
					<Text color={theme.neonGreen}>Do you have a girlfriend? (y/n): </Text>
					<TextInput value={girlfriend} onChange={setGirlfriend} />
				</Box>
			) : (
				<Text>{girlfriend}</Text>
			)}
			{openMessage === 'complete' ? (
				<Text color={theme.red}>
					Sign up is complete. (Please press enter to login.)
				</Text>
			) : openMessage === 'fail' ? (
				<Text color={theme.red}>Sign up is not possible.</Text>
			) : (
				''
			)}
		</Box>
	);
};

export default Register;
