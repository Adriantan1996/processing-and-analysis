import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux"; // For Mocking Purpose to Wrap
import configureStore from "redux-mock-store"; // For mocking Store
import BarChart, { BarChartProps } from "./BarChart";
import { deleteChart } from "../../state/chartSlice"; //
import '@testing-library/jest-dom'; // for additional matchers

jest.mock("../../state/chartSlice", () => ({
  deleteChart: jest.fn(),
}));

describe("BarChart Component", () => {
  const mockStore = configureStore([]); // Mocking Redux Store
  const initialState = {};
  const store = mockStore(initialState);
  store.dispatch = jest.fn(); // Mocking Store Dispatch using JEST mock function
    // Sample Data
  const defaultProps: BarChartProps = {
    chartLabel: "Sample Chart",
    chartId: "chart-1",
    labels: ["Jan", "Feb", "Mar"],
    data: [10, 20, 30],
  };

  const setup = (props = defaultProps) => {
    return render(
      <Provider store={store}>
        <BarChart {...props} />
      </Provider>
    );
  };

  it("should renders the BarChart with the correct label and data", () => {
    setup();

    // Assert the chart label is rendered
    expect(screen.getByText("Sample Chart")).toBeInTheDocument();

    // Assert the delete button is rendered
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should dispatches deleteChart action when delete button is clicked", () => {
    setup();

    // Find the delete button
    const deleteButton = screen.getByRole("button");

    // Simulate clicking the delete button
    fireEvent.click(deleteButton);

    // Assert the deleteChart action was dispatched
    expect(deleteChart).toHaveBeenCalledWith("chart-1");
    expect(store.dispatch).toHaveBeenCalled();
  });
});
