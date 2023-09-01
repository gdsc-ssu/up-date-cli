import axios from 'axios';

const UpdateAxios = axios.create({
	baseURL: 'https://3v0x65nkk8.execute-api.ap-northeast-2.amazonaws.com',
});

const getAllPlaceCheck = (page, station) =>
	UpdateAxios.get(`/place?page=${page}&order=STAR&store=&station=${station}`);

const getSinglePlaceCheck = placeId => UpdateAxios.get(`/place/${placeId}`);

const getReviewCheck = placeId =>
	UpdateAxios.get(`/review/place/${placeId}?page=1`);

const postShop = (
	userId,
	name,
	phoneNumber,
	location,
	start_at,
	end_at,
	latitude,
	longitude,
	url,
	menu,
) =>
	UpdateAxios.post(`/place/user/${userId}`, {
		name,
		phoneNumber,
		location,
		start_at,
		end_at,
		latitude,
		longitude,
		url,
		menu,
	});

const getLoginCheck = (userId, eMail) =>
	UpdateAxios.get(`/user/${userId}?email=${eMail}`);

const postRegister = (userId, eMail) =>
	UpdateAxios.post(`/user`, {
		id: userId,
		email: eMail,
	});

export {
	getAllPlaceCheck,
	getSinglePlaceCheck,
	postShop,
	getLoginCheck,
	postRegister,
	getReviewCheck,
};
