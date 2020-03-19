import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style/login.scss';


class App extends Component {
    constructor(props){
        super(props);
        let obj= {};
        props.input.map(item=>obj[item.name]='');
        this.state=obj;
        this.login = this.login.bind(this);
        this.check = this.check.bind(this);
    }

    componentDidUpdate(){
        console.log(this.state)
    }

    login(e){
        e.preventDefault();
        let data=this.state;
        
        console.log(data);
        window.location.href='http://www.baidu.com'
        
    }

    check(obj){
        if(obj.validity.patternMismatch === true){
            obj.setCustomValidity('不合适')
        }else{
            obj.setCustomValidity('')
        }
    }

    render(){
        return <form onSubmit={this.login}>
            {this.props.input.map((item)=>{
                return <div key={item.name}><label htmlFor={item.name}>{item.label}</label>:<input type={item.type} id={item.name} value={this.state[item.name]} name={item.name}
                                    pattern={'[a-z]{5}'}
                                    ref = {item.name}
                                    onBlur={(event)=>this.check(this.refs[item.name])}
                                    onChange={(e)=>this.setState({[item.name]: e.target.value})}/>
                                    </div>
            })}
            <button type='submit'>login</button>
            {/*<label>username：<input type='text' name='username' placeholder='username' required
                                 onChange={(event)=>this.setState({username: event.target.value})}></input></label>
            <label>密  码：<input type='password' name='password' placeholder='输入密码' required
                                 onChange={(event)=>this.setState({password: event.target.value})}></input></label>
            <label>性  别：<input type='radio' name='gender' checked={this.state.gender==='female'} 
                                onChange={()=>this.setState({gender: 'female'})}></input>男
                        <input type='radio' name='gender' checked={this.state.gender==='male'}
                               onChange={()=>this.setState({gender: 'male'})}></input>女</label>
            <label>Skill:
                <input type='checkbox' name='skill' checked={this.state.skill[0].can}
                       onChange={()=>this.setState((prevState)=>{
                           let data = prevState.skill.map((item, index)=>index===0?{name: 'Js',can: !item.can}:item)
                           return {skill: data}
                       })}/>JS
                <input type='checkbox' name='skill' checked={this.state.skill[1].can} 
                       onChange={()=>this.setState((prevState)=>{
                        let data = prevState.skill.map((item, index)=>index===1?{name: 'Js',can: !item.can}:item)
                        return {skill: data}
                    })}/>Html
                <input type='checkbox' name='skill' checked={this.state.skill[2].can} onChange={()=>this.setState((prevState)=>{
                           let data = prevState.skill.map((item, index)=>index===2?{name: 'Js',can: !item.can}:item)
                           return {skill: data}
                       })}/>Css
            </label>
            <label>省：<select name='provence' value={this.state.provence} onChange={(e)=>{console.log(e.target.value);this.setState({provence: e.target.value},()=>console.log(this.state.provence))}}>
                       <option value='' disabled>选择一个</option>
                       <option value='山西省'>山西省</option>
                       <option value='山东省'>山东省</option>
                </select></label>
            <label>description:<textarea value={this.state.description} 
                                            onChange={(e)=>this.setState({description: e.target.value})}></textarea></label>
            <label>Date:<input type='date' value={this.state.date}
                        onChange={(e)=>this.setState({date: e.target.value})}></input></label>
            <label>图片：<input type='file' accept='image/*' value={this.state.image} required
                        onChange={(e)=>{let file=e.target.files[0];let data=URL.createObjectURL(file);console.log(e.target.files,data);this.setState({image: e.target.value})}}></input></label>
                    <button type='submit'>Submit</button>*/}                     
        </form>
    }
}

App.defaultProps = {
    input: [
        {type: 'text', label: 'Username',name:'username'},
        {type: 'password', label: 'Password',name: 'password'}
    ] 
}

ReactDOM.render(<App />,document.getElementById('root'))
