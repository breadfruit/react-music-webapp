import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import App from './App.js';
import fastclick from 'fastclick';
import "antd/dist/antd.css";

fastclick.attach(document.body);

ReactDOM.render(<App/>,document.getElementById('root'));
