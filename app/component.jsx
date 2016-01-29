
import React from 'react';
import ReactCanvas from 'react-canvas';
import {Surface, Gradient, Group, Text} from 'react-canvas';

export default class Stage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            counter: 0,
            velocity: 0.5,
            random: false,
            lastPoint: {x:0, y:0},
            colorProps:[
                { color: "purple", position: 1},
                { color: "blue", position: 0.8},
                { color: "green", position: 0.6},
                { color: "orange", position: 0.4},
                { color: "yellow", position: 0.2},
                { color: "red", position: 0}
            ]
        };
    }

    componentDidMount() {
        setInterval(()=>{this._onAnimate()}, 10);
        window.addEventListener('mousemove',(event) => {
            this._updateVelocity(event.x, event.y);
        });
        window.addEventListener('click',(event) => {
            this.state.random = !this.state.random;
        });
    }
    render() {
        return <Surface width={1000} height={500} left={0} top={0}>
                <Gradient style={this.getGradientStyle()}
                          colorStops={this.getGradientColors()} />
        </Surface>;
    }
    _updateVelocity(x, y) {
        let lastPoint = this.state.lastPoint;
        let dist = Math.sqrt( Math.pow(x - lastPoint.x, 2) + Math.pow(lastPoint.y - lastPoint.y,2));
        this.state.velocity += Math.max(0,dist/50);
        this.state.lastPoint = {x,y};

    }
    _wave() {
        //use yield
        this.state.velocity *= 0.9;
        this.state.velocity = Math.max(0.5, Math.min(90, this.state.velocity));
        this.state.counter+=this.state.velocity;
        return Math.sin(this.state.counter*Math.PI/180);
    }
    _onAnimate() {
        let newStart = (this._wave()+1)*.5;
        let diffStart = 1 - newStart;
        let i=1;

        for(let item of this.state.colorProps) {
            if(this.state.random){
                item.position = Math.random();
            }else{
                item.position = newStart + diffStart / i;
                i++;
            }
        }

        this.setState(this.state);

    }
    getGradientStyle() {
        var size = this.getSize();
        return {
            top: 0,
            left: 0,
            width: size.width,
            height: size.height
        };
    }
    getGradientColors() {
        return this.state.colorProps;
    }
    getSize() {
        return document.getElementById('app').getBoundingClientRect();
    }
}