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
    <rect x="5" y="8" width="14" height="12" rx="4" />
    <path d="M5 10c-2-1-3-3-2-4s3 0 4 2" />
    <path d="M19 10c2-1 3-3 2-4s-3 0-4 2" />
    <path d="M7 8V5c0-1.5 1-2 2-2" />
    <path d="M17 8V5c0-1.5-1-2-2-2" />
    <path d="M8 15h8" />
    <path d="M9 18h6" />
    <path d="M9 12h.01" />
    <path d="M15 12h.01" />
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
