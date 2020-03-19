import React, { Component } from 'react';

class Input extends Component {
    constructor(props){
        super(props)
        this.state={
            wrongStyle:{

            },
            rightStyle:{

            },
            metion:'Not Right',
            right:true
        };
        this.check=this.check.bind(this)
    }

    check(value, pattern){
        if(pattern.test(value)){
            this.setState({right: true})
        }else{
            this.setState({right: false})
        }
    }

    render() {
        
        const { type, value, pattern, placeholder} = this.props
        
        return <div style={{
            width: '80%',
            height: 'fit-content',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyItems: 'center',
            alignItems: 'center'
        }}>
            <lable><input type={type} onChange={()=>this.check(value,pattern) } placeholder={placeholder}/></lable>
            <div>{this.state.rigth?'':this.state.metion}</div>
        </div>;
    }
}

Input.defaultProps={
    type:'text',
    value: '',
    pattern: /[a-zA-Z0-9]{20}/,
    placeholder: '输入'
}
 
export default Input;