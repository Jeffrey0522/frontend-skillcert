"use client";

import React from 'react';

interface LearnMoreButtonProps {
    onClick?: () => void;
    label?: string;
}

const LearnMoreButton: React.FC<LearnMoreButtonProps> = ({ onClick, label = "Button" }) => {
    const buttonStyle: React.CSSProperties = {
        backgroundColor: '#38bdf8',
        color: 'black',
        border: 'none',
        width: '200px',
        height: '50px',
        minHeight: '50px',
        borderRadius: '25px',
        cursor: 'pointer',
        fontSize: '24px',
        transition: 'background-color 0.3s ease',
        display: 'inline-block',
        textAlign: 'center',
        margin: '152px auto',
    };

    return (
        <button style={buttonStyle} onClick={onClick}>
            {label}
        </button>
    );
};

export default LearnMoreButton;