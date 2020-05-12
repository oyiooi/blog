import React, {useEffect} from 'react';

const Notify = React.memo(({error,message,hidden})=>{

    const divRef = React.createRef()
    let timeId;
    useEffect(()=>{
        timeId=setTimeout(function(){
            hidden()
        },5000)
        return function(){clearTimeout(timeId)}
    })

    return <div style={{color: error?'red':'blue',textAlign: 'center',fontSize: 16,letterSpacing: 2,fontWeight: 'bold'}} ref={divRef} onClick={hidden}>{message}</div>
})

export default Notify;