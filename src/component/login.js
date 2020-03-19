import React, { Component,useRef,useState } from 'react';

const Login = (props)=>{
    const userRef = useRef(null);
    const passwordRef = useRef(null);
    const [message,setMessage] = useState('')
    const { url } = props;
    const header = new Headers({
      'Content-Type': 'application/json'
     }
    )
    const submit = (e,url)=>{

        e.preventDefault();
        let data = {
            name: userRef.current.value,
            password: passwordRef.current.value
        }
        fetch(url,{method: 'POST',body:JSON.stringify(data),mode: 'cors',headers:header}).then((res)=>res.json()).then((data)=>{
            if(data.error){setMessage(data.error)}else(setMessage(data.success))
        });
    };

    return (<fieldset>
        <legend>Login</legend>
        <form onSubmit={(e)=>{submit(e,url)}}>
            <input ref={userRef} type='text' placeholder='username' style={{textAlign: "center"}} />
            <input ref={passwordRef} type='password' placeholder='password' style={{textAlign: "center"}} />
            {message?<div style={{fontSize: '16px',color: 'white'}}>{message}</div>:true}
            <button type='submit'>Go</button>
        </form>
    </fieldset>)
}

export default Login