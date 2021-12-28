import React from 'react'
import style from "./Input.module.css"

const Input = ({ onChange, value, type, ...props }) => {
  return (
    <input
    className={style.inputElement}
    type={type}
    onChange={onChange}
    value={value}
    {...props}
  />
  )
}

export default Input
