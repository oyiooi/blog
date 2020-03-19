import React, { Component } from 'react';
import Menu from './menu';
import Table from 'antd/es/table';
import 'antd/es/table/style/css';

const dataSource=[
    {
        title: 'zhege',
        name: 'zhangsna',
        content: 'zheshipinglun',
        key:'1'
    },
    {
        title: 'zhege',
        name: 'zhangsna',
        content: 'zheshipinglun',
        key:'2'
    },
    {
        title: 'zhege',
        name: 'zhangsna',
        content: 'zheshipinglun',
        key:'3'
    }
],columns=[
    {
        title:'Title',
        dataIndex: 'title',
        key: 'title'
    },{
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },{
        title: 'Comment',
        dataIndex: 'content',
        key: 'content'
    }
];

export default function CommentList(props) {
    const cata=props.cata

    return <div>
        {cata.map((item,index)=><Menu key={index} menuName={item}>
            <Table dataSource={dataSource} columns={columns}/>
        </Menu>)}
    </div>
}