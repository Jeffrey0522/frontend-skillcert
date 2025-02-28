"use client";

import React from 'react';
import { HiArrowRight } from "react-icons/hi";

interface noBGButtonProps {
    onClick?: () => void;
    label?: string;
}

const noBGButton: React.FC<noBGButtonProps> = ({ onClick, label = "Button" }) => {
    const buttonStyle: React.CSSProperties = {
        width: '200px',
        height: '50px',
        top: '257px',
        left: '276px',
        color: '#9333EA',
        fontFamily: 'Poppins',
        fontWeight: '500',
        fontSize: '20px',
        lineHeight: '30px',
        letterSpacing: '0%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: '30px',
        alignItems: 'center',
    };

    return (
        <button style={buttonStyle} onClick={onClick}>
            {label}
<span><HiArrowRight /></span>
        </button>
    );
};

export default noBGButton;