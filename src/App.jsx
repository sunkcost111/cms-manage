import React,{useState} from 'react'
import './assets/base.less'
import {Outlet} from 'react-router-dom'
import { Layout } from 'antd'
import Header from './components/Header.jsx'
import Aside from './components/Sider.jsx'
import Bread from './components/Bread.jsx'
import {connect} from 'react-redux'

function App(props) {
  const [myKey,setMyKey] = useState('')
  return (
    <Layout id='app'>
      <Header key={props.myKey}></Header>
      <div className='container'>
        <Aside/>       
          <div className='container_box'>
            <Bread/>
            <div className="container_content">
              <Outlet setMyKey={setMyKey}></Outlet>
            </div> 
          </div>
      </div>
      <footer>Footer</footer>
    </Layout>
  )
}

const mapStateToProps = (state)=>{
  return {
    myKey:state.myKey
  }

}
export default connect(mapStateToProps)(App)
