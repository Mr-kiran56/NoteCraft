import React from "react";

const Alert = ({ alert }) => {
  return (
    alert && (
      <div  style={{marginTop:'57px'}}
        className={`alert alert-${alert.type} fixed-top alert-dismissible fade show`} 
        role="alert"
      >
        {alert.msg}
      </div>
    )
  );
};

export default Alert;
