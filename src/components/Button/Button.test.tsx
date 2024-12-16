import { render, screen, fireEvent } from "@testing-library/react";
import Button, { ButtonProps } from "./Button";
import "@testing-library/jest-dom"; // for additional matchers

describe("Button Component", () => {
  const defaultProps: ButtonProps = {
    onClickHandler: jest.fn(),
    buttonText: "Click Me",
  };

  const setup = (props = defaultProps) => {
    return render(<Button {...props} />);
  };

  it("renders the button with correct text", () => {
    setup();

    // Assert the button text is rendered
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("calls onClickHandler when clicked", () => {
    setup();

    // Find the button
    const button = screen.getByRole("button");

    // Simulate clicking the button
    fireEvent.click(button);

    // Assert the onClickHandler was called
    expect(defaultProps.onClickHandler).toHaveBeenCalledTimes(1);
  });

  it("applies the correct classes", () => {
    setup();

    // Assert the button has the correct class name
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-blue-300");
    expect(button).toHaveClass("rounded-md");
  });
});
