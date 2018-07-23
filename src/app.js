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
        seconds: 10,
        breakSeconds: 300
      }; //default secounds for 25
      this.timer = 0; //needed to start and stop timer
      this.breakthing = 0;

    }

    secondsToTime = (secs) => { //takes amount of seconds and returns obj with minutes sec, hours 
      let hours = Math.floor(secs / (60 * 60));
      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);
      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);

      let obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
      };
      return obj;
    }

    componentDidMount = () => {
      let timeLeftVar = this.secondsToTime(this.state.seconds);
      this.setState({
        time: timeLeftVar
      });
    }

    startTimer = () => {
      this.timer = setInterval(this.countDown, 1000);
    }


    stopTimer = () => {
      this.state.seconds > 0 ? clearInterval(this.timer):clearInterval(this.breakthing)
      clearInterval(this.timer);
    }

    countDown = () => {
      // Remove one second, set state so a re-render happens.
      let seconds = this.state.seconds - 1;
      this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds,
      });
      if (seconds === 0) {
        this.stopTimer()
        this.breakTimer()
        this.intervalCounter()
      }
    }

    breakTimer = () => {
      let timeBreak = this.secondsToTime(this.state.breakSeconds);
      this.setState({
        time: timeBreak
      });
    }

    intervalCounter = () => {
     this.breakthing = setInterval(this.breakTimerCount, 1000);
    };

    breakTimerCount = () => {
      let breakSeconds = this.state.breakSeconds - 1
      this.setState({
        time: this.secondsToTime(breakSeconds),
        breakSeconds
      });
    };



    changeMinute = (operator) => {
      switch (operator) {
        case 'add':
          this.state.seconds = this.state.seconds + 60;
          // this.componentDidMount();
          break;
        case 'sub':
          this.state.seconds = this.state.seconds - 60;
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
         <h1>Session Length:{this.state.time.m}</h1>

        <div className="d-flex flex-row">
          <button className="btn-success" onClick={() => this.changeMinute('add')}>Add</button>
           <button onClick={() => this.changeMinute('sub')}>Sub</button>
           <button onClick={this.startTimer}>Start</button>
             <button onClick={this.stopTimer}>Stop</button>
            <div className="col-md-12 mx-auto">
                <div className="display">
                    <div className="display-time">{this.state.time.m}:{this.state.time.s}</div>
                    <div className="display-date">{this.state.seconds > 0 ? "Session" : "Break"}</div>
                </div>
            </div>
        </div>
    </div>
    <Panel/>    
  </div>
  
);
         

  }
}
  

  ReactDOM.render(<App/>, document.getElementById('app'));
  
