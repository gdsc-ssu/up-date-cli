import React from 'react';
import {Text, Box, useInput, Newline} from 'ink';
import theme from './Theme.js';

const SelectUserInfo = ({isSelected, setIsSelected, setSpaceStep}) => {
	useInput((input, key) => {
		if (!key) return;

		if (key.leftArrow) {
			setIsSelected(true);
		} else if (key.rightArrow) {
			setIsSelected(false);
		}

		if (key.return) {
			if (isSelected) {
				// login 페이지로 이동
				setSpaceStep('login');
			} else {
				// register 페이지로 이동
				setSpaceStep('register');
			}
		}
	});

	return (
		<Box flexDirection="column">
			<Text color={theme.neonGreen}>Select Menu</Text>
			<Newline />
			<Box width={18}>
				<Box width="50%">
					{isSelected ? (
						<Text color={theme.red}>Login</Text>
					) : (
						<Text color={theme.neonGreen}>Login</Text>
					)}
				</Box>
				{!isSelected ? (
					<Text color={theme.red}>Register</Text>
				) : (
					<Text color={theme.neonGreen}>Register</Text>
				)}
			</Box>
		</Box>
	);
};

export default SelectUserInfo;
