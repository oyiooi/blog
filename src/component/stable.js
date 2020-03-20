import React, { Component } from 'react';
import Table from 'antd/es/table';
import Divider from 'antd/es/divider';
import Tag from 'antd/es/tag';
import Modal from 'antd/es/modal';
import 'antd/es/table/style/css';
import 'antd/es/divider/style/css';
import 'antd/es/tag/style/css';
import 'antd/es/modal/style/css'
import { Link } from 'react-router-dom';
import host from '../host';
const moment = require('moment');
moment.locale('zh-cn');

const { Column } = Table;

class Stable extends Component {
    constructor(props){
        super(props);
        this.state = {
            filterKey:'',
            inputValue:'',
            visible: false,
            confirmLoading: false
        }
        this.onchangeHandler=this.onchangeHandler.bind(this);
        this.filte=this.filte.bind(this);
        this.setFilter=this.setFilter.bind(this);
        this.showModal=this.showModal.bind(this);
        this.okHandler=this.okHandler.bind(this);
        this.cancelHandler=this.cancelHandler.bind(this);
    }

    componentDidMount(){
        const that = this;
        fetch(host+'/article/list',{
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            } 
        }).then(function(res){
            return res.json()
        }).then(function(data){
            that.setState({lists: data})
        })
    }

    onchangeHandler(e){
        this.setState({inputValue: e.target.value})
    }

    setFilter(){
        this.setState({filterKey: this.state.inputValue})
    }

    showModal(){
        this.setState({ visible: true })
    }

    okHandler(){
        this.setState({ visible: false})
    }

    cancelHandler(){
        this.setState({ visible: false})
    }

    filte(list,filterKey){
        if(list){
            let data = list.map((item,index)=>{
                return {
                    key: index,
                    title: item.title,
                    date: item.date, 
                    keywords: item.keywords,
                    id: item.id
                }
            })
            if(filterKey==''){
                return data
            }else{
                return data.filter(item=>item.keywords.indexOf(filterKey)>-1)
            }
        }else{
           return false
        }
    }

    render(){ 
        const { lists,filterKey, visible, confirmLoading } = this.state;
        let data = this.filte(lists,filterKey);
        return <div>{!data?<div>ing</div>:<>
            <div className='searchbar'>
                <div className='searchContainer'><label htmlFor='search'>按关键词：</label><input type='search' id='search' onChange={this.onchangeHandler} /><button className='searchButton' onClick={this.setFilter}>Search</button></div>
                <Link className='addButton' to='/backend/articleCreate'>Add</Link>
            </div>
            <div>
                <Table dataSource={data} >
                   <Column title='Title'  dataIndex='title' key='title' />
                   <Column title='Date'  dataIndex='date' key='date' />
                   <Column title='Keywords'  dataIndex='keywords' key='keywords'
                        render={
                            keywords =>(
                                <span>
                                    {keywords.map(key=>{
                                        return (
                                            <Tag color={'blue'} key={key}>
                                                {key}
                                            </Tag>
                                        )
                                    })}
                                </span>
                            )
                        } />
                   <Column title='Action'  dataIndex='id' key='id'
                        render={
                            id => (
                                <span>
                                    <Link to={`/backend/article/${id}`}>修改</Link>
                                    <Divider type='vertical' />
                                    <a onClick={this.showModal}>删除</a>
                                </span>
                            )
                        } />
                </Table>
                <Modal
                    title="确定删除吗"
                    visible={visible}
                    onOk={this.okHandler}
                    confirmLoading={confirmLoading}
                    onCancel={this.cancelHandler}
                    >
                    <p>删除后不可恢复</p>
                </Modal>
            </div></>}
        </div>
    }
}

export default Stable