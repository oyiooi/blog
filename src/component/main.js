import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import List from './list';
import Article from './article';


class Main extends Component {
    render() { 
        return <section>
            <Route  exact path='/' component={List} />
            <Route exact path='/html' component={List} />
            <Route exact path='/css' component={List} />
            <Route exact path='/js' component={List} />
            <Route exact path='/node' component={List} />
            <Route path='/html/:id' children={ <Article/>} />
        </section>;
    }
}
 
export default Main;