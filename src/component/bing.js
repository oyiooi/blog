import React, { Component } from 'react';
// import * as echarts from 'echarts';
import host from '../host';
const echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/pie');
require('echarts/lib/component/title');
require('echarts/lib/component/tooltip');

function quchong(ary){
    const newArray=[];
    for(let i=0;i<ary.length;i++){
        if(newArray.indexOf(ary[i])===-1){
            newArray.push(ary[i])
        }
    }
    return newArray
}

class Bing extends Component{
    constructor(props){
        super(props);
        this.state={
            loading: true
        };
        this.Echart = null;
        this.paint = this.paint.bind(this);
        this.resize = this.resize.bind(this);
    }

    paint(){
        let option = {
            backgroundColor: '#2c343c',
            title: {
                text: '各类别所占比例',
                textStyle: {
                    color: '#fff'
                },
                left: 'center',
                top: 20
            },
            tooltip: {
                trigger:'item',
                formmatter:  "{a} <br/>{b} : {c} ({d}%)"
            },
            visualMap: {
                show: false,
                min: 0,
                max: 10,
                inRange: {
                    colorLightness:[0,1]
                }
            },
            series: [
                {
                    name: '类别',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%','50%'],
                    data: this.state.bingData.sort(function(a,b){return a.value-b.value}),
                    roseType: 'radius',
                    label: {
                        color: 'rgba(255,255,255,1)',
                        fontStyle: 'normal',
                        fontSize: 16,
                        fontWeight: 700
                    },
                    labelLine: {
                        normal: {
                            lineStyle:{
                                color: 'rgba(255,255,255,1)'
                            },
                            smooth: 0.2,
                            length:10,
                            length2: 20
                        }
                    }
                }
            ]
        }

        this.Echart.setOption(option)
    }

    resize(){
        this.Echart.resize()
    }

    componentDidMount(){
        const that = this;
        fetch(host+'/article/list',{
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(res=>res.json()).then(data=>{
            let kindArray = data.map(item=>item.classification);
            let contentArray = quchong(kindArray).map(item=>{return {
                title: item,
                content: []
            }});
    
            for(let i=0;i<data.length;i++){
                for(let y=0;y<contentArray.length;y++){
                    if(contentArray[y]['title']===data[i]['classification']){
                        contentArray[y]['content'].push(data[i])
                    }
                }
            }

            let bingData = contentArray.map(item=>{
                return {value: item.content.length,name: item.title}
            })

            that.setState({loading:false,bingData});
            that.Echart = echarts.init(document.getElementById('bing-container'));
            that.paint();
            window.addEventListener('resize',that.resize)
        })
    }

    componentWillUnmount(){
        window.removeEventListener('resize',this.resize)
    }

    render(){
        const { loading } = this.state;
        return loading?<div>loading</div>:<div id='bing-container' style={{width: '100%',height: 'calc(100vh - 80px)'}}></div>
    }
}

export default Bing;