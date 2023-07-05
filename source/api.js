import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.REACT_APP_API_KEY;

const api = axios.create({
	baseURL: 'https://api.themoviedb.org/3',
	headers: {'content-type': 'application/json'},
});

const TypeMoive = search =>
	api.get(`/movie/${search}`, {
		headers: {
			authorization: `Bearer ${API_KEY}`,
		},
	});

export {TypeMoive};
