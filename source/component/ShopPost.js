import React, {useState} from 'react';
import {Text, Box, useInput, Newline, Spacer} from 'ink';
import TextInput from 'ink-text-input';
import {fetchKakaoShops} from '../api/kakao.js';
import {postShop} from '../api/remote.js';

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

const editContainer = (isFocused, text, key) => {
	var color = 'white';

	if (isFocused) {
		color = 'yellow';
	}

	return (
		<Box key={key}>
			<Text color={color}>{text} </Text>
		</Box>
	);
};
/**
 * @param {string} category
 * @returns {void}
 * @description
 * 카테고리에 따라 카카오 API를 호출하여 가게 리스트를 가져온다.
 * 카테고리는 cafe, restaurant로 구분된다.
 * 이외의 카테고리나 넣지 않으면 모든 카테고리에서 검색한다.
 */
const ShopPost = ({userId, category, setStoreName}) => {
	const [lastKeyPress, setLastKeyPress] = useState(null);

	const [inputStep, setInputStep] = useState(0); // 0: title, 1: openTime, 2: closeTime
	const [shopTitle, setShopTitle] = useState('');
	const [kakaoShops, setKakaoShops] = useState([]);
	const [selectedShopIndex, setSelectedShopIndex] = useState(0);

	const [openDayList, setOpenDayList] = useState([]); // 추가: 오픈 요일
	const [openDayIndex, setOpenDayIndex] = useState(0); // 추가: 오픈 요일 인덱스
	const dayList = ['월', '화', '수', '목', '금', '토', '일', '']; // 요일 리스트

	const [openTimeHour, setOpenTimeHour] = useState(0);
	const [openTimeMinute, setOpenTimeMinute] = useState(0);

	const [closeTimeHour, setCloseTimeHour] = useState(0);
	const [closeTimeMinute, setCloseTimeMinute] = useState(0);

	const [focus, setFocus] = useState(0); // 0 for hour, 1 for minute

	// menu
	const [menuList, setMenuList] = useState([]);
	const [menuName, setMenuName] = useState('');
	const [menuPrice, setMenuPrice] = useState(0);

	const [confirmCommand, setConfirmCommand] = useState(''); // 입력 확인
	const [isEdit, setIsEdit] = useState(false); // 입력 수정
	const editList = ['title', 'openDay', 'openTime', 'closeTime', 'menu', '']; // 수정 가능한 목록

	//Kakao map api data
	const [phoneNumber, setPhoneNumber] = useState('');
	const [latitude, setLatitude] = useState(0);
	const [longitude, setLongitude] = useState(0);
	const [placeUrl, setPlaceUrl] = useState('');

	useInput((input, key) => {
		if (!key) return;
		setLastKeyPress(key.name);

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

		// 시작 시간
		if (inputStep == 2) {
			if (key.tab || key.rightArrow) {
				setFocus((focus + 1) % 2);
			}
			if (key.leftArrow) {
				setFocus((focus - 1 + 2) % 2);
			}
			if (key.upArrow) {
				if (focus == 0) {
					// hour
					setOpenTimeHour((openTimeHour + 1) % 24);
				} else {
					// minute
					setOpenTimeMinute((openTimeMinute + 15) % 60);
				}
			}
			if (key.downArrow) {
				if (focus == 0) {
					// hour
					setOpenTimeHour((openTimeHour - 1 + 24) % 24);
				} else {
					// minute
					setOpenTimeMinute((openTimeMinute - 15 + 60) % 60);
				}
			}
		}
		// 종료 시간
		if (inputStep == 3) {
			if (key.tab || key.rightArrow) {
				setFocus((focus + 1) % 2);
			}
			if (key.leftArrow) {
				setFocus((focus - 1 + 2) % 2);
			}
			if (key.upArrow) {
				if (focus == 0) {
					// hour
					setCloseTimeHour((closeTimeHour + 1) % 24);
				} else {
					// minute
					setCloseTimeMinute((closeTimeMinute + 15) % 60);
				}
			}
			if (key.downArrow) {
				if (focus == 0) {
					// hour
					setCloseTimeHour((closeTimeHour - 1 + 24) % 24);
				} else {
					// minute
					setCloseTimeMinute((closeTimeMinute - 15 + 60) % 60);
				}
			}
		}

		if (inputStep == 4) {
			if (key.tab || key.rightArrow) {
				setFocus((focus + 1) % 2);
			}
			if (key.leftArrow) {
				setFocus((focus - 1 + 2) % 2);
			}

			if (key.return) {
				if (
					lastKeyPress === 'return' ||
					menuName.length == 0 ||
					menuPrice == 0
				) {
					setInputStep(prevInputStep => prevInputStep + 1);
					setLastKeyPress(null); // reset the last key press
					return;
				} else {
					addMenu();
					return;
				}
			}
		}

		// step 5는 입력 확인

		// 수정 할 때, 숫자로 입력 수정 위치 변경
		if (inputStep >= 6) {
			if (isEdit) {
				if (key.tab || key.rightArrow) {
					setFocus((focus + 1) % 6);
				}
				if (key.leftArrow) {
					setFocus((focus - 1 + 6) % 6);
				}

				if (key.return) {
					if (focus == 5) {
						setInputStep(5);
					} else {
						setInputStep(focus - 1);
					}

					setIsEdit(false);
					setFocus(0);
				}
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
				setFocus(0);

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
		setFocus(0); // 포커스 초기화
	};

	const searchKakaoShops = async () => {
		if (!shopTitle.length) {
			setKakaoShops([]);
			return;
		}
		const response = await fetchKakaoShops(shopTitle, category);
		setKakaoShops(response.data['documents']);
		setLatitude(response.data['documents'][0].y);
		setLongitude(response.data['documents'][0].x);
		setPhoneNumber(response.data['documents'][0].phone);
		setPlaceUrl(response.data['documents'][0].place_url);
		setSelectedShopIndex(0);
	};

	React.useEffect(() => {
		searchKakaoShops();
	}, [shopTitle]);

	return (
		<>
			<Text>{'{'}</Text>
			<Box flexDirection="column" marginLeft={2}>
				<Box>
					<Text>"title" : </Text>
					{inputStep == 0 ? (
						<TextInput value={shopTitle} onChange={setShopTitle} />
					) : (
						<Text>"{shopTitle}"</Text>
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
							"location" : "{kakaoShops[selectedShopIndex].address_name}"
						</Text>
						<Box>
							<Text>"openDay" : </Text>
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
									<Text
										color={
											openDayIndex === dayList.length - 1 ? 'yellow' : 'white'
										}
									>
										{' 완료'}
									</Text>
								</Box>
							) : (
								<Text>"{openDayList.join(', ')}"</Text>
							)}
						</Box>
					</Box>
				)}

				{/* 오픈 시간 */}
				{inputStep > 1 && (
					<Box>
						<Text>"openTime" : </Text>
						{inputStep == 2 ? (
							<Text>
								"
								<Text color={focus == 0 ? 'yellow' : 'white'}>
									{openTimeHour.toString().padStart(2, '0')}
								</Text>
								:
								<Text color={focus == 1 ? 'yellow' : 'white'}>
									{openTimeMinute.toString().padStart(2, '0')}
								</Text>
								"
							</Text>
						) : (
							<Text>
								"{openTimeHour.toString().padStart(2, '0')}:
								{openTimeMinute.toString().padStart(2, '0')}"
							</Text>
						)}
					</Box>
				)}

				{/* 마감 시간 */}
				{inputStep > 2 && (
					<Box>
						<Text>"closeTime" : </Text>
						{inputStep == 3 ? (
							<Text>
								"
								<Text color={focus == 0 ? 'yellow' : 'white'}>
									{closeTimeHour.toString().padStart(2, '0')}
								</Text>
								:
								<Text color={focus == 1 ? 'yellow' : 'white'}>
									{closeTimeMinute.toString().padStart(2, '0')}
								</Text>
								"
							</Text>
						) : (
							<Text>
								"{closeTimeHour.toString().padStart(2, '0')}:
								{closeTimeMinute.toString().padStart(2, '0')}"
							</Text>
						)}
					</Box>
				)}

				{/* 메뉴 */}
				{inputStep > 3 && (
					<Box flexDirection="column">
						<Text>"menu" : {'['}</Text>
						{inputStep == 4 ? (
							<Box flexDirection="column" marginLeft={2}>
								{menuList.map((menu, index) => (
									<Box key={index}>
										<Text>
											{'{'}"menuName" : "{menu.name}", "menuPrice" :{' '}
											{menu.price}
											{index == menuList.length ? '}' : '},'}
										</Text>
									</Box>
								))}
								<Box>
									<Text>{'{'}"menuName" : "</Text>
									<TextInput
										value={menuName}
										onChange={setMenuName}
										focus={focus == 0}
									/>
									<Text>", "menuPrice" : </Text>
									<TextInput
										value={menuPrice.toString()}
										onChange={value => setMenuPrice(parseInt(value) || 0)}
										focus={focus == 1}
									/>
									<Text>{'}'}</Text>
								</Box>
							</Box>
						) : (
							//TODO : 수정 컴포넌트 새로 빼기
							<Box flexDirection="column" marginLeft={2}>
								{menuList.map((menu, index) => (
									<Box key={index}>
										<Text>
											{'{'}"menuName" : "{menu.name}", "menuPrice" :{' '}
											{menu.price}
											{index == menuList.length - 1 && menuList.length > 1
												? '}'
												: '},'}
										</Text>
									</Box>
								))}
							</Box>
						)}
						<Text>{']'}</Text>
					</Box>
				)}
			</Box>
			<Text>{'}'}</Text>

			{/* 입력 확인 */}
			{inputStep > 4 && (
				<Box flexDirection="column">
					<Spacer />
					<Text color={'red'}>
						<Newline />
						Commands
					</Text>
					<Box>
						<Text color={'yellow'}>:wq - save and quit</Text>
						<Text> / </Text>
						<Text color={'green'}>:q! - force quit</Text>
						<Text> / </Text>
						<Text color={'blue'}>:e - edit input </Text>
					</Box>

					{!isEdit ? (
						<TextInput
							value={confirmCommand}
							onChange={setConfirmCommand}
							focus={!isEdit}
							onSubmit={() => {
								if (confirmCommand == ':wq') {
									postShop(
										userId,
										shopTitle,
										phoneNumber,
										kakaoShops[selectedShopIndex].address_name,
										`${openTimeHour
											.toString()
											.padStart(2, '0')}:${openTimeMinute
											.toString()
											.padStart(2, '0')}`,
										`${closeTimeHour
											.toString()
											.padStart(2, '0')}:${closeTimeMinute
											.toString()
											.padStart(2, '0')}`,
										latitude,
										longitude,
										placeUrl,
										menuList,
									);
									setStoreName('');
								} else if (confirmCommand == ':q!') {
									setStoreName('');
								} else if (confirmCommand == ':e') {
									setIsEdit(true);
									console.log(inputStep);
								} else {
									setConfirmCommand('');
								}
							}}
						/>
					) : (
						<Text>{confirmCommand}</Text>
					)}

					{isEdit && (
						<Box>
							{editList.map((edit, index) =>
								editContainer(index === focus, edit, index),
							)}
							<Text color={focus === editList.length - 1 ? 'yellow' : 'white'}>
								{'취소'}
							</Text>
						</Box>
					)}
				</Box>
			)}
		</>
	);
};

export default ShopPost;
