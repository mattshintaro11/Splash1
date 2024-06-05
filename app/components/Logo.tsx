import React from "react";

interface LogoProps {
  size?: number;
  color?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 50, color = "#000000" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <path
        fill={color}
        d="M12 0C5.383 0 0 5.383 0 12c0 6.617 5.383 12 12 12s12-5.383 12-12c0-6.617-5.383-12-12-12zm0 22c-5.514 0-10-4.486-10-10S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm-.467-5.176l.005-.01-3.333-3.333 1.413-1.414 1.92 1.92 5.42-5.419 1.414 1.414-6.833 6.832z"
      />
    </svg>
  );
};

export default Logo;
