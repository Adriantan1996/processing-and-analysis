type Data = { [key: string]: string[] };

interface AnalysisResult {
  key: string;
  mean: number | null;
  standardDeviation: number | null;
}


export const isSequential = (array: string[]): boolean => {
  const numbers = array.map(Number); // Convert strings to numbers
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] !== numbers[i - 1] + 1) {
      return false; // Return false if any element is not 1 greater than the previous
    }
  }
  return true;
};

export const calculateMean = (array: string[]): number | null => {
  const numbers = array.map(Number); // Convert strings to numbers
  const total = numbers.reduce((sum, num) => sum + num, 0); // Sum up the numbers
  return numbers.length > 0 ? total / numbers.length : null; // Return mean or null if array is empty
};

export const calculateStandardDeviation = (array: string[]): number | null => {
  const numbers = array.map(Number); // Convert strings to numbers
  const mean = calculateMean(array); // Get the mean
  if (mean === null) return null; // Return null if no valid mean
  
  const squaredDifferences = numbers.map(num => Math.pow(num - mean, 2)); // Squared differences from mean
  const variance = squaredDifferences.reduce((sum, diff) => sum + diff, 0) / numbers.length; // Variance
  return Math.sqrt(variance); // Standard deviation is the square root of variance
};

const analyzeNonSequentialData = (data: Data): AnalysisResult[] => {
  return Object.keys(data)
    .filter((key) => !isSequential(data[key])) // Filter out sequential keys
    .map((key) => ({
      key,
      mean: calculateMean(data[key]),
      standardDeviation: calculateStandardDeviation(data[key]),
    })); // Return key and mean for non-sequential keys
};

  export default analyzeNonSequentialData