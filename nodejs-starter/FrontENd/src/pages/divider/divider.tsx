
 import React from 'react'
 
const Divider = (children:any ) => {
    console.log({children})
    return (
      <div  style={{display:"flex", alignItems: "center"}}>
        <div style={{borderBottom: "1px solid #E5E5E5",
    width: "200px"}}  />
        <span style={{color:"#637381", padding: "0 10px 0 10px"}}>
          {children.children}
        </span>
        <div style={{borderBottom: "1px solid #E5E5E5",
    width: "200px"}} />
      </div>
    );
  };

  export default Divider;