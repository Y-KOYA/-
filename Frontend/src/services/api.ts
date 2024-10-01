import axios from 'axios';

// トークン設定関数
export const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('authToken', token);
  } else {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('authToken');
  }
};

// 初期設定
const token = localStorage.getItem('authToken');
setAuthToken(token);

export default axios;
