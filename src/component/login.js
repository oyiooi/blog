import React, { useRef,useState } from 'react';
const Login = (props)=>{
    const userRef = useRef(null);
    const passwordRef = useRef(null);
    const [message,setMessage] = useState('')
    const header = new Headers({
      'Content-Type': 'application/json'
     }
    )
    const submit = (e)=>{

        e.preventDefault();
        let data = {
            name: userRef.current.value,
            password: passwordRef.current.value
        }
        fetch('https://www.feelingwilling.club/loginpass',{method: 'POST',mode: 'cors',credentials: 'include',body:JSON.stringify(data),headers:header}).then((res)=>res.json()).then((data)=>{
            if(data.error){
                setMessage(data.message)
            }else{
                if(data.mismatch){
                    setMessage(data.message)
                }else{
                    setMessage(data.message);
                    location.pathname='/backend';
                }
            }
        });
    };

    return (<fieldset>
        <legend>Login</legend>
        <form onSubmit={(e)=>{submit(e)}}>
            <input ref={userRef} type='text' placeholder='username' style={{textAlign: "center"}} />
            <input ref={passwordRef} type='password' placeholder='password' style={{textAlign: "center"}} />
            {message?<div style={{fontSize: '16px',color: 'white'}}>{message}</div>:true}
            <button type='submit'>Go</button>
        </form>
    </fieldset>)
}

export default Login