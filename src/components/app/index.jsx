import React, { Component }       from 'react';
import avatar                     from 'img/chaotic.png';
import './style.scss';

export default ({ children }) => (
    <div className="app">
        {/* <a className='banner' href="https://github.com/pdhoward" target="_blank">ChaoticBots</a>*/}
        <div className="header">
            <h2 className="header-text">ChaoticBots Console</h2>
            <img src={avatar} className="avatar" />
        </div>
        {children}
    </div>
);
