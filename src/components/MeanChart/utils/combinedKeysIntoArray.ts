import getDataType from "../../DataTable/utils/getDataType";

interface DataItem {
    [key: string]: string;
  }
  
  const combinedKeysIntoArray = (data: DataItem[]): { [key: string]: string[] } => {
    return data.reduce<{ [key: string]: string[] }>((acc, item) => {
      Object.keys(item).forEach((key) => {
        const isNotNumeric = getDataType(item[key]) !== 'Number'
        if(isNotNumeric || !item[key]) return
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(item[key]);
      });
      return acc;
    }, {});
  };
  
  export default combinedKeysIntoArray;
  