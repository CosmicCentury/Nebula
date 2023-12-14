import React from "react";

interface IframeProps {
  className?: string;
}

const Iframe: React.FC<
  IframeProps &
    React.DetailedHTMLProps<
      React.IframeHTMLAttributes<HTMLIFrameElement>,
      HTMLIFrameElement
    >
> = ({ ...props }) => {
  return (
    <div>
      <iframe {...props} />
    </div>
  );
};

export default Iframe;
