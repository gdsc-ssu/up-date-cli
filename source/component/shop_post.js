import React, {useState} from 'react';
import {Text, Box, useInput, Newline} from 'ink';
import TextInput from 'ink-text-input';
import {debounce} from '../common/input.js';
import {fetchKakaoShops} from '../api/kakao.js';

const dayContainer = (isFocused, isSelected, day) => {
	var color = 'white';

	if (isSelected) {
		color = 'green';
	}
	if (isFocused) {
		color = 'yellow';
	}

	return (
		<Box>
			<Text color={color}>{day}</Text>
		</Box>
	);
};

const ShopPost = () => {
	const [inputStep, setInputStep] = useState(0); // 0: title, 1: openTime, 2: closeTime
	const [shopTitle, setShopTitle] = useState('');
	const [shopKakaoShops, setShopKakaoShops] = useState([]);
	const [selectedShopIndex, setSelectedShopIndex] = useState(0);

	const [openDayList, setOpenDayList] = useState([]); // 추가: 오픈 요일
	const [openDayIndex, setOpenDayIndex] = useState(0); // 추가: 오픈 요일 인덱스
	const dayList = ['월', '화', '수', '목', '금', '토', '일', '완료']; // 요일 리스트

	const [openTime, setOpenTime] = useState(''); // 추가: 오픈 시간
	const [closeTime, setCloseTime] = useState(''); // 추가: 마감 시간

	useInput((input, key) => {
		if (!key) return;

		if (inputStep == 0) {
			if (key.upArrow && selectedShopIndex > 0) {
				setSelectedShopIndex(selectedShopIndex => selectedShopIndex - 1);
			}
			if (key.downArrow && selectedShopIndex < shopKakaoShops.length - 1) {
				setSelectedShopIndex(selectedShopIndex => selectedShopIndex + 1);
			}
		}

		if (inputStep == 1) {
			if (key.tab) {
				if (openDayIndex == dayList.length - 1) {
					setOpenDayIndex(0);
				} else {
					setOpenDayIndex(openDayIndex => openDayIndex + 1);
				}
			}

			if (key.return) {
				// 완료 버튼 누르면 다음 단계로
				if (openDayIndex == dayList.length - 1) {
					// 마지막 텍스트는 "완료"임으로 삭제
					setOpenDayList(
						openDayList.filter(day => day != dayList[openDayIndex]),
					);
					setInputStep(prevInputStep => prevInputStep + 1);
				}

				// 오픈 요일 추가, 이미 추가된 요일이면 삭제
				if (openDayList.includes(dayList[openDayIndex])) {
					setOpenDayList(
						openDayList.filter(day => day != dayList[openDayIndex]),
					);
				} else {
					setOpenDayList([...openDayList, dayList[openDayIndex]]);
				}
			}

			return;
		}

		// 카카오 가게 데이터가 받아오기 전에 엔터 누르면 오류 발생
		try {
			if (key.return) {
				if (
					inputStep == 0 &&
					shopKakaoShops[selectedShopIndex].place_name == undefined
				) {
					return;
				}

				setInputStep(prevInputStep => prevInputStep + 1);
				if (inputStep == 2) {
					process.exit(0);
				}
			}
		} catch (error) {
			return;
		}
	});

	const debouncedSearch = async () => {
		if (!shopTitle.length) {
			setShopKakaoShops([]);
			return;
		}
		const response = await fetchKakaoShops(shopTitle);
		setShopKakaoShops(response.data['documents']);
		setSelectedShopIndex(0);
	};

	React.useEffect(() => {
		debouncedSearch();
	}, [shopTitle]);

	return (
		<>
			<Box flexDirection="column">
				<Box>
					<Text>title : </Text>
					{inputStep == 0 ? (
						<TextInput value={shopTitle} onChange={setShopTitle} />
					) : (
						<Text>{shopTitle}</Text>
					)}
				</Box>
				<Box flexDirection="column">
					{shopKakaoShops.map((shop, index) => (
						<Text
							key={index}
							color={index === selectedShopIndex ? 'green' : 'white'}
						>
							{index + 1}. {shop.place_name} ({shop.address_name})
							<Newline />
						</Text>
					))}
				</Box>
				{inputStep > 0 && (
					<Box flexDirection="column">
						<Text>
							location : {shopKakaoShops[selectedShopIndex].address_name}{' '}
							<Newline />
						</Text>
						<Box>
							<Text>openTime : </Text>
							{inputStep == 1 ? (
								<Box>
									<Box>
										{dayList.map((day, index) =>
											// isFocused, isSelected, day
											dayContainer(
												index === openDayIndex,
												openDayList.includes(index),
												day,
											),
										)}
									</Box>
								</Box>
							) : (
								<Text>{openDayList.join(', ')}</Text>
							)}
						</Box>
					</Box>
				)}
				{inputStep > 1 && (
					<Box>
						<Text>closeTime : </Text>
						{inputStep == 2 ? (
							<TextInput
								value={closeTime}
								onChange={value => setCloseTime(value)}
							/>
						) : (
							<Text>{closeTime}</Text>
						)}
					</Box>
				)}
			</Box>
		</>
	);
};

export default ShopPost;
