import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TableState = {
  id: string;
};

const initialState: TableState = {
  id: '',
};

const tableSlice = createSlice({
  name: 'tableData',
  initialState,
  reducers: {
    tableData(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
  },
});

export const { tableData } = tableSlice.actions;

export default tableSlice.reducer;
