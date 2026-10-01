const defaultApiUrl = process.env.NODE_ENV === 'production'
	? 'https://foodzy-backend.vercel.app'
	: 'http://localhost:5000';
const API_BASE_URL = (process.env.REACT_APP_API_URL || defaultApiUrl).replace(/\/$/, '');

export default API_BASE_URL;