import React, { Component } from 'react';
import './treeNav.scss';

class TreeNav extends Component {
    constructor(props){
        super(props);
        this.state={
            open: false
        };
        this.toggle=this.toggle.bind(this);
    }

    toggle(e){

        if(!e.target.classList.contains('title')){return}
        this.setState((preState)=>{
            return {
                open: !preState.open
            }
        })
    }

    render() {
        
        const { title, children} = this.props
        
        return ( <div className='treeNavCon' >
    <div className={`title ${this.state.open?'open':'close'}`} onClick={e=>this.toggle(e)}>{title}{children}</div>
    
        </div> );
    }
}
 
export default TreeNav;