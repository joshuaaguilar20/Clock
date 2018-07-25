import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';


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
        time: "25:00",
        sessionMinutes: 25,
        isChecked: true
      }));
      this.audioBeep.pause();
      this.audioBeep.currentTime = 0;
      this.componentDidMount();
    };
    render() {
      return (
        <div className="container">
          <h3 id="reset" onClick={()=> this.resetFunction()}>reset</h3>
            <div className="text-justify" id="session-label">Session Length:
                <h1 id="session-length">{this.state.sessionMinutes}</h1>
            </div>
            <span className="badge badge-primary">Primary</span>
            <div id="session-increment" className="d-block bg-primary" onClick={()=> this.changeMinute('add')}>Add</div>
            <div id="session-decrement" onClick={()=> this.changeMinute('sub')}>Sub</div>
            <div className="display">
                <div id="time-left" className="display-time">{this.state.time}</div>
                <div id="timer-label" className="display-date">{this.flag ? "Session" : "Break"}</div>
            </div>
            <div id="break-increment" className="btn-success" onClick={()=> this.changeMinute('addBreak')}>Add</div>
            <div id="break-decrement" onClick={()=> this.changeMinute('subBreak')}>Sub</div>
            <div id="break-label">Break Length:
                <h2 id="break-length">{this.state.breakMinutes}</h2>
            </div>
            <div className="switch-container">
                <label>
                    <input id="start_stop" ref="switch" checked={ this.state.isChecked } onChange={ this.handleChange } className="switch" type="checkbox" />
                    <div>
                        <div></div>
                    </div>
                </label>
            </div>
            <audio id="beep" preload="auto" 
            src="https://goo.gl/65cBl1"
            ref={(audio) => { this.audioBeep = audio; }} />
           
        </div>
      
    );  
  }
}
  

  ReactDOM.render(<App/>, document.getElementById('app'));
  
