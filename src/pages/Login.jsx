import React from 'react'
import './less/Login.less'
import {LoginApi} from '../request/api.js'
import logoImg from '../assets/logo.png'
import { Button, Form, Input, message } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import {Link,useNavigate} from 'react-router-dom'
export default function Login() {
  const navigate = useNavigate()
  const onFinish = (values) => {
    console.log('Success:', values);
    LoginApi({
      username:values.username,
      password:values.password
    }).then((res)=>{
      console.log(res);
      if(res.errCode === 0)
      {
        message.success('成功登录')
        localStorage.setItem('avatar',res.data.avatar)
        localStorage.setItem('cms-token',res.data['cms-token'])
        localStorage.setItem('editable',res.data.editable)
        localStorage.setItem('player',res.data.player)  
        localStorage.setItem('username',res.data.username)

        setTimeout(()=>{
          navigate('/')
        },1500)
      }
      else{
        message.warn('账户或密码错误')
      }
    })
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login">
      <div className='login_box'>
        <img src={logoImg} alt="点击登录" />
        <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input 
          size='large'
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password   
          size='large'
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="请输入密码"/>
        </Form.Item>

        <Form.Item>
          <Link to="/register">还没账号,立即注册</Link>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block size='large'>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
    </div>
  )
}
