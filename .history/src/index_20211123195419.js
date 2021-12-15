import React from 'react';
import ReactDOM from 'react-dom';
import { Button, DatePicker, version } from "antd";
import App from './App.js';
import fastclick from 'fastclick';
import "antd/dist/antd.css";

fastclick.attach(document.body);

ReactDOM.render(<App/>,document.getElementById('root'));
