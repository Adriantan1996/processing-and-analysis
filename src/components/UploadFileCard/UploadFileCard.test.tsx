import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import UploadFileCard from "./UploadFileCard";
import "@testing-library/jest-dom";
import Papa from "papaparse";
import { addFile, setActiveFile } from "../../state/uploadSlice";

jest.mock("../../state/uploadSlice", () => ({
  addFile: jest.fn(),
  setActiveFile: jest.fn(),
}));

jest.mock("papaparse", () => ({
  parse: jest.fn(),
}));

describe("UploadFileCard Component", () => {
  const mockStore = configureStore([]);
  const initialState = {};
  const store = mockStore(initialState);
  store.dispatch = jest.fn();

  const setup = () => {
    return render(
      <Provider store={store}>
        <UploadFileCard />
      </Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the upload button", () => {
    setup();
    expect(screen.getByText("Upload CSV File")).toBeInTheDocument();
  });

  it("shows error message for invalid file type", () => {
    setup();

    const fileInput = screen.getByLabelText(/upload csv file/i);
    const invalidFile = new File(["content"], "invalid.txt", { type: "text/plain" });

    fireEvent.change(fileInput, { target: { files: [invalidFile] } });

    expect(screen.getByText("Invalid file type. Please upload a CSV file.")).toBeInTheDocument();
  });

  it("dispatches actions on successful file upload", () => {
    setup();

    const fileInput = screen.getByLabelText(/upload csv file/i);
    const validFile = new File(["name,age\nJohn,30"], "valid.csv", { type: "text/csv" });

    (Papa.parse as jest.Mock).mockImplementation((_file, options) => {
      options.complete({ data: [{ name: "John", age: "30" }] });
    });

    fireEvent.change(fileInput, { target: { files: [validFile] } });

    expect(addFile).toHaveBeenCalledWith({
      id: expect.any(String),
      name: "valid.csv",
      data: [{ name: "John", age: "30" }],
    });
    expect(setActiveFile).toHaveBeenCalledWith(expect.any(String));
    expect(screen.getByText("File uploaded successfully!")).toBeInTheDocument();
  });

  it("shows error message on file parsing error", () => {
    setup();

    const fileInput = screen.getByLabelText(/upload csv file/i);
    const validFile = new File(["content"], "valid.csv", { type: "text/csv" });

    (Papa.parse as jest.Mock).mockImplementation((_file, options) => {
      options.error({ message: "Parsing error" });
    });

    fireEvent.change(fileInput, { target: { files: [validFile] } });

    expect(screen.getByText("Error parsing file: Parsing error")).toBeInTheDocument();
  });
});
