import React, {useState} from 'react';
import {Text, Box, useInput} from 'ink';

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
			<Text color="#00FF19">Select Menu</Text>
			<Newline />
			<Box width={18}>
				<Box width="50%">
					{isSelected ? (
						<Text color="#FF0000">Login</Text>
					) : (
						<Text color="#00FF19">Login</Text>
					)}
				</Box>
				{!isSelected ? (
					<Text color="#FF0000">Register</Text>
				) : (
					<Text color="#00FF19">Register</Text>
				)}
			</Box>
		</Box>
	);
};

export default SelectUserInfo;
