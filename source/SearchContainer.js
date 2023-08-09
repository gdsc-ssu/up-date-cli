import React, {useState} from 'react';
import {Text, Box, useInput, Newline} from 'ink';
import TextInput from 'ink-text-input';
import Search from './Search.js';
import Output from './Output.js';
import StationDetailType from './StationDetailType.js';

const SearchContainer = () => {
	const [list, setlist] = useState([]);
	const [station, setStation] = useState(''); // 타이핑된 역의 이름
	return (
		<Box marginY={1} flexDirection="column">
			<Output list={list} />
			{station ? ( // 타이핑된 역의 이름이 없을 경우, 입력 창 유지, 입력했을시, 맛집, 액티비티, 선택창 나옴.
				<StationDetailType station={station} />
			) : (
				<Search setlist={setlist} setStation={setStation} />
			)}
		</Box>
	);
};

export default SearchContainer;
