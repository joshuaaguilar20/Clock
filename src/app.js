import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';


class App extends React.Component {
    constructor() {
      super();
      this.state = {
        time: "25",
        seconds:1500,
        breakSeconds:300,
        isChecked:true
      }; //default secounds for 25
      this.timer = 0; //needed to start and stop timer
      this.breakid = 0;
      this.flag = false;
      this.secondsRemaining = this.state.seconds;
      this.startStop = false
    }
   
    secondsToTime = (secs) => { //takes amount of seconds and returns obj with minutes sec, hours 
      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);
      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds)
      return  minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
  }
    componentDidMount = () => {
      this.setState({
        time: this.secondsToTime(this.secondsRemaining)
  });
}
 
    handleChange = () => {
      this.setState({ isChecked: !this.state.isChecked } );
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
      if (this.secondsRemaining === 0) {
        this.startTimer();
      }
    };
    resetFunction = () => {
      this.startStopTimer(false);
      this.setState({
        time:"00:00",
        seconds: 4,
        breakSeconds: 3
      });
      this.componentDidMount()
    }
    startTimer = () => {
      this.startStopTimer(false);
      if (this.flag) {
        this.secondsRemaining = this.state.seconds
      } else {
        this.secondsRemaining = this.state.breakSeconds
      }
      this.flag = !this.flag;
      this.componentDidMount()
      this.startStopTimer(true);
    };
    changeMinute = (operator) => {
      switch (operator) {
        case 'add':
          if(this.state.seconds <3600)
          this.state.seconds = this.state.seconds + 60;
          this.secondsRemaining = this.state.seconds;
          this.componentDidMount();
          break;
        case 'sub':
          if(this.state.seconds > 60)
          this.state.seconds = this.state.seconds - 60;
          this.secondsRemaining = this.state.seconds;
          this.componentDidMount();
          break;
        case 'addBreak':
          if(this.state.breakSeconds <3600)
          this.state.breakSeconds = this.state.breakSeconds + 60;
          this.secondsRemaining = this.state.breakSeconds
          this.componentDidMount();
          break;
        case 'subBreak':
          if(this.state.breakSeconds > 60)
          this.state.breakSeconds = this.state.breakSeconds - 60;
          this.state.secondsRemaining = this.state.breakSeconds;
          this.componentDidMount();
          break;
        default:
          alert("Something Went Wrong")
      }
    }
    render() {
      return (
      
        
        <div className="container">
            <div className="text-justify" id="session-label">Session Length:
                <h1 id="session-length">{this.secondsToTime(this.state.seconds)}</h1>
            </div>
            <span class="badge badge-primary">Primary</span>
            <div id="session-increment" class="d-block bg-primary" onClick={()=> this.changeMinute('add')}>Add</div>
            <div id="session-decrement" onClick={()=> this.changeMinute('sub')}>Sub</div>
            <div className="display">
                <div id="time-left" className="display-time">{this.state.time}</div>
                <div id="timer-label" className="display-date">{this.flag ? "Break":"Session"}</div>
            </div>
            <div id="break-increment" className="btn-success" onClick={()=> this.changeMinute('addBreak')}>Add</div>
            <div id="break-decrement" onClick={()=> this.changeMinute('subBreak')}>Sub</div>
            <div id="break-label">Break Length:
                <h2 id="break-length"> {Math.floor(this.state.breakSeconds / 60)}</h2>
            </div>
            <div className="switch-container">
                <label>
                    <input id="start_stop" ref="switch" checked={ this.state.isChecked } onChange={ this.handleChange } className="switch" type="checkbox" />
                    <div>
                        <span><g className="icon icon-toolbar grid-view"></g></span>
                        <span><g className="icon icon-toolbar ticket-view"></g></span>
                        <div></div>
                    </div>
                </label>
            </div>
           
        </div>
      
    );  
  }
}
  

  ReactDOM.render(<App/>, document.getElementById('app'));
  
