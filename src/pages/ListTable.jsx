import React,{useEffect, useState} from 'react'
import { Space, Table, Button,message } from 'antd';
import "../pages/less/ListTable.less"
import {AricleListApi,ArticleDleteApi} from '../request/api.js'
import moment from 'moment'
import {useNavigate} from 'react-router-dom'

function Title(props){
  return (
    <div>
      <a  className='table_title' href={"http://codesohigh.com:8765/article/"+props.id} target="_blank" >{props.title}</a>
      <p style={{color:'#999'}}>{props.subTitle}</p>
    </div>
  )
}
//实现深拷贝
export default function ListTable() {
  const deleteArticle =(id)=>{
    console.log(id);
    ArticleDleteApi({id}).then((res)=>{
      if(res.errCode === 0)
      {
        message.success("成功删除")
      }
    })
  }
  const navigate = useNavigate()
  const [arr,setArr] = useState([
    {
      key: '1',
      name: 'John Brown',
      address: 'New York No. 1 Lake Park',
    },
  ])
  const [pagination,setPagination] = useState({
    current:1,
    pageSize:10,
    total:10
  })

  const pageChange = (arg)=>{
    getArticleList(arg.current,arg.pageSize)
  }

  const columns = [
    {
      dataIndex: 'myTitle',
      key: 'myTitle',
      width:'60%',
      render: (text) => (<div>{text}</div>)
    },
    {
      dataIndex: 'date',
      key: 'date',
      render:(text)=>(
        <>
        <p>{text}</p>
        </>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: text => (
        <Space size="middle">
          <Button type='primary' onClick={()=>{navigate(`/edit/${text.key}`)}}>编辑</Button>
          <Button type='danger' onClick={()=> {deleteArticle(text.key)}}>删除</Button>
        </Space>
      ),
    },
  ];

  const getArticleList = (current,pageSize)=>{
    AricleListApi({
      num:current,
      current:pageSize
    }).then((res)=>{
      if(res.errCode === 0)
      {
        let newArr = JSON.parse(JSON.stringify(res.data.arr))
        let {num,count,total} = res.data
        setPagination(
          {
            current:num,
            pageSize:count,
            total:total
          }
        )
        let myarr = []
        newArr.map((item)=>{
          // item.key = item.id
          // item.date = moment(item.date).format("YYYY-MM-DD hh:mm:ss")
          // item.myTitle = `
          //   <div>
          //     <Link  className='table_title' to='/'>${item.title}</Link>
          //     <p style={{color:'#999'}}>${item.subTitle}</p>
          //   </div>
          // `
          let obj = {
            key:item.id,
            data:moment(item.date).format("YYYY-MM-DD hh:mm:ss"),
            myTitle:<Title id={item.id} title={item.title} subTitle={item.subTitle}></Title>
          }
          myarr.push(obj)
        })
        setArr(myarr)
      }
    })
  }
  //请求文章列表
  useEffect(()=>{
    getArticleList(pagination.current,pagination.pageSize)
  })

  return (
    <div className='list_table'>
      <Table 
      showHeader={false} 
      columns={columns} 
      dataSource={arr}
      onChange={pageChange}
      pagination={pagination} />
    </div>
  )
}

