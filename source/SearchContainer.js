import React, {useState} from 'react';
import {Box} from 'ink';
import Search from './Search.js';
import Output from './Output.js';
import StationDetailType from './StationDetailType.js';
import ShopDetail from './component/ShopDetail.js';
import ShopPost from './component/ShopPost.js';

const SearchContainer = () => {
	const [list, setlist] = useState([]);
	const [station, setStation] = useState(''); // 타이핑된 역의 이름
	const [Id, setId] = useState('');
	const [storeName, setStoreName] = useState('');
	return (
		<Box marginY={1} flexDirection="column">
			{
				Id || storeName ? (
					''
				) : (
					<Output list={list} />
				) /* vi 창 들어기서 Id 값 다시 초기화 해줘야함.!*/
			}
			{/* {aaa ? <ShopDetail /> : ''} */}
			{station ? ( // 타이핑된 역의 이름이 없을 경우, 입력 창 유지, 입력했을시, 맛집, 액티비티, 선택창 나옴.
				<StationDetailType
					station={station}
					setlist={setlist}
					setStation={setStation}
				/>
			) : Id ? (
				<ShopDetail Id={Id} setId={setId} /> // 여기로 ID(나중엔 상세정보) 보내고, vi 탈출할때, setId값 초기화하면, 다시 커맨드 입력 창 나옴.
			) : storeName ? (
				<ShopPost storeName={storeName} />
			) : (
				<Search
					setlist={setlist}
					setStation={setStation}
					setId={setId}
					setStoreName={setStoreName}
				/>
			)}
		</Box>
	);
};

export default SearchContainer;
