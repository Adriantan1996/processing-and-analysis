const alphanumeric = /[^a-zA-Z0-9]+/;

const capitalizeFirstLetter = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const refractorHeaderName = (column: string): string => {
  return column
    .split(alphanumeric) // Split the string by non-alphanumeric characters
    .filter(Boolean) // Remove empty strings from the result
    .map(capitalizeFirstLetter) // Capitalize each part
    .join(" "); // Join the parts with a space
};

export default refractorHeaderName;
