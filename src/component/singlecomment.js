import React, { Component } from 'react';
import Comment from 'antd/es/comment';
import Avatar from 'antd/es/avatar';
import 'antd/es/comment/style/css';
import 'antd/es/avatar/style/css';
import Commit from './comment';
import { connect } from 'react-redux';
import toAddDialog from '../actions/toadddialog';
import { type } from 'os';


const colorList = [
    '#706fd3','#34ace0','#33d9b2','#ff793f','#ffb142','#ff5252','#84817a'
]

class Reply extends Component {

    constructor(props){
        super(props);
        this.state={
            show: false
        }
        this.change=this.change.bind(this)
    }

    change(){
        this.setState(prevState=>{
            return {
                show: !prevState.show
            }
        })
    }

    render() { 
        const { show} = this.state,{to,index,onchange}=this.props;
        return ( <div style={{position: 'relative'}}><span onClick={this.change} style={{cursor: 'pointer'}}>reply</span><div style={{position: 'absolute',top: '20px',left: '0px',width: '200px',zIndex:20,backgroundColor: 'white'}}>{show?<Commit to={to} index={index} onchange={onchange} ></Commit>:true}</div></div> );
    }
}

class SingleComment extends Component {
    
    render() { 
        const bgcolor = colorList[Math.floor(Math.random(0,7))];
        const { name, content, dialog,addDialog,index} = this.props;

        return ( <Comment 
            actions={[<Reply to={name} index={index} onchange={addDialog}/>]}
        author={<span>{name}</span>}
            avatar={
                <Avatar style={{ backgroundColor: bgcolor, verticalAlign: 'middle' }}
                    alt="avatar"
            >{name.charAt(0).toUpperCase()}</Avatar>
                }
                content={
                    <p>
                        {content}
                    </p>
                }
        >
            {dialog?dialog.map((item,ind)=>{
                return (<Comment key={ind}
                actions={[<Reply to={item.name} index={index} onchange={addDialog}/>]}
                author={<span>{item.name+' @ '+item.to}</span>}
                avatar={<Avatar style={{ backgroundColor: bgcolor, verticalAlign: 'middle' }}
                        alt="avatar">{item.name.charAt(0).toUpperCase()}</Avatar>}
                content={<p>{item.content}</p>}>
                    </Comment>)}):true}
        </Comment> );
    }
}

const Comments = (props)=> {
    const { data,addDialog } = props;

    return <div className='comment'>{data.map((item,index)=><SingleComment key={index}
                                                index={index}  
                                                name={item.name}
                                                addDialog={addDialog}
                                                content={item.content}
                                                dialog={item.dialog}/>)}
        </div>
}

const mapStateToProps = (state) =>{
    return { data: state.comments }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        addDialog: (data, index) =>dispatch(toAddDialog(data,index))
    }
}

const StoreComments = connect(mapStateToProps,mapDispatchToProps)(Comments)

export default StoreComments;