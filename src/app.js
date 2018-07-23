import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import Panel from './Panel.js';
import Header from './Header.js';


class App extends React.Component {
    constructor() {
      super();
      this.state = {
        time: {},
        seconds: 4,
        breakSeconds: 300
      }; //default secounds for 25
      this.timer = 0; //needed to start and stop timer
      this.breakthing = 0;
      this.flag = false;

    }

    secondsToTime = (secs) => { //takes amount of seconds and returns obj with minutes sec, hours 
      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);
      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds)

      let obj = {
        "m": minutes.toString().padStart(2,"0"),  //pads extra 0. 
        "s": seconds.toString().padStart(2,"0")
      };
      return obj
    }

    componentDidMount = () => {
       let timeLeftVar = this.flag ? this.secondsToTime(this.state.breakSeconds):
      this.secondsToTime(this.state.seconds)
      this.setState({time: timeLeftVar});
      
    }  
    startStopTimer = (input) => {
      switch(input){
        case "stop":
         this.flag ? this.breakthing = clearInterval(this.breakthing): 
        this.timer = clearInterval(this.timer)
        break;
        case "start":
         this.flag ? this.breakthing = setInterval(this.breakCountDown, 1000):
        this.timer = setInterval(this.countDown,1000)
        break;
        default:
        alert("something went wrong");
      }
    }
   
  
    countDown = () => {
      let seconds = this.state.seconds - 1
      this.setState({
      time: this.secondsToTime(seconds),
      seconds,});
      if(this.state.seconds === 0){
        this.startBreaktimer()

      };
    }
    breakCountDown = () => {
      let breakSeconds = this.state.breakSeconds - 1
      this.setState({
      time: this.secondsToTime(breakSeconds),
      breakSeconds,});
      if(this.state.breakSeconds === 0){
        this.startSessionTimer() //error becuase sec are all used up need to copy at start. ? 
      };
    }





    resetFunction = () => {
      this.startStopTimer('stop');
      this.setState({ time: {},
        seconds: 4,
        breakSeconds: 3});
      this.componentDidMount()
    }

   

    startBreaktimer = () => {
        this.startStopTimer('stop');
        this.flag = true;
        this.componentDidMount()
        this.startStopTimer("start");
    }
     startSessionTimer = () => {
        this.startStopTimer('stop');
        this.flag = false;
        this.componentDidMount()
        this.startStopTimer("start");
        }
    



    changeMinute = (operator) => {
      switch (operator) {
        case 'add':
          this.state.seconds = this.state.seconds + 60;
          this.componentDidMount();
          break;
        case 'sub':
          this.state.seconds = this.state.seconds - 60;
          this.componentDidMount();
          break;
          case 'addBreak':
          this.state.breakSeconds = this.state.breakSeconds + 60;
          this.componentDidMount();
          break;
        case 'subBreak':
          this.state.breakSeconds = this.state.breakSeconds - 60;
          this.componentDidMount();
          break;
        default:
          alert("Something Went Wrong")

      }
    }
 
    render() {
      return(
        <div>
         <div className="container-fluid">
         <div onClick={this.resetFunction}>Reset</div>
         <h1>Session Length:{Math.floor(this.state.seconds / 60)}</h1>
        <div className="d-flex flex-row">
          <button className="btn-success" onClick={() => this.changeMinute('add')}>Add</button>
           <button onClick={() => this.changeMinute('sub')}>Sub</button>
           <button onClick={() => this.startStopTimer('start')}>Start</button>
           <button onClick={() => this.startStopTimer('stop')}>Stop</button>
            <div className="col-md-12 mx-auto">
                <div className="display">
                    <div className="display-time">{this.state.time.m}:{this.state.time.s}</div>
                    <div className="display-date">{this.state.seconds > 0 ? "Session" : "Break"}</div>
                </div>
                <button className="btn-success" onClick={() => this.changeMinute('addBreak')}>Add</button>
                <button onClick={() => this.changeMinute('subBreak')}>Sub</button>
                <h2>Break Length:{Math.floor(this.state.breakSeconds / 60)}</h2>
            </div>
        </div>
    </div>   
  </div>
  
);
         

  }
}
  

  ReactDOM.render(<App/>, document.getElementById('app'));
  
