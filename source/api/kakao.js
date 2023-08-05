import axios from 'axios';
import dotenv from 'dotenv';

export const fetchKakaoShops = query => {
	dotenv.config();

	const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}&size=3`;

	const API_KEY = process.env.KAKAO_API_KEY;

	return axios.get(url, {
		headers: {
			Authorization: `KakaoAK ${API_KEY}`,
		},
	});
};
