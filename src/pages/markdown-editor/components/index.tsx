import React from "react";

interface testProps {
  children?: React.ReactNode;
  onClickMe: () => void;
  message: string;
}

const test: React.FC<testProps> = ({ children, onClickMe, message }) => {
  console.log("rerendered test " + message);
  const [test, setTest] = React.useState("");
  const onClickTest = () => {
    console.log("onclick test");
    setTest("on click me test" + children);
  };

  return (
    <div>
      <button onClick={onClickMe}>Click me</button> and {children}
      <button onClick={onClickTest}>Click me test</button>
    </div>
  );
};

export default React.memo(test);
