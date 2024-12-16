// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getDataType = (value: any): string => {
  if (!isNaN(Number(value))) return "Number";

  if (value.toLowerCase() === "true" || value.toLowerCase() === "false")
    return "Boolean";

  // Default to string
  return "String";
};

export default getDataType;
