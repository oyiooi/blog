import React, { useEffect} from 'react';
import ReactDOM from 'react-dom';
import Login from './component/login';
import './style/login.scss';

const App = ()=>{

    useEffect(function(){
        const documentE = document.documentElement;
        function setSize() {
            documentE.style.fontSize = documentE.getBoundingClientRect().width/15 + 'px'
        }
        setSize()
        window.addEventListener('resize',setSize);
        return ()=>window.removeEventListener('resize',setSize);
    })

    return <div className='allContainer'>
        <div className='bg left'></div>
        <div className='bg right'></div>
        <Login/>
    </div>
}

ReactDOM.render(<App />,document.getElementById('root'))
