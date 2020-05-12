import React, { Component } from 'react';
import './nav.scss'

const data = [
    {
        text: '首页',
        link: '49.235.72.75'
    },{
        text: '博客',
        link: '49.235.72.75/index'
    },{
        text: '登录',
        link: '49.235.72.75/login'
    }
]

const Nav = (props)=>{
    const { layout } = props;

    return <div className={layout} id='navid'>
        {data.map((item,index)=>
            <a href={item.link} key={index}>{item.text}</a>
        )}
    </div>
}

export default Nav

