import React, { Component } from 'react';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import 'antd/es/input/style/css';
import Button from 'antd/es/button';
import { connect } from 'react-redux';
import toAddComment from '../actions/toaddcomment'

const { TextArea } = Input

export default class Commit extends Component {
    constructor(props) {
        super(props);
        const { to } = props;
        if(to){
            this.state = {name: '', to: to,content: '' }
        }else{
            this.state = {name: '', content: ''}
        }
        this.change=this.change.bind(this);
    }

    change(e,title){
        this.setState({
            [title] : e.target.value
        })
    }

    render() {
        
        const { name, content} = this.state;
        const { to,onchange,index,addComment} = this.props;
        
        return ( <Form>
            <Form.Item wrapperCol={to?{span:24}:{span:4}}>
        <Input placeholder='输入昵称' vlaue={name} onChange={(e)=>{this.change(e,'name')} } addonAfter={to?`@${to}`:false}></Input>
            </Form.Item>
            <Form.Item>
                <TextArea placeholder='留下你的评论' rows={4} value={content}  onChange={(e)=>{this.change(e,'content')}}></TextArea>
            </Form.Item>
            <Form.Item>
                <Button type='primary' onClick={()=>{to?onchange(this.state,index):addComment(this.state)}}>{to?'回复':'发表'}</Button>
            </Form.Item>
        </Form> );
    }
}

const mapStateToprops = ()=>{
    return {}
}

const mapDispatchToProps = (dispatch) =>{
   return {
        addComment: (data) => dispatch(toAddComment(data))
    } 
}

export const CommentCommit = connect(mapStateToprops,mapDispatchToProps)(Commit);