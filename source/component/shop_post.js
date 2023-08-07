import React, {useState} from 'react';
import {Text, Box, useInput, Newline} from 'ink';
import TextInput from 'ink-text-input';
import {debounce} from '../common/input.js';
import {fetchKakaoShops} from '../api/kakao.js';

const dayContainer = (isFocused, isSelected, day, key) => {
	var color = 'white';

	if (isSelected) {
		color = 'green';
	}
	if (isFocused) {
		color = 'yellow';
	}

	return (
		<Box key={key}>
			<Text color={color}>{day}</Text>
		</Box>
	);
};

const ShopPost = () => {
	const [inputStep, setInputStep] = useState(0); // 0: title, 1: openTime, 2: closeTime
	const [shopTitle, setShopTitle] = useState('');
	const [kakaoShops, setKakaoShops] = useState([]);
	const [selectedShopIndex, setSelectedShopIndex] = useState(0);

	const [openDayList, setOpenDayList] = useState([]); // 추가: 오픈 요일
	const [openDayIndex, setOpenDayIndex] = useState(0); // 추가: 오픈 요일 인덱스
	const dayList = ['월', '화', '수', '목', '금', '토', '일', '']; // 요일 리스트

	const [openTime, setOpenTime] = useState('');
	const [openTimeHour, setOpenTimeHour] = useState(0);
	const [openTimeMinute, setOpenTimeMinute] = useState(0);

	const [closeTime, setCloseTime] = useState('');
	const [closeTimeHour, setCloseTimeHour] = useState(0);
	const [closeTimeMinute, setCloseTimeMinute] = useState(0);

	const [timeFocus, setTimeFocus] = useState(0); // 0 for hour, 1 for minute

	// menu
	const [menuList, setMenuList] = useState([]);
	const [menuName, setMenuName] = useState('');
	const [menuPrice, setMenuPrice] = useState(0);

	useInput((input, key) => {
		if (!key) return;

		if (inputStep == 0) {
			if (key.upArrow && selectedShopIndex > 0) {
				setSelectedShopIndex(selectedShopIndex => selectedShopIndex - 1);
			}
			if (key.downArrow && selectedShopIndex < kakaoShops.length - 1) {
				setSelectedShopIndex(selectedShopIndex => selectedShopIndex + 1);
			}
		}

		// 운영 요일 추가
		if (inputStep == 1) {
			if (key.tab) {
				if (openDayIndex == dayList.length - 1) {
					setOpenDayIndex(0);
				} else {
					setOpenDayIndex(openDayIndex => openDayIndex + 1);
				}
			}

			if (key.rightArrow) {
				if (openDayIndex == dayList.length - 1) {
					setOpenDayIndex(0);
				} else {
					setOpenDayIndex(openDayIndex => openDayIndex + 1);
				}
			}

			if (key.leftArrow) {
				if (openDayIndex == 0) {
					setOpenDayIndex(dayList.length - 1);
				} else {
					setOpenDayIndex(openDayIndex => openDayIndex - 1);
				}
			}

			if (key.return) {
				// 완료 버튼 누르면 다음 단계로
				if (openDayIndex == dayList.length - 1) {
					setInputStep(prevInputStep => prevInputStep + 1);
					return;
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

		// 2,3 (오픈, 마감 시간)은 입력으로 해결
		// 따라서 내부 로직은 없음

		if (inputStep == 4) {
			if (key.return) {
				addMenu();
			}
		}

		// 카카오 가게 데이터가 받아오기 전에 엔터 누르면 오류 발생
		try {
			if (key.return) {
				if (
					inputStep == 0 &&
					kakaoShops[selectedShopIndex].place_name == undefined
				) {
					return;
				}

				setInputStep(prevInputStep => prevInputStep + 1);

				if (inputStep == 4) {
					console.log('complete');
				}
			}
		} catch (error) {
			return;
		}
	});

	// 메뉴 추가
	const addMenu = () => {
		setMenuList([...menuList, {name: menuName, price: menuPrice}]);
		setMenuName(''); // 입력 필드 초기화
		setMenuPrice(0); // 입력 필드 초기화
	};

	// 메뉴 삭제
	const deleteMenu = index => {
		const newMenuList = [...menuList];
		newMenuList.splice(index, 1);
		setMenuList(newMenuList);
	};

	const searchKakaoShops = async () => {
		if (!shopTitle.length) {
			setKakaoShops([]);
			return;
		}
		const response = await fetchKakaoShops(shopTitle);
		setKakaoShops(response.data['documents']);
		setSelectedShopIndex(0);
	};

	React.useEffect(() => {
		searchKakaoShops();
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
					{kakaoShops.map((shop, index) => (
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
							location : {kakaoShops[selectedShopIndex].address_name}{' '}
							<Newline />
						</Text>
						<Box>
							<Text>openDay : </Text>
							{inputStep == 1 ? (
								<Box>
									{dayList.map((day, index) =>
										// isFocused, isSelected, day
										dayContainer(
											index === openDayIndex,
											openDayList.includes(dayList[index]),
											day,
											index,
										),
									)}
									<Text>
										<Newline />
										<Text
											color={
												openDayIndex === dayList.length - 1 ? 'yellow' : 'white'
											}
										>
											{' 완료'}
										</Text>
									</Text>
								</Box>
							) : (
								<Text>{openDayList.join(', ')}</Text>
							)}
						</Box>
					</Box>
				)}

				{/* 오픈 시간 */}
				{inputStep > 1 && (
					<Box>
						<Text>openTime : </Text>
						{inputStep == 2 ? (
							<Text>
								<TextInput
									value={openTime}
									onChange={value => {
										if (value.length <= 4) {
											setOpenTime(value);
											if (value.length === 4) {
												const hour = parseInt(value.substring(0, 2));
												const minute = parseInt(value.substring(2, 4));
												if (hour < 24 && minute < 60) {
													setOpenTimeHour(hour);
													setOpenTimeMinute(minute);
												} else {
													setOpenTime('0000');
												}
											}
										}
									}}
								/>
							</Text>
						) : (
							<Text>
								{openTimeHour.toString().padStart(2, '0')}:
								{openTimeMinute.toString().padStart(2, '0')}
							</Text>
						)}
					</Box>
				)}

				{/* 마감 시간 */}
				{inputStep > 2 && (
					<Box>
						<Text>closeTime : </Text>
						{inputStep == 3 ? (
							<Text>
								<TextInput
									value={closeTime}
									onChange={value => {
										if (value.length <= 4) {
											setCloseTime(value);
											if (value.length === 4) {
												const hour = parseInt(value.substring(0, 2));
												const minute = parseInt(value.substring(2, 4));
												if (hour < 24 && minute < 60) {
													setCloseTimeHour(hour);
													setCloseTimeMinute(minute);
												} else {
													setCloseTime('0000');
												}
											}
										}
									}}
								/>
							</Text>
						) : (
							<Text>
								{closeTimeHour.toString().padStart(2, '0')}:
								{closeTimeMinute.toString().padStart(2, '0')}
							</Text>
						)}
					</Box>
				)}
			</Box>
		</>
	);
};

export default ShopPost;
