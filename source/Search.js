import React, {useState} from 'react';
import {Text, Box, useInput} from 'ink';
import TextInput from 'ink-text-input';
import data from './examples/location.js';
import theme from './Theme.js';
import {getSinglePlaceCheck, getReviewCheck} from './api/remote.js';

const Search = ({setlist, setStation, setId, setStoreName, setSingleShop}) => {
	const [search, setSearch] = useState('');
	const [isHelpOn, setIsHelpOn] = useState(false);
	const [previousCommand, setPreviousCommand] = useState('');

	const commandList = ['ls', 'cd', 'vi', 'mkdir', 'help', 'exit', 'clear'];

	function levenshtein(a, b) {
		const matrix = Array.from(Array(a.length + 1), () =>
			Array(b.length + 1).fill(0),
		);

		for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
		for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

		for (let i = 1; i <= a.length; i++) {
			for (let j = 1; j <= b.length; j++) {
				const cost = a[i - 1] === b[j - 1] ? 0 : 1;

				matrix[i][j] = Math.min(
					matrix[i - 1][j] + 1,
					matrix[i][j - 1] + 1,
					matrix[i - 1][j - 1] + cost,
				);
			}
		}

		return matrix[a.length][b.length];
	}

	function suggestCommand(input) {
		let closestCommand = '';
		let minDistance = Infinity;

		for (const command of commandList) {
			const distance = levenshtein(input, command);
			if (distance < minDistance) {
				minDistance = distance;
				closestCommand = command;
			}
		}

		if (minDistance <= 2) {
			return `Command not found. Did you mean "${closestCommand}"?`;
		}

		return 'Command not found.';
	}

	useInput((input, key) => {
		if (!key) return;

		if (key.return) {
			setPreviousCommand(search);
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
				// 지금은 임시로 Id값을 저장하지만, 나중에 서버 구축이 되면, 여기서 api call 해서 가게 상세정보를 state값에 저장한다.
				getSinglePlaceCheck(storeId).then(res => {
					setSingleShop(res.data.body);
					getReviewCheck(storeId).then(res => {
						setSingleShop(data => ({...data, reviews: res.data.body}));
						setId(storeId);
					});
				});
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
			if (search === '') {
				setlist(list => [...list, [[], search]]);
				return;
			}
			if (search === 'clear') {
				setlist([]);
				setSearch('');
				return;
			}
			const suggestion = suggestCommand(search);
			setlist(list => [...list, [[suggestion], search]]);
			setSearch('');
		}

		if (key.upArrow) {
			setSearch(previousCommand);
		}
	});

	return (
		<Box marginY={1} flexDirection="column">
			{isHelpOn && (
				<Box flexDirection="column">
					<Text color={theme.commandFirst}>ls - 정류장 리스트 보기</Text>
					<Text color={theme.commandSecond}>vi {'${shop_id}'} - 가게 찾기</Text>
					<Text color={theme.commandThird}>
						cd {'${station_name}'} - 정류장 선택
					</Text>
					<Text color={theme.commandFourth}>mkdir - 가게 등록</Text>
					<Text color={theme.commandFifth}>exit - 종료</Text>
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
