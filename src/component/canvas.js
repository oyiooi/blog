import React, { Component } from 'react';

const balls = [];
let ctx,width,height;
let ball = new Ball( 20,20,3,2,'blue',10);
function Ball(x,y,vx,vy,color,size){
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.size = size;
}

Ball.prototype.draw = function(){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
    ctx.fill();
    let angle = Math.atan(Math.abs(this.vy/this.vx))
    let dx = this.size*Math.cos(angle),dy= this.size*Math.sin(angle);let x,y;
    if(this.vx>0 && this.vy>0){
        x = this.x-2*dx;
        y = this.y-2*dy;
    }else if(this.vx<0 && this.vy<0){
        x = this.x + 2*dx;
        y = this.y + 2*dy;
    }else if(this.vx<0 && this.vy>0){
        x = this.x + 2*dx;
        y = this.y - 2*dy;
    }else{
        x = this.x - 2*dx;
        y = this.y + 2*dy;
    }

    ctx.fillStyle = 'white'
    ctx.arc(x,y,3,0,Math.PI*2);
    ctx.fill(); 
}

Ball.prototype.update = function(){
    if((this.x + this.size) >= width ){
        this.vx = -(this.vx);
    }

    if((this.x - this.size) <= 0){
        this.vx = -(this.vx)
    }

    if((this.y + this.size) >= height){
        this.vy = -(this.vy)
    }

    if((this.y - this.size) <= 0){
        this.vy = -(this.vy);
    }

    this.x += this.vx;
    this.y += this.vy;
}

function loop () {

    while(balls.length<4){
        let x = Math.random()*width;
        let y = Math.random()*height;
        let size = Math.random()*7+8;
        let vx = Math.random()*4+1;
        let vy = Math.random()*4+1;;
        let ball = new Ball(x,y,vx,vy,'white',size)
        balls.push(ball)
    }
    ctx.fillStyle = '#000000';
    ctx.fillRect(0,0,width,height);
    for(let i=0;i<balls.length;i++){
        balls[i].draw();
        balls[i].update();
    }
    requestAnimationFrame(loop);
}

class Canvas extends Component {
    constructor(props){
        super(props);
        this.node = React.createRef();
    }

    componentDidMount(){
        const canvasnode = document.createElement('canvas');
        this.node.current.appendChild(canvasnode);
        [width, height] = [this.node.current.getBoundingClientRect().width,this.node.current.getBoundingClientRect().height];
        [canvasnode.width,canvasnode.height] = [width, height];

        ctx = canvasnode.getContext('2d');

        //画出黑色背景

        loop();
    }

    render(){
        return (<div id='canvas-con' ref={this.node} style={{width: '100%',height: '100%',position: 'absolute',top: '0',right: '0'}}></div>)
    }
}

export default Canvas;