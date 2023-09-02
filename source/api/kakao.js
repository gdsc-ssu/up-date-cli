import axios from 'axios';
import dotenv from 'dotenv';

export const fetchKakaoShops = (query, category) => {
	dotenv.config();

	// const API_KEY = process.env.KAKAO_API_KEY;
	const API_KEY = "abf86987c958ad34e9313ed7e91008c5";
	
	const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}&size=3`;

	if (category == 'cafe') {
		return axios.get(url + '&category_group_code=CE7', {
			headers: {
				Authorization: `KakaoAK ${API_KEY}`,
			},
		});
	}

	if (category == 'restaurant') {
		return axios.get(url + '&category_group_code=FD6', {
			headers: {
				Authorization: `KakaoAK ${API_KEY}`,
			},
		});
	}

	return axios.get(url, {
		headers: {
			Authorization: `KakaoAK ${API_KEY}`,
		},
	});
};
