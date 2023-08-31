import React, {useState} from 'react';
import {Text, Box, useInput} from 'ink';
import TextInput from 'ink-text-input';
import theme from './Theme.js';
import {getLoginCheck} from './api/remote.js';

const Login = ({userId, setId, setShow}) => {
	const [nextStepInfo, setNextStepInfo] = useState(false);
	const [eMail, setEMail] = useState('');
	const [loginSuccess, setLoginSuccess] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	useInput((input, key) => {
		if (!key) return;

		if (key.return) {
			if (nextStepInfo) {
				setIsLoading(true);
				setEMail('');
				let tempUserId = userId;

				getLoginCheck(userId, eMail).then(res => {
					if (res.data['statusCode'] == 200) {
						setShow(true);
						// 로그인 중 아이디 변경 방지
						setId(tempUserId);
					} else {
						setId('');
						setEMail('');
						setLoginSuccess(false);
						setIsLoading(false);
					}
				});
			}

			setNextStepInfo(!nextStepInfo);
		}

		if (key.escape) {
			process.exit();
		}
	});

	return (
		<Box marginY={1} flexDirection="column">
			{isLoading ? <Text>Loading...</Text> : ''}
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
