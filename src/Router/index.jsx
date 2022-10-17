import App from '../App.jsx'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import List from '../pages/List.jsx'
import Edit from '../pages/Edit.jsx'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'
import Means from '../pages/Means.jsx'

const BaseRouter = () =>(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App></App>}>
        <Route path='/list' element={<List></List>}></Route>
        <Route path='/edit' element={<Edit></Edit>}></Route>
        <Route path='/means' element={<Means></Means>}></Route>
      </Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/register' element={<Register></Register>}></Route>
    </Routes>
  </BrowserRouter>
)

export default BaseRouter