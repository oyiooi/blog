import React, { Component } from 'react';
import TreeNav from './treeNav/';
import { connect } from 'react-redux';
import fetching from '../actions/listaction';
import { Link } from 'react-router-dom';
import host from '../host';

function quchong(ary){
    const newArray=[];
    for(let i=0;i<ary.length;i++){
        if(newArray.indexOf(ary[i])===-1){
            newArray.push(ary[i])
        }
    }
    return newArray
}

class List extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    componentDidMount(){
        const { getData } = this.props;

        getData('list',host+'/article/list')
    }

    render(){
        const { list } = this.props;
        const { fetching, items} = list;
        let kindArray = items.map(item=>item.classification);
        let contentArray = quchong(kindArray).map(item=>{return {
            title: item,
            content: []
        }});

        for(let i=0;i<items.length;i++){
            for(let y=0;y<contentArray.length;y++){
                if(contentArray[y]['title']===items[i]['classification']){
                    contentArray[y]['content'].push(items[i])
                }
            }
        }

        if(fetching){
            return <div>加载中。。。</div>
        }else{
             return contentArray.map((item,index)=><TreeNav title={item.title} key={index}>
             {item.content.map((item,index)=>
                 <div key={index}><Link to={`/index/article/${item.id}`}>{item.title}</Link></div>
             )}</TreeNav>)
        }  
    }
}

List.defaultProps = {
    list: {
        fetching: false,
        items: [
            {
                title: 'HTML',
                id:'dfsfeef',
                classification: 'Html'
            },{
                title: 'CSS',
                id: 'dfseffd',
                classification: 'CSS'
            }
        ]
    }
}

const mapStateToProps = (state) => {
    return { list: state.getAllData.list }
}

const mapDispatchToProps = (dispatch) => {
    return {getData: (kind,url)=>dispatch(fetching(kind,url))}
}

const ListWithstate = connect(mapStateToProps,mapDispatchToProps)(List)

export default ListWithstate;