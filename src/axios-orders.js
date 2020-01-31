import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://react-burger-training-47864.firebaseio.com/'
});

export default instance;

