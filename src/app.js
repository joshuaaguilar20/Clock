import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import { DragSource } from 'react-dnd';
import Draggable from 'react-draggable';


class App extends React.Component {
    constructor() {
      super();
      this.state = {
        time:25,
        sessionMinutes:25,
        breakMinutes:25,
        isChecked: true
      }; //default secounds for 25
      this.timer = 0; //needed to start and stop timer
      this.breakid = 0;
      this.flag = true;
      this.secondsRemaining = 0;
      this.startStop = true
      this.x = this.flag ? "Session" : "Break"
    }
    secondsToTime = (secs) => { //takes amount of seconds and returns obj with minutes sec, hours 
      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);
      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds)
      return minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
    }
    componentDidMount = () => {
      if (this.flag) {
        this.secondsRemaining = this.state.sessionMinutes * 60
      } else {
        this.secondsRemaining = this.state.breakMinutes * 60
      }
      this.setState({
        time: this.secondsToTime(this.secondsRemaining)
      });
    };
    handleChange = () => {
      this.setState({
        isChecked: !this.state.isChecked
      });
      this.startStopTimer(this.state.isChecked);
    }
    startStopTimer = (input) => {
      switch (input) {
        case false:
          this.timer = clearInterval(this.timer)
          break;
        case true:
          this.timer = setInterval(this.countDown, 1000)
          break;
        default:
          alert("something went wrong");
      }
    }
    countDown = () => {
      this.secondsRemaining--;
      this.setState({
        time: this.secondsToTime(this.secondsRemaining)
      });
      console.log(this.state.time)
      if (this.secondsRemaining < 0) {
        this.audioBeep.play();
        this.startTimer();
      }
    }
    startTimer = () => {
      this.startStopTimer(false); //false stops timer 
      if (this.flag) {
        this.secondsRemaining = this.state.sessionMinutes * 60
      } else {
        this.secondsRemaining = this.state.breakMinutes * 60
      }
      this.flag = !this.flag;
      this.componentDidMount()
      this.startStopTimer(true);
    };
    changeMinute = (operator) => {
      switch (operator) {
        case 'add':
          if (this.state.sessionMinutes < 60 && this.state.isChecked) {
            this.state.sessionMinutes++;
            if (this.flag) {
              this.secondsRemaining = this.state.sessionMinutes * 60
            };
            this.setState(() => ({
              sessionMinutes: this.state.sessionMinutes,
              time: this.secondsToTime(this.secondsRemaining)
            }));
          }
          break;
        case 'sub':
          if (this.state.sessionMinutes > 1 && this.state.isChecked) {
            this.state.sessionMinutes--;
            if (this.flag) {
              this.secondsRemaining = this.state.sessionMinutes * 60
            };
            this.setState(() => ({
              sessionMinutes: this.state.sessionMinutes,
              time: this.secondsToTime(this.secondsRemaining)
            }));
          };
          break;
        case 'addBreak':
          if (this.state.breakMinutes < 60 && this.state.isChecked) {
            this.state.breakMinutes++;
            if (!this.flag) {
              this.secondsRemaining = this.state.breakMinutes * 60
            };
            this.setState(() => ({
              breakMinutes: this.state.breakMinutes,
              time: this.secondsToTime(this.secondsRemaining)
            }));
          }
          break;
        case 'subBreak':
          if (this.state.breakMinutes > 1 && this.state.isChecked) {
            this.state.breakMinutes--;
            if (!this.flag) {
              this.secondsRemaining = this.state.breakMinutes * 60
            };
            this.setState(() => ({
              breakMinutes: this.state.breakMinutes,
              time: this.secondsToTime(this.secondsRemaining)
            }));
          }
          break;
        default:
          alert("Something Went Wrong");
      }
    }
    resetFunction = () => {
      this.startStopTimer(false);
      this.timer = 0; //needed to start and stop timer
      this.breakid = 0;
      this.flag = true;
      this.secondsRemaining = 0;
      this.startStop = true
      this.setState(() => ({
        breakMinutes: 5,
        time:"25",
        sessionMinutes: 25,
        isChecked: true
      }));
      this.audioBeep.pause();
      this.audioBeep.currentTime = 0;
      this.componentDidMount();
    };
    
    
    render() {
      return (
        <div className="container style=position; height: 50%; border: solid; bottom: 50px; right: 50%;  left: 50%;">
          <Draggable
          defaultPosition={{x: 50, y: 100}}
          >
          <h3 id="reset" className="row" onClick={()=> this.resetFunction()}>reset</h3>
        </Draggable>

        <Draggable><span
             id="session-label">Session Length:
                <h2 id="session-length">{this.state.sessionMinutes}</h2>
            <button id="session-increment" onClick={()=> this.changeMinute('add')}>Add</button>
            <button id="session-decrement" onClick={()=> this.changeMinute('sub')}>Sub</button>
              </span></Draggable>

              <Draggable><span
               id="break-label">Break Length:
              <h2 id="break-length">{this.state.breakMinutes}</h2>
             <button id="break-increment" className="btn-success" onClick={()=> this.changeMinute('addBreak')}>Add</button>
            <button id="break-decrement" onClick={()=> this.changeMinute('subBreak')}>Sub</button>
                </span></Draggable>
                
                <Draggable><span className="display">
                <div id="time-left" className="display-time">{this.state.time}</div>
                <div id="timer-label" className="display-date">{this.flag ? "Session" : "Break"}</div>
                </span></Draggable>
            <div className="switch-container">
                <label>
                    <input id="start_stop" ref="switch" checked={ this.state.isChecked } onChange={ this.handleChange } className="switch" type="checkbox" />
                    <div>
                        <div></div>
                    </div>
                </label>
                <audio id="beep" preload="auto" src="https://goo.gl/65cBl1" ref={(audio) => { this.audioBeep = audio; }} />
            </div>
            </div>

          
    );  
  }
}
  

  ReactDOM.render(<App/>, document.getElementById('app'));
  dragElement(document.getElementById("mydiv"));
  
