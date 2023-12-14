import React from "react";

interface testProps {
  message: string;
}

const test: React.FC<testProps> = ({ message }) => {
  console.log("rerendered test " + message);

  //   const onClickMe = () => {
  //     console.log("on click me " + button);
  //   };

  return <div>{message}</div>;
};

export default React.memo(test);
