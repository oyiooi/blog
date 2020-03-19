import React, { Component } from 'react';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import Select from 'antd/es/select';
import DatePicker from 'antd/es/date-picker';
import Icon from 'antd/es/icon';
import Radio from 'antd/es/radio';
import InputNumber from 'antd/es/input-number';
import Button from 'antd/es/button';
import 'antd/es/form/style/css';
import 'antd/es/input/style/css';
import 'antd/es/select/style/css';
import 'antd/es/date-picker/style/css';
import 'antd/es/icon/style/css';
import 'antd/es/radio/style/css';
import 'antd/es/input-number/style/css';
import 'antd/es/button/style/css';
import TextEditor from './editor';
import { EditorState, convertToRaw,  ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
const moment = require('moment');
import host from '../host';

const { Option } = Select;

function getId(string){
    return string.split('/')
}

class FormPage extends Component {

    constructor(props){
        super(props);
        const id = getId(location.pathname)[2];
        this.state={
            fetchingOver: true,
            id: id
        };
        this.handleSubmit=this.handleSubmit.bind(this)     
    }

    handleSubmit(e){
        const that = this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const body = Object.assign({},values,{editorState:draftToHtml(convertToRaw(values.editorState.getCurrentContent()))})
            body.date = body.date.format('YYYY-MM-DD')
            if (!err) {
              that.setState({fetchingOver: false});
              const id = that.state.id;
            fetch(`${host}/article/${id}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
                mode: 'cors'   
            }).then(function(res){
                return res.json()
            }).then(function(data){
                that.setState({fetchingOver: true})
            }).catch((err)=>console.log(err))
          }else{
              console.log(err,'验证未通过')
          }
        });
      };

      componentDidMount(){
          const id = this.state.id;
          const that = this;
        fetch(`${host}/article/${id}`,{
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
            mode: 'cors'   
       }).then(function(res){
           return res.json()
       }).then(function(data){
            let blocksFromHtml = htmlToDraft(data.editorState);
            let { contentBlocks, entityMap } = blocksFromHtml;
            let contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            let editorState = EditorState.createWithContent(contentState)
           that.props.form.setFieldsValue({
            title: data.title,
            author: data.author,
            date: moment(data.date),
            keywords: data.keywords,
            classification: data.classification,
            like: data.like,
            editorState: editorState
           })
       })
      }

    render() {
        const fetchingOver = this.state.fetchingOver;
        const { getFieldDecorator } = this.props.form;  
        return fetchingOver?(<Form labelAlign='right'
                     labelCol= {{ span: 2}} 
                     style={{backgroundColor: 'white',paddingTop: '10px'}}
                     onSubmit={this.handleSubmit}>
            <Form.Item style={{textAlign: 'right',margin: '0px 15px 0 0'}}>
                <Button type='primary' shape='circle' icon='close' onClick={()=>history.back()}></Button>
            </Form.Item>
            <Form.Item style={{textAlign: 'center'}}>
                <p>修改文章</p>
            </Form.Item>
            <Form.Item label='标题' wrapperCol={{span: 8}} >
                {getFieldDecorator('title',{
                    initialValue: '',
                    rules: [{
                        required: true,
                        message: '请输入文章标题'
                    }]
                })(<Input placeholder='title'></Input>)}             
            </Form.Item>
            <Form.Item label='作者' wrapperCol={{span: 2}} >
                {getFieldDecorator('author',{
                    initialValue: '',
                    rules: [
                        {
                            max: 10,
                            message: '超过10个字符'
                        },{
                            required: true,
                            message: '请输入名字'
                        }
                    ]
                })(<Input placeholder='author'></Input>)}
            </Form.Item>
            <Form.Item label='日期'  wrapperCol={{span: 3}} >
                {getFieldDecorator('date',{
                    initialValue: new moment(),
                    rules: [{ type: 'object', required: true, message: 'Please select time!' }]
                })(<DatePicker ></DatePicker>)}
            </Form.Item>
            <Form.Item label='关键词'  wrapperCol={{span: 5}} >
                {getFieldDecorator('keywords',{
                    rules: [{
                        required: true,
                        message: '请选择关键词'
                    }]
                })(
                    <Select 
                    mode='multiple'
                    placeholder='select key words'
                    optionLabelProp='label'
                    >
                        <Option value='React' label='React'><span>React</span></Option>
                        <Option value='ES' label='ES'><span>ES</span></Option>
                        <Option value='css' label='CSS'><span>CSS</span></Option>
                    </Select>
                )}              
            </Form.Item>
            <Form.Item label='分类'  wrapperCol={{span: 5}}>
                {getFieldDecorator('classification',{
                    initialValue: '',
                    rules: [{
                        required: true,
                        message: '请选择一个类别'
                    }]
                })(
                <Radio.Group defalutValue='Html' buttonStyle='solid'>
                    <Radio.Button value='Html' >Html</Radio.Button>
                    <Radio.Button value='CSS' >CSS</Radio.Button>
                    <Radio.Button value='ES' >ES</Radio.Button>
                    <Radio.Button value='Node' >Node</Radio.Button>
                    <Radio.Button value='JS' >JS</Radio.Button>
                </Radio.Group>
                )}                             
            </Form.Item>
            <Form.Item label={<Icon type='like' style={{fontSize: '1.5em',verticalAlign:'middle'}}/>} wrapperCol={{span: 1}} >
                {getFieldDecorator('like',{
                    initialValue: 0,
                })(<InputNumber disabled={true}></InputNumber>)}
            </Form.Item>
            <Form.Item label='内容'  wrapperCol={{span: 18}} >
                {
                    getFieldDecorator('editorState',{
                        initialValue:  EditorState.createEmpty(),
                        required: true,
                        message: '输入'
                    })(<TextEditor></TextEditor>)
                }
            </Form.Item>
            <Form.Item style={{textAlign: 'center'}}>
                <Button type='primary' style={{marginBottom: '20px'}} htmlType='submit'>保存</Button>
            </Form.Item>
        </Form>):(<div>加载中。。。。 </div>)
    }
}

FormPage = Form.create({})(FormPage)
 
export default FormPage;