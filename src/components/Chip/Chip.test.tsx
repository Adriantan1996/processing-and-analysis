import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // for additional matchers
import Chip, { ChipProps } from "./Chip";

describe("Chip Component", () => {
  const defaultProps: ChipProps = {
    label: "Test",
  };

  const setup = (props = defaultProps) => {
    return render(<Chip {...props} />);
  };

  it("should renders the button with correct text", () => {
    setup();
    // Assert the chip to have correct text
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
