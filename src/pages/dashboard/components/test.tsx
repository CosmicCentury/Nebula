import React, { useRef } from "react";

interface props {
  props: any;
}

type Ref = React.ForwardedRef<{ [key: string]: HTMLDivElement }>;

const Test = React.forwardRef<HTMLDivElement>((props, ref) => {
  console.log(ref);

  const marginBtm = "300px";

  return (
    <div>
      <div style={{ marginTop: "50px", marginBottom: marginBtm }}>
        <span>test 1</span>
      </div>
      <div style={{ marginTop: "50px", marginBottom: marginBtm }}>
        <span>test 2</span>
      </div>
      <div style={{ marginTop: "50px", marginBottom: marginBtm }} ref={ref}>
        <span>test 3</span>
      </div>
      <div style={{ marginTop: "50px", marginBottom: marginBtm }}>
        <span>test 4</span>
      </div>
      <div style={{ marginTop: "50px", marginBottom: marginBtm }}>
        <span>test 5</span>
      </div>
    </div>
  );
});

export default Test;
