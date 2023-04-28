import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import educationReducer from './educationSlice';
import tableReducer from './tableSlice';

const store = configureStore({
  reducer: {
    users: userReducer,
    educations:educationReducer,
    tableData:tableReducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;