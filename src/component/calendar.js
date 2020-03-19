import React, {Component} from 'react';
import * as echarts from 'echarts';

class Calendar extends Component {
    constructor(props){
        super(props);
        this.container = React.createRef();
        this.myEchart = null;
        this.paint = this.paint.bind(this);
        this.resize = this.resize.bind(this);
    }

    paint(){
        let option = {
            backgroundColor: '#404a59',

            title: {
                top: 30,
                text: '2019年每天的提交数量',
                left: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip : {
                trigger: 'item'
            },
            visualMap: {
                show: true,
                min: 0,
                max: 5,
                calculable: true,
                orient: 'horizontal',
                left: 'center',
                top: 280,
                textStyle: {
                    color: '#fff'
                }
            },
            calendar: {
                top: 100,
                range: 2019,
                width: '85%'
            },
            series: {
                type:'heatmap',
                coordinateSystem: 'calendar',
                data: [['2019-01-02',1],['2019-01-04',2],['2019-01-05',0],['2019-01-06',3],['2019-01-07',1],['2019-01-08',2]]
            }
        }

        this.myEchart.setOption(option);
    }

    resize(){
        this.myEchart.resize()
    }

    componentDidMount(){
        this.myEchart = echarts.init(document.getElementById('econtainer'));
        this.paint()
        window.addEventListener('resize',this.resize)
    }

    componentDidUpdate(){
        this.paint()
    }

    componentWillUnmount(){
        window.removeEventListener('resize',this.resize)
    }

    render(){
        return <div id='econtainer' ref={this.container} style={{width: '100%',height:'100%',position: 'relative'}}></div>
    }
}

export default Calendar;