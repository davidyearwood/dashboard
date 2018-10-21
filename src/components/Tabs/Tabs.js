import React from 'react';
import TabItem from './TabItem'; 

function Tabs(props) {
   const tabItems = props.tabItems.map((item) => {
    return <TabItem text={item.text} onClick={item.onClick} />; 
   });

   return (
       <nav className="yodlr-tabs">
         {tabItems}
       </nav>
   ); 
}

export default Tabs; 