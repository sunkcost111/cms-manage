import React,{useEffect,useState} from 'react'
import { DiffOutlined, EditOutlined, CopyOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import {useNavigate,useLocation} from 'react-router-dom'

export default function Sider() {
  const [defaultKey,setDefaultKey] = useState('')
  const navigate = useNavigate()  
  const location = useLocation()
  
  useEffect(()=>{
    let key = location.pathname.split('/')[1]
    setDefaultKey(key)
  },[location.pathname])

  const onClick = (e)=>{
    console.log('click',e.key)
    navigate('/'+e.key)
  }
  return (
    <Menu
      onClick={onClick}
      style={{ width: 200 }}
      selectedKeys={[defaultKey]}
      mode="inline"
      theme='dark'
      className='aside'
    >
      <Menu.Item key="listlist"><DiffOutlined /> 查看文章列表list</Menu.Item>
      <Menu.Item key="listtable"><DiffOutlined /> 查看文章列表table</Menu.Item>
      <Menu.Item key="edit"><EditOutlined /> 文章编辑</Menu.Item>
      <Menu.Item key="means"><CopyOutlined /> 修改资料</Menu.Item>

    </Menu>
  )
}
