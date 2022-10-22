import React,{useState,useEffect} from 'react'
import logoImg from '../assets/logo.png'
import { CaretDownOutlined } from '@ant-design/icons'
import { Dropdown, Menu, message } from 'antd'
import defaultAvatar from '../assets/defaultAvatar.png'
import {useNavigate} from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()
  const [avatar,setAvatar] = useState(defaultAvatar)
  const [username,setUsername] = useState('游客')

  const loginOut = ()=>{
    localStorage.clear()
    setTimeout(()=>{
      message.success('退出成功，正在返回登录页面')
      navigate('/login')
    },1500)
  }

  useEffect(()=>{
    let usernametmp = localStorage.getItem('username')
    let avatartmp = localStorage.getItem('avatar')
    if(usernametmp)
    {
      setUsername(usernametmp)
    }
    if(avatartmp)
    {
      setAvatar('http://47.93.114.103:6688/'+avatartmp)
    }
  },[])
  const menu = (
    // <Menu
    //   items={[
    //     {
    //       key: '1',
    //       label: (
    //         <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
    //           1st menu item
    //         </a>
    //       ),
    //     },
    //     {
    //       key: '2',
    //       label: (
    //         <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
    //         1st menu item
    //       </a>
    //       )
    //     }       
    //   ]}
    // />
    <Menu>
      <Menu.Item key={1}>修改资料</Menu.Item>
      <Menu.Divider></Menu.Divider>
      <Menu.Item key={2} onClick={loginOut}>退出登录</Menu.Item>
    </Menu>
  );

  return (
    <header>
    <img src={logoImg} alt="" className='logo' />
    <div className="right">
      <Dropdown overlay={menu}>
      <a onClick={(e) => e.preventDefault()}>
          <img src={defaultAvatar} alt="" className='avatar' />
          <span>{username}</span>
          <CaretDownOutlined /> 
      </a>
    </Dropdown>
    </div>
  </header>
  )
}
