import React from "react";
import { GiCow } from "react-icons/gi";
import { Heart } from "lucide-react";

export const CowIcon = ({ size = 24, color = "currentColor", className = "" }) => (
  <div style={{ position: "relative", width: size, height: size, display: "inline-flex", justifyContent: "center", alignItems: "center" }} className={className}>
    {/* Cow side profile */}
    <GiCow size={size} color={color} />
    {/* Heart above */}
    <div style={{ position: "absolute", top: -size * 0.3, right: -size * 0.1 }}>
      <Heart size={size * 0.4} color={color} fill={color} />
    </div>
  </div>
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
