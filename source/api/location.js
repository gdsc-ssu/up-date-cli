import axios from 'axios';

const searchLocation = axios.create({
	baseURL: 'https://api.themoviedb.org/3',
	headers: {'content-type': 'application/json'},
});

const TypeMoive = search =>
	api.get(`/movie/${search}`, {
		headers: {
			authorization: `Bearer ${API_KEY}`,
		},
	});
