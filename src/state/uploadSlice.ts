import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CsvFile {
  id: string; // Unique identifier
  name: string; // File name
  data: any[]; // Parsed CSV data
}

interface CsvState {
  files: CsvFile[]; // Array of uploaded files
  activeFileId: string | null; // ID of the currently displayed file
}

const initialState: CsvState = {
  files: JSON.parse(localStorage.getItem("csvFiles") || "[]"),
  activeFileId: null,
};

const uploadSlice = createSlice({
  name: "csv",
  initialState,
  reducers: {
    addFile: (state, action: PayloadAction<CsvFile>) => {
      state.files.push(action.payload);
      localStorage.setItem("csvFiles", JSON.stringify(state.files)); // add new file to local storage
    },
    setActiveFile: (state, action: PayloadAction<string>) => {
      state.activeFileId = action.payload; // set active file for table display
    },
    deleteFile: (state, action: PayloadAction<string>) => {
      if (state.activeFileId === action.payload) {
        state.activeFileId = null;
      }
      state.files = state.files.filter((file) => file.id !== action.payload);
      localStorage.setItem("csvFiles", JSON.stringify(state.files)); // delete file
    },
  },
});

export const { addFile, deleteFile, setActiveFile } = uploadSlice.actions;
export default uploadSlice.reducer;
