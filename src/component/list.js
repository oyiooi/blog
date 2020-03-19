import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const List = (props)=>{

    return <ul>
        {
            props.data.map((value,index)=><li key={index}>
                <h3><Link>{value.title}</Link></h3>
                <p>{value.content}</p>
                <span>{value.date}</span>
                <span>{value.readCount}</span>
            </li>)
        }
    </ul>
}

List.defaultProps={
    data:[{title: '标题',
    content: '这是内容文字写一些东西填一填',
    readCount: 100,
    date: '2010-10-10'}]
}

export default List