import request from './request.js'

// 箭头函数必须的形式必须要牢记，我们的简写形式必须要考虑后面的花括号
// 注册接口
export const RequestApi = (params)=> request.post('/register',params)
//登录接口
export const LoginApi = (params) => request.post('/login', params)
//获取文章列表 注意get请求的形式 我们必须传入params的对象参数
export const AricleListApi = (params) => request.get('/article',{params})
// 添加文章
export const ArticleAddApi = (params)=> request.post('/article/add',params)
//查看文章
export const ArticleSearchApi = (params) =>request.get(`/article/${params.id}`)
//重新提交文章
export const ArticleUpdateApi = (params)=> request.put('/artcle/update',params)
//删除文章
export const ArticleDleteApi = (params) => request.post('/article/remove',params)
//获取用户资料
export const GetUserApi = () => request.get('/info')
//修改用户资料
export const ChangeUrlApi = (params)=>{return request.put('/info',params)}
