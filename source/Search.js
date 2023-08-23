import React, {useState} from 'react';
import {Text, Box, useInput} from 'ink';
import TextInput from 'ink-text-input';
import data from './examples/location.js';
import theme from './Theme.js';

const Search = ({setlist, setStation, setId, setStoreName}) => {
	const [search, setSearch] = useState('');
	const [isHelpOn, setIsHelpOn] = useState(false);
	useInput((input, key) => {
		if (!key) return;

		if (key.return) {
			if (search === 'ls') {
				setlist(list => [...list, [data.location, search]]);
				setSearch('');
				return;
			}
			if (search.startsWith('cd ')) {
				let station = search.slice(3, search.length);
				setlist(list => [...list, [[], search]]);
				setStation(station);
				setSearch('');
				return;
			}
			if (search.startsWith('vi ')) {
				let storeId = search.slice(3, search.length);
				setlist(list => [...list, [[], search]]);
				setId(storeId); // 지금은 임시로 Id값을 저장하지만, 나중에 서버 구축이 되면, 여기서 api call 해서 가게 상세정보를 state값에 저장한다.
				setSearch('');
				return;
			}
			if (search === 'mkdir') {
				setlist(list => [...list, [[], search]]);
				setStoreName(search);
				setSearch('');
				return;
			}
			if (search === 'help') {
				setIsHelpOn(isHelpOn => !isHelpOn);
				setSearch('');
				return;
			}
			if (search === 'exit') {
				process.exit(0);
			}
			setlist(list => [...list, [['command not found'], search]]);
			setSearch('');
		}
	});

	return (
		<Box marginY={1} flexDirection="column">
			{isHelpOn && (
				<Box flexDirection="column">
					<Text color={theme.commandFirst}>vi {'${shop_id}'} - 가게 찾기</Text>
					<Text color={theme.commandSecond}>
						cd {'${station_name}'} - 정류장 선택
					</Text>
					<Text color={theme.commandThird}>ls - 리스트 보기</Text>
					<Text color={theme.commandFourth}>exit - 종료</Text>
				</Box>
			)}
			<Box>
				<Text color={theme.neonGreen}>$ </Text>
				<TextInput value={search} onChange={setSearch} />
			</Box>
		</Box>
	);
};

export default Search;
