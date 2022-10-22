import React,{useState,useEffect} from 'react'
import { Button, Modal, PageHeader,Form, Input, message } from 'antd'
import moment from 'moment'
import {useParams,useNavigate,useLocation} from 'react-router-dom'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import {ArticleAddApi, ArticleSearchApi,ArticleUpdateApi} from '../request/api.js'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

export default function Edit() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editor, setEditor] = useState(null)  
  const [title,setTitle] = useState('')
  const [subTitle,setSubTitle] = useState('')
  const [html, setHtml] = useState('')
  const [form] = Form.useForm()
  const params = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const dealData = (err,msg)=>{
      if(err === 0)
      {
        message.success(msg)
        setTimeout(()=>{
          navigate('/listlist')
        },1500)
      }
      else
      {
        message.error(msg)
        //关闭对话框
      }
      setIsModalOpen(false)
  }

  const toolbarConfig = { }  
  const editorConfig = {                        
    placeholder: '请输入内容...',
}
const showModal = () => {
  setIsModalOpen(true);
}
const handleOk = () => {
  //关闭对话框
  //setIsModalOpen(false);
      form
        .validateFields()  //validateFields校验字段
        .then((values) => {
          //form.resetFields();  //重置
          let {title,subTitle} = values
          if(params.id)
          {
            //更新文章的请求
            ArticleUpdateApi({
              title,
              subTitle,
              id:params.id,
              content:html
            }).then(
              res => dealData(res.errCode,res.message)
            )
          }
          else
          {
            ArticleAddApi({
              title,
              subTitle,
              content:html
            }).then(
              res => dealData(res.errCode,res.message)
            )
          }
    })
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  }

  useEffect(()=>{
    setHtml('')
    setTitle('')
    setSubTitle('')
    if(params.id)
    {
      ArticleSearchApi({id:params.id}).then((res)=>{
        if(res.errCode === 0)
        {
          let {title,subTitle,content} = res.data
          setHtml(content)
          setTitle(title)
          setSubTitle(subTitle)
        }
      })
    }
  },[location.pathname])

  return (
    <div className="site-page-header-ghost-wrapper">
    <PageHeader
      ghost={false}
      onBack={params.id ? () => window.history.back() : null}
      title="文章编辑"
      subTitle={"当前日期" + moment(new Date()).format("YYYY-MM-DD")}
      extra={[
        <Button key="1" type="primary" onClick={showModal}>
          提交文章
        </Button>,
      ]}
      
    >
    </PageHeader>
    <Modal title="填写文章标题" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="提交" cancelText="取消">
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 20,
      }}
      // onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
      initialValues={{
        title,
        subTitle
      }}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[
          {
            required: true,
            message: '请填写标题',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="副标题"
        name="subTitle"
      >
        <Input />
      </Form.Item>
    </Form>
    </Modal>
    <>
      <div style={{ border: '1px solid #ccc', zIndex: 100}}>
          <Toolbar
              editor={editor}
              defaultConfig={toolbarConfig}
              mode="default"
              style={{ borderBottom: '1px solid #ccc',width:'100%',padding:'-10px' }}
          />
          <Editor
              defaultConfig={editorConfig}
              value={html}
              onCreated={setEditor}
              onChange={editor => setHtml(editor.getHtml())}
              mode="default"
              style={{ height: '500px', overflowY: 'hidden' }}
          />
      </div>
    </>

  </div>
  )
}
