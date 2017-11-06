import React from 'react'

const LoginButton = props => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

export default LoginButton
