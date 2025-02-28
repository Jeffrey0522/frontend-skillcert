"use client";

import React from 'react';

interface primaryButtonProps {
    onClick?: () => void;
    label?: string;
}

const primaryButton: React.FC<primaryButtonProps> = ({ onClick, label = "Button" }) => {
    const buttonStyle: React.CSSProperties = {
        width: '250px',
        height: '50px',
        top: '152px',
        left: '271px',
        backgroundColor: '#9333EA',
        color: '#FFFFFF',
        border: 'none',
        minHeight: '50px',
        borderRadius: '20px',
        cursor: 'pointer',
        fontSize: '20px',
        display: 'inline-block',
        textAlign: 'center',
        margin: '152px auto',
        fontFamily: 'Poppins',
        fontWeight: '400px',
        lineHeight: '30px',
        letterSpacing: '0%',

        
    };

    return (
        <button style={buttonStyle} onClick={onClick}>
            {label}
        </button>
    );
};

export default primaryButton;