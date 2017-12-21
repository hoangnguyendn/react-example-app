import axios from 'axios';


const instance = new axios.create({
    baseURL: 'https://react-burger-7b5aa.firebaseio.com'
});


export default instance;