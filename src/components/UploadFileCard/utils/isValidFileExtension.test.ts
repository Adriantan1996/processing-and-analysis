import isValidFileExtension from "./isValidFileExtension";

describe("isValidFileExtension", () => {
  it("should return true for valid CSV file", () => {
    expect(isValidFileExtension("file.csv")).toBe(true);
  });

  it("should return false for invalid file extension", () => {
    expect(isValidFileExtension("file.txt")).toBe(false);
    expect(isValidFileExtension("file.pdf")).toBe(false);
    expect(isValidFileExtension("file.doc")).toBe(false);
  });

  it("should return false for file with no extension", () => {
    expect(isValidFileExtension("file")).toBe(false);
  });

  it("should return true for CSV file with mixed case extension", () => {
    expect(isValidFileExtension("file.Csv")).toBe(true);
    expect(isValidFileExtension("file.CSV")).toBe(true);
  });

  it("should return false for file with multiple dots", () => {
    expect(isValidFileExtension("file.name.csv")).toBe(true);
    expect(isValidFileExtension("file.name.txt")).toBe(false);
  });
});
