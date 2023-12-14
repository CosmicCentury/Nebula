import React from "react";
import { render, screen } from "@testing-library/react";
import TopBar from "./index";

const renderTopBar = () =>
  render(
    <TopBar
      open={false}
      setOpen={function (newState: boolean): void {
        throw new Error("Function not implemented.");
      }}
    />
  );

describe("TopBar Component", () => {
  it("renders without crashing", () => {
    renderTopBar();

    screen.debug();
  });
});
