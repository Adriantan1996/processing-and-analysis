const isValidFileExtension = (fileName: string): boolean => {
  const fileExtension = fileName.split(".").pop()?.toLowerCase();
  return fileExtension === "csv";
};
export default isValidFileExtension;
