import axios from 'axios';

const UpdateAxios = axios.create({
	baseURL: 'https://3v0x65nkk8.execute-api.ap-northeast-2.amazonaws.com',
});

const getAllPlaceCheck = (page, station) =>
	UpdateAxios.get(`/place?page=${page}&order=STAR&store=&station=${station}`);

const getSinglePlaceCheck = placeId => UpdateAxios.get(`/place/${placeId}`);

const getReviewCheck = placeId =>
	UpdateAxios.get(`/review/place/${placeId}?page=1`);

export {getAllPlaceCheck, getSinglePlaceCheck, getReviewCheck};
