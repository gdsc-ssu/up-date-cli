import React, {useState} from 'react';
import {Text, Box, useInput, Newline} from 'ink';
import TextInput from 'ink-text-input';

const Login = ({Id, setId, setShow}) => {
	const [nextStepInfo, setNextStepInfo] = useState(false);
	const [Password, setPassword] = useState('');
	const [isSelected, setIsSelected] = useState(true);

	useInput((input, key) => {
		if (!key) return;

		if (key.return) {
			if (nextStepInfo) {
				if (Id === 'hoyeon' && Password == 'hello') {
					setShow(true);
				} else {
					process.exit(0); //아이디 비번이 틀릴경우 (임시)
				}
			}
			setNextStepInfo(true);
		} else if (input === 'c') {
			process.exit(0);
		}
	});
	//아이디 비번 받아서 서버랑 연결

	return (
		<Box marginY={1} flexDirection="column">
			<Box>
				<Text color="red">IDddfff: </Text>
				{nextStepInfo ? (
					<Text>{Id}</Text>
				) : (
					<TextInput value={Id} onChange={setId} />
				)}
			</Box>
			{nextStepInfo ? (
				<Box>
					<Text color="red">PASSWORD: </Text>
					<TextInput value={Password} onChange={setPassword} />
				</Box>
			) : (
				<Text>{Password}</Text>
			)}
		</Box>
	);
};

export default Login;
