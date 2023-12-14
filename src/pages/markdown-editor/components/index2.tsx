import React from "react";

interface testProps {
  children?: React.ReactNode;
  onClickMe: () => void;
  message: string;
}

const test: React.FC<testProps> = ({ children, onClickMe, message }) => {
  console.log("rerendered test " + message);

  //   const onClickMe = () => {
  //     console.log("on click me " + button);
  //   };

  return (
    <div>
      <button onClick={onClickMe}>Click me</button> and {children}
    </div>
  );
};

export default React.memo(test);
