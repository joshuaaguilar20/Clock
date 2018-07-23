import React from 'react';


const Header = () => (
    <nav className="header navbar navbar-dark bg-dark">
        <div className="container">
            <div className="row m-auto">
                <i className="fa fa fa-clock-o fa-4x white"></i>
                <div className="h1 ml-2 my-auto text-dark bg-dark">Pomodoro Clock</div>
            </div>
            <h2>Session Length</h2>
        </div>
    </nav>
);

export default Header