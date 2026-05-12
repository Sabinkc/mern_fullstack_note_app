import React, { useState } from "react";

const AuthTextField = (props) => {
  return (
    <div>
      <h1 className="my-1">{props.label}</h1>
      <div className="bg-white rounded">
        <input
          className="w-70"
          type="text"
        />
      </div>
    </div>
  );
};

export default AuthTextField;
