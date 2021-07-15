import React from 'react';
import './Button.scss'
const Button = (props) => (
    <button className={["ButtonStyle", props.class].join(' ')} onClick={props.clicked}>{props.children}</button>
);

export default Button;