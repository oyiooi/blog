import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Login from './component/login';
import './style/login.scss';

const App = ()=>{
    return <div className='allContainer'>
        <div className='bg left'></div>
        <div className='bg right'></div>
        <Login url={'http://localhost:8000/login'}/>
    </div>
}

ReactDOM.render(<App />,document.getElementById('root'))
