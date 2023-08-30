import React, {useState} from 'react';
import {Text, Box, useInput} from 'ink';
import TextInput from 'ink-text-input';
import theme from './Theme.js';

const Login = ({userId, setId, setShow}) => {
	const [nextStepInfo, setNextStepInfo] = useState(false);
	const [eMail, setEMail] = useState('');
	const [loginSuccess, setLoginSuccess] = useState(true);

	useInput((input, key) => {
		if (!key) return;

		if (key.return) {
			setShow(true);
			if (nextStepInfo) {
				if (userId === 'hoyeon' && eMail == 'hello') {
					setShow(true);
				} else {
					setId('');
					setEMail('');
					setLoginSuccess(false);
				}
			}

			setNextStepInfo(!nextStepInfo);
		} else if (input === 'c') {
			process.exit(0);
		}
	});

	return (
		<Box marginY={1} flexDirection="column">
			{loginSuccess ? '' : <Text color={theme.red}>ID or EMail is wrong</Text>}
			<Box>
				<Text color={theme.neonGreen}>ID: </Text>
				{nextStepInfo ? (
					<Text>{userId}</Text>
				) : (
					<TextInput value={userId} onChange={setId} />
				)}
			</Box>
			{nextStepInfo ? (
				<Box>
					<Text color={theme.neonGreen}>EMAIL: </Text>
					<TextInput value={eMail} onChange={setEMail} />
				</Box>
			) : (
				<Text>{eMail}</Text>
			)}
		</Box>
	);
};

export default Login;
