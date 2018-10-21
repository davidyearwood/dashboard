import React from 'react';
import ReactDOM  from 'react-dom';

// import 'bootstrap/dist/css/bootstrap.min.css';
import Tabs from './components/Tabs/Tabs';

const tabs = [{text: "All"}, {text: "Active"}, {text: "Pending"}];

ReactDOM.render(<Tabs tabItems={tabs} />, document.getElementById('root'));