import React, {useState} from 'react';
import {Text, Box, useInput, Newline} from 'ink';
import shoplist from './examples/shoplist.js';

const StationDetailType = ({station, setlist, setStation}) => {
	const [num, setNum] = useState(1);
	const [type, setType] = useState('');

	useInput((input, key) => {
		if (!key) return;

		if (key.downArrow) {
			if (num < 4) {
				setNum(num + 1);
			}
		} else if (key.upArrow) {
			if (num > 1) {
				setNum(num - 1);
			}
		}

		if (key.return) {
			if (num === 1) {
				setType('맛집');
				setlist(list => [...list, [shoplist, `${station} 맛집`]]);
				setStation('');
			} else if (num === 2) {
				setType('카페');
				setlist(list => [...list, [shoplist, `${station} 카페`]]);
				setStation('');
			} else if (num === 3) {
				setType('액티비티');
				setlist(list => [...list, [shoplist, `${station} 액티비티`]]);
				setStation('');
			} else if (num === 4) {
				setType('술집');
				setlist(list => [...list, [shoplist, `${station} 술집`]]);
				setStation('');
			}
		}
	});
	return (
		<Box flexDirection="column">
			<Text color="#00FF19">&#60; {station} &#62;</Text>
			<Box marginY={1} flexDirection="column">
				<Text color={num == 1 ? '#AD00FF' : '#00FF19'}>1. 맛집</Text>
				<Text color={num == 2 ? '#AD00FF' : '#00FF19'}>2. 카페</Text>
				<Text color={num == 3 ? '#AD00FF' : '#00FF19'}>3. 액티비티</Text>
				<Text color={num == 4 ? '#AD00FF' : '#00FF19'}>4. 술집</Text>
			</Box>
			{type ? <Text color="red"> ==&#62; {type}</Text> : ''}
		</Box>
	);
};

export default StationDetailType;
