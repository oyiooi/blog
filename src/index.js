import React,{ Suspense, useState } from 'react';
import ReactDOM from 'react-dom';
import Nav from './component/nav/';
import './style/index.scss';
import Icon from 'antd/es/icon';
import Page from './page/';
//const Page = React.lazy(()=>import(/*webpackChunkName: 'page'*/'./page'));
import ListWithstate from './component/li';
import reducers from './reducers/reducers';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LastArticle from './component/lastArticle';
//const LastArticle = React.lazy(()=>import(/*webpackChunkName: 'lastArticle'*/'./component/lastArticle'));
//import Clock from './component/clock/';
const Clock = React.lazy(()=>import(/*webpackChunkName: 'clock'*/'./component/clock/' ));

let store = createStore(reducers,applyMiddleware(thunkMiddleware));

function App () {
    const [show,setShow] = useState(false);

    return <Provider store={store}><Router>
        <div className='container'>
            <div className={`togglebutton ${show?'showbutton':'hidebutton'}`} onClick={()=>setShow(!show)}><Icon type={show?'close':'menu'}></Icon></div>
        <header>
            <Nav layout='horizon'></Nav>
        </header>
        <aside className={`left ${show?'showleft':'hideleft'}`}>
            <div style={{padding: '20px 20px 0 20px'}}>
                <ListWithstate></ListWithstate>
            </div>   
        </aside>
        <section>
            <Switch>
                    <Route path='/index' exact component={LastArticle}></Route>
                    <Route path='/index/article/:id' component={Page}></Route>
            </Switch>
        </section>
        <aside className='right'><Suspense fallback={<div>loading...</div>}><Clock></Clock></Suspense></aside>
    </div></Router></Provider>
}

ReactDOM.render(<App/>,document.getElementById('root'))