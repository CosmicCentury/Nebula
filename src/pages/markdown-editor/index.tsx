import React, { useRef } from "react";
import PageTitle from "../../components/PageTitle";
import Test from "./components/index";
import Test1 from "./components/index2";
import Test2 from "./components/test2";

const MarkdownEditor: React.FC = () => {
  const [message, setMessage] = React.useState("");
  const [counter, setCounter] = React.useState(1);
  const [counter2, setCounter2] = React.useState(10);
  console.log("rerendered");

  const onClickMe = React.useCallback((message: string) => {
    setMessage(message);
    console.log("click me " + message);
  }, []);

  const testMemo = React.useMemo(
    () => <Test onClickMe={() => onClickMe("1")} message={"1"}></Test>,
    [message]
  );

  const incrementCounter = React.useCallback(() => {
    setCounter((prev) => prev + 1);
  }, []);

  const incrementCounter2 = React.useCallback(() => {
    setCounter2((prev) => prev + 1);
  }, []);

  return (
    <div>
      {testMemo}
      <Test2 message="HI" />
      <Test onClickMe={incrementCounter} message={"2"}>
        {counter}
      </Test>
      <Test onClickMe={incrementCounter2} message={"3"}>
        {counter2}
      </Test>
      {message}
    </div>
  );
};

export default MarkdownEditor;
