import axios from 'axios'

// ������
const axiosOption = {
    baseURL: '/api',
    timeout: 5000
}

// ����һ������
const instance = axios.create(axiosOption);

// �������������
instance.interceptors.request.use(function (config) {
  let token = localStorage.getItem("cms-token")
  if(token)
  {
    config.headers = {
      "cms-token":token
    }
  }
  return config;
}, function (error) {
  // �����������Щʲô
  return Promise.reject(error);
});

// �����Ӧ������
instance.interceptors.response.use(function (response) {
  // ����Ӧ��������ʲô
  return response.data;
}, function (error) {
  // ����Ӧ��������ʲô
  return Promise.reject(error);
});

export default instance;
