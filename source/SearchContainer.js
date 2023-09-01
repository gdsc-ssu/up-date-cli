import React, {useState} from 'react';
import {Box} from 'ink';
import Search from './Search.js';
import Output from './Output.js';
import StationDetailType from './StationDetailType.js';
import ShopDetail from './component/ShopDetail.js';
import ShopPost from './component/ShopPost.js';
import ListShop from './component/ListShop.js';

const SearchContainer = ({userId}) => {
	const [list, setlist] = useState([]);
	const [station, setStation] = useState(''); // 타이핑된 역의 이름
	const [id, setId] = useState(0);
	const [storeName, setStoreName] = useState('');
	const [type, setType] = useState('');
	const [shops, setShops] = useState([]);
	const [singleShop, setSingleShop] = useState({});

	return (
		<Box marginY={1} flexDirection="column">
			{
				id || storeName || type ? (
					''
				) : (
					<Output list={list} />
				) /* vi 창 들어기서 Id 값 다시 초기화 해줘야함.!*/
			}
			{/* {aaa ? <ShopDetail /> : ''} */}
			{station ? ( // 타이핑된 역의 이름이 없을 경우, 입력 창 유지, 입력했을시, 맛집, 액티비티, 선택창 나옴.
				<StationDetailType
					setType={setType}
					station={station}
					setShops={setShops}
					setlist={setlist}
					setStation={setStation}
				/>
			) : type ? (
				<ListShop shops={shops} setShops={setShops} setType={setType} />
			) : id ? (
				<ShopDetail
					id={id}
					setId={setId}
					userId={userId}
					singleShop={singleShop}
				/>
			) : storeName ? (
				<ShopPost userId={userId} setStoreName={setStoreName} />
			) : (
				<Search
					setlist={setlist}
					setStation={setStation}
					setId={setId}
					setStoreName={setStoreName}
					setSingleShop={setSingleShop}
				/>
			)}
		</Box>
	);
};

export default SearchContainer;
