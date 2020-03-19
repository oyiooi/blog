import React, { Component } from 'react';
import './nav.scss'

const data = [
    {
        text: '首页',
        link: 'http://www.baidu.com'
    },{
        text: '博客',
        link: 'http://www.wode.com'
    },{
        text: '程序',
        link: 'http://www.code.com'
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

