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
				// register 페이지로 이동
				setSpaceStep('register');
			} else {
				// login 페이지로 이동
				setSpaceStep('login');
			}
		}
	});

	return (
		<Box width={23}>
			<Box width="50%">
				{isSelected ? (
					<Text backgroundColor="red" color="white">
						Register
					</Text>
				) : (
					<Text color="red">Register</Text>
				)}
			</Box>
			{!isSelected ? (
				<Text backgroundColor="red" color="white">
					Login
				</Text>
			) : (
				<Text color="red">Login</Text>
			)}
		</Box>
	);
};

export default SelectUserInfo;
