import React from 'react'
import { Route , Routes} from 'react-router-dom'
import {Toaster } from 'react-hot-toast'


import HomePage from './HomePage'
import IDprintPage from './IDprint/IDprintPage'
import QRscan from './IDprint/QRscan'
import AttendanceEvent from './Register/AttendanceEvent'
import RegisterForm from './Register/RegisterForm'


import Test from './Test'

const App = () => {
  return (
    
    <div>
      <Routes>
        <Route path = '/' element={<HomePage/>}/>
        <Route path = '/printid' element = {<IDprintPage />} />
        <Route path = '/register' element = {<RegisterForm/>} />
        <Route path = '/attendance' element = {<AttendanceEvent/>} />
       
        
        <Route path = '/qrscan' element = {<QRscan/>} />
        {/* <Route path = '/test' element = {<Test/>} /> */}
    </Routes>
      
    <Toaster/>
      
      
    </div>
  )
}

export default App