import React from "react";

export const CowIcon = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Heart floating above */}
    <path d="M14 4.5a1.5 1.5 0 0 0-2.5-1 1.5 1.5 0 0 0 0 2.1L14 8l2.5-2.4a1.5 1.5 0 0 0 0-2.1 1.5 1.5 0 0 0-2.5 1z" />
    
    {/* Snout and jaw */}
    <path d="M5 14l-1.5 1.5c-1 1-.5 2.5 1 2.5h3c1 0 1.5-.5 2-1" />
    
    {/* Back and hind */}
    <path d="M5 14c1-2 3-3 6-3h4c3 0 5 1 6 3v5" />
    
    {/* Belly */}
    <path d="M9.5 17c2 1.5 4.5 1.5 6.5 0" />
    
    {/* Legs */}
    <path d="M8 17v5" />
    <path d="M10 18v4" />
    <path d="M16 17v5" />
    <path d="M18 18v4" />
    
    {/* Horn and Ear */}
    <path d="M6 13c-.5-1.5 0-3 1.5-3" />
    <path d="M8 13c1 1 2.5.5 2-1" />
    
    {/* Tail */}
    <path d="M21 16c1 1 1 3 0 4" />
  </svg>
);

export const BrazilMapIcon = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 2l3 1 3-1 2 2 3 1 1 3-1 3-1 4-2 2-2 3-2 2-2-2-2-3-2-3-2-2-1-3 1-3 2-2 2-2z" />
  </svg>
);
