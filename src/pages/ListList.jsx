import React,{useState,useEffect}from 'react'
import { Button, List,message,Pagination } from 'antd'
import {useNavigate} from 'react-router-dom'
import {AricleListApi,ArticleDleteApi} from '../request/api.js'
import '../pages/less/ListTable.less'
import moment from 'moment'

export default function ListList() {
  const navigate = useNavigate()
  const [list,setList] = useState([])
  const [total,setTotal] = useState(0)
  const [current,setCurrent] = useState(1)
  const [pageSize,setPageSize] = useState(10)

  const deleteArticle =(id)=>{
    console.log(id);
    ArticleDleteApi({id}).then((res)=>{
      if(res.errCode === 0)
      {
        message.success("成功删除")
      }
    })
  }
  const getList = (num)=>{
    AricleListApi({
      num,
      count:pageSize
    }).then(res => {
      if(res.errCode === 0)
      {
        let {num,total,count,arr} = res.data
        setList(arr)
        setTotal(total)
        setCurrent(num)
        setPageSize(count)
      }
    })
  }

  const onChange = (pages)=>{
    getList(pages)
  }
  useEffect(()=>{
    getList()
  })

  return (
    <div className='list_table' style={{padding:'20px'}}>
    <List
    itemLayout="horizontal"
    dataSource={list}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          title={<a href="#">{item.title}</a>}
          description="副标题"
        />
        <div style={{marginRight:'20px'}}>{moment(item.date).format("YYYY-MM-DD hh:mm:ss")}</div>
        <Button type='primary' style={{marginRight:'5px'}} onClick= {()=>{navigate('/edit/'+item.id)}}>编辑</Button>
        <Button type='danger' onClick={()=>{deleteArticle(item.id)}}>删除</Button>
      </List.Item>
    )}
  />
    <Pagination style={{float:'right',marginTop:'20px'}} onChange={onChange} total={total} current={current} pageSize={pageSize}></Pagination>
    </div>
  )
}
