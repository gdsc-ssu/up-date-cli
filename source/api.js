import axios from 'axios';

const api = axios.create({
	baseURL: 'https://api.realworld.io/api/articles',
	headers: {'content-type': 'application/json'},
});

const searchArticles = api.get(api, {
		headers: {
			accept: `application/json`
		},
	});

export {searchArticles};
