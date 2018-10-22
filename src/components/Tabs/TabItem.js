import React from 'react';
import PropTypes from 'prop-types';
import './style.css'; 

function TabItem(props) {
    return (
        <button href="#" value={props.filterType} onClick={props.onClick} className="yodlr-tab__item">{props.text}</button>
    ); 
}

TabItem.propTypes = {
    text: PropTypes.string
}

export default TabItem; 