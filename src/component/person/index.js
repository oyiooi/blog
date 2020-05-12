import React, { Component } from 'react';
import Notify from '../notify/';
import './person.scss';

class Person extends Component {
    constructor(props){
        super(props);
        this.state={
            message: null,
            disable: false,
            show: false,
            error: false
        }
        this.nameRef=React.createRef();
        this.passRef=React.createRef();
        this.submithandle=this.submithandle.bind(this);
        this.hidden=this.hidden.bind(this);
    }

    hidden(){
        this.setState({
            show: false
        })
    }

    submithandle(e){
        e.preventDefault();
        const that = this;
        let data = {
            username: this.nameRef.current.value,
            password: this.passRef.current.value
        };
        const xhr = new XMLHttpRequest();
        xhr.open('post','http://www.feelingwilling.club/changepw');
        xhr.setRequestHeader('Content-Type','application/json');
        xhr.onreadystatechange=function(){
            if(xhr.readyState===4){
                const res = JSON.parse(xhr.response);
                    that.setState({
                        disable: false,
                        message: res.message,
                        show: true,
                        error: res.error
                    })
            }else{
                that.setState({
                    disable: false,
                    message: 'Something wrong'+xhr.status+xhr.statusText+xhr.readyState,
                    show: true,
                    error: true
                })
            }
        }

        xhr.send(JSON.stringify(data));
        this.setState({
            disable: true
        })
    }

    render(){
        const { message, disable, error,show } = this.state;
        return <div className='personalMess'>
            <form action='http://www.feelingwilling.club/changepw' method='POST' encType='multipart/form-data' onSubmit={e=>this.submithandle(e)}>
                <div>
                    <label htmlFor='username'>Username:</label>
                    <input
                        ref={this.nameRef} 
                        type='text' 
                        id='username' 
                        name='username'
                        autoComplete='off' 
                        required></input>
                </div>
                <div>
                    <label htmlFor='password'>Password :</label>
                    <input 
                        ref={this.passRef}
                        type='password' 
                        id='password' 
                        name='password'
                        autoComplete='off'
                        required></input>
                </div>
                {show?<Notify error={error} message={message} hidden={this.hidden}></Notify>:void null}
                <button type='submit' disabled={disable}>submit</button>
            </form>
        </div>
    }
}

export default Person