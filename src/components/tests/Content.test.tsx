import { fireEvent, render, screen } from "@testing-library/react";
import { Content } from "../Content";
import "@testing-library/jest-dom";

window.HTMLElement.prototype.scrollIntoView = jest.fn();

// TODO: Experiment more with component testing. Currently very brittle with colours...
describe("Content", () => {
  let grid: HTMLElement;
  let step: HTMLElement;
  let walk: HTMLElement;
  let run: HTMLElement;
  let reset: HTMLElement;

  beforeEach(() => {
    render(<Content />);
    grid = screen.getByLabelText("Code grid");
    step = screen.getByRole("button", { name: /^step$/i });
    walk = screen.getByRole("button", { name: /^walk$/i });
    run = screen.getByRole("button", { name: /^run$/i });
    reset = screen.getByRole("button", { name: /^reset$/i });
  });

  it("should do something", () => {
    expect(screen.getByTestId("0,0")).not.toHaveStyle(
      "background-color: rgba(0, 0, 0, 0)"
    );
    expect(screen.getByTestId("0,1")).toHaveStyle(
      "background-color: rgba(0, 0, 0, 0)"
    );
    expect(screen.getByTestId("1,0")).toHaveStyle(
      "background-color: rgba(0, 0, 0, 0)"
    );
    expect(screen.getByTestId("1,1")).toHaveStyle(
      "background-color: rgba(0, 0, 0, 0)"
    );

    fireEvent(
      step,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(screen.getByTestId("1,0")).not.toHaveStyle(
      "background-color: rgba(0, 0, 0, 0)"
    );
  });
});
