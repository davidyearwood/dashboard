import React from 'react';
import ReactDOM  from 'react-dom';

// import 'bootstrap/dist/css/bootstrap.min.css';
import Tabs from './components/Tabs/Tabs';
import SearchBox from './components/SearchBox/SearchBox'; 

const tabs = [{text: "All"}, {text: "Active"}, {text: "Pending"}];

ReactDOM.render(<SearchBox value="" />, document.getElementById('root'));