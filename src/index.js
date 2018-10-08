import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import lightbulb from './images/lightbulb.png';
import flame from './images/blueflame.png';
import arrow from './images/arrow.png';
import envelope from './images/envelope.png';
import openEnvelope from './images/openEnvelope.png';
import moon from './images/moon.png';
import sun from './images/sun.png';
import save from './images/save.png';
import x from './images/xMark.png';

//Route -9figure out how to import something like this..JSON??

var route_1813100 = [
    {
    name: "Betty Andrews",
    },
    {
        name: "Stephen Stills",

    },
    {
        name: "Rob Konrad",
    },
    {
        name: "Dell Griffith",
    },
    {
        name: "Carl Sandberg",
    },
    {
        name: "Trina Roberts",
    },
    {
        name: "Debbie Downs",
    },
    {
        name: "Gale Sayers"
    }
];
var route = route_1813100;
function createData(route_array){
    var x;
    for(x=0;x<route.length; x++){
        var address = Math.floor(Math.random()*9999);
        route[x].address = address + ' Elm Street';
        route[x].meterType = (address%2==0) ? "electric" : "gas";
        route[x].active = true;
        route[x].message ="";
    }
}
createData(route);
route[3].active = false;

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            index:0,
            reading: "meters",
        };
    }
    arrowUp() {
        if(this.state.index > 0){
            this.setState({index:this.state.index -1});
        }else{
            alert("You have reached the end of the route");
        }
    }
    arrowDown(){
        if(this.state.index < route.length-1){
            this.setState({index:this.state.index+1});
        }else{
                alert("You have reached the end of the route");
        }
    }
    viewMessage(){
        this.setState({reading:"message"});
    }
    saveMessage(){
        var msg = document.getElementById("meterMessage");
        route[this.state.index].message = msg.innerHTML;
        this.setState({reading:"meters"});
    }
    exit(){
        this.setState({reading:"meters"});
    }
    render() {
        return(
        <div>
            <h1>route</h1>
            <MeterInfo index={this.state.index} route={this.props.route} reading={this.state.reading}
                exit={this.exit.bind(this)}
                viewMessage={this.viewMessage.bind(this)} saveMessage={this.saveMessage.bind(this)} />
            <Controls arrowUp={this.arrowUp.bind(this)} arrowDown={this.arrowDown.bind(this)}/>
        </div>
        )
    }
}
function Route(props){
    return(
        <div>
            <h4> Route 1813105</h4>
            <button/>
        </div>
    )
}
function MeterInfo (props){
    
    var icon = (route[props.index].meterType== "electric") ? lightbulb:flame;
    var activeImg = (route[props.index].active == true) ? sun : moon;
    var message = (route[props.index].message == "") ? envelope : openEnvelope;
    if (props.reading == "meters") {
        return (

            <div id="mtrInfo">
                <h4>{props.route[props.index].address}</h4>
                <h4>{props.route[props.index].name}</h4>
                <div id="mtrIcons">
                    <img src={activeImg} />
                    <img src={icon} />
                    <img id="envelope" src={message} onClick={props.viewMessage}/>
                </div>
                <div>
                    <input id="readInput" type="text" placeholder="***" />
                </div>
            </div>
        )
    } else if (props.reading =="message") {
        return (
            <div>
                <h4>{props.route[props.index].address}</h4>
                <h4>{props.route[props.index].name}</h4>
                <div>
                    <h4>Enter your message here:</h4>
                    <img id="x" onClick={props.exit} src={x}/>
                </div>
                <div contentEditable="true" id="meterMessage">
                    {props.route[props.index].message}
                </div>
                <img id="messageSave" src={save} onClick={props.saveMessage}/>
            </div>
        );
    }
}
function Controls(props){
    return(
        <div id="controls">
                <div id="direction">
                    <img className="arrow upArrow" src={arrow} onClick={props.arrowUp}/>
                    <div className="leftRightArrows">
                        <img className="arrow" src={arrow} />
                        <img className="arrow" src={arrow}/>
                        <button id="enterBtn"> Enter</button>
                    </div>
                    <img className="arrow downArrow" src={arrow} onClick={props.arrowDown}/>
                </div>
               
            
        </div>
    )
}
ReactDOM.render(
    <div>
        <App route={route} />
    </div>,
    document.getElementById("root")
)
