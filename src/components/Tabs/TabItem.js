import React from 'react';
import PropTypes from 'prop-types';
import './style.css'; 

function TabItem(props) {
    return (
        <a href="#" onClick={props.onClick} className="yodlr-tab__item">{props.text}</a>
    ); 
}

TabItem.propTypes = {
    text: PropTypes.string
}

export default TabItem; 