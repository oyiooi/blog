import React, { useState, useEffect,Suspense} from 'react';
import ReactDOM from 'react-dom';
import Menu from './component/menu';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Stable from './component/stable';
import Icon from 'antd/es/icon';
import './style/backend.scss';
import './images/avta.jpeg';
import Canvas from './component/canvas';
import Person from './component/person/';
import Bing from './component/bing';
// const Stable = React.lazy(()=>import('./component/stable'));
// const Bing = React.lazy(()=>import('./component/bing'));
// const FormAdd = React.lazy(()=>import('./component/formAdd'));
// const FormPage = React.lazy(()=>import('./component/formPage'));
import FormAdd from './component/formAdd';
import FormPage from './component/formPage';

const App = () => {

    const [show, setShow] = useState(!(window.innerWidth>961))

    useEffect(()=>{
        window.addEventListener('resize',()=>{
            window.innerWidth>961?setWidth('300px'):setWidth('0px');
            setShow(window.innerWidth>961?false:!!true)
        })
    })

    const [width, setWidth] = useState(window.innerWidth>961?'80vw':"0px")

    const onWidth = ()=>{
        width=='80vw'?setWidth('0px'):setWidth('80vw')
    }

    return <Router> 
        <div className='container'>
        <aside style={{width: width}}>
            <div className='avtarContainer'>
                <img src='/images/avta.jpeg' alt='头像' />
                <div>username</div>
            </div>
            <Menu menuName='修改'>
                <div className='subMenu'><Link to='/backend'>文章</Link></div>
                <div className='subMenu'><Link to='/backend/comment'>评论</Link></div>
            </Menu>
            <Menu menuName='可视化管理'>
                <div className='subMenu'><Link to='/backend/vision'>饼图</Link></div>
            </Menu>
            <Menu menuName='个人中心'>
                <div className='subMenu'><Link to='/backend/person'>信息管理</Link></div>
            </Menu>
        </aside>
        <section>
            <header>{show?<span className='bread' onClick={onWidth} ><Icon type={width=='80vw'?'menu-fold':'menu-unfold'} /></span>:true}<Canvas></Canvas></header>
            <div className='content' style={{height: 'calc(100vh - 80px)'}}>
                    <Suspense fallback={<div>loading</div>}>
                    <Switch>
                        <Route exact path='/backend' component={Stable}></Route>
                        <Route path='/backend/article/:id' component={FormPage}></Route>
                        <Route path='/backend/comment' ></Route>
                        <Route path='/backend/vision' component={Bing}></Route>
                        <Route path='/backend/person' ><Person /></Route>
                        <Route path='/backend/articleCreate' component={ FormAdd }></Route>
                    </Switch>
                    </Suspense>    
            </div>
        </section>  
    </div>
    </Router>
}

ReactDOM.render(<App />,document.getElementById('root'))