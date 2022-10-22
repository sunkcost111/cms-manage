import request from './request.js'

// ��ͷ�����������ʽ����Ҫ�μǣ����ǵļ�д��ʽ����Ҫ���Ǻ���Ļ�����
// ע��ӿ�
export const RequestApi = (params)=> request.post('/register',params)
//��¼�ӿ�
export const LoginApi = (params) => request.post('/login', params)
//��ȡ�����б� ע��get�������ʽ ���Ǳ��봫��params�Ķ������
export const AricleListApi = (params) => request.get('/article',{params})
// �������
export const ArticleAddApi = (params)=> request.post('/article/add',params)
//�鿴����
export const ArticleSearchApi = (params) =>request.get(`/article/${params.id}`)
//�����ύ����
export const ArticleUpdateApi = (params)=> request.put('/artcle/update',params)
//ɾ������
export const ArticleDleteApi = (params) => request.post('/article/remove',params)
//��ȡ�û�����
export const GetUserApi = () => request.get('/info')
//�޸��û�����
export const ChangeUrlApi = (params)=>{return request.put('/info',params)}
