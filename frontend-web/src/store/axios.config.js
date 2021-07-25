import axios from 'axios';
import { CONFIG } from '../constants';

const instance = axios.create({
  baseURL: CONFIG.BASE_URL,
  ContentType: 'application/json'
});

// instance.interceptors.response.use(
//   function (response) {
//     if (response.data.code === 401) {
//       return Auth.removeAuthStore;
//     }
//     return response.data;
//   },
//   function (error) {
//     let textMess = '';

//     if (error.response) {
//       if (error.response.status === 500) {
//         textMess = (error.response.data && error.response.data.message) ? error.response.data.message : '500: 시스템 오류';
//       } else {
//         const { errors } = error.response.data;
//         textMess = (errors && errors.length) ? errors[Object.keys(errors)[0]][0] : error.response.data.message;
//       }

//     } else {
//       textMess = error.message;
//     }

//     return Promise.reject(textMess);
//   },
// );

export default instance;
