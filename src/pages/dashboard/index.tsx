import React, { useRef } from "react";
import useQuickAccess from "../../hooks/useQuickAccess";
import Test from "./components/test";

const Dashboard: React.FC = () => {
  const marginBtm = "300px";

  const test = [
    {
      label: "Test 1",
      value: 1,
    },
    {
      label: "Test 2",
      value: 2,
    },
    {
      label: "Test 3",
      value: 3,
    },
    {
      label: "Test 4",
      value: 4,
    },
    {
      label: "Test 5",
      value: 5,
    },
  ];
  const { QuickAccessComponent, ref } = useQuickAccess({
    navList: test,
    scrollPosition: "center",
    highlightActive: true,
  });

  return (
    <div>
      <span>Dashboard</span>

      {/* <QuickAccess ref={ref} /> */}
      {/* <div onClick={scrollTo}>test 4</div> */}
      <QuickAccessComponent title={"Quick Access: "} />

      {/* <Test ref={(el) => (ref.current[3] = el!)} /> */}

      <div
        ref={(el) => (ref.current[1] = el!)}
        style={{ marginTop: "50px", marginBottom: marginBtm }}
      >
        <span>test 1</span>
      </div>
      <div
        ref={(el) => (ref.current[2] = el!)}
        style={{ marginTop: "50px", marginBottom: marginBtm }}
      >
        <span>test 2</span>
      </div>
      <div
        ref={(el) => (ref.current[3] = el!)}
        style={{ marginTop: "50px", marginBottom: marginBtm }}
      >
        <span>test 3</span>
      </div>
      <div
        ref={(el) => (ref.current[4] = el!)}
        style={{ marginTop: "50px", marginBottom: marginBtm }}
      >
        <span>test 4</span>
      </div>
      <div
        ref={(el) => (ref.current[5] = el!)}
        style={{ marginTop: "50px", marginBottom: marginBtm }}
      >
        <span>test 5</span>
      </div>
    </div>
  );
};

export default Dashboard;
