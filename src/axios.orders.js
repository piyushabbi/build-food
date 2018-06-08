import axios from 'axios';

// Create an axios instance
const instance = axios.create({
	baseURL: 'https://react-my-food.firebaseio.com/'
});

export default instance;
