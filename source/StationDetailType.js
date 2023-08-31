import React, {useState} from 'react';
import {Text, Box, useInput, Newline} from 'ink';
import shoplist from './examples/shoplist.js';
import theme from './Theme.js';
import {getAllPlaceCheck} from './api/remote.js';

const StationDetailType = ({
	setType,
	station,
	setShops,
	setlist,
	setStation,
}) => {
	const [num, setNum] = useState(1);

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
				setlist(list => [...list, [[], `${station} 맛집`]]);
			} else if (num === 2) {
				setType('카페');
				setlist(list => [...list, [[], `${station} 카페`]]);
			} else if (num === 3) {
				setType('액티비티');
				setlist(list => [...list, [[], `${station} 액티비티`]]);
			} else if (num === 4) {
				setType('술집');
				setlist(list => [...list, [[], `${station} 술집`]]);
			}
			getAllPlaceCheck(1, station).then(res => {
				setShops(res.data.body); // shoplist.slice(first, last)
			});
			setStation('');
		}
	});
	return (
		<Box flexDirection="column">
			<Text color="#00FF19">&#60; {station} &#62;</Text>
			<Box marginY={1} flexDirection="column">
				<Text color={num == 1 ? theme.purple : theme.neonGreen}>1. 맛집</Text>
				<Text color={num == 2 ? theme.purple : theme.neonGreen}>2. 카페</Text>
				<Text color={num == 3 ? theme.purple : theme.neonGreen}>
					3. 액티비티
				</Text>
				<Text color={num == 4 ? theme.purple : theme.neonGreen}>4. 술집</Text>
			</Box>
		</Box>
	);
};

export default StationDetailType;
