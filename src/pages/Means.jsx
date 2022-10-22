import React, { useEffect, useState } from 'react'
import "../pages/less/Means.less"
import { Button,  Form, Input, message,Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {GetUserApi,ChangeUrlApi} from '../request/api.js'
import {connect} from 'react-redux'

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}


function Means(props) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [myName,setMyName] = useState("")
  const [mypassword,setMypassword] = useState("")

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );


  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('你只能上传jpg!');
    }
    const isLt200KB = file.size / 1024 / 1024 < 200;
    if (!isLt200KB) {
      message.error('请上传小于 200KB!');
    }
    return isJpgOrPng && isLt200KB;
  }
  const handleChange = (info) => {
   
    localStorage.setItem('avatar',info.file.name)
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
    props.addKey()
  }

useEffect(()=>{
  GetUserApi().then((res) =>{
    console.log(res)
    if(res.errCode === 0)
    {
      message.success('欢迎进入修改页面')
      setMyName(res.data.username)
      setMypassword(res.data.password)
      sessionStorage.setItem('username',res.data.username)
    }
  })
},[])

  const onFinish = (values) => {
    const {username,password} = values
    if(values.username && values.username!== sessionStorage.getItem('username' && values.password.trim()!==''))
    {
      ChangeUrlApi({
        username,
        password
      }).then((res)=>{
        if(res.errCode === 0)
        {

        }
      })
    }
  };

  return (
    <div className='means'>
      <Form
      style={{width:'400px'}}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues = {{
        username:myName,
        password:mypassword
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="修改用户名"
        name="username"
      >
        <Input placeholder='请输入用户名' />
      </Form.Item>

      <Form.Item
        label="修 改 密 码"
        name="password"
      >
        <Input.Password placeholder='请输入新密码' />
      </Form.Item>
        <Button type="primary" htmlType="submit" style={{float:'right'}}>
          提交
        </Button>
    </Form>
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="/api/upload"
      beforeUpload={beforeUpload}
      onChange={handleChange}
      headers={{"cms-token":localStorage.getItem('cms-token')}}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="avatar"
          style={{
            width: '100%',
          }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
    </div>
  )
}
const mapDispatchToProps =(dispatch) =>{
  return {
    addKey(){
      const action = {type:'AddKeyFn'}
      dispatch(action)
    }
  }
}

export default connect(null,mapDispatchToProps)(Means)