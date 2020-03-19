import React, { Component } from 'react';

class Menu extends Component {
    constructor(props){
        super(props)
        this.state = {
            open: true
        }
        this.changeOpen = this.changeOpen.bind(this)
    }

    changeOpen(e){
        e.stopPropagation()
        this.setState((preState)=>{
           return {
            open: !preState.open
           } 
        })
    }

    render(){
        return <div className={`menuContainer ${this.state.open?'up':'down'}`}>
            <div className='menu' onClick={(e)=>this.changeOpen(e)}>{this.props.menuName}</div>
            {this.props.children}
        </div>
    }
}

export default Menu;