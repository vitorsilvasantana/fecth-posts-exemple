import React from "react";
import style from "./Button.module.css";

const Button = ({ children, onClick, ...props }) => {
  return (
    <button onClick={onClick} {...props} className={style.buttonElement}>
      {children}
    </button>
  );
};

export default Button;
