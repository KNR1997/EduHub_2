/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

function Button({className , children , ...props}) {
    return (
        <button className={`' px-3 py-2 rounded-full text-sm font-thin' ${className}`} {...props}>{children}</button>
    );
}

export default Button;