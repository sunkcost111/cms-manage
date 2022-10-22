import React from 'react'
import './less/Login.less'
import logoImg from '../assets/logo.png'
import { Button, Form, Input, message } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import {RequestApi} from '../request/api.js'
import {Link, useNavigate} from 'react-router-dom'
export default function Register() {
  const navigate = useNavigate()

  const onFinish = (values) => {
    console.log('Success:', values);
    RequestApi({
      username:values.username,
      password:values.password
    }).then((res) => { 
      if(res.errCode === 0 )
      {
        message.success('注册成功');
        setTimeout(()=>{
          navigate('/login')
        },1500)
      }
      else
      {
        message.error('该用户已存在');
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
              message: '请输入用户名',
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
              message: '请输入密码',
            },
          ]}
        >
          <Input.Password   
          size='large'
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="请输入密码"/>
        </Form.Item>

        <Form.Item
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '请再次输入密码',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('请输入相同密码'));
            },
          }),
        ]}
      >
        <Input.Password 
        size='large'
        prefix={<LockOutlined className="site-form-item-icon" />}
        placeholder="请再次输入密码"
        />
      </Form.Item>

        <Form.Item>
          <Link to="/register">还没账号,立即注册</Link>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block size='large'>
            立即注册
          </Button>
        </Form.Item>
      </Form>
    </div>
    </div>
  )
}
