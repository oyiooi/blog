import React, { Component } from 'react';
import './person.scss';

class Person extends Component {
    constructor(props){
        super(props);
        this.state={
            errMessage: null
        }
        this.inRef=React.createRef();
        this.submithandle=this.submithandle.bind(this)
    }

    submithandle(e){
        event.preventDefault();
        let formdata = new FormData(this.inRef.current);
        formdata.append('id',"5e5eb2d32326d46a6817a939");
        const xhr = new XMLHttpRequest();
        xhr.open('post','http://localhost:8000/users');

        xhr.onreadystatechange=function(){
            if(xhr.readyState==='4'){
                console.log(xhr.responseText)
            }
        }

        xhr.send(formdata);
    }

    componentDidMount(){
        const that = this;
        fetch('http://localhost:8000/users/5e5eb2d32326d46a6817a939',{
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res=>res.json()).then(data=>{
            that.setState({errMessage: data.errMessage},()=>{
                that.inRef.current.username.value=data.username;
                that.inRef.current.password.value=data.password;
            })
        })
    }

    render(){
        return <div className='personalMess'>
            <form action='http://localhost:8000/users' method='POST' encType='multipart/form-data' ref={this.inRef}>
                <div>
                    <label htmlFor='username'>Username:</label><input type='text' id='username' name='username' required></input>
                </div>
                <div>
                    <label htmlFor='password'>Password :</label><input type='password' id='password' name='password' required></input>
                </div>
                <div>
                    <label htmlFor='file'>Avatar:</label><input type='file' accept='.jepg,.jpg,.png' name='img' id='file' required></input>
                </div>
                <div className='errMessage'></div>
                <button type='submit' onClick={e=>this.submithandle(e)}>submit</button>
            </form>
        </div>
    }
}

export default Person