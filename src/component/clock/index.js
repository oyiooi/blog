import React, { Component } from 'react';
import './index.scss';

class Clock extends Component {
    constructor(props){
        super(props);
        this.state={
            hour:'00',
            minute: '00',
            second: '00',
            day: '00',
            month: '00',
            year: '0000'
        };
        this.ref=React.createRef();
        this.timer=null;
        this.resizeHandler=this.resizeHandler.bind(this)
    }

    resizeHandler(){
        let node = this.ref;
        let width = node.current.getBoundingClientRect().width;
        let fontSize = width/10;

        node.current.style.fontSize= fontSize+'px'
    }

    componentDidMount(){
        const that = this;
        this.timer = setInterval(function(){
            let date = new Date();

            that.setState({
                hour: date.getHours(),
                minute: date.getMinutes(),
                second: date.getSeconds(),
                day: date.getDate(),
                month: date.getMonth() + 1,
                year: date.getFullYear()
            })
        },1000);
        window.addEventListener('resize',this.resizeHandler)
    }

    componentWillUnmount(){
        clearInterval(this.timer);
        window.removeEventListener('resize',this.resizeHandler)
    }

    render(){

        const { hour, minute, second, day, month, year} = this.state

        return <div className='clockContain' ref={this.ref} style={{width: '80%',margin: '10px auto',textAlign: 'center',fontSize: '24px',fontWeight: 'bolder',lineHeight: '6em', boxShadow: '0 0 10px 0 rgba(20, 20, 74, 0.867)', borderRadius: '10px', position: 'relative'}}>
            <span className='hour' style={{fontSize: '2em'}}>{(hour<10?'0'+hour:hour) + ':'}</span><span className='minute' style={{fontSize: '2em'}}>{minute<10?'0'+minute:minute}</span><span className='second' style={{fontSize: '1em', color: 'blue'}}>{':'+(second<10?'0'+second:second)}</span><br/>
    <span className='day' style={{color: 'blue',fontSize: '2em'}}>{day<10?'0'+day:day}</span><span className='month' style={{fontSize: '2em'}}>{'/'+ (month<10?'0'+month:month)}</span><span className='year' style={{fontSize: '1em'}}>{ '/' + year}</span>
        </div>
    }
}

export default Clock;