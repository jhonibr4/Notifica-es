import React from 'react'


import Login from './pages/Login/index'
import Home from './pages/Home/index'
import AddShops from './pages/addShops/index'
import PageGetCode from './pages/PageGetCode/index'



import { BrowserRouter, Route }  from 'react-router-dom'

export default function App(){
 

    return(
        <BrowserRouter>
            <Route exact path='/' component={Login}/>
            <Route path='/home' component={Home}/>
            <Route path='/addShops' component={AddShops}/>
            <Route path='/pagegetcode' component={PageGetCode}/>
        </BrowserRouter>
    )
}